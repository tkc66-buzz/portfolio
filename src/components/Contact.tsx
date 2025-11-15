export function Contact() {
  return (
    <section className="frame bg-[#1b1b1b] p-6 text-fami-ivory">
      <h2
        className="text-xl text-fami-gold"
        style={{ fontFamily: "var(--font-press)" }}
      >
        Contact
      </h2>
      <p className="mt-3 text-sm [font-family:var(--font-noto)]">
        中身はあとで本番の連絡先に差し替えます。今は NES ボタンだけ配置。
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a className="nes-btn is-error" href="mailto:buzz@example.com">
          Email
        </a>
        <a className="nes-btn is-primary" href="https://github.com/yourid">
          GitHub
        </a>
        <a className="nes-btn" href="https://x.com/yourid">
          X / Twitter
        </a>
      </div>
    </section>
  );
}
