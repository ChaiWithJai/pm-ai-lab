// Jai's Story Data Store
// Journey: Software Engineer → Instructional Designer → Autoimmune Disease → AI Healing
// This data powers the /story page with the full transformation narrative

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  insight: string;
  type: 'career' | 'health' | 'learning' | 'breakthrough';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  lesson: string;
  quote: string;
  source?: string;
  impact: string;
}

export interface RLEnvironmentNode {
  id: string;
  label: string;
  type: 'input' | 'process' | 'eval' | 'output';
  description: string;
  children?: string[];
}

export interface TransformationStage {
  id: string;
  before: {
    state: string;
    problem: string;
    feeling: string;
  };
  after: {
    state: string;
    solution: string;
    feeling: string;
  };
  catalyst: string;
}

// === CORE STORY DATA ===

export const storyMeta = {
  headline: 'How I Learned to Learn from AI',
  subheadline:
    "A software engineer's journey through illness, mentors, and building his own AI learning system",
  hook: "I didn't set out to build an AI curriculum. I set out to heal. The curriculum came from understanding how AI actually learns—and realizing I could learn the same way.",
};

export const timeline: TimelineEvent[] = [
  {
    id: 'timeline-1',
    year: '2014-2018',
    title: 'Software Engineer',
    description:
      'Built products at startups and Fortune 500s. Learned to ship, but felt disconnected from why things worked.',
    insight: 'Technical skills matter, but understanding people matters more.',
    type: 'career',
  },
  {
    id: 'timeline-2',
    year: '2018-2021',
    title: 'Instructional Designer',
    description:
      'Switched to teaching technology. Designed training programs. Discovered that how you learn changes what you can do.',
    insight: 'Learning design is a technology skill. Most people skip it.',
    type: 'career',
  },
  {
    id: 'timeline-3',
    year: '2021',
    title: 'Autoimmune Diagnosis',
    description:
      'Body started attacking itself. Doctors helped, but healing required more than medicine.',
    insight: 'When your body fails, you find what really matters.',
    type: 'health',
  },
  {
    id: 'timeline-4',
    year: '2022',
    title: 'Discovered AI as Learning Partner',
    description:
      "ChatGPT launched. Saw immediately: this isn't just a tool, it's a learning accelerator. But the output was often wrong.",
    insight: "AI is powerful but unreliable. The question became: how do you know when it's wrong?",
    type: 'learning',
  },
  {
    id: 'timeline-5',
    year: '2023',
    title: 'Met My Mentors',
    description:
      'Found Swyx (evals), Rahul & Alex (observability), Ash Maurya (business model design). Each taught me a piece of the puzzle.',
    insight: "Experts don't just know things. They know how to know things.",
    type: 'learning',
  },
  {
    id: 'timeline-6',
    year: '2023-2024',
    title: 'Built My Own RL Environment',
    description:
      "Realized I could use my mom's 30 years of Pushti Marg study to train myself through AI. Built a system where AI quizzed me, I practiced, and I got better.",
    insight:
      'You can hack together a learning system using AI. The key is evals—checking if you actually learned.',
    type: 'breakthrough',
  },
  {
    id: 'timeline-7',
    year: '2024-Present',
    title: 'Teaching Others to Build Agents',
    description:
      "Now teaching PMs and designers to build their own AI agents. Can't evaluate what you haven't built.",
    insight:
      'The best way to understand AI is to build with it, fail, and learn from the failures.',
    type: 'career',
  },
];

export const mentors: Mentor[] = [
  {
    id: 'mentor-swyx',
    name: 'Swyx',
    role: 'AI Engineer, Educator',
    lesson: 'Focus on Evals',
    quote:
      "If you can't measure it, you can't improve it. Evals are the difference between vibe-checking and engineering.",
    source: 'Latent Space Podcast',
    impact:
      'Taught me that "checking if AI gave you a good answer" is the core skill. Everything else follows from this.',
  },
  {
    id: 'mentor-rahul-alex',
    name: 'Rahul Pandey & Alex Chiou',
    role: 'Tech Career Coaches',
    lesson: 'Observability: Be Professional, Not Amateur',
    quote: 'Professionals measure real performance. Amateurs guess.',
    source: 'Taro',
    impact:
      'Taught me to monitor what actually happens in production, not what I hope happens. Applied this to AI outputs.',
  },
  {
    id: 'mentor-ash',
    name: 'Ash Maurya',
    role: 'Author, Running Lean',
    lesson: 'Business Model Design with 7 Dimensions',
    quote: "Your first plan won't work. Design for learning, not for being right.",
    impact:
      'Taught me to treat everything as an experiment. Including learning. Including healing.',
  },
];

// === RL ENVIRONMENT: PUSHTI MARG LEARNING SYSTEM ===
// Visualizes the DAG (Directed Acyclic Graph) of Jai's self-built learning environment

