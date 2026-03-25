import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ChevronRight,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Palette,
  Phone,
  Star,
  Twitter,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { PortfolioItem, Service, Testimonial } from "./backend.d";
import {
  usePortfolio,
  useServices,
  useSubmitContact,
  useTestimonials,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

const FALLBACK_SERVICES: Service[] = [
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive, beautiful interfaces that delight users and drive conversions. From wireframes to pixel-perfect deliverables.",
    iconName: "palette",
  },
  {
    title: "Web Development",
    description:
      "Full-stack web solutions built with modern frameworks. Fast, scalable, and SEO-optimized websites that perform.",
    iconName: "globe",
  },
  {
    title: "Brand Identity",
    description:
      "Strategic branding that tells your story. Logos, visual systems, and guidelines that make you memorable.",
    iconName: "layers",
  },
];

const FALLBACK_PORTFOLIO: PortfolioItem[] = [
  {
    title: "FinTech Dashboard",
    description: "Real-time analytics platform for investment tracking",
    category: "UI/UX Design",
    imageUrl: "/assets/generated/portfolio-1.dim_600x400.jpg",
  },
  {
    title: "Luxe Commerce",
    description: "Premium fashion e-commerce experience",
    category: "Web Development",
    imageUrl: "/assets/generated/portfolio-2.dim_600x400.jpg",
  },
  {
    title: "Aurum Brand",
    description: "Luxury brand identity and style guide",
    category: "Branding",
    imageUrl: "/assets/generated/portfolio-3.dim_600x400.jpg",
  },
  {
    title: "Venture Analytics",
    description: "SaaS dashboard for startup metrics",
    category: "UI/UX Design",
    imageUrl: "/assets/generated/portfolio-4.dim_600x400.jpg",
  },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    clientName: "Sarah Mitchell",
    role: "CEO",
    company: "Vertex Labs",
    quote:
      "Alex transformed our product from a confusing mess into something our users actually love. The attention to detail and strategic thinking was exceptional.",
    rating: 5n,
  },
  {
    clientName: "James Okafor",
    role: "Founder",
    company: "Lumin Studio",
    quote:
      "Working with Alex was the best design investment we've made. The brand identity perfectly captures who we are, and our clients constantly compliment it.",
    rating: 5n,
  },
  {
    clientName: "Priya Sharma",
    role: "Head of Product",
    company: "Nexus Health",
    quote:
      "Delivered beyond our expectations — on time, on budget, and with a polish that made our launch feel truly premium.",
    rating: 5n,
  },
];

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  palette: <Palette className="w-8 h-8" />,
  globe: <Globe className="w-8 h-8" />,
  layers: <Layers className="w-8 h-8" />,
  barchart: <BarChart3 className="w-8 h-8" />,
  zap: <Zap className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
};

