import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mail, Calendar } from 'lucide-react';

export default function FinalCTA() {
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
      id="contact"
      className="section-padding bg-white relative overflow-hidden min-h-[80vh] flex items-center"
    >
      {/* Radial Glow Background */}
      <div
        className={`absolute inset-0 radial-glow transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Main Content */}
      <div className="container-custom relative z-10 text-center">
        {/* Headline */}
        <h2
          className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 transition-all duration-800 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-90 scale-95'
          }`}
          style={{
            transitionDelay: '200ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Stop bleeding users.
          <br />
          <span className="text-gray-600">Ship the first fix this month.</span>
        </h2>

        {/* Subhead */}
        <p
          className={`text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            transitionDelay: '500ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          If you have traffic and sign-ups, there's money stuck in your flow.
          Let's find it—and deploy the fix.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            className={`btn-primary text-lg px-10 py-5 flex items-center justify-center gap-3 animate-glow-pulse transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              transitionDelay: '700ms',
              transitionTimingFunction:
                'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            }}
            onClick={() => {
              window.location.href = 'https://cal.com/fixtovalue/20min';
            }}
          >
            <Calendar className="w-5 h-5" />
            Book the Activation Audit (20 min)
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="mailto:fixtovalue@gmail.com"
            className={`group flex items-center justify-center gap-2 text-black font-semibold py-5 px-8 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-500 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-5'
            }`}
            style={{
              transitionDelay: '900ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Mail className="w-5 h-5" />
            Email us
            <span className="text-gray-500 group-hover:text-gray-300 transition-colors">
              fixtovalue@gmail.com
            </span>
          </a>
        </div>

        {/* Micro-commitment */}
        <p
          className={`text-sm text-gray-500 transition-all duration-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          In the call, we'll identify 1–3 likely drop-off points and confirm if
          we can improve them fast.
        </p>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
    </section>
  );
}
