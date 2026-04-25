/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Send, 
  Loader2, 
  ArrowRight,
  RefreshCw,
  PlusCircle,
  FileText,
  Clock,
  ShieldCheck,
  Zap,
  Terminal,
  ExternalLink
} from 'lucide-react';

// Types for Mock Analysis
export interface IssueCluster {
  theme: string;
  percentage: number;
  rootCause: string;
  severity: 'Critical' | 'Moderate' | 'Minor';
}

export interface StrategicInsight {
  title: string;
  observation: string;
  color: string;
}

export interface ExecutionTask {
  id: string;
  team: 'Engineering' | 'Product' | 'Support' | 'Operations';
  title: string;
  description: string;
  impact: string;
  priority: 'HIGH' | 'MED' | 'LOW';
}

const SAMPLE_FEEDBACK = `- "UPI failed twice at lunch today. Money deducted but app shows pending for 4 hours. Terrible experience."

- "Trying to complete KYC for 3 days. The photo upload just keeps spinning and timing out. Customer care is useless."

- "Account frozen for a week now without any email or reason. How do I pay my rent?"

- "OTP doesn't auto-fill and when I type it manually, it says expired. Stuck at login."

- "Failed transaction refund still not processed after 5 working days. Digital bank should be faster."

- "KYC image compression is failing on slow village network. Please add manual bypass."`;

