import React, { useState, useEffect } from 'react';
import { CyberShowcase } from './components/CyberShowcase';

interface FeatureModule {
  id: string;
  number: string;
  title: string;
  highlight?: string;
  iconClass: string;
  accentColor: string;
  accentBg: string;
  description: string;
  capabilities: string[];
  colSpan?: string;
}

const FEATURE_MODULES: FeatureModule[] = [
  {
    id: 'full-verify',
    number: '01',
    title: 'Full Verify Registration',
    highlight: 'Most Popular',
    iconClass: 'fa-solid fa-user-plus',
    accentColor: '#ef4444',
    accentBg: 'rgba(239, 68, 68, 0.08)',
    description:
      'Generate authentic, phone-verified accounts automatically. Handles everything from global OTP extraction to automatic cookie acceptance without manual input.',
    capabilities: ['Phone OTP', 'Auto Cookie', 'Multi-Country', 'Post-Reg Setup']
  },
  {
    id: 'no-verify',
    number: '02',
    title: 'No Verify Registration',
    iconClass: 'fa-solid fa-user-shield',
    accentColor: '#2563eb',
    accentBg: 'rgba(37, 99, 235, 0.08)',
    description:
      'Scale your campaigns rapidly. Create high-volume accounts using email or custom data lists without waiting for phone verification.',
    capabilities: ['Email Based', 'High Volume', 'Custom Data', 'Fast Speed']
  },
  {
    id: 'profile-builder',
    number: '03',
    title: 'Smart Profile Builder',
    highlight: 'Pro Module',
    iconClass: 'fa-solid fa-images',
    accentColor: '#8b5cf6',
    accentBg: 'rgba(139, 92, 246, 0.08)',
    description:
      'Make every account look genuinely human. Automatically sets avatars, cover photos, bios, relationship status, and education details in seconds.',
    capabilities: ['Avatar Upload', 'Cover Photo', 'Bio & City', 'Education']
  },
  {
    id: 'page-creation',
    number: '04',
    title: 'Page Creation Automation',
    highlight: 'New Release',
    iconClass: 'fa-brands fa-facebook',
    accentColor: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.08)',
    description:
      'Launch business pages on autopilot. Fills names, categories, and bios across multiple accounts simultaneously via stealth desktop mode.',
    capabilities: ['Desktop Mode', 'Custom Names', 'Auto-Select', 'Bulk Pages']
  },
  {
    id: 'active-interaction',
    number: '05',
    title: 'Active Interaction Mode',
    iconClass: 'fa-solid fa-hand-pointer',
    accentColor: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.08)',
    description:
      'Warm up accounts seamlessly. Drives organic engagement through automated reactions, comments, and feed scrolling with smart cookie fallback.',
    capabilities: ['Auto React', 'Cookie Login', 'Smart Fallback', 'Live Status']
  },
  {
    id: 'proxy-multi-window',
    number: '06',
    title: 'Proxy & Multi-Window System',
    iconClass: 'fa-solid fa-network-wired',
    accentColor: '#6366f1',
    accentBg: 'rgba(99, 102, 241, 0.08)',
    description:
      'Run multiple isolated browser windows concurrently. Assign dedicated HTTP/SOCKS5 proxies to each account in an organized grid layout.',
    capabilities: ['HTTP/SOCKS5', 'Per-Account', '5–20 Windows', 'Grid Arrange']
  },
  {
    id: 'bulk-import',
    number: '07',
    title: 'Bulk Import — CSV, TXT, Excel',
    iconClass: 'fa-solid fa-file-excel',
    accentColor: '#ec4899',
    accentBg: 'rgba(236, 72, 153, 0.08)',
    description:
      'Import your entire account database in one click. Fully supports CSV, TXT, and Excel (.xlsx) formats along with cookie column integration.',
    capabilities: ['CSV / TXT', 'Excel .xlsx', 'Cookie Column', 'One-Click'],
    colSpan: 'lg:col-span-3'
  },
  {
    id: 'live-dashboard',
    number: '08',
    title: 'Live Results Dashboard',
    iconClass: 'fa-solid fa-chart-bar',
    accentColor: '#14b8a6',
    accentBg: 'rgba(20, 184, 166, 0.08)',
    description:
      'Track every step in real time. Monitor visual progress indicators, review detailed execution logs, and export finished accounts to CSV.',
    capabilities: ['Real-Time', 'Step Indicators', 'CSV Export', 'Log Viewer'],
    colSpan: 'lg:col-span-3'
  }
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is FBM Prime safe to use? Will Facebook ban my account?',
    answer:
      'FBM Prime uses advanced safety protocols, randomized human delays, and realistic interaction patterns inside isolated Playwright Chrome sessions. Over 500+ users run it daily. Pairing each window with quality residential or mobile proxies is recommended for maximum longevity.'
  },
  {
    question: 'Do you provide customer support?',
    answer:
      'Yes. We offer live WhatsApp support, video tutorials, and step-by-step setup documentation. Premium support response time is under 1–2 hours during business hours.'
  },
  {
    question: "What if I'm not tech-savvy? Is it easy to set up?",
    answer:
      'FBM Prime is built for everyone — no coding or technical skills required. Our installer sets up dependencies automatically in under 10 minutes, and we provide free screen-sharing assistance via WhatsApp after purchase.'
  },
  {
    question: 'How many accounts can be created per day?',
    answer:
      'There is no software cap. Throughput depends on your PC hardware, concurrent browser windows, and proxy speed. With a recommended 12 GB RAM setup running 10–15 concurrent windows, 500 to 1,000+ accounts per day is achievable.'
  },
  {
    question: 'Where do I get phone numbers for registration?',
    answer:
      'You connect virtual numbers from SMS providers such as SMS-Man or 5Sim, or import your own number lists. The software automatically requests the number, waits for the incoming SMS, and fills the OTP code.'
  },
  {
    question: 'Does it work on Mac or Linux?',
    answer:
      'FBM Prime officially supports Windows 10 and Windows 11 (64-bit). If you use a Mac or want 24/7 unattended operation, we recommend running FBM Prime on a Windows Server 2019/2022 VPS.'
  },
  {
    question: 'Is there a refund policy?',
    answer:
      'All digital license sales are final and non-refundable. We provide comprehensive 1-on-1 setup support via WhatsApp to ensure your installation and automation pipeline run smoothly.'
  }
];

