import { useEffect, useRef, useState } from 'react';
import { Check, X, Zap, Users, Target, Clock, Briefcase } from 'lucide-react';

const advantages = [
  {
    icon: Briefcase,
    title: 'We implement.',
    description: 'Not "recommendations." Real changes in your product.',
  },
  {
    icon: Zap,
    title: 'Speed.',
    description: 'Short cycles. High-leverage fixes first.',
  },
  {
    icon: Users,
    title: 'Cross-skill execution.',
    description: 'UX + copy + motion + frontend thinking in one unit.',
  },
  {
    icon: Target,
    title: 'Metric-first.',
    description:
      'Activation, retention, paywall conversion - tracked and reported.',
  },
  {
    icon: Clock,
    title: 'Low overhead.',
    description: 'Works for small teams without a full growth hire.',
  },
];

const notForYou = [
  'You want a rebrand instead of performance.',
  'You need a full product rebuild.',
  'You want guaranteed numbers without data.',
];

export default function Advantages() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="advantages"
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Headline */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          No handoffs. No decks. No waiting.
        </h2>

        {/* Subhead */}
        <p
          className={`text-lg text-gray-600 mb-16 max-w-2xl transition-all duration-600 ${
            isVisible
              ? 'opacity-100 translate-y-0 blur-0'
              : 'opacity-0 translate-y-6 blur-sm'
          }`}
          style={{
            transitionDelay: '200ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          You don't need advice. You need shipped improvements tied to metrics.
        </p>

        {/* Split Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Advantages */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-20'
            }`}
            style={{
              transitionDelay: '400ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
              Why Work With Us
            </h3>

            <div className="space-y-4">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;

                return (
                  <div
                    key={index}
                    className={`group flex items-start gap-4 p-4 rounded-xl transition-all duration-500 hover:bg-gray-50 ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-8'
                    }`}
                    style={{
                      transitionDelay: `${600 + index * 100}ms`,
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {/* Checkmark */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Check className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-black">
                          {advantage.title}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Not For You */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-20'
            }`}
            style={{
              transitionDelay: '600ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
              Not For You If
            </h3>

            <div className="space-y-4">
              {notForYou.map((item, index) => (
                <div
                  key={index}
                  className={`group flex items-start gap-4 p-4 rounded-xl transition-all duration-500 hover:bg-red-50 ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-8'
                  }`}
                  style={{
                    transitionDelay: `${800 + index * 100}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* X Mark */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-500 group-hover:rotate-90 transition-all duration-300">
                    <X className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 pt-1.5">{item}</p>
                </div>
              ))}
            </div>

            {/* Filter Note */}
            <div
              className={`mt-8 p-4 bg-gray-100 rounded-xl transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1100ms' }}
            >
              <p className="text-sm text-gray-500">
                This filter saves us both time. We only work with teams ready
                for metric-driven growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
