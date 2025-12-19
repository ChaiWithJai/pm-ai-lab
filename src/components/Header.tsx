'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ExternalLink, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [doDropdownOpen, setDoDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinkClass = (path: string) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive(path)
        ? 'bg-teal-100 text-teal-700'
        : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
    }`;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-teal-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🦜</span>
            <span className="font-bold text-gray-800">PM AI Lab</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* What To Do dropdown */}
            <div className="relative">
              <button
                onClick={() => setDoDropdownOpen(!doDropdownOpen)}
                onBlur={() => setTimeout(() => setDoDropdownOpen(false), 150)}
                className={`${navLinkClass('/do')} flex items-center gap-1`}
              >
                What To Do
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${doDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {doDropdownOpen && (
                <div className="absolute top-full left-0 z-50 mt-1 w-48 rounded-xl border border-teal-100 bg-white py-2 shadow-lg">
                  <Link
                    href="/do/today"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                  >
                    Today (15 min)
                  </Link>
                  <Link
                    href="/do/this-week"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                  >
                    This Week
                  </Link>
                  <Link
                    href="/do/this-month"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                  >
                    This Month
                  </Link>
                  <Link
                    href="/do/this-quarter"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                  >
                    This Quarter
                  </Link>
                  <Link
                    href="/do/long-game"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                  >
                    3-7 Years
                  </Link>
                </div>
              )}
            </div>

            <Link href="/story" className={navLinkClass('/story')}>
              Story
            </Link>
            <Link href="/challenges" className={navLinkClass('/challenges')}>
              Challenges
            </Link>
            <Link href="/case-study/pmm-agent" className={navLinkClass('/case-study')}>
              Case Study
            </Link>
            <a
              href="https://chaiwithjai.com/course"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-1 rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
            >
              Course
              <ExternalLink className="h-3 w-3" />
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-teal-50 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-teal-100 bg-white md:hidden">
          <nav className="space-y-1 px-4 py-3">
            {/* What To Do section */}
            <div className="mb-2 border-b border-gray-100 pb-2">
              <span className="block px-4 py-1 text-xs tracking-wider text-gray-400 uppercase">
                What To Do
              </span>
              <Link
                href="/do/today"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
              >
                Today
              </Link>
              <Link
                href="/do/this-week"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
              >
                This Week
              </Link>
              <Link
                href="/do/this-month"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
              >
                This Month
              </Link>
              <Link
                href="/do/this-quarter"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
              >
                This Quarter
              </Link>
              <Link
                href="/do/long-game"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
              >
                3-7 Years
              </Link>
            </div>

            <Link
              href="/story"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
            >
              Story
            </Link>
            <Link
              href="/challenges"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
            >
              Challenges
            </Link>
            <Link
              href="/case-study/pmm-agent"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
            >
              Case Study
            </Link>
            <a
              href="https://chaiwithjai.com/course"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-full bg-teal-500 px-4 py-2 text-center text-white"
            >
              Course
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
