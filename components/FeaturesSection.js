/**
 * Features Section — Zoe Landing Page
 */

const features = [
  {
    id: 1,
    icon: '📱',
    title: 'Quick Mood Log',
    description: 'Log your mood in seconds with our intuitive interface. Tap, rate, done.',
  },
  {
    id: 2,
    icon: '🧠',
    title: 'AI Insights',
    description: 'Discover correlations between mood, sleep, activity, and stress patterns.',
  },
  {
    id: 3,
    icon: '📊',
    title: 'Track Progress',
    description: 'Visualize your wellness trends over time with beautiful charts and graphs.',
  },
  {
    id: 4,
    icon: '🎯',
    title: 'Personalized Tips',
    description: 'Get daily recommendations based on your mood and activity data.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-sage mb-4">
          Why Zoe?
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Experience the future of mood tracking with intelligent, AI-powered insights.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="p-6 rounded-lg border-2 border-mint hover:border-sage transition-colors duration-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-playfair font-bold text-sage mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-inter">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
