'use client'

import * as React from 'react'
import type * as THREE from 'three'
import { FloatingHouse, useHouseTravel, type HouseFrame } from './house'

/**
 * The real 3D house (public/models/house.glb), drawn with three.js.
 * It travels the page and scatters / re-assembles exactly like the CSS version,
 * but with real lighting and a soft shadow.
 */

const MODEL = '/models/house.glb'
const SIZE = 520 // canvas size in CSS pixels

/** true  = keep the colours baked into the model file.
 *  false = repaint the house in the site's white / emerald palette. */
const ORIGINAL_COLORS = false

// Colours by part name (the names come from the model file).
const PALETTE: [RegExp, string][] = [
  [/roof/i, '#047857'],
  [/door/i, '#10b981'],
  [/glazing/i, '#a7f3d0'],
  [/trim/i, '#ffffff'],
  [/chimney/i, '#d4d4cf'],
  [/beam|post/i, '#2a2a2c'],
  [/wall/i, '#fbfbf9'],
]

type Part = { mesh: THREE.Mesh; base: THREE.Vector3; fly: THREE.Vector3; spin: THREE.Vector3 }

function webglOk() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function ModelHouse() {
  const [ok, setOk] = React.useState<boolean | null>(null)
  React.useEffect(() => setOk(webglOk()), [])
  if (ok === null) return null
  return ok ? <Scene /> : <FloatingHouse />
}

function Scene() {
  const root = React.useRef<HTMLDivElement>(null)
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const last = React.useRef<HouseFrame>({ s: 0, dir: 1, turn: 0 })
  const draw = React.useRef<((f: HouseFrame) => void) | null>(null)

  const refresh = useHouseTravel(root, (f) => {
    last.current = f
    draw.current?.(f)
  })

  React.useEffect(() => {
    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      const T = await import('three')
      const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')
      if (disposed || !canvas.current) return

      const renderer = new T.WebGLRenderer({ canvas: canvas.current, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(SIZE, SIZE, false)
      renderer.setClearColor(0x000000, 0)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = T.PCFShadowMap

      const scene = new T.Scene()
      const camera = new T.PerspectiveCamera(28, 1, 0.1, 100)

      scene.add(new T.HemisphereLight(0xffffff, 0xe3ebe6, 1.9))
      const sun = new T.DirectionalLight(0xffffff, 2.4)
      sun.position.set(6, 11, 8)
      sun.castShadow = true
      sun.shadow.mapSize.set(1024, 1024)
      sun.shadow.camera.left = -7
      sun.shadow.camera.right = 7
      sun.shadow.camera.top = 7
      sun.shadow.camera.bottom = -7
      sun.shadow.radius = 5
      sun.shadow.bias = -0.0005
      scene.add(sun)

      const group = new T.Group()
      scene.add(group)

      // soft green ground and its shadow
      const ground = new T.Mesh(new T.CircleGeometry(4.3, 64).rotateX(-Math.PI / 2), new T.MeshBasicMaterial({ color: 0xe9fbf2, transparent: true }))
      ground.position.y = -0.02
      group.add(ground)
      const shadow = new T.Mesh(new T.CircleGeometry(4.3, 64).rotateX(-Math.PI / 2), new T.ShadowMaterial({ opacity: 0.16, transparent: true }))
      shadow.position.y = 0.0
      shadow.receiveShadow = true
      group.add(shadow)

      const parts: Part[] = []
      let ready = false

      const apply = (f: HouseFrame) => {
        if (!ready) return
        const { s, dir, turn } = f
        const R = 3.9 * s
        const A = 3.4 * s
        for (const p of parts) {
          p.mesh.position.set(p.base.x + p.fly.x * R, p.base.y + p.fly.y * R, p.base.z + p.fly.z * R)
          p.mesh.rotation.set(p.spin.x * A, p.spin.y * A, p.spin.z * A * dir)
        }
        const fade = 1 - s * 0.85
        ;(ground.material as THREE.MeshBasicMaterial).opacity = fade
        ;(shadow.material as THREE.ShadowMaterial).opacity = 0.16 * fade
        group.rotation.y = -0.55 + Math.PI * 2 * turn
        renderer.render(scene, camera)
      }
      draw.current = apply

      new GLTFLoader().load(
        MODEL,
        (gltf) => {
          if (disposed) return
          const model = gltf.scene
          const box = new T.Box3().setFromObject(model)
          const center = box.getCenter(new T.Vector3())
          const size = box.getSize(new T.Vector3())
          const houseCenter = new T.Vector3(0, size.y / 2, 0)

          const meshes: THREE.Mesh[] = []
          model.traverse((o) => {
            if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh)
          })

          meshes.forEach((m, i) => {
            // put each part's origin at its own centre so it can spin in place
            m.geometry = m.geometry.clone()
            m.geometry.translate(-center.x, -box.min.y, -center.z)
            m.geometry.computeBoundingBox()
            const c = m.geometry.boundingBox!.getCenter(new T.Vector3())
            m.geometry.translate(-c.x, -c.y, -c.z)
            m.position.copy(c)
            m.rotation.set(0, 0, 0)
            m.scale.set(1, 1, 1)
            m.castShadow = true
            m.receiveShadow = true

            if (!ORIGINAL_COLORS) {
              const hit = PALETTE.find(([re]) => re.test(m.name))
              m.material = new T.MeshStandardMaterial({ color: hit ? hit[1] : '#f4f4f1', roughness: 0.85, metalness: 0 })
            }

            // each part flies away from the middle of the house, with a little variety
            const out = c.clone().sub(houseCenter)
            if (out.lengthSq() < 0.01) out.set(0, 1, 0.4)
            out.normalize()
            const r = (n: number) => Math.sin((i + 1) * 12.9898 * (n + 1)) * 0.5 + 0.5
            const fly = out.multiplyScalar(0.8).add(new T.Vector3(r(1) - 0.5, r(2) * 0.6, r(3) - 0.3).multiplyScalar(0.9))
            const spin = new T.Vector3((r(4) - 0.5) * 2, (r(5) - 0.5) * 2, (r(6) - 0.5) * 2)
            parts.push({ mesh: m, base: c.clone(), fly, spin })
            group.add(m)
          })

          // frame the camera on the house
          const radius = Math.max(size.x, size.y, size.z)
          camera.position.set(0, size.y * 0.95, radius * 3.5)
          camera.lookAt(0, size.y * 0.46, 0)
          ready = true
          apply(last.current)
          refresh()
        },
        undefined,
        () => {
          /* if the model fails to load the page still works without it */
        },
      )

      cleanup = () => {
        draw.current = null
        renderer.dispose()
        scene.traverse((o) => {
          const m = o as THREE.Mesh
          if (m.isMesh) {
            m.geometry.dispose()
            ;(Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => x.dispose())
          }
        })
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[-1] size-0 select-none" style={{ visibility: 'hidden' }}>
      <canvas ref={canvas} width={SIZE} height={SIZE} style={{ width: SIZE, height: SIZE, marginLeft: -SIZE / 2, marginTop: -SIZE / 2 }} className="absolute left-0 top-0" />
    </div>
  )
}
