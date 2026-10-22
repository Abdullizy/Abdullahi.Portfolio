import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { hero, tools } from '@/lib/data'
import { rich } from '@/lib/rich'

const d = (s: number) => ({ ['--d' as string]: `${s}s` })

export function Hero() {
  return (
    <>
      <section id="top" className="relative mx-auto grid max-w-[1240px] gap-12 px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:grid-cols-12 lg:gap-x-6 lg:px-12 lg:pb-24 lg:pt-44">
        <div className="lg:col-span-8">
          <div className="eyebrow rise" style={d(0)}>{hero.eyebrow}</div>
          <h1 className="serif h-display rise mt-6 sm:mt-7" style={d(0.08)}>{rich(hero.title)}</h1>
          <p className="rise mt-7 max-w-[560px] text-[17px] leading-relaxed text-muted-foreground sm:mt-9 sm:text-xl" style={d(0.18)}>{hero.text}</p>
          <div className="rise mt-9 flex flex-col gap-4 sm:mt-11 sm:flex-row sm:items-center sm:gap-8" style={d(0.28)}>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="#work">See selected work <span aria-hidden>&rarr;</span></Link>
            </Button>
            <Link href="#contact" className="u-link w-fit self-center pb-1 text-base font-medium sm:self-auto">Get in touch</Link>
          </div>
        </div>
        <dl className="rise order-2 self-end lg:order-none lg:col-span-4" style={d(0.38)}>
          {hero.facts.map((f, i, a) => (
            <div key={f.label} className={`flex justify-between gap-4 border-t border-border py-4 ${i === a.length - 1 ? 'border-b' : ''}`}>
              <dt className="label">{f.label}</dt>
              <dd className="text-right text-[15px]">{f.value}</dd>
            </div>
          ))}
        </dl>
        {/* The 3D house starts here and travels down the page to the contact section */}
        <div data-house-start aria-hidden="true" className="pointer-events-none absolute right-3 top-[64px] size-[90px] lg:right-[3%] lg:top-[16%] lg:h-[440px] lg:w-[340px]" />
      </section>

      <div className="border-y border-border" aria-label="Tools I use">
        <ul className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-x-6 gap-y-3 px-5 py-5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground sm:px-8 sm:py-6 sm:text-[13px] lg:px-12">
          {tools.map((t) => (<li key={t}>{t}</li>))}
        </ul>
      </div>
    </>
  )
}
