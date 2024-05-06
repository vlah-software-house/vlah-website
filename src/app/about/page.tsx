import { type Metadata } from 'next'
import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import imageSam from '@/images/team/sam.jpeg'
import imageDragos from '@/images/team/dragos.jpeg'
import imageHector from '@/images/team/hector.jpeg'
import imageAlex from '@/images/team/alex.jpeg'
import imageAndrei from '@/images/team/andrei.jpeg'
import imageMadalin from '@/images/team/madalin.jpeg'
import imageGMadalin from '@/images/team/gmadalin.jpg'
import imageMihai from '@/images/team/mihai.jpeg'
import imageLoredana from '@/images/team/loredana.jpeg'
import { loadArticles } from '@/lib/mdx'

function Culture() {
  return (
    <div className="mt-24  bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our Core Values"
        title="We are committed of doing things differently and focusing on performance."
        invert
      >
        <p>
        Our strength comes from our collaborative approach, where open communication is key. We are a tight-knit group that shares these core values:
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Loyalty & Trust" invert>
            We cultivate an environment of unwavering loyalty and trust among our team members and with our clients.
          </GridListItem>
          <GridListItem title="Passion for our work" invert>
            Our genuine passion for technology and software development fuels our drive for excellence.
          </GridListItem>
          <GridListItem title="Performance" invert>
            Committed to delivering high-performance, high-quality solutions through our expertise and dedication.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Petre Dragos Vilcu',
        role: 'Co-Founder / CEO',
        image: { src: imageDragos },
      },
      {
        name: 'Madalin Ignisca',
        role: 'Co-Founder / CTO',
        image: { src: imageMadalin },
      },
      {
        name: 'Madalon Ghita',
        role: 'Partner & Marketing Director',
        image: { src: imageGMadalin },
      },
    ],
  },
  {
    title: 'Development',
    people: [
      {
        name: 'Sam Anglin',
        role: 'PHP | Laravel developer',
        image: { src: imageSam },
      },
      {
        name: 'Héctor Hernández',
        role: 'Senior Software Developer',
        image: { src: imageHector },
      },
      {
        name: 'Alex Popa',
        role: 'Senior FrontEnd Developer',
        image: { src: imageAlex },
      },
      {
        name: 'Andrei Samoila',
        role: 'Software Developer',
        image: { src: imageAndrei },
      },
    ],
  },
  {
    title: 'UX & Design',
    people: [
      {
        name: 'Mihai Baldean',
        role: 'UX/UI Designer',
        image: { src: imageMihai },
      },
      {
        name: 'Loredana Papp-Dinea',
        role: 'Design Visionary',
        image: { src: imageLoredana },
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
      <h2  className="mt-12 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">The Team</h2>
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <>
      <PageIntro eyebrow="About us" title="Our strength is collaboration">
        <p>
        We believe that the strength of our company lies in our collaborative approach and open communication.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Our story began in 2018 when two friends, Dragos and Madalin, who met in Gibraltar and shared a passion for technology. What began as a hobby quickly evolved into a thriving software company as more talented individuals joined our team.
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">Our Culture</h2>
              <p>We foster a culture that strikes a balance between pursuing our passion for technology and maintaining a healthy life outside of work. While we are dedicated professionals, we are also a family that supports one another.</p>

              <h2  className="mt-12 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">Our Approach</h2>
              <p>True excellence is achieved through teamwork, knowledge-sharing, and creative problem-solving. We embrace innovation and continuous improvement to stay ahead of the curve. Our goal is to provide exceptional software solutions that exceed client expectations through our expertise and commitment to quality.</p>
        </div>
      </PageIntro>

      <Culture />

      <Team />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={blogArticles}
      />

      <ContactSection />
    </>
  )
}
