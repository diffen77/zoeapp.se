/**
 * How It Works Section — Zoe Landing Page
 */

const steps = [
  {
    number: '01',
    title: 'Download & Setup',
    description: 'Get Zoe from the App Store and create your account in 2 minutes.',
  },
  {
    number: '02',
    title: 'Start Logging',
    description: 'Log your mood daily with a simple tap. Rate emotions, activities, and stress.',
  },
  {
    number: '03',
    title: 'Connect Wearables',
    description: 'Sync Apple Watch, Fitbit, or Oura Ring for deeper insights.',
  },
  {
    number: '04',
    title: 'Get Insights',
    description: 'Discover patterns and receive AI-powered recommendations for wellness.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-peach/10 to-mint/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-sage mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="text-5xl font-playfair font-bold text-mint/30 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-playfair font-bold text-sage mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 font-inter">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
