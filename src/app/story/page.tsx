import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/shared/PageHeader';
import CTABlock from '@/components/shared/CTABlock';
import Timeline from '@/components/story/Timeline';
import MentorCards from '@/components/story/MentorCards';
import RLDiagram from '@/components/story/RLDiagram';
import TransformationCard from '@/components/story/TransformationCard';
import {
  storyPageContent,
  storyMeta,
  timeline,
  mentors,
  transformationStages,
} from '@/data/jai-story';

export const metadata = {
  title: "Jai's Story | PM AI Lab",
  description: storyMeta.subheadline,
};

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#f0fdf4]">
      <Header />

      {/* Hero */}
      <div className="pt-14">
        <PageHeader
          title={storyPageContent.hero.title}
          subtitle={storyPageContent.hero.subtitle}
          intro={storyMeta.hook}
          badge="The Story"
        />
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-4xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        {/* Journey Timeline */}
        <section>
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              {storyPageContent.sections[0].title}
            </h2>
            <p className="text-gray-600">{storyPageContent.sections[0].intro}</p>
          </div>
          <Timeline events={timeline} />
        </section>

        {/* Mentors */}
        <section>
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              {storyPageContent.sections[1].title}
            </h2>
            <p className="text-gray-600">{storyPageContent.sections[1].intro}</p>
          </div>
          <MentorCards mentors={mentors} />
        </section>

        {/* RL Diagram */}
        <section>
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              {storyPageContent.sections[2].title}
            </h2>
            <p className="text-gray-600">{storyPageContent.sections[2].intro}</p>
          </div>
          <RLDiagram />
        </section>

        {/* Transformation */}
        <section>
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              {storyPageContent.sections[3].title}
            </h2>
            <p className="text-gray-600">{storyPageContent.sections[3].intro}</p>
          </div>
          <TransformationCard stages={transformationStages} />
        </section>

        {/* CTA */}
        <section>
          <CTABlock
            variant="gradient"
            primary={{
              text: storyPageContent.cta.primary.text,
              href: storyPageContent.cta.primary.href,
              description: storyPageContent.cta.primary.description,
            }}
            secondary={{
              text: storyPageContent.cta.secondary.text,
              href: storyPageContent.cta.secondary.href,
            }}
          />
        </section>
      </div>

      <Footer />
    </main>
  );
}
