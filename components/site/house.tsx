'use client'

import * as React from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

/**
 * A small 3D house made of flat pieces (CSS 3D, no libraries).
 * It starts whole in the hero ([data-house-start]), then follows you down the
 * page: it keeps breaking apart and putting itself back together, and it
 * lands whole in the contact section ([data-house-end]).
 */

const W = 190 // width (x)
const D = 150 // depth (z)
const H = 104 // wall height (y)
const RH = 62 // roof height
const L = Math.sqrt((D / 2) ** 2 + RH ** 2) // length of a roof slope
const TH = (Math.atan2(RH, D / 2) * 180) / Math.PI // roof angle from flat

type Piece = {
  w: number
  h: number
  pos: [number, number, number]
  rot: string
  cls: string
  clip?: string
  inner?: React.ReactNode
  // how this piece flies when scattered: x, y, z, rotX, rotY, rotZ (multipliers)
  fly: [number, number, number, number, number, number]
}

const line = 'border border-foreground'

const pieces: Piece[] = [
  { w: W + 70, h: D + 70, pos: [0, H / 2 + 1, 0], rot: 'rotateX(90deg)', cls: 'bg-[#ecfdf5] border border-tint', fly: [-0.4, 0.9, 0.3, 0.5, 0, 0.6] },
  { w: W, h: H, pos: [0, 0, D / 2], rot: '', cls: `bg-white ${line}`, fly: [-0.7, -0.5, 1.1, 0.4, -0.8, 0.3] },
  { w: W, h: H, pos: [0, 0, -D / 2], rot: 'rotateY(180deg)', cls: `bg-[#f3f3f0] ${line}`, fly: [0.8, -0.2, -1, -0.5, 0.7, -0.4] },
  { w: D, h: H, pos: [-W / 2, 0, 0], rot: 'rotateY(-90deg)', cls: `bg-[#f1f1ee] ${line}`, fly: [-1.2, 0.2, 0.2, 0.3, 1, 0.5] },
  { w: D, h: H, pos: [W / 2, 0, 0], rot: 'rotateY(90deg)', cls: `bg-[#e9e9e6] ${line}`, fly: [1.2, 0.3, 0.4, -0.4, -1, -0.3] },
  { w: W, h: RH, pos: [0, -H / 2 - RH / 2, D / 2], rot: '', clip: 'polygon(50% 0, 100% 100%, 0 100%)', cls: 'bg-white', fly: [-0.3, -1.1, 0.9, 0.7, 0.4, -0.8] },
  { w: W, h: RH, pos: [0, -H / 2 - RH / 2, -D / 2], rot: 'rotateY(180deg)', clip: 'polygon(50% 0, 100% 100%, 0 100%)', cls: 'bg-[#f3f3f0]', fly: [0.4, -1.2, -0.8, -0.6, 0.5, 0.7] },
  { w: W + 22, h: L, pos: [0, -H / 2 - RH / 2, D / 4], rot: `rotateX(${90 - TH}deg)`, cls: 'bg-primary border border-[#065f46]', fly: [0.5, -1.5, 0.7, 0.9, -0.3, 0.4] },
  { w: W + 22, h: L, pos: [0, -H / 2 - RH / 2, -D / 4], rot: `rotateX(${-(90 - TH)}deg)`, cls: 'bg-[#065f46] border border-[#064e3b]', fly: [-0.5, -1.4, -0.6, -0.8, 0.4, -0.5] },
  { w: 34, h: 62, pos: [-22, H / 2 - 31, D / 2 + 1], rot: '', cls: 'bg-accent border border-foreground', fly: [-1.3, 0.6, 1.4, 0.3, 1, 1.1] },
  { w: 34, h: 34, pos: [-W / 2 + 34, -8, D / 2 + 1], rot: '', cls: 'bg-block border border-foreground', fly: [-1.5, -0.8, 1.2, -0.5, 0.6, 1.2] },
  { w: 34, h: 34, pos: [W / 2 - 34, -8, D / 2 + 1], rot: '', cls: 'bg-block border border-foreground', fly: [1.4, -0.9, 1.3, 0.6, -0.6, -1.2] },
  { w: 20, h: 54, pos: [W / 4, -H / 2 - RH + 22, -D / 5], rot: '', cls: 'bg-white border border-foreground', fly: [1.3, -1.4, -0.4, 0.8, 1, 0.6] },
]

const smooth = (t: number) => t * t * (3 - 2 * t)
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

type Geo = { sx: number; sy: number; ex: number; ey: number; M: number; vw: number; vh: number }

/** What the house should look like at the current scroll position. */
export type HouseFrame = {
  s: number // 0 = whole, 1 = fully scattered
  dir: 1 | -1 // spin direction of the scattered pieces
  turn: number // 0..1 across the whole page: one full turn
}

/**
 * Moves `root` (a fixed element) from [data-house-start] in the hero, along the
 * page, to [data-house-end] in the contact section, and reports how scattered
 * the house should be. Used by both the 3D model and the CSS fallback.
 */
