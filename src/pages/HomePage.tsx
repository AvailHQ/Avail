import HeroCopy from '../components/HeroCopy'
import HeroImageMarquee from '../components/HeroImageMarquee'
import SolutionSection from '../components/SolutionSection'
import WhoItsForSection from '../components/WhoItsForSection'
import ProofSection from '../components/ProofSection'
import CompetitionSection from '../components/CompetitionSection'
import FAQSection from '../components/FAQSection'
import PilotTestimonialSection from '../components/PilotTestimonialSection'

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, #ffffff 30%, #F8F8F6 100%)',
        }}
      >
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-24 pb-20 wide:pt-28 wide:pb-24" role="main">
          <div className="relative z-10 text-center px-6 max-w-[980px] wide:max-w-[1180px]">
            <HeroCopy />
          </div>
          <HeroImageMarquee />
        </main>
      </div>

      {/* ─── Who It's For ─────────────────────────────────── */}
      <WhoItsForSection />

      {/* ─── Proof ────────────────────────────────────────── */}
      <ProofSection />

      {/* ─── Solution ─────────────────────────────────────── */}
      <SolutionSection />

      {/* ─── Competition ──────────────────────────────────── */}
      <CompetitionSection />

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <FAQSection />

      {/* ─── Pilot CTA + Testimonials ─────────────────────── */}
      <PilotTestimonialSection />
    </>
  )
}
