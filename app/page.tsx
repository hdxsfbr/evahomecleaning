import Image from "next/image";
import QuoteForm from "./components/QuoteForm";

const services = [
  {
    title: "Regular cleaning",
    description:
      "Keep your home fresh with consistent care for kitchens, bathrooms, bedrooms, and living spaces."
  },
  {
    title: "Deep cleaning",
    description:
      "A detailed reset that tackles buildup, edges, and the spots that need extra attention."
  },
  {
    title: "Move-in / Move-out",
    description:
      "A thorough clean for empty homes, rentals, and transitions so everything feels ready."
  }
];

const steps = [
  {
    title: "Request a free quote",
    description: "Tell us about your home, schedule, and priorities."
  },
  {
    title: "Eva follows up",
    description: "We ask a few quick questions and confirm the scope."
  },
  {
    title: "We schedule your visit",
    description: "We set the estimate or first cleaning and keep it easy."
  }
];

const testimonials = [
  "Eva's team made our condo feel brand new. So thoughtful and efficient.",
  "Dependable, friendly, and always on time. We love coming home after their visits.",
  "We booked a deep clean before guests arrived and it was spotless."
];

const faqs = [
  {
    question: "How do you price cleanings?",
    answer:
      "Pricing depends on home size, condition, and frequency. We confirm details before sharing a quote."
  },
  {
    question: "Do you bring supplies?",
    answer:
      "Yes. We arrive with quality supplies, and we can use your preferred products if you like."
  },
  {
    question: "Are you pet-friendly?",
    answer:
      "Absolutely. Let us know about pets so we can plan around them and keep everyone comfortable."
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We ask for 48 hours notice when possible. If something changes, just let us know."
  },
  {
    question: "What is the difference between deep and standard cleaning?",
    answer:
      "Standard focuses on maintenance and high-touch areas. Deep cleaning adds detailed work like baseboards and buildup."
  }
];

