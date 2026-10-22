'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input, Label, Textarea } from '@/components/ui/input'
import { site } from '@/lib/data'
import { Reveal } from './reveal'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [status, setStatus] = React.useState<Status>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    // No Formspree URL yet: open the visitor's email app with the message filled in.
    if (!site.formEndpoint) {
      const body = `${data.message}\n\n${data.name} (${data.email})`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('failed')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-x-6 lg:px-12 lg:py-32">
        <Reveal className="lg:col-span-5">
          <div className="eyebrow">06 &mdash; Contact</div>
          <h2 className="serif mt-5 text-[clamp(2.75rem,1rem+3.6vw,4.25rem)] leading-none sm:mt-6">Let&rsquo;s build something <em>dependable.</em></h2>
          <a href={`mailto:${site.email}`} className="u-link mt-9 inline-block break-all pb-1.5 text-xl font-medium sm:mt-11 sm:text-2xl">{site.email}</a>
          {site.whatsapp && (
            <div className="mt-5 text-base text-muted-foreground">
              or message me on{' '}
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="u-link font-medium text-foreground">WhatsApp</a>{' '}
              for a faster reply
            </div>
          )}
        </Reveal>

        <div data-house-end aria-hidden="true" className="order-last h-[210px] self-center lg:order-none sm:h-[320px] lg:col-span-3 lg:h-[420px]" />

        <Reveal delay={0.1} className="relative z-10 lg:col-span-4">
          <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
            <Label>Name<Input name="name" required placeholder="Your name" autoComplete="name" /></Label>
            <Label>Email<Input name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></Label>
            <Label>Project<Textarea name="message" required placeholder="Tell me what you need" /></Label>
            <Button type="submit" size="lg" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</Button>
            <p role="status" className="min-h-5 text-sm">
              {status === 'sent' && <span className="text-primary">Thank you, your message is in. I will reply within 24 hours.</span>}
              {status === 'error' && <span className="text-red-600">Something went wrong. Please email me directly instead.</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
