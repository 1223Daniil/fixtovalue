import { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';

const plans = [
  {
    name: 'Activation Audit + Implementation',
    tag: 'Entry',
    description: 'Finding the leak and shipping the first fixes fast.',
    features: [
      'Funnel + event review (with whatever data you have)',
      'Drop-off map + prioritized hypotheses',
      '1–2 implementations shipped (onboarding/UX/flow)',
      'Baseline measurement + A/B test plan (or setup)',
    ],
    timeline: '~7–14 days',
    cta: 'Book the Activation Audit',
    highlighted: false,
  },
  {
    name: 'Monthly Growth Support',
    tag: 'Retainer',
    description: 'Continuous onboarding + activation improvement.',
    features: [
      'Ongoing tests + iteration cycles',
      'UX + onboarding improvements + motion where needed',
      'Implementation support (ship regularly)',
      'Monthly metrics review + next-step roadmap',
    ],
    timeline: 'Monthly',
    cta: 'Start Monthly Growth Support',
    highlighted: true,
  },
];

const faqs = [
  {
    question: 'Do you replace our dev team?',
    answer:
      'No—we focus on growth-critical surfaces like onboarding, UX, and conversion flows. We work alongside your existing team.',
  },
  {
    question: 'Will you rewrite our core product?',
    answer:
      'No—we only modify flow, onboarding, and conversion layers. Your core product stays intact.',
  },
  {
    question: 'What if our tracking is weak?',
    answer:
      "We'll still extract practical insights from whatever data you have and help improve tracking over time.",
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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
      id="pricing"
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
          Two ways to work together.
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
          Start with a focused implementation sprint. Continue with monthly
          iteration if it works.
        </p>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-500 ${
                plan.highlighted
                  ? 'border-black shadow-xl'
                  : 'border-gray-200 hover:border-gray-300'
              } ${isVisible ? 'opacity-100' : 'opacity-0'} ${
                hoveredPlan === index
                  ? 'scale-[1.03] shadow-2xl'
                  : hoveredPlan !== null
                  ? 'scale-[0.98] opacity-70'
                  : ''
              }`}
              style={{
                transitionDelay: `${400 + index * 100}ms`,
                transform: isVisible
                  ? `perspective(1000px) rotateY(${
                      index === 0 ? '0deg' : '0deg'
                    }) ${
                      hoveredPlan === index
                        ? 'scale(1.03)'
                        : hoveredPlan !== null
                        ? 'scale(0.98)'
                        : 'scale(1)'
                    }`
                  : `perspective(1000px) rotateY(${
                      index === 0 ? '10deg' : '-10deg'
                    })`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.highlighted && (
                <img
                  src="/photonepon.png"
                  alt="Chrome hammer with growth bars"
                  className="absolute -top-1 -right-1 w-20 drop-shadow-2xl pointer-events-none select-none"
                />
              )}

              {/* Tag */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    plan.highlighted
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {plan.tag}
                </span>
                <span className="text-sm text-gray-400">{plan.timeline}</span>
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

              {/* Description */}
              <p className="text-gray-600 mb-8">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 transition-all duration-400 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${600 + i * 80}ms` }}
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-black text-white hover:shadow-lg animate-glow-pulse'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
                onClick={() => {
                  window.location.href = 'https://cal.com/fixtovalue/20min';
                }}
              >
                {plan.cta}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 text-center">
            Common Questions
          </p>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-xl overflow-hidden transition-all duration-400 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${900 + index * 100}ms` }}
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="font-medium flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                    {faq.question}
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <p className="px-4 pb-4 text-gray-600 pl-12">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