export default function Home() {
  return (
    <main className="text-ink-900">
      <header className="sticky top-0 z-50 border-b border-cloud-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/mascot-name-horizontal.png"
              alt="Eva Home Cleaning"
              width={220}
              height={64}
              priority
            />
          </div>
          <div className="hidden items-center gap-6 text-sm font-semibold text-ink-700 md:flex">
            <a
              href="tel:+14156256490"
              className="inline-flex items-center gap-2 rounded-full border border-cloud-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-200"
            >
              Call or text: (415) 625-6490
            </a>
            <a className="hover:text-ink-900" href="#services">
              Services
            </a>
            <a className="hover:text-ink-900" href="#how-it-works">
              How it works
            </a>
            <a className="hover:text-ink-900" href="#faq">
              FAQ
            </a>
            <a
              href="#quote"
              className="rounded-full bg-brand-700 px-4 py-2 text-white shadow-soft transition hover:bg-brand-600"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-30%] h-72 w-72 rounded-full bg-brand-100 blur-3xl" />
          <div className="absolute right-[-5%] top-[10%] h-80 w-80 rounded-full bg-brand-200 blur-3xl" />
          <div className="absolute left-[20%] bottom-[-20%] h-72 w-72 rounded-full bg-sparkle-50 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center rounded-full border border-brand-200 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              San Francisco + Peninsula
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl">
              A clean home, cared for by people you trust.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-600">
              Eva Home Cleaning offers friendly, professional residential cleaning for busy households. Book regular care, a deep clean, or move support tailored to your space.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#quote"
                className="inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600"
              >
                Get a Free Quote
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-cloud-200 bg-white px-6 py-3 text-sm font-semibold text-ink-700 transition hover:border-brand-200"
              >
                View Services
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Owner-led care with consistent, respectful cleaners",
                "Supplies included for a fresh, low-stress clean",
                "Thoughtful detail for kitchens, baths, and high-touch areas",
                "Clear communication and easy scheduling"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-cloud-200 bg-white/80 p-4 shadow-soft"
                >
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 010 1.415l-7.2 7.2a1 1 0 01-1.415 0l-3.2-3.2a1 1 0 011.415-1.415l2.493 2.492 6.493-6.492a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="text-sm text-ink-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute -right-6 -top-8 hidden h-16 w-16 rounded-full bg-sparkle-50 md:block" />
            <div className="rounded-3xl border border-cloud-200 bg-white/80 p-6 shadow-card">
              <Image
                src="/brand/mascot-no-background.png"
                alt="Eva Home Cleaning mascot"
                width={420}
                height={420}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Cleaning built around your home</h2>
          </div>
          <p className="max-w-xl text-sm text-ink-600">
            Choose regular care, a deep refresh, or move support. We tailor every visit to your space and priorities.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-cloud-200 bg-white/85 p-6 shadow-soft"
            >
              <h3 className="text-xl font-semibold text-ink-900">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-ink-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
          How it works
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Simple, personal, and clear</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-cloud-200 bg-white/80 p-6 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-lg font-semibold text-brand-700">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-ink-900">
                  {step.title}
                </h3>
              </div>
              <p className="mt-4 text-sm text-ink-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-cloud-200 bg-white/85 p-8 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              Service area
            </p>
            <h2 className="mt-3 text-3xl font-semibold">San Francisco + Peninsula</h2>
            <p className="mt-4 text-sm text-ink-600">
              Eva Home Cleaning serves households across San Francisco and the Peninsula with flexible scheduling and consistent, reliable care.
            </p>
          </div>
          <div className="rounded-3xl border border-brand-200 bg-brand-700 p-8 text-white shadow-soft">
            <h3 className="text-2xl font-semibold">Ready for a refresh?</h3>
            <p className="mt-3 text-sm text-white/80">
              Tell us about your home and we will follow up with a friendly, no-pressure quote.
            </p>
            <a
              href="#quote"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
          Testimonials
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Neighbors love the results</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((quote) => (
            <div
              key={quote}
              className="rounded-3xl border border-cloud-200 bg-white/80 p-6 text-sm text-ink-600 shadow-soft"
            >
              “{quote}”
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
          FAQ
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Helpful answers</h2>
        <div className="mt-10 grid gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-cloud-200 bg-white/85 p-6 shadow-soft"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-ink-900">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-ink-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Tell us about your home</h2>
            <p className="mt-4 text-sm text-ink-600">
              We respond quickly with a thoughtful quote. If you have specific priorities, mention them and we will tailor your visit.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-ink-700">
              <span className="rounded-full border border-cloud-200 bg-white px-3 py-1">
                Call or text:
              </span>
              <a
                href="tel:+14156256490"
                className="text-brand-700 transition hover:text-brand-600"
              >
                (415) 625-6490
              </a>
            </div>
            <div className="mt-6 rounded-2xl border border-sparkle-200 bg-sparkle-50 p-5 text-sm text-ink-600">
              <p className="font-semibold text-ink-900">Quick note</p>
              <p className="mt-2">
                Your information stays private and is only used to respond to your request.
              </p>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <footer className="border-t border-cloud-200 bg-white/90 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-sm text-ink-600 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/mascot-icon.png"
              alt="Eva Home Cleaning icon"
              width={40}
              height={40}
            />
            <span>Eva Home Cleaning</span>
          </div>
          <span>© {new Date().getFullYear()} Eva Home Cleaning</span>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Eva Home Cleaning",
            url: "https://evahomecleaning.com",
            image: "https://evahomecleaning.com/brand/mascot-name-horizontal.png",
            description:
              "Friendly, trustworthy residential cleaning for San Francisco and the Peninsula.",
            areaServed: ["San Francisco", "Peninsula"],
            address: {
              "@type": "PostalAddress",
              addressLocality: "San Francisco",
              addressRegion: "CA",
              addressCountry: "US"
            },
            serviceType: [
              "Residential cleaning",
              "Deep cleaning",
              "Move-in cleaning",
              "Move-out cleaning"
            ]
          })
        }}
      />
    </main>
  );
}
