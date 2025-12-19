import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/shared/PageHeader';
import ChallengeDirectory from '@/components/ChallengeDirectory';
import ChallengeCarousel from '@/components/ChallengeCarousel';
import FailureRateChart from '@/components/FailureRateChart';
import CTASection from '@/components/CTASection';
import { datasetStats, challenges } from '@/data/challenges';

export const metadata = {
  title: 'AI Failure Patterns | PM AI Lab',
  description: `We analyzed ${datasetStats.totalQuestions.toLocaleString()} AI outputs and found ${datasetStats.totalChallenges.toLocaleString()} failure patterns. Browse the directory.`,
};

// Get top challenges by failure rate for featured carousel
const featuredChallenges = [...challenges]
  .sort((a, b) => b.aiFailureRate - a.aiFailureRate)
  .slice(0, 8);

export default function ChallengesPage() {
  return (
    <main className="min-h-screen bg-[#f0fdf4]">
      <Header />

      {/* Hero */}
      <div className="pt-14">
        <PageHeader
          title="Where AI Fails PMs"
          subtitle={`We analyzed ${datasetStats.totalQuestions.toLocaleString()} AI outputs. Here's what went wrong.`}
          intro="Each card shows a real failure pattern: what AI says, why it's wrong, and how to prompt better."
          badge="The Directory"
        />
      </div>

      {/* Featured Carousel */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ChallengeCarousel
            challenges={featuredChallenges}
            title="Highest Failure Rates"
            showViewAll={true}
          />
        </div>
      </section>

      {/* Challenge Directory */}
      <div id="all-challenges">
        <ChallengeDirectory />
      </div>

      {/* Data Section */}
      <div id="data">
        <FailureRateChart />
      </div>

      {/* CTA */}
      <CTASection />

      <Footer />
    </main>
  );
}
