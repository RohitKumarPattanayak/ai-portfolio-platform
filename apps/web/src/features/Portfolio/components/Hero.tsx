import { memo } from 'react';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import type { PortfolioData } from '../types';

interface HeroProps {
  data: PortfolioData;
}

const Hero = memo(({ data }: HeroProps) => {
  const personalInfo = data.personal_info?.[0]?.meta_data;
  const intro = data.introduction?.[0]?.meta_data?.introduction;
  const pic = data.resume_owner_pic?.[0]?.meta_data?.resume_owner_pic;
  const social = data.social_links?.[0]?.meta_data;
  const exp = data.total_experience?.[0]?.meta_data?.total_experience;

  if (!personalInfo) return null;

  return (
    <section className="relative flex flex-col md:flex-row items-center gap-12 py-24 px-6 max-w-5xl mx-auto w-full border-b border-gray-200 dark:border-gray-800/60 transition-colors duration-300">
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">
          {personalInfo.name}
        </h1>
        {intro && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-light transition-colors duration-300">
              {intro}
            </p>
        )}
        <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
          {exp && (
              <span className="px-4 py-1.5 bg-white dark:bg-[#0F172A] rounded-full border border-gray-200 dark:border-gray-700/50 text-sm font-medium shadow-sm transition-colors duration-300">
                  {exp} Experience
              </span>
          )}
        </div>
        <div className="flex items-center gap-5 pt-6">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="p-3 bg-white dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-all duration-300 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:scale-105 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] group border border-gray-100 dark:border-transparent">
              <Mail className="w-5 h-5 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="p-3 bg-white dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-all duration-300 rounded-full text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:scale-105 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] group border border-gray-100 dark:border-transparent">
              <Phone className="w-5 h-5 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
            </a>
          )}
          {social?.github && (
            <a href={social.github} target="_blank" rel="noreferrer" className="p-3 bg-white dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-all duration-300 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:scale-105 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] group border border-gray-100 dark:border-transparent">
              <Github className="w-5 h-5 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            </a>
          )}
          {social?.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-all duration-300 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:scale-105 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] group border border-gray-100 dark:border-transparent">
              <Linkedin className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors" />
            </a>
          )}
        </div>
      </div>
      
      {pic && (
        <div className="w-56 h-56 md:w-72 md:h-72 relative shrink-0 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-emerald-400 dark:from-blue-500 dark:to-emerald-500 rounded-full blur-2xl opacity-40 dark:opacity-20 group-hover:opacity-60 dark:group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
          <img 
            src={pic} 
            alt={personalInfo.name} 
            className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl dark:shadow-2xl hover:border-gray-50 dark:hover:border-gray-700 transition-colors duration-500"
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
