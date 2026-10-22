import Image from 'next/image'
import { about } from '@/lib/data'
import { rich } from '@/lib/rich'
import { Reveal } from './reveal'

export function About() {
  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto grid max-w-[1240px] items-start gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-x-6 lg:px-12">
        <Reveal className="lg:col-span-5">
          <div className="relative h-[340px] overflow-hidden border border-border bg-muted sm:h-[460px] lg:h-[560px]">
            {about.photo ? (
              <Image src={about.photo} alt="Portrait of Abdullahi" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
            ) : (
              <div className="grid h-full place-items-center font-mono text-xs uppercase tracking-[0.06em] text-muted-foreground">[Your portrait]</div>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="eyebrow">04 &mdash; About</div>
          <h2 className="serif mt-5 text-[clamp(2.1rem,1.3rem+2.6vw,3.25rem)] leading-[1.06] sm:mt-6">{rich(about.title)}</h2>
          <p className="mt-6 text-base leading-[1.7] text-muted-foreground sm:text-lg">{about.p1}</p>
          <p className="mt-4 text-base leading-[1.7] text-muted-foreground sm:text-lg">{about.p2}</p>
          <dl className="mt-10 grid gap-x-8 sm:mt-11 sm:grid-cols-2">
            {about.facts.map((f) => (
              <div key={f.label} className="border-t border-border py-4">
                <dt className="label">{f.label}</dt>
                <dd className="mt-2 text-base">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
