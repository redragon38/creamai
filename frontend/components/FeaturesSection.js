import { Sparkles, LineChart, Brain, Mail, TrendingUp, BarChart3 } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Smart Automation',
      description: 'Automate repetitive tasks with AI, increasing efficiency and freeing up time for strategic and creative work, driving innovation and growth.',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Predictive Insights',
      description: 'Harness AI-driven data to uncover trends, predict outcomes.',
      hasReport: true,
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: 'Analytics Scanning',
      description: 'Get insights by enabling patterns and trends.',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Adaptive Learning',
      description: 'AI learns from user interactions, improving accuracy.',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Smart Inbox Organization',
      description: 'Automatically organize and categorize emails, making it easier to find, manage, and prioritize them.',
    },
  ];

  const emailProviders = [
    { name: 'Gmail', color: 'bg-red-500' },
    { name: 'Outlook', color: 'bg-blue-500' },
    { name: 'iCloud', color: 'bg-gray-500' },
    { name: 'Office', color: 'bg-orange-500' },
    { name: 'Mail', color: 'bg-blue-400' },
  ];

  return (
    <section id="features" className="py-20 bg-[#0a0118]/50" data-testid="features-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Unlock the Power of<br />Your Data with AI
          </h2>
          <p className="text-gray-900 max-w-2xl mx-auto">
            Automate repetitive tasks with AI, increasing efficiency and
            freeing up time strategic and creative work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Smart Automation - Large Card */}
          <div className="lg:col-span-2 gradient-card rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center">
                {features[0].icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{features[0].title}</h3>
                <p className="text-gray-600 text-sm">{features[0].description}</p>
              </div>
            </div>
            {/* Chart Visualization */}
            <div className="mt-6 bg-[#0a0118]/50 rounded-xl p-4">
              <div className="flex items-end justify-between h-32 gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 gradient-purple rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Predictive Insights */}
          <div className="gradient-card rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center mb-4">
              {features[1].icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{features[1].title}</h3>
            <p className="text-gray-600 text-sm mb-4">{features[1].description}</p>
            <div className="bg-[#0a0118]/50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-600">Report</span>
                <span className="text-xs text-gray-600">Live</span>
              </div>
              <p className="text-2xl font-bold">$127,632.00</p>
              <div className="flex gap-1 mt-2">
                {[30, 50, 40, 70, 45, 80, 60].map((h, i) => (
                  <div key={i} className="flex-1 bg-purple-500/50 rounded" style={{ height: `${h}px` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Analytics Scanning */}
          <div className="gradient-card rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center mb-4">
              {features[2].icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{features[2].title}</h3>
            <p className="text-gray-600 text-sm">{features[2].description}</p>
          </div>

          {/* Adaptive Learning */}
          <div className="gradient-card rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center mb-4">
              {features[3].icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{features[3].title}</h3>
            <p className="text-gray-600 text-sm mb-4">{features[3].description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 text-gray-900" />
                <span>Boost efficiency and accuracy with smart AI suggestions.</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 text-gray-900" />
                <span>Boost efficiency and accuracy with smart AI suggestions.</span>
              </div>
            </div>
          </div>

          {/* Smart Inbox Organization */}
          <div className="gradient-card rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center mb-4">
              {features[4].icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{features[4].title}</h3>
            <p className="text-gray-600 text-sm mb-4">{features[4].description}</p>
            <div className="flex gap-2">
              {emailProviders.map((provider, i) => (
                <div 
                  key={i} 
                  className={`w-10 h-10 ${provider.color} rounded-lg flex items-center justify-center`}
                  title={provider.name}
                >
                  <Mail className="w-5 h-5 text-gray-900" />
                </div>
              ))}
            </div>
            <button className="mt-4 gradient-purple text-white text-sm px-4 py-2 rounded-lg">
              AI Automation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
