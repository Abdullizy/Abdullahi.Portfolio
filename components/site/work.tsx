'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { projects, type Project } from '@/lib/data'
import { Preview } from './preview'

const pad = (n: number) => String(n).padStart(2, '0')
const total = projects.length

function Card({ project, index, className, mediaClass }: { project: Project; index: number; className?: string; mediaClass: string }) {
  return (
    <Link href={`/work/${project.slug}`} draggable={false} className={`project-card group block shrink-0 outline-none ${className ?? ''}`} aria-label={`View ${project.title}`}>
      <Preview project={project} index={index} className={mediaClass} priority={index === 0} />
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <span className="serif text-[26px] sm:text-[34px]">{project.title}</span>
        <span className="flex items-center gap-3 font-mono text-[13px] text-muted-foreground">
          <span className="card-arrow hidden text-primary sm:inline">View project &rarr;</span>
          {project.year}
        </span>
      </div>
      <div className="mt-2 text-[14px] text-muted-foreground sm:text-[15px]">{project.tags}</div>
    </Link>
  )
}

function Heading({ active }: { active: number }) {
  return (
    <div className="mx-auto flex w-full max-w-[1240px] items-end justify-between gap-6 px-5 sm:px-8 lg:gap-12 lg:px-12">
      <div>
        <div className="eyebrow">02 &mdash; Selected work</div>
        <h2 className="serif h-section mt-4 sm:mt-6">Projects built <em>to be used</em></h2>
      </div>
      <div className="text-right">
        <div className="serif text-[28px] leading-none sm:text-5xl lg:text-[56px]" aria-live="polite">
          {pad(active + 1)}
          <span className="text-faint">/{pad(total)}</span>
        </div>
        <div className="mt-3 hidden text-sm text-muted-foreground lg:block">Keep scrolling, the projects slide sideways &rarr;</div>
      </div>
    </div>
  )
}

/** Desktop: the section pins and vertical scroll moves the cards sideways. */
function Pinned() {
  const section = React.useRef<HTMLDivElement>(null)
  const track = React.useRef<HTMLDivElement>(null)
  const [dist, setDist] = React.useState(0)
  const [active, setActive] = React.useState(0)

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])

  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))))))

  React.useEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div ref={section} style={{ height: `calc(100dvh + ${dist}px)` }} className="relative hidden lg:block">
      <div className="sticky top-0 flex h-dvh flex-col justify-center gap-[clamp(24px,5dvh,56px)] overflow-hidden pt-[84px]">
        <Heading active={active} />
        <motion.div ref={track} style={{ x }} className="flex w-max gap-10 pl-[max(48px,calc((100vw-1240px)/2+48px))] pr-[max(48px,calc((100vw-1240px)/2+48px))] will-change-transform">
          {projects.map((p, i) => (
            <Card key={p.slug} project={p} index={i} className="w-[clamp(440px,46vw,640px)]" mediaClass="h-[clamp(240px,38dvh,440px)] w-full" />
          ))}
        </motion.div>
        <div className="mx-auto w-full max-w-[1240px] px-12">
          <div className="h-0.5 bg-border">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-0.5 origin-left bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Phones and tablets: a normal swipe row, so nothing blocks the page scroll. */
function Swipe() {
  const row = React.useRef<HTMLDivElement>(null)
  const [p, setP] = React.useState(0)
  const [active, setActive] = React.useState(0)

  const onScroll = () => {
    const el = row.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const r = max > 0 ? el.scrollLeft / max : 0
    setP(r)
    setActive(Math.min(total - 1, Math.round(r * (total - 1))))
  }

  return (
    <div className="py-16 sm:py-24 lg:hidden">
      <Heading active={active} />
      <div ref={row} onScroll={onScroll} className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mt-12 sm:gap-6 sm:px-8">
        {projects.map((pr, i) => (
          <Card key={pr.slug} project={pr} index={i} className="w-[80vw] max-w-[400px] snap-start sm:w-[56vw]" mediaClass="h-[260px] w-full sm:h-[340px]" />
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
      <div className="mx-auto mt-8 max-w-[1240px] px-5 sm:px-8">
        <div className="h-0.5 bg-border">
          <div className="h-0.5 origin-left bg-primary transition-transform duration-150" style={{ transform: `scaleX(${Math.max(p, 1 / total)})` }} />
        </div>
        <div className="mt-3 text-[13px] text-muted-foreground">Swipe to see more projects &rarr;</div>
      </div>
    </div>
  )
}

export function Work() {
  return (
    <section id="work" className="border-t border-border">
      <Pinned />
      <Swipe />
    </section>
  )
}
