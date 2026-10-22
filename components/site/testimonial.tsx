import { testimonial } from '@/lib/data'
import { Reveal } from './reveal'

export function Testimonial() {
  const initials = testimonial.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <section className="border-t border-border bg-muted/70">
      <div className="mx-auto grid max-w-[1240px] gap-6 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-x-6 lg:px-12">
        <div className="eyebrow lg:col-span-3">05 &mdash; Kind words</div>
        <Reveal className="lg:col-span-9">
          <blockquote className="serif text-[clamp(1.75rem,1.1rem+2.2vw,2.9rem)] leading-[1.18] tracking-[-0.02em]">&ldquo;{testimonial.quote}&rdquo;</blockquote>
          <div className="mt-8 flex items-center gap-4 sm:mt-9">
            <span className="grid size-11 place-items-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground sm:size-12">{initials}</span>
            <span className="text-[15px] leading-snug">
              <strong className="block font-semibold">{testimonial.name}</strong>
              <span className="text-muted-foreground">{testimonial.role}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
