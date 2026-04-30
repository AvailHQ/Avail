import HeroCopy from '../components/HeroCopy'
import DeviceMockup from '../components/DeviceMockup'
import ProblemSection from '../components/ProblemSection'
import SolutionSection from '../components/SolutionSection'
import TeamSection from '../components/TeamSection'
import FAQSection from '../components/FAQSection'

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <div
        className="relative min-h-screen"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, #ffffff 30%, #F8F8F6 100%)',
        }}
      >
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-24 pb-0 wide:pt-28 wide:pb-10" role="main">
          <div className="text-center px-6 mb-14 max-w-[980px] wide:max-w-[1180px] wide:mb-16">
            <HeroCopy />
          </div>
          <DeviceMockup />
        </main>
      </div>

      {/* ─── Problem ──────────────────────────────────────── */}
      <ProblemSection />

      {/* ─── Solution ─────────────────────────────────────── */}
      <SolutionSection />

      {/* ─── Team ─────────────────────────────────────────── */}
      <TeamSection />

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <FAQSection />
    </>
  )
}
