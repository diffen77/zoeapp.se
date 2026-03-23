/**
 * CTA Section — Zoe Landing Page
 */

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-sage to-mint">
      <div className="max-w-3xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
          Ready to Know Yourself Better?
        </h2>
        <p className="text-xl mb-8 font-inter opacity-90">
          Download Zoe today and start your mood tracking journey.
        </p>
        <a
          id="app-store"
          href="https://apps.apple.com/app/zoe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-sage px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
        >
          Download on App Store
        </a>
      </div>
    </section>
  );
}