function getServiceIcon(iconName: string): React.ReactNode {
  return SERVICE_ICONS[iconName.toLowerCase()] ?? <Zap className="w-8 h-8" />;
}

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const CATEGORY_GRADIENTS: Record<string, string> = {
  "UI/UX Design": "from-blue-900 to-indigo-800",
  "Web Development": "from-emerald-900 to-teal-800",
  Branding: "from-yellow-900 to-amber-800",
  Default: "from-purple-900 to-violet-800",
};

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-display font-bold text-lg tracking-widest uppercase text-foreground">
          Alex Reed Design
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact">
            <Button
              data-ocid="header.start_project.button"
              className="bg-gold text-navy font-display font-bold uppercase tracking-widest text-xs px-6 py-2 hover:bg-gold-dark transition-colors"
            >
              Start Project
            </Button>
          </a>
        </div>

        <button
          type="button"
          data-ocid="nav.menu.toggle"
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <Button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-gold text-navy font-display font-bold uppercase tracking-widest text-xs"
              >
                Start Project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 pt-40 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-gold font-display font-semibold uppercase tracking-[0.25em] text-sm mb-6">
            Freelance Designer & Developer
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.1] text-foreground mb-6">
            Turning Your Ideas Into{" "}
            <span className="text-gold">Digital Reality</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
            I craft purposeful digital experiences — from brand identities to
            full-stack web applications — that help businesses grow and stand
            out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#portfolio">
              <Button
                data-ocid="hero.discover_work.button"
                className="bg-gold text-navy font-display font-bold uppercase tracking-widest text-sm px-8 py-6 hover:bg-gold-dark shadow-gold transition-all hover:scale-105"
              >
                Discover My Work
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href="#contact">
              <Button
                variant="outline"
                data-ocid="hero.start_project.button"
                className="border-foreground/30 text-foreground font-display font-semibold uppercase tracking-widest text-sm px-8 py-6 hover:bg-foreground/10 transition-colors"
              >
                Start a Project
              </Button>
            </a>
          </div>

          <div className="mt-16 flex gap-10">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "30+", label: "Happy Clients" },
              { value: "6+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl text-gold">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hidden md:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full border border-gold/20 animate-pulse" />
            <div className="absolute inset-8 rounded-full border border-gold/30" />
            <div className="absolute inset-16 rounded-full bg-gold/10 border border-gold/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-display font-bold text-6xl text-gold opacity-60">
                  AR
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2">
                  Design
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const { data: services, isLoading } = useServices();
  const items = services?.length ? services : FALLBACK_SERVICES;

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-display font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            What I Do
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-foreground">
            Services Offered
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card rounded-lg p-8"
                data-ocid="services.loading_state"
              >
                <Skeleton className="w-12 h-12 mb-6 bg-muted" />
                <Skeleton className="w-40 h-6 mb-3 bg-muted" />
                <Skeleton className="w-full h-20 bg-muted" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {items.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`services.item.${i + 1}`}
                className="bg-card border border-border rounded-lg p-8 group hover:border-gold/50 hover:shadow-gold transition-all duration-300"
              >
                <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                  {getServiceIcon(service.iconName)}
                </div>
                <h3 className="font-display font-bold text-lg uppercase tracking-wide text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  data-ocid={`services.learn_more.${i + 1}.button`}
                  className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Portfolio() {
  const { data: items, isLoading } = usePortfolio();
  const portfolio = items?.length ? items : FALLBACK_PORTFOLIO;

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-display font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            My Work
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-foreground">
            Selected Portfolio
          </h2>
        </motion.div>

        {isLoading ? (
          <div
            className="grid md:grid-cols-3 gap-6"
            data-ocid="portfolio.loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-full h-64 bg-card" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((item, i) => {
              const gradient =
                CATEGORY_GRADIENTS[item.category] ?? CATEGORY_GRADIENTS.Default;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  data-ocid={`portfolio.item.${i + 1}`}
                  className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${gradient}`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-display font-bold text-lg text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function About() {
  const PROCESS_STEPS = [
    {
      n: "01",
      title: "Discovery",
      desc: "Deep dive into your goals, audience, and competitive landscape.",
    },
    {
      n: "02",
      title: "Strategy",
      desc: "Define the vision, scope, and creative direction together.",
    },
    {
      n: "03",
      title: "Design",
      desc: "Iterative design sprints with your feedback at every step.",
    },
    {
      n: "04",
      title: "Deliver",
      desc: "Pixel-perfect handoff with documentation and ongoing support.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold font-display font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            Who I Am
          </p>
          <h2 className="font-display font-bold text-3xl uppercase text-foreground mb-6">
            About Me
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm Alex Reed — a multidisciplinary designer and developer with over
            6 years of experience helping brands, startups, and entrepreneurs
            build digital products that matter.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            My approach blends strategic thinking with craft-level execution.
            Whether you need a complete rebrand, a new website, or a complex
            SaaS product, I bring clarity, creativity, and rigour to every
            engagement.
          </p>

          <h3 className="font-display font-bold text-xl uppercase text-foreground mb-6">
            My Process
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="font-display font-bold text-gold text-lg leading-none mt-0.5">
                  {step.n}
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground text-sm uppercase tracking-wide">
                    {step.title}
                  </div>
                  <div className="text-muted-foreground text-xs mt-1 leading-relaxed">
                    {step.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/assets/generated/about-photo.dim_600x700.jpg"
              alt="Alex Reed — Designer & Developer"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-gold/30 rounded-lg -z-10" />
          <div className="absolute -top-4 -left-4 w-1/3 h-1/3 border border-gold/20 rounded-lg -z-10" />
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { data, isLoading } = useTestimonials();
  const testimonials = data?.length ? data : FALLBACK_TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-display font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            Kind Words
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-foreground">
            Client Testimonials
          </h2>
        </motion.div>

        {isLoading ? (
          <div
            className="max-w-3xl mx-auto"
            data-ocid="testimonials.loading_state"
          >
            <Skeleton className="w-full h-48 bg-card" />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  data-ocid={`testimonials.item.${current + 1}`}
                  className="bg-card border border-border rounded-lg p-10 text-center"
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({
                      length: Number(testimonials[current].rating),
                    }).map((_, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: star ratings are positional
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="text-foreground text-lg leading-relaxed italic mb-8">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>
                  <div>
                    <div className="font-display font-bold text-foreground">
                      {testimonials[current].clientName}
                    </div>
                    <div className="text-gold text-sm mt-1">
                      {testimonials[current].role},{" "}
                      {testimonials[current].company}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  type="button"
                  data-ocid="testimonials.pagination_prev"
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2 items-center">
                  {testimonials.map((t, i) => (
                    <button
                      type="button"
                      key={t.clientName}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === current ? "bg-gold" : "bg-muted"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  data-ocid="testimonials.pagination_next"
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { mutate: submitContact, isPending } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    submitContact(
      { name, email, message },
      {
        onSuccess: () => {
          toast.success("Message sent! I'll be in touch within 24 hours.");
          setName("");
          setEmail("");
          setMessage("");
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  };

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-display font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            Let's Work Together
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-foreground">
            Get in Touch
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            data-ocid="contact.form"
            className="flex flex-col gap-6"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
              >
                Name
              </label>
              <Input
                id="contact-name"
                data-ocid="contact.name.input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
              >
                Email
              </label>
              <Input
                id="contact-email"
                type="email"
                data-ocid="contact.email.input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
              >
                Message
              </label>
              <Textarea
                id="contact-message"
                data-ocid="contact.message.textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project..."
                rows={6}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>
            <Button
              type="submit"
              data-ocid="contact.submit_button"
              disabled={isPending}
              className="bg-gold text-navy font-display font-bold uppercase tracking-widest text-sm py-6 hover:bg-gold-dark shadow-gold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 pt-4"
          >
            <div>
              <h3 className="font-display font-bold text-xl uppercase text-foreground mb-6">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-gold">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      Email
                    </div>
                    <a
                      href="mailto:hello@alexreeddesign.com"
                      className="text-foreground hover:text-gold transition-colors"
                    >
                      hello@alexreeddesign.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-gold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      Phone
                    </div>
                    <a
                      href="tel:+14155550192"
                      className="text-foreground hover:text-gold transition-colors"
                    >
                      +1 (415) 555-0192
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <h4 className="font-display font-semibold uppercase tracking-widest text-xs text-muted-foreground mb-4">
                Availability
              </h4>
              <p className="text-foreground">
                Currently accepting projects for{" "}
                <span className="text-gold font-semibold">Q2 2026</span>.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                I typically respond within 24 hours on business days.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <h4 className="font-display font-semibold uppercase tracking-widest text-xs text-muted-foreground mb-4">
                Follow Along
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.twitter.link"
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.linkedin.link"
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.github.link"
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="font-display font-bold text-lg tracking-widest uppercase text-foreground">
            Alex Reed Design
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground text-xs">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
