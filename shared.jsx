/* global React */
/* Shared header (with 事業内容 dropdown) + footer for ICHIHO sub-pages. */
const { useState: useSharedState } = React;

const HOME = "index.html";
const CONTACT = "contact.html";
const CONTACT_ECO = "contact.html?topic=sell";
const BUSINESS_PAGES = [
  { key: "ec",      file: "business-ec.html",     jp: "EC販売事業",     en: "EC SALES" },
  { key: "reuse",   file: "business-reuse.html",   jp: "リユース事業",   en: "REUSE" },
  { key: "support", file: "business-support.html", jp: "EC販売支援事業", en: "SALES SUPPORT" },
];

function SiteHeader({ current, headerCta }) {
  const [open, setOpen] = useSharedState(false);
  const [dd, setDd] = useSharedState(false);
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href={HOME} className="site-header__logo">
          <img src="assets/tokai-mark.svg" alt="" width="32" height="32" />
          <span>株式会社ICHIHO</span>
        </a>
        <nav className="site-header__nav">
          <a href={HOME + "#company"}>会社概要</a>
          <div className={`nav-dd ${dd ? "is-open" : ""}`}>
            <button
              className={`nav-dd__trigger ${["ec","reuse","support"].includes(current) ? "is-active" : ""}`}
              aria-haspopup="true"
              aria-expanded={dd}
              onClick={() => setDd(v => !v)}
            >
              事業内容
              <svg className="nav-dd__chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className="nav-dd__menu" role="menu">
              <a className="nav-dd__top" href={HOME + "#business"}>事業内容トップ ↗</a>
              <div className="nav-dd__sep"></div>
              {BUSINESS_PAGES.map(p => (
                <a key={p.key} className={`nav-dd__item ${current === p.key ? "is-active" : ""}`} href={p.file} role="menuitem">
                  <span className={`nav-dd__dot nav-dd__dot--${p.key}`}></span>
                  <span className="nav-dd__txt">
                    <span className="nav-dd__txt-jp">{p.jp}</span>
                    <span className="nav-dd__txt-en">{p.en}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <a className={current === "contact" ? "is-active" : ""} href={CONTACT}>お問い合わせ</a>
        </nav>
        {headerCta && (
          <div className="site-header__cta">
            <a className="site-header__tel" href={`tel:${(headerCta.tel || "").replace(/-/g, "")}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span className="site-header__tel-txt">
                <span className="site-header__tel-num">{headerCta.tel}</span>
                <span className="site-header__tel-sub">お電話でのご相談</span>
              </span>
            </a>
            <a className="btn btn--indigo btn--sm" href={CONTACT}>WEB相談</a>
          </div>
        )}
        <button className="site-header__burger" aria-label="menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={`site-header__drawer ${open ? "is-open" : ""}`}>
        <a href={HOME + "#company"}>会社概要</a>
        <a href={HOME + "#business"}>事業内容</a>
        {BUSINESS_PAGES.map(p => (
          <a key={p.key} className="drawer-sub" href={p.file}>— {p.jp}</a>
        ))}
        <a href={CONTACT}>お問い合わせ</a>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="assets/tokai-mark.svg" alt="" width="40" height="40" />
          <div>
            <div className="site-footer__name">株式会社ICHIHO</div>
            <div className="small">静岡県／古物商許可 取得済み</div>
            <div className="small site-footer__tagline">価値を見極め、未来へつなぐ。</div>
          </div>
        </div>
        <div className="site-footer__cols">
          <div className="site-footer__col">
            <span className="anchor">SITE</span>
            {BUSINESS_PAGES.map(p => <a key={p.key} href={p.file}>{p.jp}</a>)}
            <a href={HOME + "#company"}>会社概要</a>
            <a href={CONTACT}>お問い合わせ</a>
          </div>
          <div className="site-footer__col">
            <span className="anchor">LEGAL</span>
            <a href="#">プライバシーポリシー</a>
            <a href="#">特定商取引法に基づく表記</a>
          </div>
        </div>
      </div>
      <div className="container site-footer__base">
        <span className="micro">© 2019–{new Date().getFullYear()} 株式会社ICHIHO. All rights reserved.</span>
        <span className="anchor anchor--mute">SHIZUOKA · JAPAN</span>
      </div>
    </footer>
  );
}

window.HOME = HOME;
window.CONTACT = CONTACT;
window.CONTACT_ECO = CONTACT_ECO;
window.BUSINESS_PAGES = BUSINESS_PAGES;
window.SiteHeader = SiteHeader;
window.SiteFooter = SiteFooter;
