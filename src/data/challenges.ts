// PM/Designer AI Challenges Dataset
// Source: Anthropic Interviewer + Product Catalyst + Product Talk Evals Framework

// The 8 hidden principles from Jai's story - what each card secretly tests
export type EvalPrinciple =
  | 'eval' // Can AI measure before claiming success?
  | 'constraint' // Can AI design with limitation as feature?
  | 'iteration' // Can AI fail forward, not fall backward?
  | 'specificity' // Can AI avoid generic answers?
  | 'tradeoff' // Can AI make explicit choices?
  | 'humility' // Can AI admit uncertainty?
  | 'system' // Can AI think in loops, not lines?
  | 'embodiment'; // Can AI move from knowing to doing?

// Archetype element for D&D/Tarot theming
export type ArchetypeElement = 'fire' | 'water' | 'earth' | 'air' | 'spirit';

// Narrative arc position for storytelling
export type NarrativeArc =
  | 'exposition'
  | 'rising-action'
  | 'climax'
  | 'falling-action'
  | 'resolution';

// Mentor voices from Jai's story
export type MentorVoice = 'swyx' | 'rahul-alex' | 'ash-maurya';

export interface Challenge {
  id: string;
  category: ChallengeCategory;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  aiFailureRate: number; // percentage
  commonMistakes: string[];
  goodExample: {
    prompt: string;
    response: string;
  };
  badExample: {
    prompt: string;
    response: string;
    whyBad: string;
  };
  framework?: string;
  tags: string[];
  shareCount?: number;
  bookmarkCount?: number;

  // D&D/Tarot card system fields (for future card game UI)
  archetype?: {
    name: string; // e.g., "The Evaluator", "The Hermit", "Strength"
    symbol: string; // Emoji or icon key
    element?: ArchetypeElement;
  };
  hiddenEval?: {
    principle: EvalPrinciple; // What this card secretly tests
    reversedMeaning?: string; // The shadow/failure interpretation
  };
  narrativeArc?: NarrativeArc;
  connectsTo?: string[]; // IDs of related challenges (forms a graph)
  mentorVoice?: MentorVoice; // Which mentor's lesson this embodies
}

export type ChallengeCategory =
  | 'user-research'
  | 'customer-discovery'
  | 'product-development'
  | 'market-research'
  | 'stakeholder-management'
  | 'metrics-analytics'
  | 'design-process'
  | 'roadmap-planning'
  | 'mvp-strategy'
  | 'agile-methodology'
  | 'competitive-analysis'
  | 'pricing-strategy';

export const categoryMeta: Record<
  ChallengeCategory,
  { label: string; icon: string; color: string; description: string }
> = {
  'user-research': {
    label: 'User Research',
    icon: '🔬',
    color: 'bg-purple-500',
    description: 'Interview techniques, question design, insight extraction',
  },
  'customer-discovery': {
    label: 'Customer Discovery',
    icon: '🎯',
    color: 'bg-blue-500',
    description: 'Finding problems worth solving, validating assumptions',
  },
  'product-development': {
    label: 'Product Development',
    icon: '🚀',
    color: 'bg-green-500',
    description: 'Building, iterating, and shipping products',
  },
  'market-research': {
    label: 'Market Research',
    icon: '📊',
    color: 'bg-yellow-500',
    description: 'Understanding markets, sizing opportunities',
  },
  'stakeholder-management': {
    label: 'Stakeholder Management',
    icon: '🤝',
    color: 'bg-orange-500',
    description: 'Aligning teams, managing expectations',
  },
  'metrics-analytics': {
    label: 'Metrics & Analytics',
    icon: '📈',
    color: 'bg-cyan-500',
    description: 'Measuring success, data-driven decisions',
  },
  'design-process': {
    label: 'Design Process',
    icon: '🎨',
    color: 'bg-pink-500',
    description: 'Design thinking, prototyping, user experience',
  },
  'roadmap-planning': {
    label: 'Roadmap Planning',
    icon: '🗺️',
    color: 'bg-indigo-500',
    description: 'Prioritization, sequencing, communication',
  },
  'mvp-strategy': {
    label: 'MVP Strategy',
    icon: '🎯',
    color: 'bg-teal-500',
    description: 'Minimum viable products, lean experiments',
  },
  'agile-methodology': {
    label: 'Agile Methodology',
    icon: '⚡',
    color: 'bg-amber-500',
    description: 'Sprints, ceremonies, team practices',
  },
  'competitive-analysis': {
    label: 'Competitive Analysis',
    icon: '🔍',
    color: 'bg-rose-500',
    description: 'Understanding competition, positioning',
  },
  'pricing-strategy': {
    label: 'Pricing Strategy',
    icon: '💰',
    color: 'bg-emerald-500',
    description: 'Value-based pricing, packaging, monetization',
  },
};

