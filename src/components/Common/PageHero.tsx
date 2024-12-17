import React from 'react';
import { useTranslation } from 'react-i18next';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, children }) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[50vh] bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 -mt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-48 -right-24 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute w-[400px] h-[400px] -bottom-32 -left-20 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative container mx-auto px-6 pt-32">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-fade-in leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-white/90 mb-12 animate-fade-in delay-200 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="animate-fade-in delay-400">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
