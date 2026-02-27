import { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';

const painPoints = [
  'Users sign up… then disappear.',
  'Onboarding is "feature tour," not value delivery.',
  "Key actions aren't obvious. Next step isn't clear.",
  "You don't know exactly where the funnel breaks.",
  'Design changes happen without data → nothing improves.',
  'Dev team is busy; growth fixes never ship.',
];

export default function Pains() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pains"
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Headline */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 max-w-4xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          You're not missing traffic. You're losing users before value.
        </h2>

        {/* Intro */}
        <p
          className={`text-lg text-gray-600 mb-16 max-w-2xl transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0 blur-0'
              : 'opacity-0 translate-y-6 blur-sm'
          }`}
          style={{
            transitionDelay: '200ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Most SaaS don't have a "growth problem." They have an activation
          problem—and it's hiding inside onboarding and flow.
        </p>

        {/* Pain Points Grid - Balanced Grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 mb-16">
          {painPoints.map((pain, index) => (
            <div
              key={index}
              className={`group relative p-5 rounded-xl transition-all duration-500 cursor-default ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : `opacity-0 ${
                      index % 2 === 0 ? '-translate-x-16' : 'translate-x-16'
                    }`
              }`}
              style={{
                transitionDelay: `${400 + index * 120}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-gray-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-250" />

              {/* Left Border Animation */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-black rounded-full group-hover:h-full transition-all duration-300"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />

              {/* Content */}
              <div className="relative flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-semibold group-hover:bg-black group-hover:text-white transition-colors duration-250">
                  {index + 1}
                </span>
                <p className="text-base text-gray-700 group-hover:translate-x-2 transition-transform duration-250">
                  {pain}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div
          className={`inline-flex items-center gap-3 px-6 py-4 bg-black text-white rounded-xl transition-all duration-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            transitionDelay: '1200ms',
            transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">
            If you can't point to the exact drop-off step, you're guessing.
          </span>
        </div>
      </div>
    </section>
  );
}
