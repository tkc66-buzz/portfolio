export function Hero() {
  return (
    <section className="frame bg-[#1b1b1b] p-8 text-center text-fami-ivory">
      <p
        className="mb-3 text-xs uppercase tracking-[0.3em] text-fami-gold"
        style={{ fontFamily: "var(--font-press)" }}
      >
        PRESS START
      </p>
      <h1 className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-press)" }}>
        Takeshi Watanabe <span className="text-fami-gold">(Buzz)</span>
      </h1>
      <p className="mt-4 text-base [font-family:var(--font-noto)] md:text-lg">
        Backend Engineer with a Platform/Infra mindset—shipping reliable systems and observability.
        Also builds TypeScript full-stack and has a Data/ML background.
      </p>
    </section>
  );
}
