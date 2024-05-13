import { type Metadata } from 'next'

import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'
import imageCommercial from '@/images/commercial.jpg'
import { Button } from '@/components/Button'

function Section({
  title,
  image,
  children,
}: {
  title: string
  image: React.ComponentPropsWithoutRef<typeof StylizedImage>
  children: React.ReactNode
}) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Discover() {
  return (
    <Section title="Discover" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
        Every successful project journey begins with a deep dive into understanding your unique business needs and goals. During the discovery phase, we conduct a thorough analysis and audit of your existing systems, processes, and requirements. This allows us to identify key areas and develop a tailored strategy to address them.
        </p>
        <p>
          Once the full audit is complete, we report back with a comprehensive{' '}
          <strong className="font-semibold text-neutral-950">plan</strong> and,
          more importantly, a budget.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>In-depth questionnairy</TagListItem>
        <TagListItem>Audit</TagListItem>
        <TagListItem>Data Analytics</TagListItem>
      </TagList>
    </Section>
  )
}

function Build() {
  return (
    <Section title="Build" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Our development process is rooted in the agile methodology, allowing for flexibility and continuous improvement through regular iterations and feedback loops. This approach ensures that we can adapt swiftly to new insights, changing requirements, or market conditions without losing sight of the ultimate project objectives. Throughout the build phase, we maintain open communication, keeping you informed and involved every step of the way.
        </p>
        <p>
          Each client is assigned a key account manager to keep lines of
          communication open and ensure that all project milestones are met.
        </p>
      </div>

      <Blockquote
        author={{ name: 'Filip Udrescu', role: 'CEO of Stillbag' }}
        className="mt-12"
      >
        Vlah Software House excels in transparent communication. Their team provides regular, comprehensive updates tailored to our needs throughout each project phase. We&#39;re impressed by their commitment to understanding our requirements and delivering solutions that exceed expectations.
      </Blockquote>
    </Section>
  )
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
        In the delivery phase, we ensure a smooth transition from development to deployment. Our team meticulously tests all features across different environments to guarantee robust performance, security, and compatibility. We also handle the infrastructure setup and provide comprehensive training and documentation to ensure a seamless operational transition post-launch.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Testing">
          Our projects always have 100% test coverage, from manual to automation testing.
        </ListItem>
        <ListItem title="Infrastructure">
          Depending of the needs we can provide a cloud infrastructure or deploy on-premises.
        </ListItem>
        <ListItem title="Support">
          We offer ongoing support and maintenance services to ensure that your
          solution remains up-to-date and optimized for long-term success.
        </ListItem>
      </List>
    </Section>
  )
}


function Comercial() {
  return (
    <Section title="Comercial" image={{ src: imageCommercial, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
        Unlike traditional hourly billing models, we operate on an outcomes-based credit system. This approach aligns our goals directly with yours, focusing on delivering tangible value and achieving measurable results. Credits are utilized only upon successful project completion, ensuring our unwavering commitment to your satisfaction and the project&#39;s success.
        </p>
        <h3 className="font-display text-2xl font-medium text-gray-900 [text-wrap:balance] sm:text-3xl">
          Tell us about your project
        </h3>
        <div className="mt-6 flex">
          <Button className='w-full sm:w-64 py-4 text-lg justify-center' href="/contact">
            Describe your project
          </Button>
        </div>
      </div>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>
      <SectionIntro
        eyebrow="Our values"
        title="Performance and Innovation"
      >
        <p>
        At Vlah Software House, we uphold six key pillars that define our dedication to performance and innovation:
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Client-Centric Solutions">
          Every solution we create is meticulously tailored to address the unique challenges and opportunities of our clients, ensuring a perfect fit for their specific needs.
          </GridListItem>
          <GridListItem title="Agility and Flexibility">
            We embrace change and adapt quickly to new information, market shifts, or evolving requirements, always staying ahead of the curve.
          </GridListItem>
          <GridListItem title="Cutting-Edge Technology">
            We leverage the latest technologies, frameworks, and industry best practices to ensure our solutions are modern, efficient, and future-proof.
          </GridListItem>
          <GridListItem title="Creative Problem Solving">
            Our team thrives on solving complex problems with innovative thinking, pushing the boundaries of what&#39;s possible.
          </GridListItem>
          <GridListItem title="Collaboration and Transparency">
            We believe in fostering a collaborative environment with our clients, maintaining open communication and transparent practices throughout the entire project lifecycle.

          </GridListItem>
          <GridListItem title="Sustainability and Scalability">
            Our solutions are designed to be sustainable and scalable, capable of growing and evolving alongside your business needs, ensuring long-term value and return on investment.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default function Process() {
  return (
    <>
      <PageIntro eyebrow="Our process" title="How we work">
        <p>
        At Vlah Software House, we take immense pride in our meticulous approach to software development. Our goal is to consistently deliver exceptional solutions that exceed client expectations. We achieve this through a transparent, agile, and client-tailored process designed to foster a seamless partnership.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Build />
        <Deliver />
        <Comercial />
      </div>

      <Values />

      <ContactSection />
    </>
  )
}
