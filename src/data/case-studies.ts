// Case Studies Data Store
// Shows what students can build in the flagship course
// Powers the /case-study/[slug] pages

export interface CaseStudyFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  benefit: string;
}

export interface BuildWeek {
  week: number;
  title: string;
  goal: string;
  learned: string[];
  challenge: string;
  breakthrough: string;
}

export interface TechStackItem {
  name: string;
  purpose: string;
  whyChosen: string;
}

export interface CourseConnection {
  title: string;
  description: string;
  weekCovered: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  problem: {
    headline: string;
    description: string;
    painPoints: string[];
  };
  solution: {
    headline: string;
    description: string;
    approach: string;
  };
  result: {
    headline: string;
    metrics: { label: string; value: string; description: string }[];
  };
  features: CaseStudyFeature[];
  buildJourney: BuildWeek[];
  techStack: TechStackItem[];
  courseConnections: CourseConnection[];
  liveDemo?: {
    url: string;
    screenshot: string;
    description: string;
  };
  cta: {
    primary: {
      text: string;
      href: string;
      description: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
}

// === CASE STUDIES ===

export const caseStudies: CaseStudy[] = [
  {
    id: 'pmm-agent',
    slug: 'pmm-agent',
    title: 'PMM Deep Agent',
    subtitle:
      'An AI that helps Product Marketing Managers evaluate positioning, messaging, and go-to-market strategy',

    problem: {
      headline: "PMs spend 40+ hours on positioning work that's often wrong",
      description:
        'Product Marketing is hard. You need to understand customers, competitors, market dynamics, and messaging—all while shipping. Most PMs cobble together positioning from gut feel and hope it works.',
      painPoints: [
        'No systematic way to evaluate positioning against frameworks',
        'Competitive analysis takes forever and is outdated immediately',
        "Messaging that sounds good in the room doesn't resonate with customers",
        "April Dunford's framework is great but hard to apply without a coach",
      ],
    },

    solution: {
      headline: 'An AI agent that applies professional PMM frameworks automatically',
      description:
        "I built an AI agent that takes your positioning, competitive landscape, and target customer—then evaluates it against April Dunford's methodology and 17 specialized tools.",
      approach:
        'Instead of prompting AI once and hoping for the best, the agent runs multiple evaluation steps, cross-references its own analysis, and gives you specific, actionable feedback.',
    },

    result: {
      headline: 'Positioning analysis that used to take weeks now takes hours',
      metrics: [
        {
          label: 'Time Saved',
          value: '80%',
          description: 'Competitive analysis from 2 weeks to 2 hours',
        },
        {
          label: 'Framework Coverage',
          value: '17',
          description: 'Specialized tools for different PMM tasks',
        },
        {
          label: 'Evaluation Depth',
          value: '6',
          description: 'Specialist subagents for different perspectives',
        },
      ],
    },

    features: [
      {
        id: 'feature-positioning',
        name: 'Positioning Evaluator',
        description:
          "Analyzes your positioning against April Dunford's framework: competitive alternatives, unique attributes, value, and target customer.",
        icon: '1',
        benefit: 'Know if your positioning is clear before you ship it',
      },
      {
        id: 'feature-competitive',
        name: 'Competitive Intelligence',
        description:
          'Researches competitors, identifies positioning gaps, and suggests differentiation strategies.',
        icon: '2',
        benefit: 'Stay ahead of competition without manual research',
      },
      {
        id: 'feature-messaging',
        name: 'Messaging Analyzer',
        description:
          'Evaluates your messaging for clarity, emotional resonance, and alignment with positioning.',
        icon: '3',
        benefit: 'Messaging that resonates, not just sounds good',
      },
      {
        id: 'feature-gtm',
        name: 'GTM Strategy Reviewer',
        description:
          'Reviews go-to-market plans for coherence, identifies gaps, and suggests improvements.',
        icon: '4',
        benefit: 'Launch with confidence',
      },
    ],

    buildJourney: [
      {
        week: 1,
        title: 'The Messy Start',
        goal: 'Get something working. Anything.',
        learned: [
          "LangGraph's state management is powerful but has a learning curve",
          'Starting with the UI before the agent was a mistake',
          "Claude Sonnet 4's tool use is better than expected",
        ],
        challenge: "Couldn't figure out how to pass state between nodes properly",
        breakthrough: 'Finally understood the state graph pattern after building it wrong 3 times',
      },
      {
        week: 2,
        title: 'Adding Real Tools',
        goal: 'Build the 17 specialized tools the agent would use',
        learned: [
          'Each tool needs clear input/output contracts',
          'Error handling in tools is critical—agents get confused by vague errors',
          'Tool descriptions matter more than I thought for routing',
        ],
        challenge: 'Agent kept calling the wrong tools for tasks',
        breakthrough: 'Realized tool descriptions need to be written for the AI, not for humans',
      },
      {
        week: 3,
        title: 'The Eval Loop',
        goal: 'Build evaluation criteria so I could measure quality',
        learned: [
          "Without evals, you're just vibe-checking",
          'Semantic evals catch issues that rule-based ones miss',
          'Human eval is still the gold standard—but expensive',
        ],
        challenge: 'Output quality was inconsistent—good sometimes, garbage others',
        breakthrough: 'Added a "critic" subagent that reviews output before returning it',
      },
      {
        week: 4,
        title: 'Polish and Ship',
        goal: 'Make it usable by someone other than me',
        learned: [
          'UI simplicity matters—people got overwhelmed by options',
          'Loading states and progress indicators build trust',
          'Documentation is part of the product',
        ],
        challenge: "First users were confused about what the agent could and couldn't do",
        breakthrough:
          'Added explicit "what this does" and "what this doesn\'t do" to every feature',
      },
    ],

    techStack: [
      {
        name: 'LangGraph',
        purpose: 'Agent orchestration',
        whyChosen:
          'Most flexible framework for multi-step agents. Handles state, branching, and tool calling well.',
      },
      {
        name: 'Claude Sonnet 4',
        purpose: 'LLM backbone',
        whyChosen: 'Best balance of intelligence, speed, and cost. Tool use is excellent.',
      },
      {
        name: 'React 19 + Vite',
        purpose: 'Frontend',
        whyChosen: 'Fast development, good DX. Server components for streaming responses.',
      },
      {
        name: 'Tailwind CSS',
        purpose: 'Styling',
        whyChosen: 'Rapid UI development. Consistent design system without overhead.',
      },
    ],

    courseConnections: [
      {
        title: 'Understanding the Agent Harness',
        description:
          "You'll build your own state graph, just like this one. Week 1-2 of the course.",
        weekCovered: 'Weeks 1-2',
      },
      {
        title: 'Designing Effective Tools',
        description:
          "You'll create 5+ tools for your agent. Same process I used for the 17 PMM tools.",
        weekCovered: 'Week 2',
      },
      {
        title: 'Building the Eval Loop',
        description:
          "The critic subagent pattern comes from the course material. You'll build your own.",
        weekCovered: 'Weeks 3-4',
      },
      {
        title: 'Shipping to Users',
        description:
          'We cover deployment, monitoring, and user feedback. Same process I used here.',
        weekCovered: 'Week 4',
      },
    ],

    liveDemo: {
      url: 'https://pmm-deep-agent.chaiwithjai.com',
      screenshot: '/images/pmm-agent-screenshot.png',
      description: 'Try the live demo. Paste your positioning and get feedback.',
    },

    cta: {
      primary: {
        text: 'Build Your Own Agent',
        href: 'https://chaiwithjai.com/course',
        description:
          'The flagship course teaches you to build agents like this. Hands-on, not theory.',
      },
      secondary: {
        text: 'Start with one action',
        href: '/do/today',
      },
    },
  },
];

// Helper to get a case study by slug
export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find((cs) => cs.slug === slug);
};

// Helper to get all slugs for static generation
export const getAllCaseStudySlugs = (): string[] => {
  return caseStudies.map((cs) => cs.slug);
};

// Meta for the case study section
export const caseStudiesMeta = {
  sectionTitle: 'What You Can Build',
  sectionSubtitle: "Real agents built using the same process you'll learn in the course",
  pageTitle: 'Case Study',
};
