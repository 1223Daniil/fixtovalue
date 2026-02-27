import { ArrowUpRight } from 'lucide-react';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Activation Audit', href: '#pricing' },
      { label: 'Monthly Support', href: '#pricing' },
      { label: 'UX Improvements', href: '#solution' },
      { label: 'Onboarding Flow', href: '#solution' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Case Studies', href: '#cases' },
      { label: 'Our Process', href: '#solution' },
      { label: 'About Us', href: '#advantages' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Newsletter', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'FAQ', href: '#pricing' },
    ],
  },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-50 pt-20 pb-8">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="FixToValue logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-bold text-xl">FixToValue</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-sm">
              We diagnose the drop-offs in your SaaS onboarding and user flow,
              then ship the fixes. No decks. Just results.
            </p>
            <a
              href="mailto:fixtovalue@gmail.com"
              className="inline-flex items-center gap-2 text-black font-medium hover:underline"
            >
              fixtovalue@gmail.com
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-600 hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FixToValue. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
