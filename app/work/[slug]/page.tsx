import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Preview } from '@/components/site/preview'
import { Reveal } from '@/components/site/reveal'
import { projects } from '@/lib/data'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = projects.find((x) => x.slug === slug)
  return p ? { title: p.title, description: p.summary } : {}
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const i = projects.findIndex((x) => x.slug === slug)
  if (i < 0) notFound()
  const p = projects[i]
  const next = projects[(i + 1) % projects.length]

  const meta = [
    { label: 'Client', value: p.client },
    { label: 'Role', value: p.role },
    { label: 'Stack', value: p.stack },
    { label: 'Year', value: p.year },
  ]

  return (
    <article>
      <section className="mx-auto max-w-[1240px] px-5 pb-10 pt-28 sm:px-8 sm:pt-36 lg:px-12 lg:pb-14 lg:pt-44">
        <div className="eyebrow rise">Project {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} &mdash; {p.kind}</div>
        <h1 className="serif rise mt-5 max-w-[1000px] text-[clamp(2.75rem,1rem+6.5vw,6rem)] leading-[0.98] sm:mt-7" style={{ ['--d' as string]: '0.08s' }}>{p.title}</h1>
        <p className="rise mt-6 max-w-[640px] text-lg leading-relaxed text-muted-foreground sm:mt-8 sm:text-xl" style={{ ['--d' as string]: '0.16s' }}>{p.summary}</p>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
        <dl className="grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-4 lg:gap-x-8">
          {meta.map((m) => (
            <div key={m.label} className="border-t border-foreground pt-3.5 lg:pt-4">
              <dt className="label">{m.label}</dt>
              <dd className="mt-2 text-[15px] lg:text-[17px]">{m.value}</dd>
            </div>
          ))}
        </dl>
        {p.liveUrl && (
          <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
            <a href={p.liveUrl} target="_blank" rel="noreferrer">Visit live site <span aria-hidden>&#8599;</span></a>
          </Button>
        )}
      </section>

      <section className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <Preview project={p} index={i} priority sizes="(min-width:1240px) 1144px, 92vw" className="h-[300px] w-full sm:h-[460px] lg:h-[640px]" />
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-5 px-5 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-12 lg:gap-x-6 lg:px-12 lg:pt-28">
        <div className="eyebrow lg:col-span-3">The challenge</div>
        <Reveal className="lg:col-span-8">
          <p className="serif text-[clamp(1.6rem,1rem+1.8vw,2.4rem)] leading-[1.2] tracking-[-0.02em]">{p.challenge}</p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-5 px-5 pt-12 sm:px-8 sm:pt-[72px] lg:grid-cols-12 lg:gap-x-6 lg:px-12">
        <div className="eyebrow lg:col-span-3">The approach</div>
        <Reveal className="space-y-4 lg:col-span-6">
          {p.approach.map((t, k) => (
            <p key={k} className="text-base leading-[1.7] text-muted-foreground sm:text-lg">{t}</p>
          ))}
        </Reveal>
      </section>

      {p.gallery.length > 0 && (
        <section className="mx-auto grid max-w-[1240px] gap-5 px-5 pt-16 sm:px-8 sm:pt-24 md:grid-cols-2 lg:gap-6 lg:px-12">
          {p.gallery.map((src, k) => (
            <div key={src} className={`relative h-[260px] overflow-hidden border border-border bg-muted sm:h-[380px] lg:h-[420px] ${p.gallery.length % 2 === 1 && k === p.gallery.length - 1 ? 'md:col-span-2' : ''}`}>
              <Image src={src} alt={`${p.title} screenshot ${k + 2}`} fill sizes="(min-width:768px) 560px, 92vw" className="object-cover object-top" />
            </div>
          ))}
        </section>
      )}

      <section className="mx-auto max-w-[1240px] px-5 pt-16 sm:px-8 sm:pt-28 lg:px-12">
        <div className="eyebrow">The result</div>
        <div className="mt-6 grid gap-6 sm:mt-9 sm:grid-cols-3 sm:gap-x-8">
          {p.results.map((r) => (
            <Reveal key={r.label} className="border-t border-foreground pt-4 sm:pt-6">
              <div className="serif text-6xl leading-none text-primary sm:text-7xl lg:text-[84px]">{r.value}</div>
              <div className="mt-3 text-[15px] text-muted-foreground sm:text-base">{r.label}</div>
            </Reveal>
          ))}
        </div>
        {p.quote && (
          <Reveal className="mt-12 border border-border bg-muted p-7 sm:mt-[72px] sm:p-10">
            <p className="serif text-[22px] leading-[1.28] tracking-[-0.02em] sm:text-3xl">&ldquo;{p.quote.text}&rdquo;</p>
            <div className="mt-4 text-sm text-muted-foreground">{p.quote.by}</div>
          </Reveal>
        )}
      </section>

      <Link href={`/work/${next.slug}`} className="group mt-16 block border-t border-foreground sm:mt-28">
        <div className="mx-auto flex max-w-[1240px] items-end justify-between gap-6 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div>
            <div className="label">Next project</div>
            <div className="serif mt-3 text-[40px] leading-none sm:mt-4 sm:text-7xl lg:text-[80px]">{next.title}</div>
          </div>
          <span aria-hidden className="grid size-[52px] shrink-0 place-items-center bg-primary text-[22px] text-primary-foreground transition-transform duration-300 group-hover:translate-x-1 sm:size-[72px] sm:text-3xl">&rarr;</span>
        </div>
      </Link>

      <section className="border-t border-border bg-muted">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 py-12 sm:px-8 sm:py-[72px] lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <h2 className="serif text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] leading-[1.05] tracking-[-0.025em]">Want a site like this? <em>Let&rsquo;s talk.</em></h2>
          <Button asChild size="lg" className="w-full lg:w-auto">
            <Link href="/#contact">Start a project &rarr;</Link>
          </Button>
        </div>
      </section>
    </article>
  )
}
