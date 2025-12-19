// Action Guides Data Store
// Time-based action guides for PMs/Designers learning AI
// Powers the /do/[timeframe] pages: today, this-week, this-month, this-quarter, long-game

export type TimeHorizon = 'today' | 'this-week' | 'this-month' | 'this-quarter' | 'long-game';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ActionStep {
  step: number;
  instruction: string;
  tip?: string;
}

export interface Action {
  id: string;
  title: string;
  description: string;
  why: string;
  difficulty: Difficulty;
  timeEstimate: string;
  howTo: ActionStep[];
  tools?: string[];
  relatedChallengeIds?: string[];
  outcome: string;
}

export interface TimeHorizonGuide {
  id: TimeHorizon;
  slug: string;
  headline: string;
  subheadline: string;
  intro: string;
  actions: Action[];
  mindset: string;
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
  next?: TimeHorizon;
  prev?: TimeHorizon;
}

// === TIME HORIZON GUIDES ===

export const timeHorizonGuides: TimeHorizonGuide[] = [
  {
    id: 'today',
    slug: 'today',
    headline: 'One thing. Today. 15 minutes.',
    subheadline: "You don't need to understand AI. You need to use it once, well.",
    intro:
      "Most people fail with AI because they try too much at once. Let's start with one specific task that will show you what AI can actually do—and what it can't.",
    mindset:
      "Don't try to learn AI. Try to solve one problem with AI. The learning comes from doing.",
    actions: [
      {
        id: 'today-1',
        title: 'Run your first AI interview debrief',
        description:
          'Take your last user interview (or meeting notes) and have AI extract insights. Then check if those insights are actually useful.',
        why: "This shows you AI's superpower (speed) and weakness (surface-level analysis) in 15 minutes. You'll know immediately if the output is good or garbage.",
        difficulty: 'easy',
        timeEstimate: '15 minutes',
        howTo: [
          {
            step: 1,
            instruction: 'Find your last user interview transcript or detailed meeting notes',
            tip: 'Any conversation where someone explained a problem works',
          },
          { step: 2, instruction: 'Open ChatGPT, Claude, or whatever AI you have access to' },
          {
            step: 3,
            instruction:
              'Paste this prompt: "Read this interview transcript. List the top 3 problems this person mentioned, with a direct quote for each."',
            tip: 'The quote requirement forces specificity',
          },
          {
            step: 4,
            instruction:
              'Read the output. Ask yourself: "Would I have caught these same problems?"',
          },
          {
            step: 5,
            instruction:
              'Grade the AI: How many of the 3 were genuinely useful vs. obvious or wrong?',
          },
        ],
        tools: ['ChatGPT', 'Claude', 'Any LLM'],
        relatedChallengeIds: ['ur-001', 'ur-002'],
        outcome:
          "You'll have a concrete example of AI helping (or failing) on real work. That's worth more than 10 tutorials.",
      },
    ],
    cta: {
      primary: {
        text: 'Ready for more? Continue this week',
        href: '/do/this-week',
        description: "Ready for more? This week's guide has 3 actions that build on today.",
      },
      secondary: {
        text: 'See why AI fails',
        href: '/challenges',
      },
    },
    next: 'this-week',
  },
  {
    id: 'this-week',
    slug: 'this-week',
    headline: 'Build your first AI workflow',
    subheadline: "3 actions that take you from 'I used AI once' to 'I have a system'",
    intro:
      "One good AI interaction is luck. A repeatable workflow is a skill. This week, you'll build something you can use again.",
    mindset: "You're not learning prompts. You're building a workflow you'll actually use.",
    actions: [
      {
        id: 'week-1',
        title: 'Create your prompt library',
        description:
          "Save the prompts that work. Delete the ones that don't. Start a doc you'll actually reference.",
        why: 'Most people ask AI things once, get mediocre results, and never improve. A prompt library lets you iterate and build on what works.',
        difficulty: 'easy',
        timeEstimate: '30 minutes',
        howTo: [
          { step: 1, instruction: 'Create a new doc called "My AI Prompts"' },
          { step: 2, instruction: 'Add 3 sections: "Interview Analysis", "Writing", "Research"' },
          { step: 3, instruction: 'Save the interview prompt from yesterday (if it worked)' },
          {
            step: 4,
            instruction:
              'Try 2-3 prompts for common tasks you do. Save only the ones that give good output.',
          },
          {
            step: 5,
            instruction:
              'For each saved prompt, add: "What this is for" and "What good output looks like"',
            tip: 'This is your eval criteria',
          },
        ],
        tools: ['Notion', 'Google Docs', 'Any notes app'],
        outcome: 'A living doc that makes your next AI interaction better than your last.',
      },
      {
        id: 'week-2',
        title: 'Test bad prompt vs. good prompt',
        description:
          'Run the same task with a generic prompt and a specific prompt. See the difference.',
        why: "Understanding why prompts fail is more valuable than memorizing 'best practices'. You'll feel the difference.",
        difficulty: 'medium',
        timeEstimate: '20 minutes',
        howTo: [
          {
            step: 1,
            instruction:
              'Pick a real task: summarizing a doc, writing an email, analyzing feedback',
          },
          { step: 2, instruction: 'First, ask AI generically: "Summarize this document"' },
          {
            step: 3,
            instruction:
              'Then, ask specifically: "Summarize this document in 3 bullets. Each bullet should answer: What\'s the problem? Who has it? What do they do now?"',
          },
          { step: 4, instruction: 'Compare the outputs side by side' },
          {
            step: 5,
            instruction: 'Note what made the specific prompt better. Add to your prompt library.',
          },
        ],
        relatedChallengeIds: ['ur-001', 'cd-001'],
        outcome: "You'll never use a generic prompt again. You've felt why specificity matters.",
      },
      {
        id: 'week-3',
        title: 'Automate one recurring task',
        description: 'Find something you do every week and create an AI workflow for it.',
        why: "The goal isn't to use AI more. It's to use AI on the right things—tasks that repeat, drain you, and benefit from speed.",
        difficulty: 'medium',
        timeEstimate: '45 minutes',
        howTo: [
          {
            step: 1,
            instruction:
              'List 3 tasks you do weekly that involve text (emails, summaries, research)',
            tip: 'Pick something boring, not creative',
          },
          { step: 2, instruction: "Choose the one that's most repetitive" },
          {
            step: 3,
            instruction: 'Write a prompt that handles 80% of the task. Test it on a real example.',
          },
          { step: 4, instruction: 'Refine until the output needs only minor editing' },
          { step: 5, instruction: 'Save this workflow: Trigger → Prompt → Output → Edit → Done' },
        ],
        outcome: "You've saved time on something that recurs. That's compound interest.",
      },
    ],
    cta: {
      primary: {
        text: 'Ready for a system?',
        href: '/do/this-month',
        description: "This month's guide builds the full PM AI system.",
      },
      secondary: {
        text: 'Start from today',
        href: '/do/today',
      },
    },
    next: 'this-month',
    prev: 'today',
  },
  {
    id: 'this-month',
    slug: 'this-month',
    headline: 'Build your PM AI system',
    subheadline: 'From scattered prompts to a coherent workflow that makes you faster and better',
    intro:
      "You've used AI. Now it's time to build a system—a way of working that compounds over time. This is where most people plateau. You won't.",
    mindset: 'Systems beat skills. A good system makes you better every week without extra effort.',
    actions: [
      {
        id: 'month-1',
        title: 'Build your knowledge base',
        description:
          "Create a corpus of your work that AI can reference. Past docs, decisions, frameworks you've used.",
        why: 'AI is only as good as the context you give it. A personal knowledge base means every AI interaction draws on your real experience.',
        difficulty: 'medium',
        timeEstimate: '2 hours (spread across week)',
        howTo: [
          { step: 1, instruction: 'Create a folder: "My PM Knowledge Base"' },
          {
            step: 2,
            instruction: 'Add: 3 PRDs you wrote, 5 user interview summaries, 2 strategy docs',
          },
          {
            step: 3,
            instruction:
              'For each, add a 1-sentence summary at the top: "This is about [X] for [audience]"',
          },
          {
            step: 4,
            instruction: "Test: Ask AI to 'write a PRD in my style' using 2-3 examples as context",
          },
          {
            step: 5,
            instruction: 'Iterate: Add more examples as you create them. This grows over time.',
          },
        ],
        tools: ['Notion', 'Obsidian', 'Google Drive'],
        outcome: 'AI outputs that sound like you, not like generic AI.',
      },
      {
        id: 'month-2',
        title: 'Complete one full research cycle with AI',
        description:
          'Take a real research question and use AI at every stage: planning, synthesis, analysis, recommendation.',
        why: "Using AI for one task is helpful. Using AI across a workflow shows you where it shines and where it fails—which is knowledge you can't get from tutorials.",
        difficulty: 'hard',
        timeEstimate: '4-6 hours (across project)',
        howTo: [
          { step: 1, instruction: 'Pick a real research question for your product' },
          {
            step: 2,
            instruction:
              'Stage 1 - Plan: Ask AI to suggest research methods. Evaluate its suggestions.',
          },
          {
            step: 3,
            instruction:
              'Stage 2 - Synthesize: Feed interview notes/data to AI. Have it identify themes.',
          },
          {
            step: 4,
            instruction:
              'Stage 3 - Analyze: Ask AI to find contradictions in the themes. Challenge its analysis.',
          },
          {
            step: 5,
            instruction:
              'Stage 4 - Recommend: Have AI draft recommendations. Grade them against your judgment.',
          },
          {
            step: 6,
            instruction: 'Document: Where did AI help most? Where did it need the most correction?',
          },
        ],
        relatedChallengeIds: ['ur-001', 'ur-002', 'cd-001', 'cd-002'],
        outcome: "You've completed a full cycle. You know where AI helps and where it can't.",
      },
      {
        id: 'month-3',
        title: 'Teach someone what you learned',
        description:
          'Share your system with one colleague. Their questions will reveal gaps in your understanding.',
        why: "Teaching forces clarity. If you can't explain why your prompts work, you don't really understand them.",
        difficulty: 'easy',
        timeEstimate: '30 minutes',
        howTo: [
          {
            step: 1,
            instruction: "Identify one colleague who's curious about AI but hasn't started",
          },
          { step: 2, instruction: 'Share your prompt library and walk them through 2-3 prompts' },
          { step: 3, instruction: 'Have them try one prompt on their real work' },
          { step: 4, instruction: 'Note their questions. These are gaps in your system.' },
          { step: 5, instruction: 'Improve your documentation based on what confused them' },
        ],
        outcome:
          "You've solidified your knowledge and helped a colleague. Both make you more valuable.",
      },
    ],
    cta: {
      primary: {
        text: 'Ready to lead?',
        href: '/do/this-quarter',
        description: "This quarter's guide positions you as the AI-native PM on your team.",
      },
      secondary: {
        text: 'Back to weekly actions',
        href: '/do/this-week',
      },
    },
    next: 'this-quarter',
    prev: 'this-week',
  },
  {
    id: 'this-quarter',
    slug: 'this-quarter',
    headline: 'Position yourself for AI-native PM',
    subheadline:
      "The skills that matter aren't prompting. They're building, experimenting, and teaching.",
    intro:
      "By now you've used AI. This quarter, you become the person others come to. Not because you know everything—because you've built something.",
    mindset:
      "The PMs who win in AI aren't the best prompters. They're the ones who build, measure, and share what works.",
    actions: [
      {
        id: 'quarter-1',
        title: 'Build your first AI agent',
        description:
          "Use Cursor, Claude Code, or opencode.ai to build something that does multiple steps. It doesn't have to be good. It has to be yours.",
        why: "You can't evaluate AI agents if you've never built one. The learning from building is 10x the learning from reading.",
        difficulty: 'hard',
        timeEstimate: '10-20 hours (spread across weeks)',
        howTo: [
          {
            step: 1,
            instruction: 'Choose your tool: Cursor + Claude Code (paid) or opencode.ai (free)',
          },
          {
            step: 2,
            instruction:
              'Pick a simple use case: a PM interview analyzer, a competitive brief generator, a feature spec assistant',
          },
          { step: 3, instruction: "Build the simplest version. It will be bad. That's the point." },
          { step: 4, instruction: 'Test it on real work. Note every failure.' },
          { step: 5, instruction: 'Fix one failure at a time. This is the eval loop.' },
          { step: 6, instruction: 'Document what you learned about AI agents from building one.' },
        ],
        tools: ['Cursor', 'Claude Code', 'opencode.ai', 'LangGraph'],
        outcome:
          "You've built an agent. You understand evals, constraints, and iteration from experience.",
      },
      {
        id: 'quarter-2',
        title: 'Run a team experiment',
        description:
          'Propose an AI experiment to your team. Define success criteria. Run it. Share results.',
        why: 'Leadership comes from doing, not suggesting. Running an experiment makes you the AI expert on your team.',
        difficulty: 'hard',
        timeEstimate: '2-4 weeks (project)',
        howTo: [
          {
            step: 1,
            instruction:
              'Identify a team pain point that AI could address (research synthesis, doc review, competitive analysis)',
          },
          {
            step: 2,
            instruction: 'Write a 1-page proposal: Problem, Hypothesis, Success Criteria, Timeline',
          },
          {
            step: 3,
            instruction:
              'Get buy-in from your manager. Position it as a learning experiment, not a commitment.',
          },
          { step: 4, instruction: 'Run the experiment with 2-3 team members' },
          { step: 5, instruction: "Document: What worked, what didn't, what we'd do differently" },
          {
            step: 6,
            instruction: "Share results with the team. Include failures—they're more valuable.",
          },
        ],
        relatedChallengeIds: ['sm-001', 'ma-001'],
        outcome: "You've led an AI initiative. You have results (good or bad) and credibility.",
      },
      {
        id: 'quarter-3',
        title: 'Create your learning system',
        description:
          'Build a system for continuous AI learning. Not tutorials—a feedback loop where using AI teaches you more about AI.',
        why: 'AI changes every month. A learning system means you keep up without burning out.',
        difficulty: 'medium',
        timeEstimate: '2 hours setup + ongoing',
        howTo: [
          { step: 1, instruction: 'Set up a weekly review: 15 minutes every Friday' },
          {
            step: 2,
            instruction:
              'Review your AI interactions: What worked? What failed? What confused you?',
          },
          { step: 3, instruction: 'Update your prompt library based on the week' },
          {
            step: 4,
            instruction:
              'Read/listen to one AI resource (Latent Space, AI Engineer, etc.) with a specific question in mind',
          },
          { step: 5, instruction: 'Apply one thing you learned in the next week' },
        ],
        tools: ['Latent Space Podcast', 'AI Engineer Newsletter', 'Your prompt library'],
        outcome: 'You have a system that makes you better every week without burning out.',
      },
    ],
    cta: {
      primary: {
        text: 'See the long game',
        href: '/do/long-game',
        description: 'Where AI takes PM in 3-7 years—and how to position yourself now.',
      },
      secondary: {
        text: 'Not ready? Start monthly',
        href: '/do/this-month',
      },
    },
    next: 'long-game',
    prev: 'this-month',
  },
  {
    id: 'long-game',
    slug: 'long-game',
    headline: 'Where AI Takes PM in 3-7 Years',
    subheadline:
      "The skills that matter now won't be the skills that matter then. Here's what will.",
    intro:
      "I'm not going to pretend I know the future. But I've spent enough time with AI builders to see patterns. Here's what I'm betting on.",
    mindset:
      "The goal isn't to predict the future. It's to build skills that compound regardless of where things go.",
    actions: [
      {
        id: 'long-1',
        title: 'Understand the skill evolution',
        description:
          'See how PM skills are changing and position yourself for where things are going, not where they are.',
        why: "Prompting is today's skill. Tomorrow's skill is designing systems where AI and humans work together. Start building that muscle now.",
        difficulty: 'medium',
        timeEstimate: '1 hour (reflection)',
        howTo: [
          {
            step: 1,
            instruction: 'Map your current PM skills: What do you do daily that AI could do?',
          },
          {
            step: 2,
            instruction: "Identify your 'human edge': judgment, relationships, taste, vision",
          },
          { step: 3, instruction: 'Ask: "In 5 years, what will I do that AI can\'t?"' },
          { step: 4, instruction: 'Invest in those skills intentionally. They compound.' },
        ],
        outcome: 'Clarity on where to invest your learning energy over the next few years.',
      },
      {
        id: 'long-2',
        title: 'Learn eval design',
        description:
          'Evals—checking if AI is doing a good job—become more valuable as AI does more. Learn to design them.',
        why: "When AI does more tasks, the person who can evaluate AI becomes the bottleneck. That's a good bottleneck to be.",
        difficulty: 'hard',
        timeEstimate: 'Ongoing skill',
        howTo: [
          {
            step: 1,
            instruction:
              'Start simple: For every AI output, ask "How would I know if this is good?"',
          },
          {
            step: 2,
            instruction: 'Write down your evaluation criteria. Make tacit knowledge explicit.',
          },
          {
            step: 3,
            instruction:
              'Study how AI companies evaluate their models (benchmarks, human evals, red teaming)',
          },
          { step: 4, instruction: 'Apply these concepts to your AI workflows' },
          { step: 5, instruction: 'Practice: Design an eval for a new AI task before using it' },
        ],
        tools: ['Braintrust', 'LangSmith', 'Custom eval frameworks'],
        outcome:
          'You can design evaluations for AI systems. This skill becomes more valuable every year.',
      },
      {
        id: 'long-3',
        title: 'Build something that compounds',
        description:
          'Create an artifact—a framework, a tool, a guide—that gets better as you use it and helps others.',
        why: 'The best AI practitioners share what they learn. This creates a flywheel: you build, you share, you learn from feedback, you build better.',
        difficulty: 'hard',
        timeEstimate: 'Ongoing project',
        howTo: [
          {
            step: 1,
            instruction: "Identify something you've figured out that others struggle with",
          },
          {
            step: 2,
            instruction: 'Create a shareable version: a guide, template, framework, or tool',
          },
          {
            step: 3,
            instruction: 'Share it: LinkedIn post, blog, internal wiki, team presentation',
          },
          { step: 4, instruction: 'Collect feedback. What resonated? What confused people?' },
          { step: 5, instruction: 'Iterate and share again. This is how expertise compounds.' },
        ],
        outcome:
          "You've contributed to the AI PM community. You're now part of the conversation, not just following it.",
      },
    ],
    cta: {
      primary: {
        text: 'Ready to build your agent?',
        href: 'https://chaiwithjai.com/course',
        description: 'The flagship course: Build Your Own AI Agent. Hands-on, not theory.',
      },
      secondary: {
        text: 'See what I built',
        href: '/case-study/pmm-agent',
      },
    },
    prev: 'this-quarter',
  },
];

// Helper to get a guide by slug
export const getGuideBySlug = (slug: string): TimeHorizonGuide | undefined => {
  return timeHorizonGuides.find((g) => g.slug === slug);
};

// Helper to get all slugs for static generation
export const getAllGuideSlugs = (): string[] => {
  return timeHorizonGuides.map((g) => g.slug);
};

// Meta info for navigation
export const timeHorizonMeta: Record<
  TimeHorizon,
  { label: string; shortLabel: string; icon: string }
> = {
  today: { label: 'Today', shortLabel: 'Today', icon: '1' },
  'this-week': { label: 'This Week', shortLabel: 'Week', icon: '7' },
  'this-month': { label: 'This Month', shortLabel: 'Month', icon: '30' },
  'this-quarter': { label: 'This Quarter', shortLabel: 'Quarter', icon: '90' },
  'long-game': { label: '3-7 Years', shortLabel: 'Long', icon: '+' },
};
