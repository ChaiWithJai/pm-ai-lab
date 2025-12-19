'use client';

import { ArrowRight } from 'lucide-react';
import ParrotMascot from './ParrotMascot';

export default function CTASection() {
  return (
    <section className="bg-[#f0fdf4] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="header-gradient relative overflow-hidden rounded-3xl p-8 text-center text-white md:p-12">
          {/* Decorative parrot */}
          <div className="absolute -right-8 -bottom-8 opacity-20">
            <ParrotMascot size="xl" />
          </div>

          <div className="relative z-10">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Stop getting bad AI advice.</h2>

            <p className="mx-auto mb-8 max-w-xl text-white/90">
              This directory shows the problems. Our free course teaches you how to prompt AI so it
              gives you expert-level PM guidance every time.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://chaiwithjai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-teal-700 transition-colors hover:bg-gray-100"
              >
                Take the free course
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://chaiwithjai.com/newsletter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/30"
              >
                Get weekly PM+AI tips
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