// Stats from our analysis
export const datasetStats = {
  totalTranscripts: 1250,
  totalQuestions: 14208,
  totalChallenges: 3076,
  generalLanguageFailureRate: 29.1,
  qualityDistribution: {
    'Keep practicing': 71.7,
    'Getting it': 22.8,
    Great: 5.5,
  },
  sources: [
    { name: 'Anthropic Interviewer', records: 1250 },
    { name: 'Product Catalyst', records: 1454 },
  ],
};

// Product Talk Evals Framework
export const evaluationFramework = {
  name: 'Product Talk Interview Coach Evals',
  author: 'Teresa Torres',
  dimensions: [
    {
      id: 'story-based',
      label: 'Opening with Story-Based Question',
      description: 'Initiating interviews with specific stories',
    },
    {
      id: 'scene-setting',
      label: 'Setting the Scene',
      description: 'Establishing context for the story',
    },
    {
      id: 'timeline',
      label: 'Building the Timeline',
      description: 'Sequencing events chronologically',
    },
    {
      id: 'redirecting',
      label: 'Redirecting Generalizations',
      description: 'Keeping grounded in specific instances',
    },
  ],
  catastrophicFailures: [
    { id: 'leading', label: 'Leading Questions', example: "Don't you think...?" },
    { id: 'general', label: 'General Questions', example: 'What do you typically do?' },
    {
      id: 'over-emphasis',
      label: 'Over-emphasizing One Dimension',
      example: 'Every question is scene-setting',
    },
  ],
  qualityLevels: ['Keep practicing', 'Getting it', 'Great'],
};

