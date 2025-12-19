import { MetadataRoute } from 'next';
import { getAllGuideSlugs } from '@/data/action-guides';

const BASE_URL = 'https://pmailab.chaiwithjai.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const timeframeSlugs = getAllGuideSlugs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/challenges`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Action guide pages (/do/[timeframe])
  const actionGuidePages: MetadataRoute.Sitemap = timeframeSlugs.map((slug) => ({
    url: `${BASE_URL}/do/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Case study pages
  const caseStudyPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/case-study/pmm-agent`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...staticPages, ...actionGuidePages, ...caseStudyPages];
}
