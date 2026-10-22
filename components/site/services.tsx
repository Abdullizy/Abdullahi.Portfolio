import { services } from '@/lib/data'
import { Reveal } from './reveal'

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="eyebrow">01 &mdash; Services</div>
        <h2 className="serif h-section max-w-[700px] lg:text-right">What I can build <em>for you</em></h2>
      </Reveal>
      <ul className="mt-10 border-t border-foreground sm:mt-16 lg:mt-[72px]">
        {services.map((s, i) => (
          <li key={s.title} className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 border-b border-border py-6 transition-colors hover:bg-muted/60 sm:py-8 lg:grid-cols-[80px_1fr_1fr_40px] lg:items-center lg:gap-x-8 lg:px-2">
            <span className="font-mono text-sm text-primary">0{i + 1}</span>
            <span className="serif text-[26px] sm:text-4xl">{s.title}</span>
            <span className="col-start-2 text-[15px] leading-relaxed text-muted-foreground sm:text-[17px] lg:col-start-auto">{s.text}</span>
            <span aria-hidden className="hidden text-2xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary lg:block lg:text-right">&#8599;</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