const TYPEWRITER_WORDS = [
  'Never Seen Before',
  'Always Dreamed Of',
  'Zero Manual Work',
  'Full Autopilot'
];

export default function App() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('Never Seen Before');
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Typewriter effect
  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIndex];
    const timeoutSpeed = isDeleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
      if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
        return;
      }
      setTypedText(
        isDeleting
          ? currentWord.substring(0, typedText.length - 1)
          : currentWord.substring(0, typedText.length + 1)
      );
    }, timeoutSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  // Scroll listener for Back to Top
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 320);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#1e293b]">
      {/* TOP BAR CONTRACT: 3 Zones (Brand Wordmark — 5 Nav Links — 1 Primary Action) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single Text Element Wordmark */}
          <a
            href="#top"
            className="text-xl font-extrabold tracking-tight text-[#1e3c72] whitespace-nowrap shrink-0"
          >
            FBMPrime
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a
              href="#demo-showcase"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Live Demo
            </a>
            <a
              href="#features"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action (+ Mobile Menu Toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#pricing"
              className="px-5 py-2.5 text-sm font-bold text-white rounded-full bg-gradient-to-r from-[#1e3c72] to-[#2563eb] hover:opacity-95 shadow-md shadow-blue-600/20 transition-all whitespace-nowrap shrink-0"
            >
              Buy License
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
            {[
              { label: 'Live Demo', href: '#demo-showcase' },
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#workflow' },
              { label: 'System Specs', href: '#specs' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQ', href: '#faq' }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* HERO SECTION */}
        <section className="hero-bg text-white pt-20 pb-28 sm:pt-28 sm:pb-36 text-center px-4">
          <div className="max-w-[960px] mx-auto relative z-10">
            <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-emerald-300 mb-4">
              Windows Desktop Software · 500+ Active Marketing Teams Worldwide
            </p>

            <h1
              className="font-extrabold text-white tracking-tight mb-5 mx-auto"
              style={{
                fontSize: 'clamp(2.25rem, 5.2vw, 4.25rem)',
                lineHeight: 1.1,
                textWrap: 'balance'
              }}
            >
              Facebook Automation
              <br />
              Like You&apos;ve{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                {typedText}
              </span>
              <span className="border-r-2 border-blue-400 ml-0.5 animate-pulse" />
            </h1>

            <p className="text-slate-200/90 text-base sm:text-lg max-w-[660px] mx-auto mb-9 leading-relaxed">
              FBM Prime is a professional, undetectable Facebook automation suite for Windows. Automate phone-verified registration, smart human profile building, bulk page creation, and feed warm-up inside isolated multi-browser sessions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/mrtechpk1-ai/FBMprime/releases/download/v1.4.8/FBM_Prime_Reg_Setup_v1.4.8.exe"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full font-bold text-base text-white bg-gradient-to-r from-[#1e3c72] to-[#2563eb] hover:translate-y-[-2px] shadow-lg shadow-blue-600/35 transition-all inline-flex items-center gap-2.5 whitespace-nowrap shrink-0"
              >
                <i className="fa-solid fa-download" />
                <span>Download FBMPrime Reg v1.4.8</span>
              </a>
              <a
                href="#demo-showcase"
                className="px-6 py-3.5 rounded-full font-semibold text-base text-white border border-white/30 hover:bg-white/10 transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Try Interactive Demo</span>
              </a>
            </div>
          </div>
        </section>

        {/* STATS BANNER */}
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 -mt-14 relative z-20 mb-12">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 border border-slate-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              <div className="pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1e3c72] font-mono-num mb-1">
                  500+
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Active License Holders
                </div>
              </div>
              <div className="pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono-num mb-1">
                  10,000+
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Verified Accounts Created
                </div>
              </div>
              <div className="pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-mono-num mb-1">
                  8
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Core Automation Modules
                </div>
              </div>
              <div className="pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono-num mb-1">
                  24/7
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Unattended Queue Engine
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-mono-num mb-1">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Isolated Browser Stealth
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE INTERFACE & DEMO SHOWCASE */}
        <CyberShowcase />

        {/* CORE MODULES / FEATURES */}
        <section id="features" className="py-20 bg-[#f8fafc] relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                Core Modules
              </p>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3"
                style={{ textWrap: 'balance' }}
              >
                One Desktop Suite. Complete Lifecycle Automation.
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#1e3c72] to-blue-500 rounded-full mx-auto mb-4" />
              <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
                Automate the entire Facebook account pipeline — from initial OTP verification to human profile setup, page creation, and daily feed engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {FEATURE_MODULES.map((mod) => {
                const spanClass = mod.colSpan ? mod.colSpan : 'lg:col-span-2';
                return (
                  <div
                    key={mod.id}
                    className={`${spanClass} bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/5 hover:border-blue-500/50 group`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div
                          className="w-13 h-13 rounded-xl flex items-center justify-center text-xl transition-transform duration-200 group-hover:scale-105"
                          style={{
                            backgroundColor: mod.accentBg,
                            color: mod.accentColor
                          }}
                        >
                          <i className={mod.iconClass} />
                        </div>
                        <span className="font-mono-num text-xs font-bold text-slate-400">
                          {mod.number}. {mod.highlight ? mod.highlight : 'Module'}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                        {mod.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed mb-5">
                        {mod.description}
                      </p>
                    </div>

                    {/* Zero-Pill Metadata Discipline: Clean unboxed text with subtle · separators */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-blue-700">
                      {mod.capabilities.map((cap, i) => (
                        <React.Fragment key={cap}>
                          <span>{cap}</span>
                          {i < mod.capabilities.length - 1 && (
                            <span aria-hidden="true" className="text-slate-300">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (4-STEP WORKFLOW) */}
        <section id="workflow" className="py-20 bg-white border-y border-slate-200">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                Workflow
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                How Does FBM Prime Work?
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#1e3c72] to-blue-500 rounded-full mx-auto mb-4" />
              <p className="text-slate-600 text-sm sm:text-base">
                Launch your complete multi-browser automation pipeline in 4 straightforward steps.
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute top-14 left-[10%] right-[10%] h-0.5 wf-connector-line opacity-40 z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                {[
                  {
                    step: '01',
                    title: 'Configure Campaign',
                    desc: 'Select your target module, connect HTTP/SOCKS5 proxies, and set concurrent window limits.'
                  },
                  {
                    step: '02',
                    title: 'Import Data & Assets',
                    desc: 'Import your phone number list, email list, or Excel file. Select avatar folders and page names.'
                  },
                  {
                    step: '03',
                    title: 'Start Automation',
                    desc: 'Click Start — isolated Chrome browsers open in a neat grid and execute tasks in parallel.'
                  },
                  {
                    step: '04',
                    title: 'Monitor & Export CSV',
                    desc: 'Track real-time progress per account and export verified accounts with session cookies to CSV.'
                  }
                ].map((item) => (
                  <div
                    key={item.step}
                    className="bg-white border border-slate-200 rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg hover:border-blue-500"
                  >
                    <div className="w-15 h-15 rounded-full bg-gradient-to-br from-[#1e3c72] to-[#2563eb] text-white font-mono-num font-extrabold text-xl flex items-center justify-center mx-auto mb-5 shadow-md shadow-blue-600/25 border-4 border-white">
                      {item.step}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 bg-[#f8fafc]">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                Verified User Feedback
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                What Marketing Teams &amp; Agencies Say
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#1e3c72] to-blue-500 rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  initial: 'A',
                  name: 'Ahmed R.',
                  role: 'Digital Marketer · Lahore',
                  stars: 5,
                  quote:
                    'FBM Prime completely changed my Facebook marketing workflow. I used to manually create 5 accounts a day — now I run 50+ overnight without a single issue.'
                },
                {
                  initial: 'Z',
                  name: 'Zaheer K.',
                  role: 'SMM Agency Owner · Karachi',
                  stars: 5,
                  quote:
                    'The Profile Builder is excellent — accounts look genuinely human. The Active Interaction module does a great job warming them up. Highly recommended.'
                },
                {
                  initial: 'U',
                  name: 'Usman M.',
                  role: 'FB Account Vendor · Islamabad',
                  stars: 5,
                  quote:
                    'The proxy integration and multi-window system are top-notch. I run 10 windows simultaneously and everything is smooth. Support is also very quick to respond.'
                }
              ].map((t) => (
                <div
                  key={t.name}
                  className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500/50"
                >
                  <div>
                    <div className="text-amber-400 text-sm mb-4 tracking-widest">
                      {'★'.repeat(t.stars)}
                    </div>
                    <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3c72] to-[#2563eb] text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PC SYSTEM REQUIREMENTS */}
        <section id="specs" className="py-20 bg-white border-y border-slate-200">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                System Requirements
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                How Powerful Does Your PC Need to Be?
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#1e3c72] to-blue-500 rounded-full mx-auto mb-4" />
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
                FBM Prime orchestrates real Chromium browser instances via Playwright. A 64-bit Windows environment or Windows VPS is required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Minimum */}
              <div className="bg-white border border-slate-200 rounded-2xl p-7">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#1e3c72] mb-5 flex items-center gap-2">
                  <i className="fa-solid fa-microchip text-blue-600" />
                  <span>Minimum Requirements (5 Windows)</span>
                </h3>
                <dl className="divide-y divide-slate-100 text-sm">
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-slate-500">Operating System</dt>
                    <dd className="font-bold text-emerald-600">Windows 10 (64-bit)</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-slate-500">Processor (CPU)</dt>
                    <dd className="font-semibold text-slate-800">Intel Core i3 / AMD Ryzen 3</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-slate-500">Memory (RAM)</dt>
                    <dd className="font-mono-num font-semibold text-slate-800">8 GB RAM</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-slate-500">Free Disk Space</dt>
                    <dd className="font-mono-num font-semibold text-slate-800">200 MB available</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-slate-500">Network</dt>
                    <dd className="font-semibold text-slate-800">Stable broadband connection</dd>
                  </div>
                </dl>
              </div>

              {/* Recommended */}
              <div className="bg-white border-2 border-blue-600 rounded-2xl p-7 shadow-lg shadow-blue-600/5">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 mb-5 flex items-center gap-2">
                  <i className="fa-solid fa-rocket text-blue-600" />
                  <span>Recommended Setup (10–20 Windows)</span>
                </h3>
                <dl className="divide-y divide-slate-100 text-sm">
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-slate-500">Operating System</dt>
                    <dd className="font-bold text-emerald-600">Windows 11 (64-bit) / Win Server</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-slate-500">Processor (CPU)</dt>
                    <dd className="font-semibold text-slate-800">Intel Core i5 / AMD Ryzen 5</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-slate-500">Memory (RAM)</dt>
                    <dd className="font-mono-num font-semibold text-slate-800">12 GB+ RAM</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-slate-500">Free Disk Space</dt>
                    <dd className="font-mono-num font-semibold text-slate-800">1 GB SSD available</dd>
                  </div>
                  <div className="py-3 flex justify-between items-center gap-4">
                    <dt className="text-slate-500">Network</dt>
                    <dd className="font-semibold text-slate-800">High-speed broadband + Proxies</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-20 bg-[#f8fafc]">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                Licensing &amp; Plans
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                One All-Access Suite. Flexible Durations.
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#1e3c72] to-blue-500 rounded-full mx-auto mb-4" />
              <p className="text-slate-600 text-sm sm:text-base">
                Every license unlocks all 8 modules with unlimited daily runs. Choose the billing cycle that fits your operation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
              {/* 1 Month */}
              <div className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    For Solo Marketers
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4">
                    1 Month License
                  </h3>
                  <div className="flex items-baseline gap-1 mb-1 font-mono-num">
                    <span className="text-xl font-bold text-slate-500">$</span>
                    <span className="text-5xl font-extrabold text-slate-900">10</span>
                    <span className="text-lg font-semibold text-slate-500">.00</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-6">
                    $10.00 / month · Full Suite Access
                  </div>

                  <ul className="space-y-3 text-sm text-slate-600 mb-8">
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Full Verify &amp; No Verify Registration</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Smart Profile Builder (Avatar, Cover, Bio)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Automated Bulk Page Creation</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Active Feed Interaction &amp; Cookie Login</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>5–20 Concurrent Proxy Browser Windows</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>WhatsApp Setup &amp; Technical Support</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/923241703901?text=Hi!+I+want+to+purchase+FBM+Prime+1+Month"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-sm text-center transition-colors whitespace-nowrap"
                >
                  Get 1 Month License
                </a>
              </div>

              {/* 3 Months (Popular) */}
              <div className="bg-gradient-to-b from-white to-blue-50/70 border-2 border-blue-600 rounded-2xl p-7 flex flex-col justify-between relative shadow-xl shadow-blue-600/10 transition-all duration-200 hover:-translate-y-1.5">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                  Most Popular · Save 17%
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 mt-1">
                    For Growing Campaigns
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4">
                    3 Month License
                  </h3>
                  <div className="flex items-baseline gap-1 mb-1 font-mono-num">
                    <span className="text-xl font-bold text-slate-500">$</span>
                    <span className="text-5xl font-extrabold text-blue-600">24</span>
                    <span className="text-lg font-semibold text-slate-500">.99</span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium mb-6">
                    $8.33 / month · Full Suite Access
                  </div>

                  <ul className="space-y-3 text-sm text-slate-700 mb-8">
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>All 8 Automation Modules Included</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Full Verify &amp; No Verify Registration</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Smart Profile Builder &amp; Bulk Page Creator</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Active Interaction &amp; Warm-Up Engine</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Multi-Window Anti-Detect Proxy Grid</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Free Updates &amp; Priority WhatsApp Support</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/923241703901?text=Hi!+I+want+to+purchase+FBM+Prime+3+Month"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white hover:opacity-95 font-bold text-sm text-center shadow-md shadow-blue-600/25 transition-all whitespace-nowrap"
                >
                  Get 3 Months License
                </a>
              </div>

              {/* 1 Year */}
              <div className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                    For Agencies · Save 29%
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4">
                    1 Year License
                  </h3>
                  <div className="flex items-baseline gap-1 mb-1 font-mono-num">
                    <span className="text-xl font-bold text-slate-500">$</span>
                    <span className="text-5xl font-extrabold text-slate-900">84</span>
                    <span className="text-lg font-semibold text-slate-500">.99</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-6">
                    $7.08 / month · Best Long-Term Value
                  </div>

                  <ul className="space-y-3 text-sm text-slate-600 mb-8">
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>All 8 Automation Modules Included</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Unlimited Daily Account &amp; Page Runs</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Smart Profile Builder + CSV/Excel Import</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>Active Interaction Mode &amp; Cookie Export</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>All Major Version Upgrades for 12 Months</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <i className="fa-solid fa-check text-emerald-500 shrink-0" />
                      <span>1 Full Year Dedicated Priority Support</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/923241703901?text=Hi!+I+want+to+purchase+FBM+Prime+1+Year"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-sm text-center transition-colors whitespace-nowrap"
                >
                  Get 1 Year License
                </a>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-8 text-xs font-medium text-slate-500">
              <span>256-bit SSL Encrypted Delivery</span>
              <span aria-hidden="true">·</span>
              <span>Cloudflare Protected</span>
              <span aria-hidden="true">·</span>
              <span>Instant License Key Activation</span>
            </div>
            <p className="text-center text-xs text-slate-500 mt-3">
              All digital license sales are <strong className="text-slate-700">non-refundable</strong>. Full 1-on-1 setup assistance is provided via WhatsApp after purchase.
            </p>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section id="faq" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-[820px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                FAQ
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                Frequently Asked Questions
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#1e3c72] to-blue-500 rounded-full mx-auto" />
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={item.question}
                    className={`bg-white border rounded-2xl overflow-hidden transition-colors ${
                      isOpen ? 'border-blue-600 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {item.question}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? 'bg-blue-600 text-white rotate-180'
                            : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        <i className="fa-solid fa-chevron-down text-xs" />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA / CONTACT SECTION */}
        <section id="contact" className="py-20 bg-[#f8fafc] px-4 sm:px-6">
          <div className="max-w-[920px] mx-auto">
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3c72] text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-3">
                Get Started Today
              </p>
              <h2
                className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Ready to Scale Your Facebook Operations?
              </h2>
              <p className="text-slate-200/90 text-base sm:text-lg max-w-xl mx-auto mb-8">
                Get your FBM Prime license key today and have your multi-browser automation pipeline live within hours.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <a
                  href="https://wa.me/923241703901?text=Hello!+I+want+to+purchase+FBM+Prime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa-pulse bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold text-base px-8 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-all whitespace-nowrap shrink-0"
                >
                  <i className="fa-brands fa-whatsapp text-xl" />
                  <span>Purchase on WhatsApp</span>
                </a>
                <a
                  href="https://github.com/mrtechpk1-ai/FBMprime/releases/download/v1.4.8/FBM_Prime_Reg_Setup_v1.4.8.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full font-semibold text-base text-white border border-white/30 hover:bg-white/10 transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <i className="fa-solid fa-download" />
                  <span>Download Installer (v1.4.8)</span>
                </a>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-200 pt-6 border-t border-white/10">
                <a
                  href="https://wa.me/923241703901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-semibold inline-flex items-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp text-emerald-400" />
                  <span className="font-mono-num">+92 324 1703901</span>
                </a>
                <span aria-hidden="true" className="text-white/20 hidden sm:inline">
                  ·
                </span>
                <a
                  href="https://t.me/Fbmprime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-semibold inline-flex items-center gap-2"
                >
                  <i className="fa-brands fa-telegram text-sky-400" />
                  <span>@Fbmprime</span>
                </a>
                <span aria-hidden="true" className="text-white/20 hidden sm:inline">
                  ·
                </span>
                <a
                  href="mailto:fbmprime@gmail.com"
                  className="hover:text-white font-semibold inline-flex items-center gap-2"
                >
                  <i className="fa-solid fa-envelope text-amber-400" />
                  <span>fbmprime@gmail.com</span>
                </a>
                <span aria-hidden="true" className="text-white/20 hidden sm:inline">
                  ·
                </span>
                <span className="text-slate-300">Avg. Response: 1–2 Hours</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="bg-[#0f172a] text-slate-400 py-12 px-4 text-center border-t border-slate-800">
        <div className="max-w-[960px] mx-auto">
          <div className="text-xl font-extrabold text-white tracking-tight mb-1">
            FBMPrime
          </div>
          <p className="text-xs text-slate-400 mb-5">
            Professional Facebook Automation Software — Windows 10 &amp; 11 (64-bit)
          </p>

          <div className="flex justify-center items-center gap-5 mb-6 text-lg text-slate-300">
            <a
              href="https://wa.me/923241703901"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Support"
              className="hover:text-white transition-colors"
            >
              <i className="fa-brands fa-whatsapp" />
            </a>
            <a
              href="https://t.me/Fbmprime"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram Channel"
              className="hover:text-white transition-colors"
            >
              <i className="fa-brands fa-telegram" />
            </a>
            <a
              href="mailto:fbmprime@gmail.com"
              aria-label="Email Support"
              className="hover:text-white transition-colors"
            >
              <i className="fa-solid fa-envelope" />
            </a>
            <a
              href="https://github.com/mrtechpk1-ai/FBMprime"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="hover:text-white transition-colors"
            >
              <i className="fa-brands fa-github" />
            </a>
          </div>

          <p className="text-xs text-slate-500 max-w-[680px] mx-auto leading-relaxed">
            This software is intended for educational and marketing research purposes only. Users are solely responsible for complying with Facebook&apos;s Terms of Service and applicable local regulations. FBM Prime is an independent desktop tool and is not affiliated with Meta Platforms, Inc.
          </p>
          <p className="text-xs text-slate-600 mt-4">
            &copy; 2026 FBMPrime by Muhammad Ahmed Ali. All rights reserved.
          </p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/923241703901?text=Hi!+I+want+to+know+more+about+FBM+Prime"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with Support on WhatsApp"
        aria-label="Chat with Support on WhatsApp"
        className="btn-wa-pulse fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform"
      >
        <i className="fa-brands fa-whatsapp" />
      </a>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          title="Back to top"
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-[#1e3c72] hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-base shadow-lg transition-all cursor-pointer"
        >
          <i className="fa-solid fa-arrow-up" />
        </button>
      )}
    </div>
  );
}

