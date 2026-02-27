import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Quote } from 'lucide-react';

const cases = [
  {
    id: '01',
    title: 'Activation',
    metric: '+28%',
    metricLabel: 'activation in 21 days',
    trend: 'up',
    problem:
      'Users reached dashboard but didn\'t complete the first "aha" action.',
    solution:
      'Re-ordered onboarding steps, clarified primary CTA, added micro-explanations.',
    measuredBy: 'Activation rate + time-to-first-value',
  },
  {
    id: '02',
    title: 'Paywall / Upgrade',
    metric: '+17%',
    metricLabel: 'upgrade conversion',
    trend: 'up',
    problem: 'Paywall hit too early + value not demonstrated.',
    solution:
      'Value preview, pricing clarity, friction removal in upgrade flow.',
    measuredBy: 'Upgrade click-to-paid',
  },
  {
    id: '03',
    title: 'Onboarding Completion',
    metric: '-22%',
    metricLabel: 'onboarding drop-off',
    trend: 'up',
    problem: 'Too many fields and unclear progress.',
    solution:
      'Shortened steps, improved UX copy, better progress cues, A/B test.',
    measuredBy: 'Step completion + retention proxy events',
  },
];

const testimonials = [
  {
    quote:
      "They didn't send a deck. They shipped changes in our app - and our activation finally moved.",
    author: 'Sarah Chen',
    role: 'CEO, DataFlow',
  },
  {
    quote:
      'Fast, surgical, metric-driven. Exactly what an early-stage SaaS needs.',
    author: 'Marcus Webb',
    role: 'Founder, TaskLoop',
  },
  {
    quote:
      'Clear hypotheses, clean implementation, and measurable lift. No fluff.',
    author: 'Elena Rodriguez',
    role: 'Head of Growth, CloudSync',
  },
];

// Animated counter component
const AnimatedCounter = ({
  value,
  isVisible,
}: {
  value: string;
  isVisible: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState('0%');

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseInt(value.replace(/[^0-9-]/g, ''));
    const prefix = value.includes('+') ? '+' : '';
    const suffix = value.includes('%') ? '%' : '';

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out expo
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * numericValue);

      setDisplayValue(`${prefix}${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isVisible]);

  return <span>{displayValue}</span>;
};

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="section-padding bg-gray-50 relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Headline */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          Recent fixes. Real outcomes.
        </h2>

        {/* Subhead */}
        <p
          className={`text-lg text-gray-600 mb-16 max-w-2xl transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            transitionDelay: '200ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Example results from onboarding + flow improvements (not
          guarantees—outcomes vary).
        </p>

        {/* Case Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20 perspective-1000">
          {cases.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className={`relative bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-500 cursor-default ${
                isVisible ? 'opacity-100' : 'opacity-0'
              } ${
                hoveredCard === index
                  ? 'scale-105 shadow-2xl z-10'
                  : hoveredCard !== null
                  ? 'scale-98 opacity-70'
                  : 'hover:shadow-lg'
              }`}
              style={{
                transitionDelay: `${400 + index * 200}ms`,
                transform: isVisible
                  ? `rotateY(0deg) ${
                      hoveredCard === index
                        ? 'scale(1.05)'
                        : hoveredCard !== null
                        ? 'scale(0.98)'
                        : 'scale(1)'
                    }`
                  : 'rotateY(-90deg)',
                transformStyle: 'preserve-3d',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Case Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Case File {caseItem.id}
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                  {caseItem.title}
                </span>
              </div>

              {/* Metric */}
              <div className="mb-6">
                <div
                  className={`text-4xl md:text-5xl font-bold mb-1 flex items-center gap-2 ${
                    caseItem.trend === 'up'
                      ? 'text-green-600 metric-glow'
                      : 'text-black'
                  }`}
                >
                  {caseItem.trend === 'up' ? (
                    <TrendingUp className="w-8 h-8" />
                  ) : (
                    <TrendingDown className="w-8 h-8" />
                  )}
                  <AnimatedCounter
                    value={caseItem.metric}
                    isVisible={isVisible}
                  />
                </div>
                <p className="text-sm text-gray-500">{caseItem.metricLabel}</p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                    What was broken
                  </p>
                  <p className="text-sm text-gray-700">{caseItem.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                    What we shipped
                  </p>
                  <p className="text-sm text-gray-700">{caseItem.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                    Measured by
                  </p>
                  <p className="text-sm text-gray-700">{caseItem.measuredBy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
            What Clients Say
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl p-6 border border-gray-100 transition-all duration-600 hover:shadow-lg ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${1000 + index * 150}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-gray-200 mb-4" />

                {/* Quote Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                    {testimonial.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