export const rlEnvironment = {
  title: 'My RL Environment: Learning Pushti Marg Through AI',
  subtitle:
    "How I hacked together a reinforcement learning system using my mom's 30 years of study",

  explanation: {
    simple:
      "I built a system where AI teaches me, I practice, and the AI checks if I learned. It's like having a tutor who never gets tired.",
    technical:
      'A feedback loop where semantic extraction from source material creates quizzes, practice sessions evaluate understanding, and the eval scores inform the next learning iteration.',
  },

  // The DAG structure for visualization
  nodes: [
    {
      id: 'node-source',
      label: "Mom's Knowledge Corpus",
      type: 'input' as const,
      description: '30 years of Pushti Marg study: texts, practices, recordings, notes',
      children: ['node-extract'],
    },
    {
      id: 'node-extract',
      label: 'Semantic Extraction',
      type: 'process' as const,
      description: 'AI extracts core concepts, relationships, and practices from the corpus',
      children: ['node-concepts', 'node-practices'],
    },
    {
      id: 'node-concepts',
      label: 'Core Concepts',
      type: 'output' as const,
      description: 'Key terms, relationships, philosophy—the "what" to understand',
      children: ['node-concept-eval'],
    },
    {
      id: 'node-practices',
      label: 'Daily Practices',
      type: 'output' as const,
      description: 'Chanting, rituals, timing—the "how" to embody',
      children: ['node-practice-eval'],
    },
    {
      id: 'node-concept-eval',
      label: 'Understanding Eval',
      type: 'eval' as const,
      description: 'AI quizzes me on concepts. Did I actually understand, or just memorize?',
      children: ['node-extract'], // Feedback loop
    },
    {
      id: 'node-practice-eval',
      label: 'Practice Eval',
      type: 'eval' as const,
      description: 'Did I actually practice today? Did my body respond? What changed?',
      children: ['node-extract'], // Feedback loop
    },
  ] as RLEnvironmentNode[],

  // The key insight
  keyInsight:
    "The magic isn't in the AI. It's in the eval loop. Without checking if you actually learned, you're just consuming content.",

  // Why this matters for PMs/designers
  applicationToPM: {
    parallel: 'This is exactly how AI agents work in production',
    lesson:
      "Understanding evals means understanding how AI actually improves. That's what makes you dangerous as a PM.",
    callToAction: "In the course, you build your own agent. You'll see this loop firsthand.",
  },
};

export const transformationStages: TransformationStage[] = [
  {
    id: 'transform-1',
    before: {
      state: 'AI Consumer',
      problem: 'Used ChatGPT, got mediocre results, thought AI was overhyped',
      feeling: 'Skeptical, behind, anxious',
    },
    after: {
      state: 'AI Evaluator',
      solution: 'Learned to check AI outputs against professional standards',
      feeling: 'Confident, discerning, in control',
    },
    catalyst: 'Swyx taught me about evals. Game changer.',
  },
  {
    id: 'transform-2',
    before: {
      state: 'Passive Learner',
      problem: "Watched tutorials, read articles, knowledge didn't stick",
      feeling: 'Frustrated, imposter syndrome',
    },
    after: {
      state: 'Active Builder',
      solution: 'Built things, failed, learned from failures with tight feedback loops',
      feeling: 'Engaged, growing, capable',
    },
    catalyst: "Can't evaluate what you haven't built.",
  },
  {
    id: 'transform-3',
    before: {
      state: 'Sick and Overwhelmed',
      problem: 'Autoimmune disease, too many "shoulds", no system',
      feeling: 'Depleted, lost, searching',
    },
    after: {
      state: 'Healing Through Practice',
      solution:
        'Used AI to create a learning system for ancient practices. Applied what I learned about evals to my health.',
      feeling: 'Hopeful, grounded, improving',
    },
    catalyst: "Mom's 30 years of study + AI + eval mindset = my healing curriculum.",
  },
];

// === PAGE CONTENT ===

export const storyPageContent = {
  hero: {
    title: 'How I Got Here',
    subtitle: 'A software engineer who got sick, found AI, and learned to learn differently',
  },

  sections: [
    {
      id: 'section-journey',
      title: 'The Journey',
      intro:
        "Most people think AI education is about prompts. It's not. It's about learning how to learn.",
    },
    {
      id: 'section-mentors',
      title: 'My Mentors',
      intro: "Three people changed how I think about AI. Here's what each taught me.",
    },
    {
      id: 'section-rl',
      title: 'The Learning System I Built',
      intro:
        "I didn't just learn from AI. I built a system where AI teaches me, tests me, and helps me improve.",
    },
    {
      id: 'section-transformation',
      title: 'Before & After',
      intro: "Here's what changed—and why I think it can change for you too.",
    },
  ],

  cta: {
    primary: {
      text: 'Build Your Own Agent',
      href: 'https://chaiwithjai.com/course',
      description: 'The flagship course where you build what I built—your own AI agent.',
    },
    secondary: {
      text: 'Start with One Action',
      href: '/do/today',
      description: "Not ready for the course? Here's what you can do in 15 minutes.",
    },
  },
};
