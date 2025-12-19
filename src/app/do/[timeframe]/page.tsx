import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/shared/PageHeader';
import CTABlock from '@/components/shared/CTABlock';
import ActionCard from '@/components/action-guides/ActionCard';
import TimeHorizonNav from '@/components/action-guides/TimeHorizonNav';
import { getGuideBySlug, getAllGuideSlugs } from '@/data/action-guides';

interface PageProps {
  params: Promise<{ timeframe: string }>;
}

// Generate static paths
export async function generateStaticParams() {
  const slugs = getAllGuideSlugs();
  return slugs.map((timeframe) => ({ timeframe }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { timeframe } = await params;
  const guide = getGuideBySlug(timeframe);

  if (!guide) {
    return { title: 'Not Found' };
  }

  return {
    title: `${guide.headline} | PM AI Lab`,
    description: guide.subheadline,
  };
}

export default async function ActionGuidePage({ params }: PageProps) {
  const { timeframe } = await params;
  const guide = getGuideBySlug(timeframe);

  if (!guide) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f0fdf4]">
      <Header />

      {/* Hero */}
      <div className="pt-14">
        <PageHeader
          title={guide.headline}
          subtitle={guide.subheadline}
          intro={guide.intro}
          badge={`What to do ${guide.id === 'long-game' ? 'in the' : ''} ${guide.id.replace('-', ' ')}`}
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Time horizon navigation */}
        <div className="mb-8">
          <TimeHorizonNav current={guide.id} />
        </div>

        {/* Mindset callout */}
        <div className="mb-8 rounded-xl border border-purple-200 bg-purple-50 p-6">
          <h2 className="mb-2 font-semibold text-purple-800">Mindset for this phase</h2>
          <p className="text-purple-700">{guide.mindset}</p>
        </div>

        {/* Actions */}
        <div className="mb-12 space-y-6">
          {guide.actions.map((action, index) => (
            <ActionCard key={action.id} action={action} index={index} />
          ))}
        </div>

        {/* Navigation between horizons */}
        <div className="mb-8 flex items-center justify-between border-t border-teal-200 py-6">
          {guide.prev ? (
            <a
              href={`/do/${guide.prev}`}
              className="text-sm text-gray-500 transition-colors hover:text-teal-600"
            >
              ← Previous: {guide.prev.replace('-', ' ')}
            </a>
          ) : (
            <span />
          )}
          {guide.next ? (
            <a
              href={`/do/${guide.next}`}
              className="text-sm text-gray-500 transition-colors hover:text-teal-600"
            >
              Next: {guide.next.replace('-', ' ')} →
            </a>
          ) : (
            <span />
          )}
        </div>

        {/* CTA */}
        <CTABlock
          variant="gradient"
          primary={{
            text: guide.cta.primary.text,
            href: guide.cta.primary.href,
            description: guide.cta.primary.description,
          }}
          secondary={guide.cta.secondary}
        />
      </div>

      <Footer />
    </main>
  );
}
