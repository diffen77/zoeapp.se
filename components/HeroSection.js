/**
 * Hero Section — Zoe Landing Page
 * ================================
 */

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-sage via-white to-mint flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold text-sage mb-6">
          Know Yourself Better
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 font-inter">
          Track your mood, discover patterns, and improve your wellness with AI-powered insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#app-store"
            className="bg-sage hover:bg-opacity-90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Download on App Store
          </a>
          <a
            href="#features"
            className="border-2 border-sage text-sage hover:bg-sage hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200"
          >
            Learn More
          </a>
        </div>
        <div className="mt-16 text-gray-600 text-sm">
          <p>Available on iOS • Coming soon on Android</p>
        </div>
      </div>
    </section>
  );
}
