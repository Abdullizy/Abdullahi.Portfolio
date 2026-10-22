'use client'
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetTitle = DialogPrimitive.Title

function SheetContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-fg/30 data-[state=closed]:animate-[fade-out_.2s_ease_forwards] data-[state=open]:animate-[fade-in_.2s_ease]" />
      <DialogPrimitive.Content
        aria-describedby={undefined}
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-white p-6 shadow-2xl outline-none data-[state=closed]:animate-[sheet-out_.25s_ease_forwards] data-[state=open]:animate-[sheet-in_.3s_cubic-bezier(.2,.7,.2,1)]',
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle }
