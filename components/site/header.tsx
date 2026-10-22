'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'
import { site } from '@/lib/data'

const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const path = usePathname()

  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-colors ${scrolled ? 'border-border' : 'border-transparent'}`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:h-[84px] lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-9 text-[15px] text-muted-foreground lg:flex" aria-label="Main">
          {path.startsWith('/work/') && (
            <Link href="/#work" className="transition-colors hover:text-foreground">
              &larr; All projects
            </Link>
          )}
          {!path.startsWith('/work/') &&
            nav.map((n) => (
              <Link key={n.href} href={n.href} className="transition-colors hover:text-foreground">
                {n.label}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {site.available && (
            <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <i className="block size-2 rounded-full bg-accent" />
              Available for projects
            </span>
          )}
          <Button asChild variant="dark" size="sm">
            <Link href="/#contact">Start a project</Link>
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex h-11 w-11 flex-col items-end justify-center gap-[5px] lg:hidden" aria-label="Open menu">
              <i className="block h-0.5 w-6 bg-foreground" />
              <i className="block h-0.5 w-4 bg-foreground" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">Menu</DialogTitle>
            <DialogDescription className="sr-only">Site navigation</DialogDescription>
            <div className="flex h-16 items-center justify-between px-5">
              <Logo />
              <DialogClose className="grid size-11 place-items-center text-3xl leading-none" aria-label="Close menu">
                &times;
              </DialogClose>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-5 pb-16" aria-label="Mobile">
              {nav.map((n, i) => (
                <DialogClose asChild key={n.href}>
                  <Link href={n.href} className="rise flex items-baseline justify-between border-b border-border py-5 font-serif text-5xl tracking-tight" style={{ ['--d' as string]: `${i * 0.06}s` }}>
                    {n.label}
                    <span className="font-mono text-sm text-primary">0{i + 1}</span>
                  </Link>
                </DialogClose>
              ))}
              <DialogClose asChild>
                <Button asChild size="lg" className="mt-8 w-full">
                  <Link href="/#contact">Start a project &rarr;</Link>
                </Button>
              </DialogClose>
            </nav>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
