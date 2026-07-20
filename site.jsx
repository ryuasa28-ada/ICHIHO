/* global React */
const { useState, useEffect, useRef } = React;

/* =========================================================
   Header
   ========================================================= */
function Header({ onJump }) {
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const [cdd, setCdd] = useState(false);
  const CONTACTS = [
    ["contact",     "contact.html",              "総合お問い合わせ", "事業全般・EC販売支援・取引", "ec"],
    ["contact-eco", "contact-eco.html", "ecoサイクル買取相談", "出張買取・無料査定", "reuse"],
  ];
  const BIZ = [
    ["ec",      "business-ec.html",     "EC販売事業",     "EC SALES"],
    ["reuse",   "business-reuse.html",   "リユース事業",   "REUSE"],
    ["support", "business-support.html", "EC販売支援事業", "SALES SUPPORT"],
  ];
  const click = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    onJump(id);
  };
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#top" className="site-header__logo" onClick={click("top")}>
          <img src="assets/tokai-mark.svg" alt="" width="32" height="32" />
          <span>株式会社ICHIHO</span>
        </a>
        <nav className="site-header__nav">
          <a href="#company" onClick={click("company")}>会社概要</a>
          <div className={`nav-dd ${dd ? "is-open" : ""}`}>
            <button className="nav-dd__trigger" aria-haspopup="true" aria-expanded={dd} onClick={() => setDd(v => !v)}>
              事業内容
              <svg className="nav-dd__chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className="nav-dd__menu" role="menu">
              <a className="nav-dd__top" href="#business" onClick={(e) => { setDd(false); click("business")(e); }}>事業内容トップ</a>
              <div className="nav-dd__sep"></div>
              {BIZ.map(([key, file, jp, en]) => (
                <a key={key} className="nav-dd__item" href={file} role="menuitem">
                  <span className={`nav-dd__dot nav-dd__dot--${key}`}></span>
                  <span className="nav-dd__txt">
                    <span className="nav-dd__txt-jp">{jp}</span>
                    <span className="nav-dd__txt-en">{en}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className={`nav-dd nav-dd--right ${cdd ? "is-open" : ""}`}>
            <button className="nav-dd__trigger" aria-haspopup="true" aria-expanded={cdd} onClick={() => setCdd(v => !v)}>
              お問い合わせ
              <svg className="nav-dd__chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className="nav-dd__menu" role="menu">
              {CONTACTS.map(([key, file, jp, note, dot]) => (
                <a key={key} className="nav-dd__item" href={file} role="menuitem">
                  <span className={`nav-dd__dot nav-dd__dot--${dot}`}></span>
                  <span className="nav-dd__txt">
                    <span className="nav-dd__txt-jp">{jp}</span>
                    <span className="nav-dd__txt-en">{note}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </nav>
        <button
          className="site-header__burger"
          aria-label="menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}>
          
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={`site-header__drawer ${open ? "is-open" : ""}`}>
        <a href="#company" onClick={click("company")}>会社概要</a>
        <a href="#business" onClick={click("business")}>事業内容</a>
        {BIZ.map(([key, file, jp]) => (
          <a key={key} className="drawer-sub" href={file}>— {jp}</a>
        ))}
        <a href="contact.html">お問い合わせ</a>
        {CONTACTS.map(([key, file, jp]) => (
          <a key={key} className="drawer-sub" href={file}>— {jp}</a>
        ))}
      </div>
    </header>);

}

/* =========================================================
   Hero
   ========================================================= */
function Hero({ motif }) {
  return (
    <section className="hero" id="top" style={{ height: "700px" }}>
      {motif !== "none" &&
      <div
        className={`hero__pattern hero__pattern--${motif}`}
        aria-hidden="true" />

      }
      {motif === "featured" &&
      <svg className="hero__fuji-bg" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path d="M -50 700 L 380 240 L 460 340 L 540 280 L 620 360 L 720 260 L 1100 700 Z" fill="var(--indigo)" opacity="0.07" />
          <path d="M 700 700 L 1000 360 L 1080 460 L 1160 400 L 1250 460 L 1700 700 Z" fill="var(--indigo)" opacity="0.05" />
        </svg>
      }
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__anchor-row">
            <span className="anchor">SHIZUOKA · JAPAN</span>
            <span className="hero__anchor-sep" aria-hidden="true"></span>
            <span className="anchor anchor--mute">ICHIHO INC.</span>
          </div>
          <h1 className="hero__head">
            <span className="serif" style={{ textAlign: "left", fontSize: "50px" }}><span style={{ fontSize: "45px" }}>モノの価値を見極め</span></span>
            <br />
            <span className="serif" style={{ fontSize: "50px" }}><span style={{ fontSize: "45px" }}>必要な人へ、</span></span>
            <span className="serif hero__quote" style={{ fontSize: "50px" }}><span style={{ width: "500px", height: "145px", fontSize: "45px" }}>届ける。</span></span>
          </h1>
          <p className="lead hero__lead">
            株式会社ICHIHOは、EC販売・リユース・EC販売支援を通じて、
            人・モノ・企業をつなぐ静岡発の会社です。
            Amazon・楽天市場・メルカリShopsなど複数のECを活用し、
            仕入れから販路開拓・商品ページ改善まで対応します。
          </p>
          <div className="hero__cta">
            <a href="#business" className="btn btn--primary" data-jump="business">事業内容を見る</a>
            <a href="contact.html" className="btn btn--ghost">お問い合わせ</a>
          </div>
          <dl className="hero__metrics">
            <div className="hero__metric">
              <dt className="anchor">DIVISIONS</dt>
              <dd className="num">3</dd>
            </div>
            <div className="hero__metric">
              <dt className="anchor">CHANNELS</dt>
              <dd className="num">5+</dd>
            </div>
            <div className="hero__metric">
              <dt className="anchor">LICENSE</dt>
              <dd className="num">古物商</dd>
            </div>
          </dl>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__visual-illustration">
            <img src="assets/illustration-shizuoka.svg" alt="" />
            <div className="hero__visual-illustration-foot">
              <span className="anchor">VIEW</span>
              <span className="small">駿河湾と富士山 / 静岡より</span>
            </div>
          </div>
          <div className="hero__visual-card hero__visual-card--new">
            <span className="tag tag--new">EC販売</span>
            <div className="hero__visual-stat">
              <span className="num">家電 · 日用品 · ホビー</span>
              <span className="small">Amazon / 楽天市場</span>
            </div>
          </div>
          <div className="hero__visual-card hero__visual-card--reuse">
            <span className="tag tag--reuse">リユース</span>
            <div className="hero__visual-stat">
              <span className="num">買取 · 回収 · 再販</span>
              <span className="small">ecoサイクル</span>
            </div>
          </div>
          <div className="hero__visual-card hero__visual-card--support">
            <span className="tag tag--support">EC販売支援</span>
            <div className="hero__visual-stat">
              <span className="num">販路開拓 · ページ改善</span>
              <span className="small">地域メーカー支援</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================
   Section header (Payn-style)
   ========================================================= */
function SectionHead({ num, anchor, jp, sub }) {
  return (
    <div className="section-head">
      <div className="section-head__row">
        <span className="section-head__num">{num}</span>
        <span className="anchor">{anchor}</span>
      </div>
      <h2 className="h1 section-head__jp">{jp}</h2>
      {sub && <p className="lead section-head__sub">{sub}</p>}
      <hr className="hairline" />
    </div>);

}

/* =========================================================
   Philosophy
   ========================================================= */
function PhilosophySection() {
  return (
    <section id="philosophy" className="section section--philosophy">
      <div className="container">
        <SectionHead num="01" anchor="PHILOSOPHY" jp="企業理念" sub="モノの価値を見極め、必要な人へ届ける。" />
        <div className="philosophy__body">
          <div className="philosophy__pull-wrap">
            <p className="serif philosophy__pull">
              「価値を見極め、<br />
              <span className="philosophy__quote">未来へつなぐ。</span>」
            </p>
            <div className="philosophy__rule" aria-hidden="true">
              <span className="anchor anchor--mute">EST. 2019</span>
              <span className="philosophy__rule-line" />
              <span className="anchor anchor--mute">SHIZUOKA, JAPAN</span>
            </div>
          </div>
          <div className="philosophy__text">
            <p>
              私たちは、商品やサービスが持つ本来の価値を見極め、
              必要とする人へ適切な形で届けることを使命としています。
            </p>
            <p>
              <strong>EC販売事業</strong>、<strong>リユース事業</strong>、
              <strong>EC販売支援事業</strong>を通じて、人・モノ・企業をつなぎ、
              新たな価値を創出します。
            </p>
            <p>
              変化する時代の中でも誠実な取引を積み重ね、
              地域社会とともに持続的な成長を目指します。
            </p>
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================
   Business — three divisions
   ========================================================= */
function BusinessSection() {
  const items = [
  {
    no: "4-1",
    file: "business-ec.html",
    tag: { label: "EC販売事業", cls: "tag--new" },
    title: "EC販売事業",
    lead: "商品価値を、最適な市場へ。",
    body: "家電・日用品・食品・ホビー用品など幅広い商品のEC販売を行っています。商品の特性や市場動向を分析し、Amazon・楽天市場・メルカリShopsなど、それぞれの商品に最適な販売チャネルを選定。豊富な販売データをもとに、価値を最大化する販売を実現します。",
    stats: [["MARKETS", "複数ECモール"], ["DATA", "販売データ活用"]],
    cls: "business__card--new"
  },
  {
    no: "4-2",
    file: "business-reuse.html",
    tag: { label: "リユース事業 / ecoサイクル", cls: "tag--reuse" },
    logo: "assets/eco-cycle-logo.png",
    title: "リユース事業",
    lead: "モノの価値を、次の人へ。",
    body: "ecoサイクルでは、不用品の買取・回収を通じて、まだ使えるモノを必要とする人へ届けています。家電・パソコン・オーディオ機器・ホビー用品・日用品など幅広く対応。個人のお客様から法人様まで、さまざまなご相談を承ります。",
    stats: [["BUY", "買取・回収"], ["LICENSE", "古物商許可"]],
    cls: "business__card--reuse"
  },
  {
    no: "4-3",
    file: "business-support.html",
    tag: { label: "EC販売支援事業", cls: "tag--support" },
    title: "EC販売支援事業",
    lead: "地域の価値を、全国へ。",
    body: "地域メーカー様・卸業者様・生産者様の商品を、ECを活用して全国のお客様へ届ける販売支援を行っています。EC販売で培った経験を活かし、販路開拓・商品ページ改善・販売戦略の提案・販売パートナー事業まで、売上拡大をサポートします。",
    stats: [["GROWTH", "販路開拓"], ["PAGES", "ページ改善"]],
    cls: "business__card--support"
  }];

  return (
    <section id="business" className="section section--business">
      <div className="container">
        <SectionHead num="02" anchor="BUSINESS" jp="事業内容" sub="EC販売・リユース・EC販売支援。三つの事業で、人・モノ・企業をつなぎます。" />
        <div className="business__grid business__grid--three">
          {items.map((it, i) =>
          <a key={i} href={it.file} className={`business__card ${it.cls}`}>
              <header className="business__card-head">
                <div className="business__card-top">
                  <span className="business__no">{it.no}</span>
                  <span className={`tag ${it.tag.cls}`}>{it.tag.label}</span>
                </div>
                <div className="business__title-row">
                  <h3 className="h2 business__title">{it.title}</h3>
                  {it.logo &&
                <img className="business__logo" src={it.logo} alt="ecoサイクル" />
                }
                </div>
                <p className="lead business__lead">{it.lead}</p>
              </header>
              <p className="body business__body">{it.body}</p>
              <footer className="business__card-foot">
                {it.stats.map(([en, jp]) =>
              <div key={en} className="business__stat">
                    <span className="anchor business__stat-en">{en}</span>
                    <span className="small business__stat-jp">{jp}</span>
                  </div>
              )}
              </footer>
              <span className="business__more">詳しく見る
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </a>
          )}
        </div>
      </div>
    </section>);

}

/* =========================================================
   ecoサイクル — reuse intake flow (LINE / TEL + 3 STEP)
   ========================================================= */
function EcoSection() {
  const steps = [
  { n: "STEP 1", t: "お問い合わせ", d: "LINE またはお電話で、お気軽にご連絡ください。" },
  { n: "STEP 2", t: "無料見積もり", d: "写真または現地確認による、無料お見積もりをいたします。" },
  { n: "STEP 3", t: "買取・回収", d: "金額にご納得いただいた後、買取・回収を行います。" }];

  return (
    <section id="eco" className="section section--eco">
      <div className="container">
        <div className="eco__top">
          <div className="eco__intro">
            <div className="section-head__row">
              <span className="section-head__num">03</span>
              <span className="anchor">REUSE · ecoサイクル</span>
            </div>
            <div className="eco__head-row">
              <img className="eco__logo" src="assets/eco-cycle-logo.png" alt="ecoサイクル" />
              <h2 className="h1 eco__head">ecoサイクル<br />ご利用の流れ</h2>
            </div>
            <p className="lead eco__lead">
              不用品の買取・回収は、LINE またはお電話で、かんたんにご相談いただけます。
              個人のお客様から法人様まで対応いたします。
            </p>
          </div>
          <div className="eco__cta" aria-label="お問い合わせ">
            <a className="eco__btn eco__btn--line" href="contact.html">
              <span className="eco__btn-sub">いちばん簡単</span>
              <span className="eco__btn-main">LINEで相談する</span>
            </a>
            <a className="eco__btn eco__btn--tel" href="tel:07092045260">
              <span className="eco__btn-sub">お電話でのご相談</span>
              <span className="eco__btn-main">070-9204-5260</span>
            </a>
            <span className="small eco__cta-note">受付時間 平日 10:00 – 18:00</span>
          </div>
        </div>
        <ol className="eco__steps">
          {steps.map((s, i) =>
          <li key={i} className="eco__step">
              <span className="eco__step-no anchor">{s.n}</span>
              <h3 className="h3 eco__step-title">{s.t}</h3>
              <p className="body eco__step-desc">{s.d}</p>
            </li>
          )}
        </ol>
      </div>
    </section>);

}

window.Header = Header;
window.Hero = Hero;
window.SectionHead = SectionHead;
window.PhilosophySection = PhilosophySection;
window.BusinessSection = BusinessSection;
window.EcoSection = EcoSection;