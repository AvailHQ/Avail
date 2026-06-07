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
        className="relative overflow-hidden sm:min-h-screen"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, #ffffff 30%, #F8F8F6 100%)',
        }}
      >
        <main className="relative z-10 flex flex-col items-center justify-start px-5 pt-20 pb-14 sm:min-h-screen sm:justify-center sm:pt-28 sm:pb-20 wide:pt-32 wide:pb-24" role="main">
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