const MOCK_RESULTS = {
  clusters: [
    { 
      theme: 'Payment Latency', 
      percentage: 42, 
      rootCause: 'NPCI timeout & bank-side delays.', 
      severity: 'Critical' 
    },
    { 
      theme: 'Onboarding/KYC', 
      percentage: 28, 
      rootCause: 'S3 upload timeout on low-bandwidth.', 
      severity: 'Moderate' 
    },
    { 
      theme: 'Auth/Login', 
      percentage: 15, 
      rootCause: 'OTP service provider latency.', 
      severity: 'Moderate' 
    },
    { 
      theme: 'App Bug', 
      percentage: 15, 
      rootCause: 'State management on session refresh.', 
      severity: 'Minor' 
    }
  ] as IssueCluster[],
  insights: [
    {
      title: 'Financial Impact: Payment Stuck State',
      observation: 'High churn risk detected for users with >2 pending UPI transactions. Currently affecting 1,200 users daily.',
      color: 'bg-red-500'
    },
    {
      title: 'Operational Bottleneck: KYC Drop-off',
      observation: 'Users on 4G networks experiencing 60% failure rate on image compression module during document upload.',
      color: 'bg-orange-400'
    }
  ] as StrategicInsight[],
  execution: [
    {
      id: 'TSK-402',
      team: 'Engineering',
      title: 'UPI Auto-Retry & Clear-Pending State',
      description: 'Implement immediate local UI feedback for pending transactions to reduce support tickets.',
      impact: '40% reduction in tickets',
      priority: 'HIGH'
    },
    {
      id: 'TSK-405',
      team: 'Product',
      title: 'KYC Image Compression v2',
      description: 'Client-side compression before upload to solve for low-bandwidth timeouts.',
      impact: '15% onboarding lift',
      priority: 'MED'
    },
    {
      id: 'TSK-409',
      team: 'Support',
      title: 'Automated Account Freeze Comms',
      description: 'Trigger SMS/Email immediately with reason code & required steps when account is flagged.',
      impact: 'Lower churn',
      priority: 'MED'
    }
  ] as ExecutionTask[]
};

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof MOCK_RESULTS | null>(null);

  const simulateAnalysis = () => {
    if (!input.trim()) return;
    setLoading(true);
    // Simulate processing time
    setTimeout(() => {
      setResult(MOCK_RESULTS);
      setLoading(false);
    }, 1200);
  };

  const fillSample = () => setInput(SAMPLE_FEEDBACK);

  return (
    <div className="bg-slate-50 min-h-screen font-sans flex flex-col text-slate-900 border-x border-slate-200 max-w-[1440px] mx-auto shadow-2xl">
      {/* Header: Authority & Context */}
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center shadow-lg shadow-indigo-200">
             <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800">
              Velocity AI <span className="text-slate-400 font-normal">| President's Office</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Strategy Simulation Active</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
            PA
          </div>
        </div>
      </header>

      {/* Main Content: Three-Pane Strategy Layout */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Pane 1: Feed Input (The Raw Problem) */}
        <section className="w-[340px] bg-white border-r border-slate-200 p-6 flex flex-col shrink-0">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Feedback Intake
              </h2>
              <p className="text-xs text-slate-500 leading-tight">Quantify qualitative friction from raw customer output.</p>
            </div>
            <button 
              onClick={fillSample}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Load Raw Samples
            </button>
          </div>
          
          <div className="flex-1 relative bg-slate-50 rounded-xl border border-slate-200 p-4 group focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
            <textarea 
              className="w-full h-full bg-transparent border-none focus:ring-0 text-sm text-slate-700 resize-none font-mono leading-relaxed placeholder:text-slate-300"
              placeholder="Paste logs here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          
          <button 
            disabled={loading}
            onClick={simulateAnalysis}
            className="group mt-6 w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 disabled:bg-slate-300"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            Run Prediction Engine
          </button>
        </section>

        {/* Pane 2: AI Intelligence (The Strategy) */}
        <section className="flex-1 bg-slate-50 p-8 flex flex-col gap-8 overflow-y-auto border-r border-slate-200">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Pending Input</h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Enter customer feedback in the intake panel to generate strategic clustering and impact metrics.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                {/* Cluster Stats */}
                <div>
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Intelligent Clustering</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {result.clusters.map((cluster, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={cluster.theme}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-indigo-200 transition-all"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-bold text-slate-800">{cluster.theme}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            cluster.severity === 'Critical' ? 'bg-red-100 text-red-600' :
                            cluster.severity === 'Moderate' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {cluster.percentage}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-mono leading-relaxed">Root: {cluster.rootCause}</p>
                        <div className="mt-4 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${cluster.percentage}%` }}
                            className={`h-full ${cluster.severity === 'Critical' ? 'bg-red-500' : 'bg-indigo-500'}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Insights Section */}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Strategic Insights</h2>
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
                    {result.insights.map((insight, i) => (
                      <div key={insight.title} className="flex gap-6 group">
                        <div className={`w-1 h-12 ${insight.color} rounded-full`}></div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">{insight.title}</h3>
                          <p className="text-sm text-slate-600 mt-2 italic leading-relaxed border-l-2 border-slate-100 pl-4 py-1">
                            "{insight.observation}"
                          </p>
                          <div className="flex gap-2 mt-3">
                            <span className="text-[10px] px-2 py-0.5 border border-slate-200 rounded-md uppercase font-bold text-slate-400 tracking-wider">
                              NLP Sentiment Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Pane 3: Execution (The Action) */}
        <section className="w-[380px] bg-white p-8 flex flex-col shrink-0 border-l border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" /> Execution Roadmap
            </h2>
            <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">AUTO-GEN</div>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center grayscale opacity-30 px-6 text-center">
                 <Zap className="w-12 h-12 mb-4 text-slate-300" />
                 <p className="text-sm">Run analysis to generate tasks</p>
              </div>
            ) : (
              result.execution.map((task, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  key={task.id} 
                  className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-100 transition-all cursor-default group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter ${
                      task.team === 'Engineering' ? 'bg-indigo-100 text-indigo-700' :
                      task.team === 'Product' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {task.team}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest">{task.id}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{task.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-200/50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{task.impact}</span>
                    <span className={`text-[10px] font-black ${
                      task.priority === 'HIGH' ? 'text-red-500' : 'text-amber-500'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <button 
              disabled={!result}
              className="w-full py-4 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 group disabled:opacity-30"
            >
              Push to Corporate Backlog
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer: System Integrity */}
      <footer className="h-12 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <Clock className="w-3 h-3" /> Last Scan: 14:32:01 UTC
          </div>
          <span className="h-3 w-px bg-slate-200"></span>
          <div className="text-[9px] text-slate-300 font-medium">NLP Engine v4.2.1-static</div>
        </div>
        <div className="flex gap-6">
          <span className="text-[10px] text-slate-400 font-bold cursor-pointer hover:text-indigo-600 transition-colors uppercase tracking-widest">System Logs</span>
          <span className="text-[10px] text-slate-400 font-bold cursor-pointer hover:text-indigo-600 transition-colors uppercase tracking-widest">Share Strategy</span>
        </div>
      </footer>
    </div>
  );
}
