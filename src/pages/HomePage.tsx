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
        className="relative"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, #ffffff 30%, #F8F8F6 100%)',
        }}
      >
        <main className="relative z-10 flex flex-col items-center pt-24 pb-0" role="main">
          <div className="text-center px-6 mb-14 max-w-[980px]">
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
