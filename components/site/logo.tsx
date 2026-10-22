import Link from 'next/link'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" aria-label="Abdullahi, home" className={`flex items-center gap-2 font-serif text-2xl tracking-tight sm:gap-2.5 sm:text-[28px] ${className}`}>
      abdullahi
      <span className="mt-2 block size-[7px] bg-accent sm:mt-2.5 sm:size-2" />
    </Link>
  )
}
