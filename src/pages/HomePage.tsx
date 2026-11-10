import { HomeHero } from '../sections/HomeHero'
import { ApproachSection, ContactStrip, FeaturedProducts, IndustriesOverview, WhoWeAre } from '../sections/HomeSections'
import { CtaBand } from '../components/CtaBand'
import { useSeo, organizationLd } from '../hooks/useSeo'
import { company } from '../data/company'
import { images } from '../data/images'

export default function HomePage() {
  useSeo({
    title: `${company.brandName} — Specialty Chemical Manufacturer in Tiruppur`,
    description:
      'V.S. TEX CHEM manufactures specialty chemicals in Tiruppur — textile processing chemicals, wetting agents, dye fixing agents, paint dispersing agents and detergent additives.',
    image: images.hero.src,
    jsonLd: organizationLd(),
  })
  return (
    <>
      <HomeHero />
      <WhoWeAre />
      <IndustriesOverview />
      <FeaturedProducts />
      <ApproachSection />
      <CtaBand />
      <ContactStrip />
    </>
  )
}
