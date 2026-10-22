import { site } from '@/lib/data'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <span className="order-2 md:order-1">
          &copy; {new Date().getFullYear()} {site.name}. {site.role}.
        </span>
        <span className="order-1 flex flex-wrap gap-x-7 gap-y-2 md:order-2">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
              {s.label}
            </a>
          ))}
        </span>
      </div>
    </footer>
  )
}
