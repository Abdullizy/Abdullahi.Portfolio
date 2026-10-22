import { steps } from '@/lib/data'
import { Reveal } from './reveal'

export function Process() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Reveal>
          <div className="eyebrow">03 &mdash; Process</div>
          <h2 className="serif h-section mt-5 max-w-[760px] sm:mt-6">Simple, <em>predictable</em> steps from idea to launch</h2>
        </Reveal>
        <ol className="mt-10 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:mt-[72px] lg:grid-cols-4 lg:gap-x-8">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.08} className="h-full border-t border-foreground pt-5 sm:pt-6">
                <div className="flex gap-5 sm:block">
                  <div className="serif text-[40px] leading-none text-primary sm:text-6xl">0{i + 1}</div>
                  <div>
                    <div className="text-lg font-medium sm:mt-6 sm:text-xl">{s.title}</div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground sm:mt-2.5 sm:text-base">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
