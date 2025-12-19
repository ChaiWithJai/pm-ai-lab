'use client';

import { rlEnvironment, RLEnvironmentNode } from '@/data/jai-story';

export default function RLDiagram() {
  const { nodes, title, subtitle, explanation, keyInsight, applicationToPM } = rlEnvironment;

  // Helper to get node styling by type
  const getNodeStyle = (type: RLEnvironmentNode['type']) => {
    switch (type) {
      case 'input':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'process':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'output':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'eval':
        return 'bg-amber-100 border-amber-300 text-amber-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getTypeLabel = (type: RLEnvironmentNode['type']) => {
    switch (type) {
      case 'input':
        return 'Source';
      case 'process':
        return 'Process';
      case 'output':
        return 'Output';
      case 'eval':
        return 'Eval Loop';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      {/* Explanation toggle */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <h4 className="mb-2 font-medium text-green-800">Simple version</h4>
          <p className="text-sm text-green-700">{explanation.simple}</p>
        </div>
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
          <h4 className="mb-2 font-medium text-purple-800">Technical version</h4>
          <p className="text-sm text-purple-700">{explanation.technical}</p>
        </div>
      </div>

      {/* DAG Visualization */}
      <div className="rounded-2xl border-2 border-teal-100 bg-white p-6 md:p-8">
        <div className="mb-6 text-center">
          <span className="text-xs tracking-wider text-gray-500 uppercase">
            The Learning System
          </span>
        </div>

        {/* Visual DAG representation */}
        <div className="relative">
          {/* Row 1: Source */}
          <div className="mb-8 flex justify-center">
            <NodeCard
              node={nodes[0]}
              style={getNodeStyle(nodes[0].type)}
              label={getTypeLabel(nodes[0].type)}
            />
          </div>

          {/* Arrow down */}
          <div className="mb-4 flex justify-center">
            <svg className="h-8 w-6 text-gray-400" fill="none" viewBox="0 0 24 32">
              <path
                d="M12 0v28M6 22l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Row 2: Process */}
          <div className="mb-8 flex justify-center">
            <NodeCard
              node={nodes[1]}
              style={getNodeStyle(nodes[1].type)}
              label={getTypeLabel(nodes[1].type)}
            />
          </div>

          {/* Branching arrows */}
          <div className="mb-4 flex justify-center gap-24 md:gap-32">
            <svg className="h-8 w-6 -rotate-45 text-gray-400" fill="none" viewBox="0 0 24 32">
              <path
                d="M12 0v28M6 22l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg className="h-8 w-6 rotate-45 text-gray-400" fill="none" viewBox="0 0 24 32">
              <path
                d="M12 0v28M6 22l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Row 3: Outputs */}
          <div className="mb-8 flex justify-center gap-4 md:gap-8">
            <NodeCard
              node={nodes[2]}
              style={getNodeStyle(nodes[2].type)}
              label={getTypeLabel(nodes[2].type)}
              small
            />
            <NodeCard
              node={nodes[3]}
              style={getNodeStyle(nodes[3].type)}
              label={getTypeLabel(nodes[3].type)}
              small
            />
          </div>

          {/* Arrows down */}
          <div className="mb-4 flex justify-center gap-24 md:gap-48">
            <svg className="h-8 w-6 text-gray-400" fill="none" viewBox="0 0 24 32">
              <path
                d="M12 0v28M6 22l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg className="h-8 w-6 text-gray-400" fill="none" viewBox="0 0 24 32">
              <path
                d="M12 0v28M6 22l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Row 4: Evals with feedback loops */}
          <div className="mb-4 flex justify-center gap-4 md:gap-8">
            <div className="relative">
              <NodeCard
                node={nodes[4]}
                style={getNodeStyle(nodes[4].type)}
                label={getTypeLabel(nodes[4].type)}
                small
              />
              {/* Feedback loop indicator */}
              <div className="absolute top-1/2 -right-2 translate-x-full -translate-y-1/2 transform">
                <span className="text-lg text-amber-500">&#8635;</span>
              </div>
            </div>
            <div className="relative">
              <NodeCard
                node={nodes[5]}
                style={getNodeStyle(nodes[5].type)}
                label={getTypeLabel(nodes[5].type)}
                small
              />
              {/* Feedback loop indicator */}
              <div className="absolute top-1/2 -right-2 translate-x-full -translate-y-1/2 transform">
                <span className="text-lg text-amber-500">&#8635;</span>
              </div>
            </div>
          </div>

          {/* Feedback loop explanation */}
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 text-sm text-amber-600">
              <span className="text-lg">&#8635;</span>
              Feedback loop: eval results inform next iteration
            </span>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h4 className="mb-2 font-semibold text-amber-800">The Key Insight</h4>
        <p className="text-amber-700">{keyInsight}</p>
      </div>

      {/* Application to PM */}
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
        <h4 className="mb-3 font-semibold text-teal-800">Why This Matters for You</h4>
        <div className="space-y-3">
          <p className="text-sm text-teal-700">
            <span className="font-medium">Parallel:</span> {applicationToPM.parallel}
          </p>
          <p className="text-sm text-teal-700">
            <span className="font-medium">Lesson:</span> {applicationToPM.lesson}
          </p>
          <p className="text-sm font-medium text-teal-700">{applicationToPM.callToAction}</p>
        </div>
      </div>
    </div>
  );
}

// Node card component
interface NodeCardProps {
  node: RLEnvironmentNode;
  style: string;
  label: string;
  small?: boolean;
}

function NodeCard({ node, style, label, small }: NodeCardProps) {
  return (
    <div className={`rounded-xl border-2 ${style} ${small ? 'max-w-[180px] p-3' : 'max-w-xs p-4'}`}>
      <div className="mb-1 flex items-center gap-2">
        <span
          className={`rounded-full bg-white/50 px-2 py-0.5 text-xs font-medium ${small ? 'text-[10px]' : ''}`}
        >
          {label}
        </span>
      </div>
      <h5 className={`font-semibold ${small ? 'text-sm' : ''}`}>{node.label}</h5>
      <p className={`mt-1 opacity-80 ${small ? 'text-xs' : 'text-sm'}`}>{node.description}</p>
    </div>
  );
}
