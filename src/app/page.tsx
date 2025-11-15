export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <header className="mb-8 flex items-center gap-4">
        <i className="nes-mario" aria-hidden />
        <h1 className="text-xl" style={{ fontFamily: "var(--font-press)" }}>
          YOUR NAME
        </h1>
      </header>

      <section className="nes-container with-title mb-6">
        <h2 className="title" style={{ fontFamily: "var(--font-press)" }}>
          About
        </h2>
        <p className="[font-family:var(--font-noto)]">
          エンジニア。◯◯が得意です。これは NES.css を使った最小スターターです。
        </p>
      </section>

      <section className="nes-container with-title mb-6">
        <h2 className="title" style={{ fontFamily: "var(--font-press)" }}>
          Projects
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="nes-container">案件Aの概要…</div>
          <div className="nes-container">案件Bの概要…</div>
        </div>
      </section>

      <section className="nes-container with-title">
        <h2 className="title" style={{ fontFamily: "var(--font-press)" }}>
          Contact
        </h2>
        <div className="flex gap-3">
          <a className="nes-btn is-primary" href="mailto:you@example.com">
            Email
          </a>
          <a
            className="nes-btn"
            href="https://github.com/yourid"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