// Sample challenges from our dataset
export const challenges: Challenge[] = [
  {
    id: 'ur-001',
    category: 'user-research',
    title: 'The "Typical Day" Trap',
    description:
      'AI assistants default to asking about "typical" behavior, which yields generic insights instead of specific stories.',
    difficulty: 'beginner',
    aiFailureRate: 29.1,
    commonMistakes: [
      'Asking "What does your typical day look like?"',
      'Using words like "usually", "normally", "generally"',
      'Not anchoring to a specific recent instance',
    ],
    goodExample: {
      prompt: 'Help me understand how this user onboards new clients',
      response:
        'Tell me about the last client you onboarded. Walk me through what happened from the moment you first connected with them.',
    },
    badExample: {
      prompt: 'Help me understand how this user onboards new clients',
      response:
        'What does your typical client onboarding process look like? How do you usually handle new clients?',
      whyBad:
        'Uses "typical" and "usually" which trigger generalized, sanitized answers instead of real stories with messy details.',
    },
    framework: 'Product Talk Interview Coach',
    tags: ['interview', 'discovery', 'questions'],
    shareCount: 847,
    bookmarkCount: 1203,
    // D&D/Tarot fields
    archetype: {
      name: 'The Hermit',
      symbol: '🔮',
      element: 'earth',
    },
    hiddenEval: {
      principle: 'specificity',
      reversedMeaning:
        'AI defaults to "typically, usually, generally"—missing reality for comfortable generalities',
    },
    narrativeArc: 'exposition',
    connectsTo: ['ur-002', 'cd-001'],
    mentorVoice: 'swyx',
  },
  {
    id: 'ur-002',
    category: 'user-research',
    title: 'The Leading Question Bias',
    description:
      'AI suggests questions that subtly guide users toward expected answers, contaminating research data.',
    difficulty: 'intermediate',
    aiFailureRate: 12.3,
    commonMistakes: [
      'Asking "Don\'t you think this would be helpful?"',
      'Embedding assumptions in questions',
      'Using "wouldn\'t you say" or "isn\'t it true"',
    ],
    goodExample: {
      prompt: 'Generate interview questions about pain points',
      response:
        'When you think about the last time this task took longer than expected, what was happening?',
    },
    badExample: {
      prompt: 'Generate interview questions about pain points',
      response:
        "Don't you find it frustrating when the software is slow? Wouldn't better performance help you?",
      whyBad:
        "Leading questions contaminate data - users agree to be polite, not because it's true.",
    },
    framework: 'Product Talk Interview Coach',
    tags: ['interview', 'bias', 'research-quality'],
    shareCount: 623,
    bookmarkCount: 891,
    // D&D/Tarot fields
    archetype: {
      name: 'The High Priestess',
      symbol: '🌙',
      element: 'water',
    },
    hiddenEval: {
      principle: 'humility',
      reversedMeaning:
        'Forcing your assumptions onto users through subtle manipulation of questions',
    },
    narrativeArc: 'exposition',
    connectsTo: ['ur-001', 'cd-002'],
    mentorVoice: 'swyx',
  },
  {
    id: 'cd-001',
    category: 'customer-discovery',
    title: 'Solution-First Thinking',
    description:
      'AI jumps to solutions before fully understanding the problem space, leading to building features nobody wants.',
    difficulty: 'intermediate',
    aiFailureRate: 45.2,
    commonMistakes: [
      'Immediately suggesting features or solutions',
      'Skipping problem validation',
      'Not exploring the "5 Whys" of a problem',
    ],
    goodExample: {
      prompt: 'Users say they need better reporting',
      response:
        "Before we discuss solutions, let's understand: What decision were you trying to make the last time you wished you had a better report? What did you end up doing instead?",
    },
    badExample: {
      prompt: 'Users say they need better reporting',
      response:
        'Here are 5 ways to improve your reporting: 1) Add dashboards, 2) Enable exports, 3) Create templates...',
      whyBad:
        "Jumping to solutions without understanding why current reports fall short means you'll build the wrong thing.",
    },
    framework: 'Jobs to be Done',
    tags: ['discovery', 'problem-validation', 'jtbd'],
    shareCount: 1024,
    bookmarkCount: 1456,
    // D&D/Tarot fields
    archetype: {
      name: 'The Fool',
      symbol: '🌟',
      element: 'air',
    },
    hiddenEval: {
      principle: 'system',
      reversedMeaning:
        'Rushing toward answers without understanding the problem system—naive optimism masking lack of depth',
    },
    narrativeArc: 'rising-action',
    connectsTo: ['ur-001', 'cd-002', 'mvp-001'],
    mentorVoice: 'ash-maurya',
  },
  {
    id: 'cd-002',
    category: 'customer-discovery',
    title: 'Fake Validation Theater',
    description:
      'AI helps create surveys and questions that confirm existing beliefs rather than testing them.',
    difficulty: 'advanced',
    aiFailureRate: 38.7,
    commonMistakes: [
      'Creating surveys with obvious "right" answers',
      'Only talking to friendly users',
      'Interpreting neutral responses as positive',
    ],
    goodExample: {
      prompt: 'Help me validate if users want this feature',
      response:
        "Let's design a test that could prove you wrong. What would users do if this feature DIDN'T exist? Have any users tried to solve this themselves?",
    },
    badExample: {
      prompt: 'Help me validate if users want this feature',
      response:
        'Survey: "Would you find it helpful if we added [feature]?" Options: Very helpful, Helpful, Somewhat helpful',
      whyBad:
        'No neutral or negative options. Asking if something would be "helpful" always gets yes - ask what they\'ve actually done.',
    },
    framework: 'The Mom Test',
    tags: ['validation', 'surveys', 'testing'],
    shareCount: 789,
    bookmarkCount: 1102,
    // D&D/Tarot fields
    archetype: {
      name: 'The Moon',
      symbol: '🌑',
      element: 'water',
    },
    hiddenEval: {
      principle: 'eval',
      reversedMeaning:
        'Living in a dream of validated ideas while reality remains unmeasured and unknown',
    },
    narrativeArc: 'rising-action',
    connectsTo: ['cd-001', 'ma-001'],
    mentorVoice: 'ash-maurya',
  },
  {
    id: 'pd-001',
    category: 'product-development',
    title: 'Spec Inflation',
    description:
      "AI over-engineers specifications by adding edge cases and features that aren't needed for v1.",
    difficulty: 'intermediate',
    aiFailureRate: 52.1,
    commonMistakes: [
      'Adding "nice to have" features to MVP specs',
      'Over-specifying error handling for rare cases',
      'Building for scale before validating demand',
    ],
    goodExample: {
      prompt: 'Write a spec for user authentication',
      response:
        'MVP: Email/password login only. No password reset (use support). No social login. Ship in 2 days, validate need for more before adding.',
    },
    badExample: {
      prompt: 'Write a spec for user authentication',
      response:
        'Requirements: SSO, SAML, OAuth, MFA, magic links, password policies, account lockout, audit logs, session management...',
      whyBad:
        "This is 3 months of work for features you don't know users need. Ship simple, learn, iterate.",
    },
    framework: 'Lean Startup',
    tags: ['specs', 'mvp', 'scope-creep'],
    shareCount: 1456,
    bookmarkCount: 2034,
    // D&D/Tarot fields
    archetype: {
      name: 'The Builder',
      symbol: '🔨',
      element: 'fire',
    },
    hiddenEval: {
      principle: 'constraint',
      reversedMeaning: 'Building without boundaries, mistaking complexity for completeness',
    },
    narrativeArc: 'rising-action',
    connectsTo: ['mvp-001', 'sm-001'],
    mentorVoice: 'ash-maurya',
  },
  {
    id: 'sm-001',
    category: 'stakeholder-management',
    title: 'The "Alignment" Illusion',
    description:
      "AI creates beautiful presentations that feel like alignment but don't surface real disagreements.",
    difficulty: 'advanced',
    aiFailureRate: 41.3,
    commonMistakes: [
      'Presentation decks that avoid hard tradeoffs',
      'Using vague language everyone can agree with',
      "Not explicitly stating what you're NOT doing",
    ],
    goodExample: {
      prompt: 'Help me get stakeholder alignment on our roadmap',
      response:
        'Create a "What we\'re NOT doing" slide. List the top 3 requests you\'re declining and why. Real alignment requires explicit tradeoffs.',
    },
    badExample: {
      prompt: 'Help me get stakeholder alignment on our roadmap',
      response:
        'Roadmap presentation with vision, goals, and timeline. "We\'ll prioritize customer value while balancing technical debt..."',
      whyBad:
        'Vague platitudes create false consensus. When you ship, stakeholders will claim you agreed to their interpretation.',
    },
    framework: 'Radical Candor',
    tags: ['alignment', 'communication', 'tradeoffs'],
    shareCount: 934,
    bookmarkCount: 1287,
    // D&D/Tarot fields
    archetype: {
      name: 'Temperance',
      symbol: '⚖️',
      element: 'air',
    },
    hiddenEval: {
      principle: 'tradeoff',
      reversedMeaning:
        'False harmony through vagueness, avoiding the hard choices that create real alignment',
    },
    narrativeArc: 'climax',
    connectsTo: ['pd-001', 'rp-001'],
    mentorVoice: 'rahul-alex',
  },
  {
    id: 'ma-001',
    category: 'metrics-analytics',
    title: 'Vanity Metric Obsession',
    description:
      "AI defaults to tracking metrics that feel good but don't drive business decisions.",
    difficulty: 'beginner',
    aiFailureRate: 35.8,
    commonMistakes: [
      'Tracking page views instead of conversions',
      'Celebrating signups instead of activation',
      'Reporting totals instead of cohorts',
    ],
    goodExample: {
      prompt: 'What metrics should I track for my SaaS product?',
      response:
        'Focus on ONE metric that matters most right now. For early stage: activation rate (% who complete core action in first week). Everything else is noise until you nail this.',
    },
    badExample: {
      prompt: 'What metrics should I track for my SaaS product?',
      response:
        'Track: DAU, MAU, page views, session duration, bounce rate, NPS, CSAT, feature adoption, retention, churn...',
      whyBad:
        "12 metrics means you're not focused on any. Pick ONE north star, instrument it properly, move it.",
    },
    framework: 'AARRR Pirate Metrics',
    tags: ['metrics', 'analytics', 'focus'],
    shareCount: 1678,
    bookmarkCount: 2341,
    // D&D/Tarot fields
    archetype: {
      name: 'The Wheel',
      symbol: '🎡',
      element: 'spirit',
    },
    hiddenEval: {
      principle: 'eval',
      reversedMeaning: 'Spinning in circles of meaningless numbers, mistaking motion for progress',
    },
    narrativeArc: 'climax',
    connectsTo: ['cd-002', 'sm-001'],
    mentorVoice: 'rahul-alex',
  },
  {
    id: 'dp-001',
    category: 'design-process',
    title: 'Pixel-Perfect Paralysis',
    description: 'AI generates polished designs before validating if the concept even works.',
    difficulty: 'intermediate',
    aiFailureRate: 28.4,
    commonMistakes: [
      'High-fidelity mockups for unvalidated concepts',
      'Spending time on visual polish before testing flow',
      'Designing for "delight" before solving the core problem',
    ],
    goodExample: {
      prompt: 'Design a checkout flow for my e-commerce site',
      response:
        'First, sketch the minimal checkout: 1 page, 3 fields. Test with 5 users using paper prototype. Only add complexity for problems you observe.',
    },
    badExample: {
      prompt: 'Design a checkout flow for my e-commerce site',
      response:
        '[Detailed mockups with animations, micro-interactions, multiple color schemes, responsive breakpoints...]',
      whyBad:
        'Beautiful design you throw away because the flow was wrong. Validate the concept in low-fidelity first.',
    },
    framework: 'Design Thinking',
    tags: ['design', 'prototyping', 'validation'],
    shareCount: 723,
    bookmarkCount: 1089,
    // D&D/Tarot fields
    archetype: {
      name: 'The Tower',
      symbol: '🗼',
      element: 'fire',
    },
    hiddenEval: {
      principle: 'iteration',
      reversedMeaning:
        'Building beautiful towers on sand—perfecting the wrong thing before testing the foundation',
    },
    narrativeArc: 'falling-action',
    connectsTo: ['pd-001', 'mvp-001'],
    mentorVoice: 'swyx',
  },
  {
    id: 'rp-001',
    category: 'roadmap-planning',
    title: 'The Roadmap as Promise',
    description:
      'AI creates detailed roadmaps with dates that become commitments instead of hypotheses.',
    difficulty: 'advanced',
    aiFailureRate: 47.6,
    commonMistakes: [
      'Putting specific dates on features beyond next quarter',
      'Not clearly labeling confidence levels',
      'Missing "what must be true" assumptions',
    ],
    goodExample: {
      prompt: 'Create a product roadmap for the next year',
      response:
        'Now/Next/Later format: NOW (committed, 2-4 weeks): [specific items]. NEXT (likely, 1-3 months): [themes]. LATER (maybe, 3+months): [bets to validate]. No dates beyond NOW.',
    },
    badExample: {
      prompt: 'Create a product roadmap for the next year',
      response:
        'Q1: Feature A (Jan 15), Feature B (Feb 1)... Q4: Enterprise Dashboard (Oct 15), API v2 (Nov 30)...',
      whyBad:
        'Dates become promises. When you miss them (you will), trust erodes. Use time horizons, not dates.',
    },
    framework: 'Now/Next/Later',
    tags: ['roadmap', 'planning', 'communication'],
    shareCount: 1234,
    bookmarkCount: 1876,
    // D&D/Tarot fields
    archetype: {
      name: 'The Hanged Man',
      symbol: '⏳',
      element: 'water',
    },
    hiddenEval: {
      principle: 'constraint',
      reversedMeaning:
        'Suspended in false certainty—making promises about a future you cannot predict',
    },
    narrativeArc: 'falling-action',
    connectsTo: ['sm-001', 'pd-001'],
    mentorVoice: 'rahul-alex',
  },
  {
    id: 'mvp-001',
    category: 'mvp-strategy',
    title: 'The "Minimum" Mirage',
    description:
      'AI defines MVPs that are still too large because "minimum" gets interpreted as "minimum viable to impress".',
    difficulty: 'intermediate',
    aiFailureRate: 44.2,
    commonMistakes: [
      'MVP includes login, payments, analytics, admin dashboard...',
      'Confusing MVP with v1.0 product',
      'Not asking "what can we manually do instead?"',
    ],
    goodExample: {
      prompt: 'Define the MVP for a meal planning app',
      response:
        'MVP: A shared Google Sheet with 5 users where YOU manually input their preferences and send recipes via email. Test demand before writing code.',
    },
    badExample: {
      prompt: 'Define the MVP for a meal planning app',
      response:
        'MVP: User accounts, recipe database, preference quiz, meal calendar, shopping list generator, nutritional tracking...',
      whyBad: "That's 4 months of work. A manual version could validate demand in 1 week.",
    },
    framework: 'Lean Startup',
    tags: ['mvp', 'validation', 'lean'],
    shareCount: 1567,
    bookmarkCount: 2198,
    // D&D/Tarot fields
    archetype: {
      name: 'Death',
      symbol: '🦋',
      element: 'earth',
    },
    hiddenEval: {
      principle: 'constraint',
      reversedMeaning:
        'Refusing to let go of scope, fearing the transformation that comes from true minimalism',
    },
    narrativeArc: 'resolution',
    connectsTo: ['pd-001', 'cd-001'],
    mentorVoice: 'ash-maurya',
  },
  {
    id: 'ca-001',
    category: 'competitive-analysis',
    title: 'Feature Comparison Tables',
    description:
      'AI generates feature matrices that miss the real competitive dynamics: positioning, perception, and switching costs.',
    difficulty: 'advanced',
    aiFailureRate: 33.9,
    commonMistakes: [
      'Comparing features instead of jobs-to-be-done',
      'Missing indirect competitors',
      "Not understanding why customers switch (or don't)",
    ],
    goodExample: {
      prompt: 'Analyze our competitors',
      response:
        'What job are customers hiring each competitor for? Who did your last 5 customers switch FROM and why? What would make a customer leave you for them?',
    },
    badExample: {
      prompt: 'Analyze our competitors',
      response: 'Competitor matrix: [Feature-by-feature comparison showing checkmarks and X marks]',
      whyBad:
        "Features don't win. Positioning, timing, and perceived fit do. A feature matrix misses the strategy.",
    },
    framework: 'Jobs to be Done',
    tags: ['competition', 'positioning', 'strategy'],
    shareCount: 845,
    bookmarkCount: 1234,
    // D&D/Tarot fields
    archetype: {
      name: 'The Star',
      symbol: '⭐',
      element: 'air',
    },
    hiddenEval: {
      principle: 'specificity',
      reversedMeaning:
        'Wishing upon generic comparisons instead of understanding the specific job customers hire for',
    },
    narrativeArc: 'resolution',
    connectsTo: ['ps-001', 'sm-001'],
    mentorVoice: 'ash-maurya',
  },
  {
    id: 'ps-001',
    category: 'pricing-strategy',
    title: 'The Cost-Plus Default',
    description:
      'AI suggests pricing based on costs or competitor benchmarks instead of value delivered.',
    difficulty: 'advanced',
    aiFailureRate: 39.5,
    commonMistakes: [
      'Pricing based on what it costs to build',
      'Copying competitor pricing without understanding their strategy',
      'Not testing price sensitivity with real customers',
    ],
    goodExample: {
      prompt: 'How should I price my analytics tool?',
      response:
        "What's the cost of NOT having this tool? If it saves 10 hours/month at $50/hour, that's $500 in value. Price is a % of value delivered, not cost to build.",
    },
    badExample: {
      prompt: 'How should I price my analytics tool?',
      response:
        'Competitors charge $29-99/month. Your costs are $X, so add 40% margin. Suggested price: $49/month.',
      whyBad:
        'Cost-plus pricing leaves money on the table and ignores whether your positioning commands premium or discount.',
    },
    framework: 'Value-Based Pricing',
    tags: ['pricing', 'value', 'positioning'],
    shareCount: 678,
    bookmarkCount: 987,
    // D&D/Tarot fields
    archetype: {
      name: 'The Emperor',
      symbol: '👑',
      element: 'fire',
    },
    hiddenEval: {
      principle: 'tradeoff',
      reversedMeaning:
        'Ruling by formula instead of value—letting costs dictate worth instead of customer outcomes',
    },
    narrativeArc: 'resolution',
    connectsTo: ['ca-001', 'sm-001'],
    mentorVoice: 'rahul-alex',
  },
];

