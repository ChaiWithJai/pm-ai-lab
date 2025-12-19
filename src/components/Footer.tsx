'use client';

import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import ParrotMascot from './ParrotMascot';

export default function Footer() {
  return (
    <footer className="border-t border-teal-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <ParrotMascot size="sm" className="!h-10 !w-10" />
              <span className="text-xl font-bold text-gray-800">PM AI Lab</span>
            </div>
            <p className="mb-4 max-w-sm text-sm text-gray-600">
              Helping PMs and Designers understand where AI fails — and how to fix it. Built with
              data from 14,208 real AI interactions.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com/chaiwithjai"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-teal-50 p-2 text-teal-600 transition-colors hover:bg-teal-100 hover:text-teal-700"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/jaibhagat"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-teal-50 p-2 text-teal-600 transition-colors hover:bg-teal-100 hover:text-teal-700"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/chaiwithjai"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-teal-50 p-2 text-teal-600 transition-colors hover:bg-teal-100 hover:text-teal-700"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:jai@chaiwithjai.com"
                className="rounded-lg bg-teal-50 p-2 text-teal-600 transition-colors hover:bg-teal-100 hover:text-teal-700"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-800">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#challenges"
                  className="text-sm text-gray-600 transition-colors hover:text-teal-600"
                >
                  Challenge Directory
                </a>
              </li>
              <li>
                <a
                  href="#data"
                  className="text-sm text-gray-600 transition-colors hover:text-teal-600"
                >
                  The Data
                </a>
              </li>
              <li>
                <a
                  href="https://chaiwithjai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 transition-colors hover:text-teal-600"
                >
                  Free Courses
                </a>
              </li>
              <li>
                <a
                  href="https://chaiwithjai.com/newsletter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 transition-colors hover:text-teal-600"
                >
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-800">Data Sources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://huggingface.co/datasets/Anthropic/AnthropicInterviewer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 transition-colors hover:text-teal-600"
                >
                  Anthropic Interviewer
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/datasets/nicolesarvasicosta/product-catalyst-dataset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 transition-colors hover:text-teal-600"
                >
                  Product Catalyst
                </a>
              </li>
              <li>
                <a
                  href="https://www.producttalk.org/interview-coach-evals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 transition-colors hover:text-teal-600"
                >
                  Product Talk Evals
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-teal-100 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Chai with Jai. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">Made with ☕ and Claude</p>
        </div>
      </div>
    </footer>
  );
}
