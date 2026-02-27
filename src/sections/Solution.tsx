import { useEffect, useRef, useState } from 'react';
import { Database, Layout, Sparkles, Code2, BarChart3 } from 'lucide-react';

const frameworkSteps = [
  {
    icon: Database,
    title: 'Data',
    description: 'Funnel + event review (GA/Mixpanel/Amplitude or what you have)',
  },
  {
    icon: Layout,
    title: 'UX',
    description: 'Flow mapping, friction removal, clarity upgrades',
  },
  {
    icon: Sparkles,
    title: 'Motion',
    description: 'Micro-explanations that help users "get it" faster',
  },
  {
    icon: Code2,
    title: 'Code',
    description: 'We implement in product / website (with your stack)',
  },
  {
    icon: BarChart3,
    title: 'Metrics',
    description: 'Measure impact, iterate, keep what works',
  },
];

const deliverables = [
  'Drop-off map (where users die)',
  'Prioritized hypothesis list (what to change first)',
  '1–2 implemented improvements (not a PDF)',
  'Baseline A/B test plan + measurement',
];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Auto-advance active step
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % frameworkSteps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      id="solution"
      className="section-padding bg-gray-50 relative overflow-hidden"
    >
      {/* Decorative Icons */}
      <div className="absolute right-12 top-24 hidden lg:block">
        <img 
          src="/icon-analytics.png" 
          alt="Analytics" 
          className={`w-14 h-14 object-contain animate-float transition-all duration-800 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '1000ms', transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
        />
      </div>
      <div className="absolute left-16 bottom-32 hidden lg:block">
        <img 
          src="/icon-flow.png" 
          alt="Flow" 
          className={`w-14 h-14 object-contain animate-float-reverse transition-all duration-800 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '1200ms', transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
        />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Headline */}
        <h2 
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 transition-all duration-800 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            clipPath: isVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          We diagnose the drop-offs, then ship the fixes.
        </h2>
        
        {/* Core Promise */}
        <p 
          className={`text-lg text-gray-600 mb-16 max-w-2xl transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '300ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          We improve onboarding, UX, and user flow—and implement changes ourselves.
        </p>
        
        {/* Framework Steps */}
        <div className="mb-20">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
            How It Works
          </p>
          
          <div className="relative">
            {/* Vertical Connector Line */}
            <div 
              className={`absolute left-6 top-0 w-0.5 bg-gray-200 transition-all duration-1500 ${
                isVisible ? 'h-full' : 'h-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            />
            
            {/* Flowing Gradient on Line */}
            <div 
              className={`absolute left-6 top-0 w-0.5 transition-all duration-1500 ${
                isVisible ? 'h-full opacity-100' : 'h-0 opacity-0'
              }`}
              style={{ 
                transitionDelay: '500ms',
                background: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
                backgroundSize: '100% 200%',
                animation: 'line-flow 3s linear infinite'
              }}
            />
            
            <style>{`
              @keyframes line-flow {
                0% { background-position: 0% 0%; }
                100% { background-position: 0% 200%; }
              }
            `}</style>
            
            {/* Steps */}
            <div className="space-y-6">
              {frameworkSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                
                return (
                  <div
                    key={index}
                    className={`relative flex items-start gap-6 group transition-all duration-500 ${
                      isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}
                    style={{ 
                      transitionDelay: `${600 + index * 200}ms`,
                      transformOrigin: 'top center',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Step Number/Icon */}
                    <div 
                      className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-black text-white shadow-lg' 
                          : 'bg-white text-gray-600 border border-gray-200 group-hover:border-black'
                      }`}
                      style={{
                        boxShadow: isActive ? '0 0 20px rgba(0,0,0,0.15)' : 'none',
                        animation: isActive ? 'step-pulse 2s ease-in-out infinite' : 'none'
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className={`text-xl font-semibold mb-1 transition-colors duration-300 ${
                        isActive ? 'text-black' : 'text-gray-700'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Step Indicator */}
                    <div 
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        isActive 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <style>{`
              @keyframes step-pulse {
                0%, 100% { box-shadow: 0 0 0 rgba(0,0,0,0); }
                50% { box-shadow: 0 0 20px rgba(0,0,0,0.15); }
              }
            `}</style>
          </div>
        </div>
        
        {/* Deliverables */}
        <div>
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
            What You Get
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 transition-all duration-500 hover:border-black hover:shadow-md ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ 
                  transitionDelay: `${1600 + index * 100}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
