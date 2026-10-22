import { Hero } from '@/components/site/hero'
import { Services } from '@/components/site/services'
import { Work } from '@/components/site/work'
import { Process } from '@/components/site/process'
import { About } from '@/components/site/about'
import { Testimonial } from '@/components/site/testimonial'
import { Contact } from '@/components/site/contact'
import { ModelHouse } from '@/components/site/model-house'

export default function Home() {
  return (
    <>
      <ModelHouse />
      <Hero />
      <Services />
      <Work />
      <Process />
      <About />
      <Testimonial />
      <Contact />
    </>
  )
}