export function useHouseTravel(root: React.RefObject<HTMLDivElement | null>, onFrame: (f: HouseFrame) => void) {
  const geo = React.useRef<Geo | null>(null)
  const cb = React.useRef(onFrame)
  cb.current = onFrame
  const { scrollY } = useScroll()

  const measure = React.useCallback(() => {
    const a = document.querySelector('[data-house-start]')
    const b = document.querySelector('[data-house-end]')
    if (!a || !b) return
    const ra = a.getBoundingClientRect()
    const rb = b.getBoundingClientRect()
    const y = window.scrollY
    geo.current = {
      sx: ra.left + ra.width / 2,
      sy: ra.top + y + ra.height / 2,
      ex: rb.left + rb.width / 2,
      ey: rb.top + y + rb.height / 2,
      M: Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
      vw: window.innerWidth,
      vh: window.innerHeight,
    }
  }, [])

  const update = React.useCallback(() => {
    const g = geo.current
    const el = root.current
    if (!g || !el) return
    const y = window.scrollY
    const small = g.vw < 1024

    // where it floats while you scroll through the middle of the page
    const fx = small ? g.vw - 54 : g.vw - 118
    const fy = clamp(g.sy, g.vh * 0.38, g.vh * 0.55)
    const wStart = smooth(clamp(y / (g.vh * 0.9)))
    const wEnd = smooth(clamp((y - (g.M - g.vh * 0.95)) / (g.vh * 0.95)))

    const startVP = g.sy - y
    const endVP = g.ey - y
    const pyMid = startVP > fy ? startVP : lerp(startVP, fy, wStart)
    const px = lerp(lerp(g.sx, fx, wStart), g.ex, wEnd)
    const py = lerp(pyMid, endVP, wEnd)
    const k0 = small ? 0.3 : 0.82
    const kF = small ? 0.3 : 0.52
    const k1 = small ? 0.72 : 0.85
    const k = lerp(lerp(k0, kF, wStart), k1, wEnd)
    el.style.transform = `translate3d(${px}px,${py}px,0) scale(${k})`

    // break apart and re-assemble over and over; whole at the very start and very end
    const n = Math.max(2, Math.round(g.M / (g.vh * 1.15)))
    const w = Math.sin((Math.PI * y * n) / g.M) ** 2
    const s = smooth(clamp((w - 0.16) / 0.6))
    const dir = Math.sin((Math.PI * 2 * y * n) / g.M) < 0 ? -1 : 1
    cb.current({ s, dir, turn: y / g.M })
    el.style.visibility = 'visible'
  }, [root])

  useMotionValueEvent(scrollY, 'change', update)

  React.useEffect(() => {
    const run = () => {
      measure()
      update()
    }
    run()
    const ro = new ResizeObserver(run)
    ro.observe(document.body)
    window.addEventListener('resize', run)
    const t = window.setTimeout(run, 600) // after fonts and images settle
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', run)
      window.clearTimeout(t)
    }
  }, [measure, update])

  return update
}

/** CSS-only house, used if the visitor's browser cannot show WebGL. */
export function FloatingHouse() {
  const root = React.useRef<HTMLDivElement>(null)
  const scene = React.useRef<HTMLDivElement>(null)
  const els = React.useRef<(HTMLDivElement | null)[]>([])

  useHouseTravel(root, ({ s, dir, turn }) => {
    pieces.forEach((pc, i) => {
      const el = els.current[i]
      if (!el) return
      const [fxm, fym, fzm, rx, ry, rz] = pc.fly
      const R = 300 * s
      const A = 200 * s
      el.style.transform =
        `translate3d(${pc.pos[0] + fxm * R * 0.6}px,${pc.pos[1] + fym * R * 0.8}px,${pc.pos[2] + fzm * R}px) ` +
        `rotateX(${rx * A}deg) rotateY(${ry * A}deg) rotateZ(${rz * A * dir}deg) ${pc.rot}`
      el.style.opacity = String(1 - s * 0.4)
    })
    if (scene.current) scene.current.style.transform = `rotateX(-17deg) rotateY(${-32 + 360 * turn}deg)`
  })

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[-1] size-0 select-none [perspective:1100px]"
      style={{ visibility: 'hidden' }}
    >
      <div ref={scene} className="relative size-0 [transform-style:preserve-3d]" style={{ transform: 'rotateX(-17deg) rotateY(-32deg)' }}>
        {pieces.map((pc, i) => (
          <div
            key={i}
            ref={(el) => {
              els.current[i] = el
            }}
            className={`absolute left-0 top-0 will-change-transform ${pc.cls}`}
            style={{
              width: pc.w,
              height: pc.h,
              marginLeft: -pc.w / 2,
              marginTop: -pc.h / 2,
              clipPath: pc.clip,
              transform: `translate3d(${pc.pos[0]}px,${pc.pos[1]}px,${pc.pos[2]}px) ${pc.rot}`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
