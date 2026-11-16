import React, { useState, useEffect } from 'react';

export interface AccountTask {
  id: string;
  account: string;
  module: string;
  proxy: string;
  country: string;
  step: string;
  progress: number;
  status: 'Running' | 'Verified' | 'Queued' | 'Completed';
  cookie: string;
}

const INITIAL_TASKS: AccountTask[] = [
  {
    id: 'ACC-1041',
    account: '+1 (415) 890-3412 · a.miller92@outlook.com',
    module: 'Full Verify Reg',
    proxy: '198.44.109.18:8080 (SOCKS5)',
    country: 'United States',
    step: 'OTP Extracted (849201) -> Cookie Saved',
    progress: 100,
    status: 'Completed',
    cookie: 'c_user=100094819201; xs=42%3A9kLmP...'
  },
  {
    id: 'ACC-1042',
    account: '+44 7400 918231 · liam.vance@proton.me',
    module: 'Smart Profile Builder',
    proxy: '89.187.162.41:1080 (SOCKS5)',
    country: 'United Kingdom',
    step: 'Uploading Cover Photo & Education Bio',
    progress: 78,
    status: 'Running',
    cookie: 'c_user=100094819554; xs=18%3AxpQ91...'
  },
  {
    id: 'ACC-1043',
    account: '+92 321 4981023 · z.khan.media@gmail.com',
    module: 'Page Creation',
    proxy: '103.152.112.90:8080 (HTTP)',
    country: 'Pakistan',
    step: 'Creating Page: "Apex Digital Studio"',
    progress: 64,
    status: 'Running',
    cookie: 'c_user=100094820119; xs=31%3AbN82K...'
  },
  {
    id: 'ACC-1044',
    account: 'sara.jenks04@yahoo.com',
    module: 'No Verify Reg',
    proxy: '146.70.98.12:1080 (SOCKS5)',
    country: 'Germany',
    step: 'Fast Email Reg -> Post-Reg Setup',
    progress: 92,
    status: 'Verified',
    cookie: 'c_user=100094820883; xs=09%3AmV41W...'
  },
  {
    id: 'ACC-1045',
    account: '+1 (647) 519-0094 · d.chen.agency@outlook.com',
    module: 'Active Interaction',
    proxy: '192.99.45.201:8080 (SOCKS5)',
    country: 'Canada',
    step: 'Feed Warmup: 14 Posts Scrolled, 4 Reactions',
    progress: 55,
    status: 'Running',
    cookie: 'c_user=100094821304; xs=27%3AtR77Q...'
  },
  {
    id: 'ACC-1046',
    account: '+61 412 889 301 · n.wright88@gmail.com',
    module: 'Full Verify Reg',
    proxy: '45.133.192.77:1080 (SOCKS5)',
    country: 'Australia',
    step: 'Waiting for SMS-Man OTP Code...',
    progress: 35,
    status: 'Running',
    cookie: 'Pending extraction...'
  }
];

interface BrowserInstance {
  winId: number;
  profileName: string;
  proxyIp: string;
  fingerprint: string;
  currentAction: string;
  moduleBadge: string;
  progress: number;
  memoryMb: number;
}

const BROWSER_INSTANCES: BrowserInstance[] = [
  {
    winId: 1,
    profileName: 'FB_Profile_US_01',
    proxyIp: '198.44.109.18:8080',
    fingerprint: 'Win11 · Chrome 131 · WebGL Masked',
    currentAction: 'OTP Verified · Saving c_user Cookie',
    moduleBadge: 'Full Verify Reg',
    progress: 100,
    memoryMb: 142
  },
  {
    winId: 2,
    profileName: 'FB_Profile_UK_02',
    proxyIp: '89.187.162.41:1080',
    fingerprint: 'Win11 · Chrome 131 · Canvas Noise',
    currentAction: 'Uploading Avatar & Setting Hometown',
    moduleBadge: 'Profile Builder',
    progress: 82,
    memoryMb: 158
  },
  {
    winId: 3,
    profileName: 'FB_Profile_PK_03',
    proxyIp: '103.152.112.90:8080',
    fingerprint: 'Win10 · Chrome 130 · AudioContext OK',
    currentAction: 'Desktop Mode: Filling Page Category',
    moduleBadge: 'Page Creation',
    progress: 68,
    memoryMb: 164
  },
  {
    winId: 4,
    profileName: 'FB_Profile_DE_04',
    proxyIp: '146.70.98.12:1080',
    fingerprint: 'Win11 · Chrome 131 · WebRTC Isolated',
    currentAction: 'High-Speed Email Reg Completed',
    moduleBadge: 'No Verify Reg',
    progress: 95,
    memoryMb: 136
  },
  {
    winId: 5,
    profileName: 'FB_Profile_CA_05',
    proxyIp: '192.99.45.201:8080',
    fingerprint: 'Win11 · Chrome 131 · Font Mask v3',
    currentAction: 'Scrolling News Feed & Liking Reels',
    moduleBadge: 'Active Interaction',
    progress: 60,
    memoryMb: 171
  },
  {
    winId: 6,
    profileName: 'FB_Profile_AU_06',
    proxyIp: '45.133.192.77:1080',
    fingerprint: 'Win10 · Chrome 131 · Stealth Driver',
    currentAction: 'Requesting Virtual Number via 5Sim API',
    moduleBadge: 'Full Verify Reg',
    progress: 40,
    memoryMb: 149
  }
];

