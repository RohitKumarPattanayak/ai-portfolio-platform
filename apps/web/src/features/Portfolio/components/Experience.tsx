import { memo } from 'react';
import { Briefcase } from 'lucide-react';
import type { PortfolioData } from '../types';

interface ExperienceProps {
  data: PortfolioData;
}

const ExperienceInfo = memo(({ data }: ExperienceProps) => {
  const experiences = data.experience || [];

  if (experiences.length === 0) return null;

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto w-full transition-colors duration-300">
      <div className="flex items-center gap-3 mb-12">
        <Briefcase className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight transition-colors">Experience</h2>
      </div>
      <div className="space-y-14 border-l-2 border-gray-200 dark:border-gray-800 ml-4 lg:ml-6 transition-colors">
        {experiences.map((exp, idx) => {
          const { role, company, start_date, end_date, description } = exp.meta_data;
          return (
            <div key={idx} className="relative pl-8 md:pl-10 group">
              {/* Timeline dot */}
              <div className="absolute w-4 h-4 bg-white dark:bg-[#020617] border-2 border-gray-300 dark:border-gray-700 rounded-full -left-[9px] top-1.5 group-hover:border-emerald-500 group-hover:bg-emerald-500 transition-all duration-300 shadow-[0_0_0_4px_#fff] dark:shadow-[0_0_0_4px_#020617]" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-3 mb-3 md:mb-4">
                <div>
                  <h3 className="text-base md:text-2xl font-bold text-gray-900 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{role}</h3>
                  <h4 className="text-sm md:text-lg text-emerald-600/90 dark:text-emerald-500/80 font-medium tracking-wide mt-1 transition-colors">{company}</h4>
                </div>
                <span className="inline-flex items-center text-[10px] md:text-sm px-2.5 md:px-3.5 py-1 md:py-1.5 bg-gray-100 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/50 rounded-full text-gray-600 dark:text-gray-400 shrink-0 shadow-sm whitespace-nowrap transition-colors w-max">
                  {start_date} - {end_date}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400/90 leading-relaxed text-[13px] md:text-base whitespace-pre-wrap font-light transition-colors">
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
});

ExperienceInfo.displayName = 'Experience';
export default ExperienceInfo;
