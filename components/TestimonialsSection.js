/**
 * Testimonials Section — Zoe Landing Page
 */

const testimonials = [
  {
    id: 1,
    quote:
      'Zoe changed how I understand my mental health. The AI insights are eerily accurate!',
    author: 'Sarah M.',
    role: 'Product Manager',
    avatar: '👩‍💼',
  },
  {
    id: 2,
    quote: 'Finally a mood tracker that actually helps me see patterns. Highly recommend.',
    author: 'James K.',
    role: 'Software Engineer',
    avatar: '👨‍💻',
  },
  {
    id: 3,
    quote:
      'The wearable integration is seamless. I love seeing all my wellness data in one place.',
    author: 'Emma L.',
    role: 'Fitness Coach',
    avatar: '👩‍🏫',
  },
  {
    id: 4,
    quote: 'Zoe helped me discover that exercise improves my mood more than I realized.',
    author: 'David R.',
    role: 'Wellness Enthusiast',
    avatar: '👨‍🏃',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-sage mb-16">
          What Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 rounded-lg border-2 border-mint/20 hover:border-mint transition-colors duration-200 bg-gradient-to-br from-sage/5 to-mint/5"
            >
              <p className="text-lg font-inter text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-playfair font-bold text-sage">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