// Archetype metadata for D&D/Tarot card rendering
export const archetypeMeta: Record<
  string,
  {
    tarotNumber?: number;
    color: string;
    gradient: string;
    meaningUpright: string;
    meaningReversed: string;
  }
> = {
  'the-hermit': {
    tarotNumber: 9,
    color: 'purple',
    gradient: 'from-purple-600 to-indigo-600',
    meaningUpright: 'Deep introspection, seeking specific truth over comfortable generalities',
    meaningReversed: 'Surface-level thinking, accepting "typical" when specifics are needed',
  },
  'the-high-priestess': {
    tarotNumber: 2,
    color: 'blue',
    gradient: 'from-blue-600 to-indigo-600',
    meaningUpright: 'Intuitive wisdom, listening without leading',
    meaningReversed: 'Forcing assumptions onto others through subtle manipulation',
  },
  'the-fool': {
    tarotNumber: 0,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    meaningUpright: 'Beginner mindset, willingness to start simple and learn',
    meaningReversed: 'Naive complexity, solving problems that do not exist',
  },
  'the-moon': {
    tarotNumber: 18,
    color: 'indigo',
    gradient: 'from-indigo-600 to-violet-600',
    meaningUpright: 'Navigating uncertainty, admitting what you do not know',
    meaningReversed: 'Living in dreams, avoiding measurement of reality',
  },
  'the-builder': {
    tarotNumber: 1, // The Magician
    color: 'teal',
    gradient: 'from-teal-500 to-emerald-500',
    meaningUpright: 'Manifesting ideas into reality through skill and iteration',
    meaningReversed: 'Building without purpose, over-engineering, technical debt',
  },
  temperance: {
    tarotNumber: 14,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-500',
    meaningUpright: 'Balancing tradeoffs, making explicit choices',
    meaningReversed: 'Trying to please everyone, avoiding hard decisions',
  },
  'the-wheel': {
    tarotNumber: 10, // Wheel of Fortune
    color: 'cyan',
    gradient: 'from-cyan-500 to-teal-500',
    meaningUpright: 'Understanding feedback loops, thinking in systems',
    meaningReversed: 'Spinning in circles of meaningless metrics',
  },
  'the-tower': {
    tarotNumber: 16,
    color: 'red',
    gradient: 'from-red-600 to-rose-600',
    meaningUpright: 'Necessary destruction of false beliefs, learning from failure',
    meaningReversed: 'Perfecting the wrong thing before testing the foundation',
  },
  'the-hanged-man': {
    tarotNumber: 12,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    meaningUpright: 'Patience, seeing from new perspectives, accepting constraints',
    meaningReversed: 'Suspended in false certainty, making unpredictable promises',
  },
  death: {
    tarotNumber: 13,
    color: 'green',
    gradient: 'from-green-600 to-emerald-600',
    meaningUpright: 'Transformation, letting go of what no longer serves',
    meaningReversed: 'Refusing to let go of scope, fearing minimalism',
  },
  'the-star': {
    tarotNumber: 17,
    color: 'yellow',
    gradient: 'from-yellow-400 to-amber-500',
    meaningUpright: 'Hope, inspiration, finding your unique position',
    meaningReversed: 'Wishing upon generic comparisons instead of specific jobs',
  },
  'the-emperor': {
    tarotNumber: 4,
    color: 'red',
    gradient: 'from-red-500 to-orange-500',
    meaningUpright: 'Structure, authority, commanding value',
    meaningReversed: 'Ruling by formula instead of value—cost-plus thinking',
  },
};

export const getChallengeCounts = () => {
  const counts: Partial<Record<ChallengeCategory, number>> = {};
  challenges.forEach((c) => {
    counts[c.category] = (counts[c.category] || 0) + 1;
  });
  return counts;
};
