import { dashboardFetchPortfolio } from "../../react-queries/DashboardQueries";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Briefcase, Code, GraduationCap, LayoutPanelLeft, Sparkles, FolderGit2 } from "lucide-react";

const DashboardPage = () => {
  const { data: portfolio, isLoading, error } = dashboardFetchPortfolio();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-[#0a0a0c]">
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-700">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-600 animate-spin" />
          <span className="text-indigo-600 dark:text-indigo-400 font-mono tracking-widest animate-pulse">ASSEMBLING PORTFOLIO...</span>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-white">
        <div className="p-8 rounded-3xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 text-center animate-in fade-in zoom-in duration-500">
          <h2 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-2">System Error</h2>
          <p className="text-slate-500 dark:text-gray-400">Failed to load resume nodes from database.</p>
        </div>
      </div>
    );
  }

  const sectionOrder = [
    'introduction',
    'intrpduction',
    'total experiance',
    'total experience',
    'education',
    'experiance',
    'experience',
    'project',
    'projects',
    'skill',
    'skills',
    'other',
    'others',
    'othere'
  ];

  const sections = Object.keys(portfolio).sort((a, b) => {
    const indexA = sectionOrder.findIndex(s => a.toLowerCase().includes(s));
    const indexB = sectionOrder.findIndex(s => b.toLowerCase().includes(s));

    const posA = indexA === -1 ? 999 : indexA;
    const posB = indexB === -1 ? 999 : indexB;

    return posA - posB;
  });

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-white">
        <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center animate-in fade-in zoom-in duration-500 shadow-xl dark:shadow-2xl">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">No Active Resume</h2>
          <p className="text-slate-500 dark:text-gray-400 max-w-sm">Please upload and activate a resume in the chat to view your generated dynamic portfolio.</p>
        </div>
      </div>
    );
  }

  const getSectionIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('experience') || lower.includes('experiance')) return <Briefcase size={24} className="text-emerald-500 dark:text-emerald-400" />;
    if (lower.includes('project')) return <FolderGit2 size={24} className="text-indigo-500 dark:text-indigo-400" />;
    if (lower.includes('skill')) return <Code size={24} className="text-amber-500 dark:text-amber-400" />;
    if (lower.includes('education')) return <GraduationCap size={24} className="text-purple-500 dark:text-purple-400" />;
    if (lower.includes('introduction') || lower.includes('intrpduction')) return <User size={24} className="text-blue-500 dark:text-blue-400" />;
    if (lower.includes('summary') || lower.includes('total')) return <Sparkles size={24} className="text-cyan-500 dark:text-cyan-400" />;
    return <LayoutPanelLeft size={24} className="text-pink-500 dark:text-pink-400" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-700 dark:text-slate-200 selection:bg-indigo-500/30 scroll-smooth overflow-x-hidden">
      {/* Background radial glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-slate-50 to-slate-50 dark:from-indigo-900/20 dark:via-[#0a0a0c] dark:to-[#0a0a0c] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10 space-y-32">
        {/* Hero Section */}
        <header className="animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both text-center md:text-left pt-10">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
            <span className="px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              ACTIVE PROFILE
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-gray-500 bg-clip-text text-transparent drop-shadow-sm">
            Professional <br /> Portfolio.
          </h1>

          {portfolio['introduction'] && (
            <div className="max-w-3xl text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed [&>p]:mb-4 font-light mix-blend-multiply dark:mix-blend-plus-lighter">
              {portfolio['introduction'].map((item: any, idx: number) => (
                <div key={idx}><ReactMarkdown remarkPlugins={[remarkGfm]}>{item.content}</ReactMarkdown></div>
              ))}
            </div>
          )}
        </header>

        {/* Dynamic Sections Grid */}
        <div className="space-y-32 pb-32">
          {sections.filter(s => s !== 'introduction' && s !== 'intrpduction').map((sectionName, index) => (
            <section
              key={sectionName}
              className={`animate-in slide-in-from-bottom-16 fade-in duration-1000 fill-mode-both`}
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-12 pb-6 border-b border-slate-200 dark:border-white/5">
                <div className="p-3.5 bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-xl backdrop-blur-md">
                  {getSectionIcon(sectionName)}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white capitalize tracking-wide">{sectionName}</h2>
              </div>

              {sectionName === 'skills' || sectionName === 'skill' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolio[sectionName].map((item: any, i: number) => {
                    let contentToRender = item.content;
                    if (Array.isArray(item.meta_data)) {
                      contentToRender = item.meta_data.map((s: string) => `- ${s}`).join('\n');
                    } else if (typeof item.meta_data === 'string') {
                      contentToRender = item.meta_data;
                    } else if (item.meta_data?.skills && Array.isArray(item.meta_data.skills)) {
                      contentToRender = item.meta_data.skills.map((s: string) => `- ${s}`).join('\n');
                    }

                    const title = item.meta_data?.title || item.meta_data?.category;

                    return (
                      <div key={i} className="group p-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:border-indigo-200 dark:hover:border-white/[0.1] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-transparent group-hover:from-indigo-500/5 transition-all duration-500 rounded-3xl pointer-events-none" />
                        <div className="relative z-10">
                          {title && <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>}
                          <div className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed [&>ul]:flex [&>ul]:flex-wrap [&>ul]:gap-2 [&>ul]:pl-0 [&>ul>li]:list-none [&>ul>li]:bg-indigo-500/10 [&>ul>li]:border [&>ul>li]:border-indigo-500/20 hover:[&>ul>li]:bg-indigo-500/20 [&>ul>li]:px-3 [&>ul>li]:py-1.5 [&>ul>li]:rounded-xl [&>ul>li]:text-indigo-600 dark:[&>ul>li]:text-indigo-300 [&>ul>li]:font-mono [&>ul>li]:text-xs [&>ul>li]:transition-colors [&>p]:mb-0">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {contentToRender}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {portfolio[sectionName].map((item: any, i: number) => (
                    <div
                      key={i}
                      className="group p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:border-indigo-200 dark:hover:border-white/[0.1] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 relative overflow-hidden flex flex-col h-full"
                    >
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-transparent group-hover:to-purple-500/5 transition-all duration-700 pointer-events-none" />

                      <div className="relative z-10 flex-1 text-[16px] leading-relaxed text-slate-700 dark:text-gray-300 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-slate-900 dark:[&>h1]:text-white [&>h1]:mb-3 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-slate-900 dark:[&>h2]:text-white [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-slate-800 dark:[&>h3]:text-gray-100 [&>h3]:mb-2 [&>p]:mb-5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li]:pl-2 [&>ul>li::marker]:text-indigo-500 [&_strong]:text-slate-900 dark:[&_strong]:text-white [&_strong]:font-semibold [&_a]:text-indigo-600 dark:[&_a]:text-indigo-400 hover:[&_a]:text-indigo-500 dark:hover:[&_a]:text-indigo-300 [&_a]:transition-colors">
                        {item.meta_data?.title && (
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{item.meta_data.title}</h3>
                        )}
                        {item.meta_data?.company && (
                          <p className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400 font-mono text-xs tracking-widest mb-6">{item.meta_data.company.toUpperCase()}</p>
                        )}

                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {item.content}
                        </ReactMarkdown>
                      </div>

                      {/* Render tech stack if available attached to the bottom inside the card */}
                      <div className="relative z-10 mt-auto pt-6 border-t border-slate-200 dark:border-white/5">
                        {item.meta_data?.tech_stack && Array.isArray(item.meta_data.tech_stack) && (
                          <div className="flex flex-wrap gap-2">
                            {item.meta_data.tech_stack.map((tech: string, tidx: number) => (
                              <span key={tidx} className="px-3 py-1 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.05] rounded-lg text-xs font-mono text-slate-600 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-gray-300 group-hover:border-slate-300 dark:group-hover:border-white/10 transition-colors">{tech}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
