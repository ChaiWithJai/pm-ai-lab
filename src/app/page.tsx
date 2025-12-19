import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParrotMascot from '@/components/ParrotMascot';
import { datasetStats } from '@/data/challenges';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0fdf4]">
      <Header />

      {/* Crown Jewel Hero - Primary CTA + Secondary Links */}
      <section className="pt-14">
        <div className="header-gradient text-white">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="text-center">
              {/* Logo */}
              <div className="mb-8 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <span className="text-3xl">🦜</span>
                </div>
                <span className="text-2xl font-bold">PM AI Lab</span>
              </div>

              {/* Headline */}
              <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                You've seen the AI problem.
                <br />
                <span className="text-white/90">Here's what to do about it.</span>
              </h1>

              {/* Primary CTA - The ONE action */}
              <div className="mb-6">
                <Link
                  href="/do/today"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-teal-700 transition-all hover:bg-gray-100 hover:shadow-lg"
                >
                  <span>Start with one action</span>
                  <span className="text-sm font-normal text-teal-600">15 minutes</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Secondary links */}
              <p className="mb-8 text-white/70">
                Or explore:{' '}
                <Link
                  href="/story"
                  className="text-white/90 underline underline-offset-2 transition-colors hover:text-white"
                >
                  My story
                </Link>{' '}
                &bull;{' '}
                <Link
                  href="/challenges"
                  className="text-white/90 underline underline-offset-2 transition-colors hover:text-white"
                >
                  The problems
                </Link>
              </p>

              {/* Lightning Lesson callout - more prominent */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                <span className="text-sm text-white/80">
                  Post-Lightning Lesson? You're in the right place.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Emotional stats bar */}
        <div className="border-b border-teal-100 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 lg:px-8">
            <p className="text-center text-gray-700">
              <strong className="text-teal-600">
                {datasetStats.totalQuestions.toLocaleString()}
              </strong>{' '}
              times AI gave bad PM advice
              <span className="text-gray-500"> — and what to do instead</span>
            </p>
          </div>
        </div>
      </section>

      {/* Time horizons preview */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">What to do, when</h2>
            <p className="text-gray-600">
              Action guides organized by time horizon. Start anywhere.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            {[
              { label: 'Today', time: '15 min', href: '/do/today', icon: '1' },
              { label: 'This Week', time: '2 hrs', href: '/do/this-week', icon: '7' },
              { label: 'This Month', time: '8 hrs', href: '/do/this-month', icon: '30' },
              { label: 'This Quarter', time: '20 hrs', href: '/do/this-quarter', icon: '90' },
              { label: '3-7 Years', time: 'Ongoing', href: '/do/long-game', icon: '+' },
            ].map((horizon) => (
              <a
                key={horizon.label}
                href={horizon.href}
                className="group rounded-xl border border-teal-100 bg-[#f0fdf4] p-4 text-center transition-colors hover:border-teal-300 hover:bg-teal-100"
              >
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white transition-transform group-hover:scale-110">
                  {horizon.icon}
                </div>
                <div className="text-sm font-medium text-gray-800">{horizon.label}</div>
                <div className="text-xs text-gray-500">{horizon.time}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case study teaser */}
      <section className="bg-[#f0fdf4] py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border-2 border-teal-100 bg-white">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <span className="mb-4 inline-block rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                  Case Study
                </span>
                <h3 className="mb-2 text-xl font-bold text-gray-800">See what you can build</h3>
                <p className="mb-4 text-gray-600">
                  I built an AI agent that evaluates PMM positioning using April Dunford's
                  framework. Here's the 4-week journey.
                </p>
                <Link
                  href="/case-study/pmm-agent"
                  className="inline-flex items-center gap-2 font-medium text-teal-600 transition-colors hover:text-teal-700"
                >
                  Read the case study →
                </Link>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-purple-100 to-teal-100 p-8">
                <div className="text-center">
                  <div className="mb-4 text-6xl">🤖</div>
                  <div className="text-sm text-gray-600">PMM Deep Agent</div>
                  <div className="text-xs text-gray-500">Built in 4 weeks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="header-gradient relative overflow-hidden rounded-3xl p-8 text-center text-white md:p-12">
            {/* Decorative parrot */}
            <div className="absolute -right-8 -bottom-8 opacity-20">
              <ParrotMascot size="xl" />
            </div>

            <div className="relative z-10">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                Ready to build your own AI agent?
              </h2>

              <p className="mx-auto mb-8 max-w-xl text-white/90">
                The flagship course teaches you to build agents like the PMM Deep Agent. Hands-on,
                not theory. You'll ship something real.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="https://chaiwithjai.com/course"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-teal-700 transition-colors hover:bg-gray-100"
                >
                  Learn about the course
                  <span>→</span>
                </a>
                <Link
                  href="/do/today"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/30"
                >
                  Start with one action
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
