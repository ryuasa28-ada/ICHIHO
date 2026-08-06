/* global React, SectionHead */
const { useState: useStateContact } = React;

function CompanySection() {
  const rows = [
    ["会社名",        "株式会社ICHIHO"],
    ["代表者",        "青木 一歩"],
    ["所在地",        "静岡県"],
    ["事業内容",      "EC販売事業、リユース事業、商品仕入販売、EC販売支援事業"],
    ["取扱商品",      "家電・玩具・日用品・食品・雑貨・ホビー用品 など"],
    ["販売チャネル",   "Amazon / 楽天市場 / メルカリShops / ヤフオク! / eBay"],
    ["許認可",        "古物商許可 取得済み"],
  ];
  return (
    <section id="company" className="section section--company">
      <div className="container">
        <SectionHead num="03" anchor="COMPANY" jp="会社概要" />
        <div className="company__grid">
          <dl className="company__list">
            {rows.map(([k, v]) => (
              <div key={k} className="company__row">
                <dt className="company__term">{k}</dt>
                <dd className="company__def">{v}</dd>
              </div>
            ))}
          </dl>
          <aside className="company__aside">
            <span className="anchor">LOCATION</span>
            <h3 className="h2 company__aside-head">静岡から、全国へ。</h3>
            <p className="body company__aside-body">
              富士山と駿河湾を望む静岡から、
              全国のお客様へ「いいモノ」をお届けしています。
            </p>
            <div className="company__map" aria-hidden="true">
              <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="200" fill="#EAF3FB" />
                <path d="M 0 90 Q 60 70 110 100 T 220 110 Q 270 115 320 90 L 320 200 L 0 200 Z" fill="#A9D8EC" />
                <path d="M 0 116 Q 70 100 140 126 T 250 132 Q 290 134 320 118 L 320 200 L 0 200 Z" fill="#7FC3E4" />
                <path d="M 0 150 Q 80 138 160 156 T 320 152 L 320 200 L 0 200 Z" fill="#579FD3" />
                <path d="M 30 92 L 80 30 L 95 45 L 110 35 L 125 50 L 175 92 Z" fill="#2C6EC6" />
                <path d="M 30 92 L 80 30 L 95 45 L 101 41 L 101 92 Z" fill="#1A56B0" />
                <path d="M 73 38 L 80 30 L 95 45 L 110 35 L 120 47 L 105 50 L 90 45 Z" fill="#fff" />
                <circle cx="210" cy="105" r="16" fill="#FFFFFF" opacity="0.65" />
                <circle cx="210" cy="105" r="7" fill="var(--accent)" />
                <text x="222" y="108" fontFamily="Inter" fontSize="10" letterSpacing="0.16em" fill="var(--ink)">SHIMIZU</text>
              </svg>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footer() {
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
            <a href="business-ec.html">EC販売事業</a>
            <a href="business-reuse.html">リユース事業</a>
            <a href="business-support.html">EC販売支援事業</a>
            <a href="#company">会社概要</a>
            <a href="contact.html">お問い合わせ</a>
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

window.CompanySection = CompanySection;
window.Footer = Footer;
