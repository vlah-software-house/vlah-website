import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoPhobiaLight from '@/images/clients/phobia/logo-light.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import logoStillbag from '@/images/clients/stillbag/stillbag.png'
import imageLaptop from '@/images/laptop.jpg'
import imageHero from '@/images/hero.png'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'


const clients = [
  ['Stillbag', logoStillbag],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]

function Clients() {
  return (
    <div className="mt-24  bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            We’ve worked with hundreds of amazing people
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Harnessing technology for a brighter future"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We believe technology is the answer to the world’s greatest
          challenges. It’s also the cause, so we find ourselves in bit of a
          catch 22 situation.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="We help you identify, explore and capitalize on new opportunities."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
        Our innovative solutions are tailored to your unique needs, driving growth and success for your business.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[60rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Development">
            We build custom websites, mobile apps for iOS and Android, online stores, and tailor-made software solutions from scratch. We utilize the latest technologies to create powerful digital products that meet your unique business requirements.
            <Link className='block mt-2 text-indigo-500' href="/" title="Discover our Development Services">Discover our Development Services <ArrowTopRightOnSquareIcon className="w-4 h-4 inline-block relative -mt-1" /> </Link>
            </ListItem>
            <ListItem title="Infrastructure / DevOps">
            We provide reliable hosting solutions and proactive maintenance to keep your websites and applications running smoothly. Our DevOps team also sets up automated deployment pipelines, manages cloud infrastructure, and optimizes performance.
            <Link className='block mt-2 text-indigo-500' href="/" title="Level Up Your Infrastructure Capabilities">Level Up Your Infrastructure Capabilities <ArrowTopRightOnSquareIcon className="w-4 h-4 inline-block relative -mt-1" /> </Link>
            </ListItem>
            <ListItem title="Customer Experience / Personalization">
            We help businesses enhance their customer’s entire online journey through strategic personalization, user experience design, and data-driven insights. Our services include user research, customer journey mapping, A/B testing, behavior analysis, and implementing personalized content and product recommendations.
            <Link className='block mt-2 text-indigo-500' href="/" title="Dive Into Tailored Customer Journeys">Dive Into Tailored Customer Journeys <ArrowTopRightOnSquareIcon className="w-4 h-4 inline-block relative -mt-1" /> </Link>
            </ListItem>
            <ListItem title="Digital Marketing">
            Our digital marketing experts utilize a wide array of tactics to increase your online visibility, website traffic, and sales. This includes search engine optimization (SEO), pay-per-click advertising (Google Ads, Facebook Ads), email marketing, content creation, influencer marketing, and more.
            <Link className='block mt-2 text-indigo-500' href="/" title="Explore Digital Marketing Solutions">Explore Digital Marketing Solutions <ArrowTopRightOnSquareIcon className="w-4 h-4 inline-block relative -mt-1" /> </Link>
            </ListItem>
            <ListItem title="Testing">
            To ensure flawless user experiences, our quality assurance team conducts rigorous testing of websites and applications. This covers manual testing across different devices and browsers, as well as automated testing for functionality, performance, security, and accessibility compliance.
            <Link className='block mt-2 text-indigo-500' href="/" title="Learn more about our testing capabilities">Learn more about our testing capabilities <ArrowTopRightOnSquareIcon className="w-4 h-4 inline-block relative -mt-1" /> </Link>
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'We are a development studio working at the intersection of design and technology.',
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <>
      <Container className='border-black border-b-2 '>
        <FadeIn className="max-w-full grid grid-cols-12">
          <div className='pt-10  md:pt-56 col-span-12 md:col-span-8'>
            <div className='flex items-center'>
              <h1 className="min-w-60 sm:min-w-96 font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl md:text-6xl">
              Creative People, Performance-Driven Results
              </h1>
              <Image src={imageHero} alt="alt" className='object-left-top object-cover h-[14rem] sm:h-[26rem] relative -ml-4  md:hidden' />
            </div>
            <p className="-mx-6 md:mt-6 p-6 bg-black md:bg-transparent text-white  text-md md:text-xl md:text-neutral-600">
            Blending creativity with technical expertise, our development studio sits at the crossroads of design and technology. With a performance-driven approach and a marketing team bearing top accreditations, we elevate brands worldwide.
            </p>
          </div>
          <div className='md:col-span-4 hidden md:block'>
            <Image src={imageHero} alt="alt" className=" object-cover" />
          </div>
        </FadeIn>
      </Container>

      <Services />

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: logoPhobiaDark }}
      >
        The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.
      </Testimonial>

      

      <ContactSection />
    </>
  )
}