export const CyberShowcase: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('Full Verify Registration');
  const [isAutomating, setIsAutomating] = useState<boolean>(true);
  const [windowCount, setWindowCount] = useState<number>(10);
  const [otpProvider, setOtpProvider] = useState<string>('SMS-Man Global API');
  const [proxyType, setProxyType] = useState<string>('SOCKS5 Per-Account');
  const [tasks, setTasks] = useState<AccountTask[]>(INITIAL_TASKS);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [gridColumns, setGridColumns] = useState<2 | 3>(3);

  // Live simulation tick when automation is active
  useEffect(() => {
    if (!isAutomating) return;
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.progress >= 100) {
            return { ...t, status: 'Completed' };
          }
          const nextProg = Math.min(100, t.progress + Math.floor(Math.random() * 6) + 2);
          return {
            ...t,
            progress: nextProg,
            status: nextProg === 100 ? 'Completed' : 'Running',
            cookie:
              nextProg === 100 && t.cookie.startsWith('Pending')
                ? `c_user=1000948${Math.floor(10000 + Math.random() * 89999)}; xs=44%3AkP9...`
                : t.cookie
          };
        })
      );
    }, 1800);
    return () => clearInterval(interval);
  }, [isAutomating]);

  const handleExportCsv = () => {
    const headers = ['ID,Account,Module,Proxy,Country,Status,Progress,Cookie'];
    const rows = tasks.map(
      (t) =>
        `"${t.id}","${t.account}","${t.module}","${t.proxy}","${t.country}","${t.status}","${t.progress}%","${t.cookie}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'fbm_prime_exported_accounts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportNotice(`Exported ${tasks.length} accounts with cookies to CSV.`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  const handleResetDemoBatch = () => {
    setTasks(
      INITIAL_TASKS.map((t, idx) => ({
        ...t,
        progress: idx === 0 ? 100 : Math.floor(20 + Math.random() * 45),
        status: idx === 0 ? 'Completed' : 'Running'
      }))
    );
    setIsAutomating(true);
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.account.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.module.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.country.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <section id="demo-showcase" className="preview-cyber-section py-16 lg:py-24 relative overflow-hidden">
      {/* Cyber Grid BG */}
      <div className="cyber-grid-overlay" />
      {/* Ambient Glow Orbs */}
      <div className="web3-glow-mesh -top-16 -left-24" />
      <div
        className="web3-glow-mesh -bottom-24 -right-24"
        style={{ animationDuration: '15s', animationDirection: 'alternate-reverse' }}
      />

      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-bold tracking-wider uppercase text-blue-300 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full mb-3">
            Live Interface &amp; Interactive Demo
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-slate-100 tracking-tight mb-2">
            Desktop Application &amp;{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Multi-Browser Grid
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Real-time automation running inside isolated Chrome browser sessions. Interact with the live control deck below or watch the official walkthrough.
          </p>
        </div>

        {/* 1. TOP DASHBOARD — LASER BEAM FRAME */}
        <div className="web3-beam-wrapper mb-8">
          <div className="modern-img-frame-inner">
            {/* Window Header */}
            <div className="bg-slate-900/95 px-4 py-2.5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="text-slate-300 text-xs font-medium tracking-wide truncate">
                FBM Prime • Main Control Dashboard (v1.4.8 Desktop Engine)
              </div>
              <div className="text-xs font-mono-num text-emerald-400 font-semibold">
                {isAutomating ? 'ENGINE ACTIVE' : 'ENGINE PAUSED'}
              </div>
            </div>

            {/* Interactive Desktop Control Deck */}
            <div className="p-4 sm:p-6 bg-[#0b1224] text-slate-200">
              {/* Module Selector Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800">
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    'Full Verify Registration',
                    'No Verify Registration',
                    'Smart Profile Builder',
                    'Page Creation',
                    'Active Interaction'
                  ].map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setActiveModule(mod)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        activeModule === mod
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {mod}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAutomating(!isAutomating)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isAutomating
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {isAutomating ? 'Pause Automation' : 'Start Automation'}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDemoBatch}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Reload Batch
                  </button>
                </div>
              </div>

              {/* Configuration Controls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3.5">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Active Campaign Module
                  </label>
                  <div className="text-sm font-bold text-white truncate">{activeModule}</div>
                  <div className="text-[11px] text-blue-400 mt-1">
                    Auto Cookie + Stealth Playwright
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3.5">
                  <label htmlFor="otp-provider-select" className="block text-[11px] font-semibold text-slate-400 mb-1">
                    OTP &amp; Verification Source
                  </label>
                  <select
                    id="otp-provider-select"
                    value={otpProvider}
                    onChange={(e) => setOtpProvider(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="SMS-Man Global API">SMS-Man Global API</option>
                    <option value="5Sim Virtual Numbers">5Sim Virtual Numbers</option>
                    <option value="Hotmail / Outlook IMAP">Hotmail / Outlook IMAP</option>
                    <option value="Custom TXT / Excel List">Custom TXT / Excel List</option>
                  </select>
                </div>

                <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3.5">
                  <label htmlFor="proxy-type-select" className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Proxy Rotation &amp; Isolation
                  </label>
                  <select
                    id="proxy-type-select"
                    value={proxyType}
                    onChange={(e) => setProxyType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="SOCKS5 Per-Account">SOCKS5 Per-Account</option>
                    <option value="HTTP/HTTPS Dedicated">HTTP/HTTPS Dedicated</option>
                    <option value="Mobile 4G/5G Rotating">Mobile 4G/5G Rotating</option>
                  </select>
                </div>

                <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="window-slider" className="text-[11px] font-semibold text-slate-400">
                      Concurrent Chrome Windows
                    </label>
                    <span className="text-xs font-mono-num font-bold text-blue-400">
                      {windowCount} Windows
                    </span>
                  </div>
                  <input
                    id="window-slider"
                    type="range"
                    min={5}
                    max={20}
                    step={5}
                    value={windowCount}
                    onChange={(e) => setWindowCount(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer mt-1"
                  />
                  <div className="flex justify-between text-[10px] font-mono-num text-slate-500 mt-0.5">
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20 Max</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. BOTTOM DASHBOARD — AUTOMATION SETTINGS & TASK QUEUES */}
        <div
          className="web3-beam-wrapper mb-8"
          style={{ '--beam-c1': '#818cf8', '--beam-c2': '#34d399' } as React.CSSProperties}
        >
          <div className="modern-img-frame-inner">
            <div className="bg-slate-900/95 px-4 py-2.5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="text-slate-300 text-xs font-medium tracking-wide truncate">
                FBM Prime • Automation Settings &amp; Live Task Queues
              </div>
              <div className="text-xs font-mono-num text-blue-400 font-semibold">
                {tasks.filter((t) => t.status === 'Completed').length}/{tasks.length} COMPLETED
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-[#091020] text-slate-200">
              {/* Filter & CSV Export Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 flex-1 min-w-[220px] max-w-md">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Filter accounts by phone, email, country, or module..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {exportNotice && (
                    <span className="text-xs text-emerald-400 font-medium">
                      {exportNotice}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Export Finished to CSV
                  </button>
                </div>
              </div>

              {/* Live Account Task Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800/90 bg-slate-950/60">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/70">
                      <th className="py-2.5 px-3 font-semibold">Batch ID</th>
                      <th className="py-2.5 px-3 font-semibold">Account Identifier</th>
                      <th className="py-2.5 px-3 font-semibold">Module</th>
                      <th className="py-2.5 px-3 font-semibold">Assigned Proxy</th>
                      <th className="py-2.5 px-3 font-semibold">Live Step Status</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-2.5 px-3 font-mono-num text-blue-400 font-semibold whitespace-nowrap">
                          {task.id}
                        </td>
                        <td className="py-2.5 px-3 text-slate-200 font-medium whitespace-nowrap">
                          {task.account}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 whitespace-nowrap">
                          {task.module}
                        </td>
                        <td className="py-2.5 px-3 font-mono-num text-slate-400 whitespace-nowrap">
                          {task.proxy}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300">
                          <div className="truncate max-w-[240px]">{task.step}</div>
                          <div className="text-[10px] font-mono-num text-slate-500 truncate max-w-[240px]">
                            {task.cookie}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  task.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                            <span className="font-mono-num text-[11px] font-bold text-slate-200 w-9 text-right">
                              {task.progress}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BROWSER CONTAINER — ISOLATED MULTI-BROWSER GRID */}
        <div
          className="web3-beam-wrapper mb-8"
          style={{ '--beam-c1': '#10b981', '--beam-c2': '#06b6d4' } as React.CSSProperties}
        >
          <div className="modern-img-frame-inner">
            <div className="bg-slate-900/95 px-4 py-2.5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="text-slate-300 text-xs font-medium tracking-wide truncate">
                FBM Prime • Isolated Multi-Browser Grid (Anti-Detect Proxy Sessions)
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGridColumns(gridColumns === 3 ? 2 : 3)}
                  className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded cursor-pointer whitespace-nowrap"
                >
                  Grid: {gridColumns === 3 ? '3x2 Tile' : '2x3 Tile'}
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-[#070d19]">
              <div
                className={`grid grid-cols-1 ${
                  gridColumns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
                } gap-3.5`}
              >
                {BROWSER_INSTANCES.map((inst) => (
                  <div
                    key={inst.winId}
                    className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between"
                  >
                    {/* Mini Chrome Tab Bar */}
                    <div className="bg-slate-950 px-3 py-2 border-b border-slate-800 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono-num font-bold text-blue-400">
                          #{inst.winId.toString().padStart(2, '0')}
                        </span>
                        <span className="text-slate-200 font-semibold truncate">
                          {inst.profileName}
                        </span>
                      </div>
                      <span className="font-mono-num text-[10px] text-emerald-400">
                        {inst.proxyIp}
                      </span>
                    </div>

                    {/* Simulated Browser Viewport */}
                    <div className="p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{inst.moduleBadge}</span>
                        <span className="font-mono-num">{inst.memoryMb} MB RAM</span>
                      </div>

                      <div className="bg-slate-950/90 border border-slate-800/80 rounded-lg p-2.5">
                        <div className="text-[10px] font-mono-num text-slate-500 mb-1">
                          https://www.facebook.com/reg/
                        </div>
                        <div className="text-xs font-semibold text-slate-200 truncate">
                          {inst.currentAction}
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 flex items-center justify-between">
                        <span className="truncate">{inst.fingerprint}</span>
                        <span className="font-mono-num text-blue-400 font-bold ml-2">
                          {inst.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* HUD Capabilities Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 my-7 text-xs text-slate-300">
          <span className="bg-slate-900/80 border border-white/10 px-4 py-2 rounded-full">
            Multi-Thread Playwright Engine
          </span>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
          <span className="bg-slate-900/80 border border-white/10 px-4 py-2 rounded-full">
            Hardware Fingerprint Masking
          </span>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
          <span className="bg-slate-900/80 border border-white/10 px-4 py-2 rounded-full">
            Dedicated Per-Account Proxy
          </span>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
          <span className="bg-slate-900/80 border border-white/10 px-4 py-2 rounded-full">
            24/7 Unattended Execution
          </span>
        </div>

        {/* 4. VIDEO SHOWCASE — LASER BEAM WRAPPER */}
        <div
          className="web3-beam-wrapper"
          style={{ '--beam-c1': '#ef4444', '--beam-c2': '#3b82f6' } as React.CSSProperties}
        >
          <div className="modern-img-frame-inner">
            <div className="bg-slate-900/95 px-4 py-2.5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="text-slate-300 text-xs font-medium tracking-wide truncate">
                FBM Prime • Official Feature Walkthrough Video
              </div>
              <div className="text-xs font-semibold text-red-400">
                Walkthrough
              </div>
            </div>

            <div className="relative w-full pt-[70.2646%] bg-black overflow-hidden">
              <iframe
                loading="lazy"
                src="https://www.canva.com/design/DAHVzYcunow/0Qr5ioDLceoJHbW-iDSNHg/watch?embed"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                title="FBM Prime Demo Video"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            <div className="bg-[#060a14] px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span>Auto Reg Live</span>
                <span aria-hidden="true">·</span>
                <span>Smart Profile Setup</span>
                <span aria-hidden="true">·</span>
                <span>Anti-Detect Proxy Grid</span>
              </div>
              <div className="text-slate-400">
                Created by <strong className="text-slate-200">Muhammad Ahmed Ali</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
