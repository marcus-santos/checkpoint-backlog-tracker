import { SiteFooter } from '@/components/footer'
import { FAQSection } from '@/features/landing-page/components/faq-section'
import { FeaturesSection } from '@/features/landing-page/components/features-section'
import { GameCarrousel } from '@/features/landing-page/components/game-carrousel'
import { HeroSection } from '@/features/landing-page/components/hero-section'
import { PlatformsSection } from '@/features/landing-page/components/platforms-section'
import { PublicHeader } from '@/features/landing-page/components/public-header'
import { WrappedSection } from '@/features/landing-page/components/wrapped-section'

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader />
      <main>
        <HeroSection />
        <GameCarrousel />
        <FeaturesSection />
        <PlatformsSection />
        <WrappedSection />
        <FAQSection />
      </main>
      <SiteFooter />
    </div>
  )
}
