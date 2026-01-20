"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
        <AccordionContent>
          shadcn/ui is a collection of reusable components built using Radix UI
          and Tailwind CSS. It is not a component library in the traditional
          sense - you own the code and can customize it freely.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes! All components are built on top of Radix UI primitives, which
          provide excellent accessibility out of the box, including proper ARIA
          attributes and keyboard navigation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
        <AccordionContent>
          Absolutely. Since you own the component code, you can modify the
          Tailwind classes, add new variants, or completely redesign components
          to match your brand.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>How do I install components?</AccordionTrigger>
        <AccordionContent>
          Use the CLI command: <code className="bg-muted px-1">npx shadcn@latest add [component]</code>.
          This will copy the component code directly into your project.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
