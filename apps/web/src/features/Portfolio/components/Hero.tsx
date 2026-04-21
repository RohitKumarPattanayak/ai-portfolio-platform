import { memo } from 'react';
import { Mail, Phone, Github, Linkedin, FileText } from 'lucide-react';
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
  const resume_link = data.resume_link?.[0]?.meta_data;

  if (!personalInfo) return null;
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center md:items-start lg:items-center gap-8 md:gap-12 py-12 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto w-full border-b border-gray-200 dark:border-gray-800/60 transition-colors duration-300">
      <div className="flex-1 space-y-4 md:space-y-5 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 leading-tight md:leading-tight lg:leading-tight">
          {personalInfo.name}
        </h1>
        {intro && (
          <p className="text-[13px] md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-light transition-colors duration-300">
            {intro}
          </p>
        )}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 text-gray-600 dark:text-gray-400 mt-1 md:mt-2">
          {exp && (
            <span className="px-3 md:px-4 py-1 md:py-1.5 bg-white dark:bg-[#0F172A] rounded-full border border-gray-200 dark:border-gray-700/50 text-[10px] md:text-sm font-medium shadow-sm transition-colors duration-300">
              {exp} Experience
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-5 pt-4 md:pt-6 w-full">
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

          {resume_link && (
            <>
              <div className="w-full h-px bg-gray-200 dark:bg-gray-700/50 block sm:hidden my-1"></div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700/50 hidden sm:block"></div>
              <a
                href={resume_link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-full sm:w-auto gap-2.5 px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white transition-all duration-300 rounded-full font-medium shadow-sm hover:shadow-md sm:hover:scale-105 group border border-transparent"
              >
                <FileText className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="text-sm md:text-base whitespace-nowrap">View Resume</span>
              </a>
            </>
          )}

        </div>
      </div>

      {pic && (
        <div className="w-36 h-36 md:w-60 md:h-60 lg:w-72 lg:h-72 relative shrink-0 group mx-auto md:mx-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-emerald-400 dark:from-blue-500 dark:to-emerald-500 rounded-full blur-[20px] md:blur-2xl opacity-40 dark:opacity-20 group-hover:opacity-60 dark:group-hover:opacity-40 transition-opacity duration-700 animate-pulse transform-gpu"></div>
          <img
            src={pic}
            alt={personalInfo.name}
            className="relative z-10 w-full h-full object-cover rounded-full border-[3px] md:border-4 border-white dark:border-gray-800 shadow-xl dark:shadow-2xl hover:border-gray-50 dark:hover:border-gray-700 transition-colors duration-500"
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
