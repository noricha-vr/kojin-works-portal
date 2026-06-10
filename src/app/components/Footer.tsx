import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-line px-6 pb-10 pt-16 text-center">
      <p className="text-outline-faint font-display text-[clamp(2.2rem,8vw,5.5rem)] leading-none">
        KOJIN.WORKS
      </p>
      <p className="mt-6 font-mono text-sm tracking-[0.25em] text-dim">
        「あったらいいな」を、これからも。
      </p>
      <a
        href="https://github.com/noricha-vr"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-line px-7 py-3 font-bold text-snow transition-colors hover:border-lime hover:text-lime"
      >
        <Icon name="github" className="h-5 w-5" />
        github.com/noricha-vr
      </a>
      <p className="mt-12 font-mono text-sm text-dim">
        &copy; {new Date().getFullYear()} Kojin Works. All rights reserved.
      </p>
    </footer>
  );
}
