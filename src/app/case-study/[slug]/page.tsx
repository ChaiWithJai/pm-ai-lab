import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/shared/PageHeader';
import CTABlock from '@/components/shared/CTABlock';
import FeatureList from '@/components/case-study/FeatureList';
import BuildJourney from '@/components/case-study/BuildJourney';
import { getCaseStudyBySlug, getAllCaseStudySlugs, caseStudiesMeta } from '@/data/case-studies';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return { title: 'Not Found' };
  }

  return {
    title: `${caseStudy.title} | ${caseStudiesMeta.pageTitle} | PM AI Lab`,
    description: caseStudy.subtitle,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f0fdf4]">
      <Header />

      {/* Hero */}
      <div className="pt-14">
        <PageHeader title={caseStudy.title} subtitle={caseStudy.subtitle} badge="Case Study" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        {/* Problem → Solution → Result */}
        <section className="grid gap-6 md:grid-cols-3">
          {/* Problem */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <span className="mb-3 inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
              Problem
            </span>
            <h3 className="mb-2 font-semibold text-gray-800">{caseStudy.problem.headline}</h3>
            <p className="mb-4 text-sm text-gray-600">{caseStudy.problem.description}</p>
            <ul className="space-y-2">
              {caseStudy.problem.painPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-red-700">
                  <span className="mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <span className="mb-3 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              Solution
            </span>
            <h3 className="mb-2 font-semibold text-gray-800">{caseStudy.solution.headline}</h3>
            <p className="mb-4 text-sm text-gray-600">{caseStudy.solution.description}</p>
            <p className="text-xs text-blue-700 italic">{caseStudy.solution.approach}</p>
          </div>

          {/* Result */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-6">
            <span className="mb-3 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
              Result
            </span>
            <h3 className="mb-4 font-semibold text-gray-800">{caseStudy.result.headline}</h3>
            <div className="space-y-3">
              {caseStudy.result.metrics.map((metric, i) => (
                <div key={i}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-600">{metric.value}</span>
                    <span className="text-xs text-gray-600">{metric.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">What it does</h2>
          <p className="mb-6 text-gray-600">{caseStudy.features.length} specialized capabilities</p>
          <FeatureList features={caseStudy.features} />
        </section>

        {/* Build Journey */}
        <section>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">How I built it</h2>
          <p className="mb-6 text-gray-600">4 weeks of learning, failing, and iterating</p>
          <BuildJourney weeks={caseStudy.buildJourney} />
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Tech stack</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {caseStudy.techStack.map((tech, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="mb-1 font-semibold text-gray-800">{tech.name}</h3>
                <p className="mb-2 text-xs text-teal-600">{tech.purpose}</p>
                <p className="text-sm text-gray-600">{tech.whyChosen}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Course connections */}
        <section>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">What you'll learn in the course</h2>
          <p className="mb-6 text-gray-600">The same process I used, taught step by step</p>
          <div className="space-y-3">
            {caseStudy.courseConnections.map((connection, i) => (
              <div key={i} className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-1 font-semibold text-purple-800">{connection.title}</h3>
                    <p className="text-sm text-purple-700">{connection.description}</p>
                  </div>
                  <span className="flex-shrink-0 rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    {connection.weekCovered}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <CTABlock
            variant="gradient"
            primary={{
              text: caseStudy.cta.primary.text,
              href: caseStudy.cta.primary.href,
              description: caseStudy.cta.primary.description,
            }}
            secondary={caseStudy.cta.secondary}
          />
        </section>
      </div>

      <Footer />
    </main>
  );
}
