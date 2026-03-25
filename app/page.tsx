"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { translations, type Lang } from "./translations";

const EMAILJS_SERVICE_ID = "service_tacqz0b";
const EMAILJS_TEMPLATE_ID = "template_3yov3hs";
const EMAILJS_PUBLIC_KEY = "-BGhKDSFxI8D8E1hT";

type FormState = "idle" | "sending" | "success" | "error";

export default function Home() {
  const [lang, setLang] = useState<Lang>("vi");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormState("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setFormState("success");
      formRef.current.reset();
    } catch {
      setFormState("error");
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#destinations", label: t.nav.destinations },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      {/* ─── Navigation ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#f8f5ee]/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(27,43,94,0.08)] py-4"
            : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#home")}
            className={`font-[family-name:var(--font-playfair)] text-xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-[#1b2b5e]" : "text-[#f8f5ee]"
            }`}
          >
            Han Nguyen
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium tracking-wide transition-colors hover:opacity-60 ${
                  scrolled ? "text-[#1b2b5e]" : "text-[#f8f5ee]/90"
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Language toggle */}
            <div
              className={`flex items-center rounded-full p-0.5 border transition-colors ${
                scrolled ? "border-[#1b2b5e]/20" : "border-[#f8f5ee]/25"
              }`}
            >
              {(["vi", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    lang === l
                      ? "bg-[#c4993a] text-[#f8f5ee] shadow-sm"
                      : scrolled
                      ? "text-[#1b2b5e]/50 hover:text-[#1b2b5e]"
                      : "text-[#f8f5ee]/50 hover:text-[#f8f5ee]"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollTo("#contact")}
              className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#c4993a] text-[#f8f5ee] hover:bg-[#b08730] transition-colors duration-300 shadow-sm"
            >
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile language toggle */}
            <div
              className={`flex items-center rounded-full p-0.5 border ${
                scrolled ? "border-[#1b2b5e]/20" : "border-[#f8f5ee]/25"
              }`}
            >
              {(["vi", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-300 ${
                    lang === l
                      ? "bg-[#c4993a] text-[#f8f5ee]"
                      : scrolled
                      ? "text-[#1b2b5e]/50"
                      : "text-[#f8f5ee]/50"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Hamburger */}
            <button
              className="flex flex-col justify-center gap-1.5 w-8 h-8"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  scrolled ? "bg-[#1b2b5e]" : "bg-[#f8f5ee]"
                } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  scrolled ? "bg-[#1b2b5e]" : "bg-[#f8f5ee]"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  scrolled ? "bg-[#1b2b5e]" : "bg-[#f8f5ee]"
                } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#f8f5ee] border-t border-[#1b2b5e]/10 px-6 py-4">
            {navItems.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-3 text-[#1b2b5e] font-medium border-b border-[#1b2b5e]/10 last:border-0"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-4 w-full text-center font-semibold px-5 py-3 rounded-full bg-[#c4993a] text-[#f8f5ee]"
            >
              {t.nav.cta}
            </button>
          </div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <section
        id="home"
        className="min-h-screen relative overflow-hidden flex items-center"
      >
        {/* Background campus image */}
        <Image
          src="/hero-campus.jpg"
          alt="University campus"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlays: navy gradient left + dark tint overall */}
        <div className="absolute inset-0 bg-[#1b2b5e]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b2b5e]/95 via-[#1b2b5e]/70 to-[#1b2b5e]/30" />

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c4993a] via-[#e8c06a] to-[#c4993a]" />

        <div className="relative w-full flex flex-col">
          {/* Main content row */}
          <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 grid md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            {/* Left: headline + CTAs */}
            <div>
              <div className="inline-flex items-center gap-2.5 bg-[#c4993a]/15 border border-[#c4993a]/30 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#c4993a] animate-pulse flex-shrink-0" />
                <span className="text-[#c4993a] text-sm font-medium tracking-wide">
                  {t.hero.badge}
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-[#f8f5ee] leading-[1.05] mb-6">
                {t.hero.line1}
                <br />
                <span className="text-[#c4993a]">{t.hero.line2}</span>
                <br />
                {t.hero.line3}
              </h1>

              <p className="text-[#f8f5ee]/70 text-lg leading-relaxed mb-10 max-w-[420px]">
                {t.hero.sub}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="px-8 py-4 bg-[#c4993a] text-[#f8f5ee] font-semibold rounded-full hover:bg-[#b08730] transition-all duration-300 shadow-lg shadow-[#c4993a]/25"
                >
                  {t.hero.cta1}
                </button>
                <button
                  onClick={() => scrollTo("#services")}
                  className="px-8 py-4 border border-[#f8f5ee]/25 text-[#f8f5ee] font-semibold rounded-full hover:border-[#f8f5ee]/50 hover:bg-[#f8f5ee]/5 transition-all duration-300"
                >
                  {t.hero.cta2}
                </button>
              </div>
            </div>

            {/* Right: services & destinations panel */}
            <div className="bg-[#f8f5ee]/[0.07] backdrop-blur-sm border border-[#f8f5ee]/[0.12] rounded-3xl p-7 space-y-6">
              {/* Destinations */}
              <div>
                <p className="text-[#c4993a] text-xs font-semibold tracking-[0.15em] uppercase mb-3">
                  {t.destinations.label}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {t.destinations.items.map((d) => (
                    <div
                      key={d.country}
                      className="flex items-center gap-2 bg-[#f8f5ee]/[0.08] rounded-xl px-3 py-2"
                    >
                      <span className="text-lg leading-none">{d.flag}</span>
                      <span className="text-[#f8f5ee]/80 text-xs font-medium leading-tight">
                        {d.country}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#f8f5ee]/[0.1]" />

              {/* Services list */}
              <div>
                <p className="text-[#c4993a] text-xs font-semibold tracking-[0.15em] uppercase mb-3">
                  {t.services.label}
                </p>
                <ul className="space-y-2">
                  {t.services.items.map((s) => (
                    <li key={s.number} className="flex items-start gap-3">
                      <span className="mt-1 w-4 h-4 rounded-full border border-[#c4993a]/50 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c4993a]" />
                      </span>
                      <span className="text-[#f8f5ee]/80 text-sm leading-snug">
                        {s.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="max-w-7xl mx-auto px-6 pb-16 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#f8f5ee]/[0.1] rounded-2xl overflow-hidden">
              {t.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#f8f5ee]/[0.05] px-6 py-5 text-center hover:bg-[#f8f5ee]/[0.1] transition-colors duration-300"
                >
                  <div className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#c4993a]">
                    {stat.value}
                  </div>
                  <div className="text-[#f8f5ee]/55 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f8f5ee]/35 pointer-events-none">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#f8f5ee]/35 to-transparent" />
        </div>
      </section>

      {/* ─── About ─── */}
      <section id="about" className="py-32 bg-[#f8f5ee]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                <Image
                  src="/picture.JPG"
                  alt="Han Nguyen — Education Consultant"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1b2b5e]/30 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#1b2b5e] text-[#f8f5ee] rounded-2xl px-6 py-4 shadow-xl shadow-[#1b2b5e]/25">
                <div className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#c4993a]">
                  8+
                </div>
                <div className="text-[#f8f5ee]/75 text-sm mt-0.5">
                  {t.about.badge}
                </div>
              </div>
            </div>

            <div>
              <span className="text-[#c4993a] text-sm font-semibold tracking-[0.15em] uppercase mb-5 block">
                {t.about.label}
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#1b2b5e] leading-tight mb-7">
                {t.about.heading}
              </h2>
              <div className="space-y-4 text-[#1b2b5e]/65 leading-relaxed text-[1.0625rem]">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {t.about.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-[#1b2b5e]/[0.07] text-[#1b2b5e] text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-[#c4993a] text-sm font-semibold tracking-[0.15em] uppercase mb-5 block">
              {t.services.label}
            </span>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#1b2b5e] leading-tight max-w-lg">
                {t.services.heading}
              </h2>
              <p className="text-[#1b2b5e]/55 max-w-xs leading-relaxed">
                {t.services.sub}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-[#1b2b5e]/[0.08] rounded-3xl overflow-hidden">
            {t.services.items.map((service, i) => (
              <div
                key={service.number}
                className={`p-10 bg-white group hover:bg-[#f8f5ee] transition-colors duration-300 ${
                  i === 0
                    ? "rounded-tl-3xl"
                    : i === 1
                    ? "rounded-tr-3xl"
                    : i === 2
                    ? "rounded-bl-3xl"
                    : "rounded-br-3xl"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#1b2b5e]/[0.08] group-hover:text-[#c4993a]/20 transition-colors">
                    {service.number}
                  </span>
                  <span className="w-10 h-10 rounded-full border border-[#1b2b5e]/20 flex items-center justify-center group-hover:border-[#c4993a] group-hover:bg-[#c4993a] transition-all duration-300 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-[#1b2b5e]/35 group-hover:text-white transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7v10"
                      />
                    </svg>
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1b2b5e] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#1b2b5e]/60 leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="text-[#c4993a] text-sm font-medium">
                  {service.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Destinations ─── */}
      <section
        id="destinations"
        className="py-32 bg-[#1b2b5e] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(248,245,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(248,245,238,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="text-[#c4993a] text-sm font-semibold tracking-[0.15em] uppercase mb-5 block">
              {t.destinations.label}
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#f8f5ee] leading-tight">
              {t.destinations.heading}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {t.destinations.items.map((dest) => (
              <div
                key={dest.country}
                className="group bg-[#f8f5ee]/[0.04] border border-[#f8f5ee]/[0.09] rounded-2xl p-6 hover:bg-[#f8f5ee]/[0.09] hover:border-[#c4993a]/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{dest.flag}</div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#f8f5ee] mb-2">
                  {dest.country}
                </h3>
                <p className="text-[#f8f5ee]/50 text-sm leading-relaxed">
                  {dest.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Me ─── */}
      <section id="why" className="py-32 bg-[#f8f5ee]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <span className="text-[#c4993a] text-sm font-semibold tracking-[0.15em] uppercase mb-5 block">
                {t.why.label}
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#1b2b5e] leading-tight">
                {t.why.heading}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
              {t.why.items.map((reason) => (
                <div
                  key={reason.title}
                  className="relative pl-7 border-l-2 border-[#c4993a]/25 hover:border-[#c4993a] transition-colors duration-300"
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-[1.1rem] font-bold text-[#1b2b5e] mb-2.5">
                    {reason.title}
                  </h3>
                  <p className="text-[#1b2b5e]/60 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#c4993a] text-sm font-semibold tracking-[0.15em] uppercase mb-5 block">
              {t.testimonials.label}
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#1b2b5e]">
              {t.testimonials.heading}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item) => (
              <div
                key={item.name}
                className="bg-[#f8f5ee] rounded-3xl p-8 flex flex-col"
              >
                <div className="font-[family-name:var(--font-playfair)] text-7xl text-[#c4993a]/25 leading-none mb-3 select-none">
                  &ldquo;
                </div>
                <p className="text-[#1b2b5e]/75 leading-relaxed flex-1 mb-8">
                  {item.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1b2b5e] flex items-center justify-center flex-shrink-0">
                    <span className="font-[family-name:var(--font-playfair)] text-sm font-bold text-[#c4993a]">
                      {item.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#1b2b5e] text-sm">
                      {item.name}
                    </div>
                    <div className="text-[#1b2b5e]/45 text-xs mt-0.5">
                      {item.detail}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="py-32 bg-[#1b2b5e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <span className="text-[#c4993a] text-sm font-semibold tracking-[0.15em] uppercase mb-5 block">
                {t.contact.label}
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#f8f5ee] leading-tight mb-6">
                {t.contact.heading}
              </h2>
              <p className="text-[#f8f5ee]/65 leading-relaxed mb-10 max-w-sm">
                {t.contact.sub}
              </p>

              <div className="space-y-5 mb-10">
                {t.contact.contacts.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f8f5ee]/[0.08] flex items-center justify-center text-[#c4993a] text-sm flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[#f8f5ee]/40 text-xs uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-[#f8f5ee] font-medium text-sm mt-0.5">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {["Facebook", "Zalo", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 border border-[#f8f5ee]/20 text-[#f8f5ee]/60 text-sm rounded-full hover:border-[#c4993a] hover:text-[#c4993a] transition-colors duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f5ee]/[0.04] border border-[#f8f5ee]/[0.09] rounded-3xl p-8">
              {formState === "success" ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#c4993a]/20 border border-[#c4993a]/40 flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-[#c4993a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[#f8f5ee] font-semibold text-lg mb-2">
                    {lang === "vi" ? "Gửi thành công!" : "Message sent!"}
                  </p>
                  <p className="text-[#f8f5ee]/55 text-sm">
                    {lang === "vi"
                      ? "Tôi sẽ liên hệ lại với bạn sớm nhất có thể."
                      : "I'll get back to you as soon as possible."}
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-6 text-[#c4993a] text-sm underline underline-offset-2"
                  >
                    {lang === "vi" ? "Gửi tin nhắn khác" : "Send another message"}
                  </button>
                </div>
              ) : (
                <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[#f8f5ee]/60 text-xs uppercase tracking-wider mb-2 block">
                        {t.contact.form.name}
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        required
                        placeholder={t.contact.form.namePlaceholder}
                        className="w-full bg-[#f8f5ee]/[0.06] border border-[#f8f5ee]/[0.13] rounded-xl px-4 py-3 text-[#f8f5ee] placeholder-[#f8f5ee]/25 focus:outline-none focus:border-[#c4993a]/60 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[#f8f5ee]/60 text-xs uppercase tracking-wider mb-2 block">
                        {t.contact.form.phone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder={t.contact.form.phonePlaceholder}
                        className="w-full bg-[#f8f5ee]/[0.06] border border-[#f8f5ee]/[0.13] rounded-xl px-4 py-3 text-[#f8f5ee] placeholder-[#f8f5ee]/25 focus:outline-none focus:border-[#c4993a]/60 transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[#f8f5ee]/60 text-xs uppercase tracking-wider mb-2 block">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      required
                      placeholder={t.contact.form.emailPlaceholder}
                      className="w-full bg-[#f8f5ee]/[0.06] border border-[#f8f5ee]/[0.13] rounded-xl px-4 py-3 text-[#f8f5ee] placeholder-[#f8f5ee]/25 focus:outline-none focus:border-[#c4993a]/60 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[#f8f5ee]/60 text-xs uppercase tracking-wider mb-2 block">
                      {t.contact.form.service}
                    </label>
                    <select
                      name="service"
                      className="w-full bg-[#1b2b5e] border border-[#f8f5ee]/[0.13] rounded-xl px-4 py-3 text-[#f8f5ee]/80 focus:outline-none focus:border-[#c4993a]/60 transition-colors text-sm"
                    >
                      <option value="">{t.contact.form.servicePlaceholder}</option>
                      {t.contact.form.serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[#f8f5ee]/60 text-xs uppercase tracking-wider mb-2 block">
                      {t.contact.form.message}
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      placeholder={t.contact.form.messagePlaceholder}
                      className="w-full bg-[#f8f5ee]/[0.06] border border-[#f8f5ee]/[0.13] rounded-xl px-4 py-3 text-[#f8f5ee] placeholder-[#f8f5ee]/25 focus:outline-none focus:border-[#c4993a]/60 transition-colors resize-none text-sm"
                    />
                  </div>
                  {formState === "error" && (
                    <p className="text-red-400 text-sm text-center">
                      {lang === "vi"
                        ? "Có lỗi xảy ra. Vui lòng thử lại."
                        : "Something went wrong. Please try again."}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full py-4 bg-[#c4993a] text-[#f8f5ee] font-semibold rounded-xl hover:bg-[#b08730] transition-colors duration-300 shadow-lg shadow-[#c4993a]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "sending"
                      ? lang === "vi" ? "Đang gửi..." : "Sending..."
                      : t.contact.form.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-[#111d42] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-[family-name:var(--font-playfair)] font-bold text-[#f8f5ee]/70">
            {t.footer}
          </span>
          <span className="text-[#f8f5ee]/35 text-sm">
            © {new Date().getFullYear()} Han Nguyen. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
