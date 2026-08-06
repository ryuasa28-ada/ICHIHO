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
          <span className="site-header__logo-txt">
            <span className="site-header__logo-mark">ICHIHO</span>
            <span className="site-header__logo-name">株式会社ICHIHO</span>
          </span>
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
   Flat-vector iconography (Bluedge-inspired: blue, single-weight)
   ========================================================= */
function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>);

}

/* ヒーロー全面に敷くフラットベクターの駿河湾。
   空は CSS のグラデーションが担当し、SVG は幅いっぱい・下端基準で重ねる。
   こうすると画面比が変わっても横方向がトリミングされない。 */
/* 波は線ではなく「面」で描く。y を頂点とする緩やかな帯を下端まで塗りつぶす。 */
function seaBand(y, amp) {
  const seg = 200;
  let d = `M0 ${y} Q${seg / 4} ${y - amp} ${seg / 2} ${y}`;
  for (let x = seg; x <= 1600 + seg; x += seg / 2) d += ` T${x} ${y}`;
  return `${d} L1600 900 L0 900 Z`;
}

function HeroBackdrop() {
  return (
    <svg className="hero__scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <circle cx="1236" cy="196" r="76" fill="#BFE0F0" />

      {/* 遠景の山並み（中央クロップでも主役が欠けないよう内側に寄せる） */}
      <path d="M0 660 L180 528 L330 604 L500 516 L700 660 Z" fill="#C3DCF2" />
      <path d="M1220 660 L1344 562 L1424 606 L1520 566 L1600 660 Z" fill="#C3DCF2" />

      {/* 富士山 — 稜線に沿って面を分けた陰影 + 白い雪冠 */}
      <path d="M690 660 L952 344 L1004 406 L1042 386 L1082 430 L1345 660 Z" fill="#2C6EC6" />
      <path d="M690 660 L952 344 L1000 660 Z" fill="#1A56B0" />
      <path d="M900 420 L952 344 L1004 406 L1042 386 L1074 424 L1022 438 L968 420 L932 434 Z" fill="#FFFFFF" />

      {/* 駿河湾 — 濃さの違う面を重ねて波を表現 */}
      <path d={seaBand(648, 0)} fill="#A9D8EC" />
      <path d={seaBand(700, 16)} fill="#7FC3E4" />
      <path d={seaBand(762, 15)} fill="#579FD3" />
      <path d={seaBand(826, 14)} fill="#3A7CBC" />

      {/* 帆船 — 輪郭線なし、面の重なりのみ */}
      <g transform="translate(1116 744) scale(2.2)">
        <rect x="-1.6" y="-48" width="3.2" height="46" fill="#0E2D5E" />
        <path d="M2 -48 L26 -42 L2 -36 Z" fill="#1A56B0" />
        <path d="M-4 -33 L-4 -4 L-30 -4 Z" fill="#FFFFFF" />
        <path d="M4 -27 L4 -4 L22 -4 Z" fill="#DCEBF7" />
        <path d="M-36 -3 L34 -3 L24 12 L-26 12 Z" fill="#0E2D5E" />
      </g>

      {/* カモメ — 塗りのシェイプ */}
      <g fill="#4C7FBE">
        <path d="M834 240 q20 -22 40 -4 q20 -18 40 4 q-22 -10 -40 6 q-18 -16 -40 -6 Z" />
        <path d="M950 172 q14 -16 28 -3 q14 -13 28 3 q-16 -7 -28 4 q-12 -11 -28 -4 Z" opacity="0.75" />
        <path d="M780 310 q12 -13 23 -2 q11 -11 23 2 q-13 -6 -23 4 q-10 -10 -23 -4 Z" opacity="0.6" />
      </g>
    </svg>);

}

/* =========================================================
   Hero
   ========================================================= */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <HeroBackdrop />
        <div className="hero__scrim"></div>
      </div>
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__anchor-row">
            <span className="anchor">SHIZUOKA · JAPAN</span>
            <span className="hero__anchor-sep" aria-hidden="true"></span>
            <span className="anchor anchor--mute">ICHIHO INC.</span>
          </div>
          <h1 className="hero__head">
            <span className="hero__head-line">モノの価値を見極め</span>
            <span className="hero__head-line">必要な人へ、<span className="hero__quote">届ける。</span></span>
          </h1>
          <p className="lead hero__lead">
            株式会社ICHIHOは、EC販売・リユース・EC販売支援を通じて、
            人・モノ・企業をつなぐ静岡発の会社です。
            Amazon・楽天市場・メルカリShopsなど複数のECを活用し、
            仕入れから販路開拓・商品ページ改善まで対応します。
          </p>
        </div>
      </div>
      <a className="hero__scroll" href="#philosophy" data-jump="philosophy" aria-label="Scroll down">
        <span className="hero__scroll-txt">Scroll down</span>
        <span className="hero__scroll-line" aria-hidden="true"></span>
      </a>
    </section>);

}

/* =========================================================
   Section header (Payn-style)
   ========================================================= */
function SectionHead({ num, anchor, jp, sub }) {
  return (
    <div className="section-head">
      <div className="section-head__row">
        <span className="section-head__mark" aria-hidden="true"></span>
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
    file: "business-ec.html",
    title: "EC販売事業",
    body: "家電・日用品・食品・ホビー用品など幅広い商品のEC販売を行っています。商品の特性や市場動向を分析し、Amazon・楽天市場・メルカリShopsなど、それぞれの商品に最適な販売チャネルを選定。豊富な販売データをもとに、価値を最大化する販売を実現します。",
    cls: "business__card--new"
  },
  {
    file: "business-reuse.html",
    logo: "assets/eco-cycle-logo.png",
    title: "リユース事業",
    body: "ecoサイクルでは、不用品の買取・回収を通じて、まだ使えるモノを必要とする人へ届けています。家電・パソコン・オーディオ機器・ホビー用品・日用品など幅広く対応。個人のお客様から法人様まで、さまざまなご相談を承ります。",
    cls: "business__card--reuse"
  },
  {
    file: "business-support.html",
    title: "EC販売支援事業",
    body: "地域メーカー様・卸業者様・生産者様の商品を、ECを活用して全国のお客様へ届ける販売支援を行っています。EC販売で培った経験を活かし、販路開拓・商品ページ改善・販売戦略の提案・販売パートナー事業まで、売上拡大をサポートします。",
    cls: "business__card--support"
  }];

  return (
    <section id="business" className="section section--business">
      <div className="container">
        <SectionHead num="02" anchor="BUSINESS" jp="事業内容" sub="EC販売・リユース・EC販売支援。三つの事業で、人・モノ・企業をつなぎます。" />
        <div className="business__grid business__grid--three">
          {items.map((it, i) =>
          <a key={i} href={it.file} className={`business__card ${it.cls}`}>
              <div className="business__title-row">
                <h3 className="h2 business__title">{it.title}</h3>
                {it.logo &&
              <img className="business__logo" src={it.logo} alt="ecoサイクル" />
              }
              </div>
              <p className="body business__body">{it.body}</p>
              <span className="business__more" aria-hidden="true">
                <span className="rnd-arrow"><ArrowRight /></span>
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