import Image from 'next/image'
import type { Project } from '@/lib/data'
import { cn } from '@/lib/utils'

const dots = (
  <div className="flex gap-1.5">
    <i className="size-2 rounded-full bg-line" />
    <i className="size-2 rounded-full bg-line" />
    <i className="size-2 rounded-full bg-line" />
  </div>
)

/** Shows the project's screenshot, or a simple sketch until you add one. */
export function Preview({ project, index = 0, className, sizes = '(min-width:1024px) 640px, 90vw', priority = false }: { project: Project; index?: number; className?: string; sizes?: string; priority?: boolean }) {
  if (project.image) {
    return (
      <div className={cn('relative overflow-hidden border border-border bg-muted', className)}>
        <Image src={project.image} alt={`${project.title} screenshot`} fill sizes={sizes} priority={priority} className="card-media object-cover object-top" />
      </div>
    )
  }
  const v = index % 4
  return (
    <div className={cn('overflow-hidden border border-border bg-muted', className)}>
      <div className="card-media flex h-full flex-col gap-3 p-4 sm:gap-3.5 sm:p-7">
        {dots}
        {v === 0 && (<><div className="h-[28%] bg-block" /><div className="flex flex-1 gap-3.5"><div className="flex-[2] bg-block" /><div className="flex-1 bg-tint" /></div></>)}
        {v === 1 && (<><div className="flex flex-1 gap-3.5"><div className="flex-1 bg-block" /><div className="flex-[2] bg-block" /></div><div className="h-[22%] bg-tint" /></>)}
        {v === 2 && (<><div className="h-[16%] bg-block" /><div className="flex flex-1 gap-3.5"><div className="flex-1 bg-tint" /><div className="flex-1 bg-block" /><div className="flex-1 bg-block" /></div></>)}
        {v === 3 && (<><div className="h-[34%] bg-block" /><div className="flex flex-1 gap-3.5"><div className="flex-[3] bg-block" /><div className="flex-1 bg-tint" /></div></>)}
      </div>
    </div>
  )
}
