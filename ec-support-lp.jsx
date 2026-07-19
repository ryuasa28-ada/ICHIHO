/* global React, ReactDOM, SiteHeader, SiteFooter, HOME, CONTACT */
/* EC販売支援事業 — BtoB向け集客LP。header/footer は shared.jsx から。 */
const { useState: useEcState } = React;

const EC_TEL = "070-9204-5260";
const EC_TELHREF = "tel:" + EC_TEL.replace(/-/g, "");

const ES = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
function EI({ d, box = 24 }) { return <svg viewBox={`0 0 ${box} ${box}`} {...ES}>{d}</svg>; }
const E = {
  check: <EI d={<polyline points="20 6 9 17 4 12"/>} />,
  page: <EI d={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></>} />,
  route: <EI d={<><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h6a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6"/></>} />,
  clipboard: <EI d={<><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"/><path d="m9 14 2 2 4-4"/></>} />,
  megaphone: <EI d={<><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></>} />,
  chart: <EI d={<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></>} />,
  factory: <EI d={<><path d="M2 20h20V8l-6 4V8l-6 4V4H2z"/><line x1="6" y1="20" x2="6" y2="16"/><line x1="10" y1="20" x2="10" y2="16"/><line x1="14" y1="20" x2="14" y2="16"/></>} />,
  truck: <EI d={<><rect x="1" y="6" width="13" height="10" rx="1"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="6" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></>} />,
  box: <EI d={<><path d="M12 2 4 6v12l8 4 8-4V6z"/><path d="m4 6 8 4 8-4"/><line x1="12" y1="10" x2="12" y2="22"/></>} />,
  store: <EI d={<><path d="M3 9 4 3h16l1 6"/><path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/></>} />,
  network: <EI d={<><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5 5.8 17M12 11.5 18.2 17"/></>} />,
  flask: <EI d={<><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><line x1="7" y1="16" x2="17" y2="16"/></>} />,
  bag: <EI d={<><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>} />,
  info: <EI d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>} />,
  coins: <EI d={<><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/></>} />,
  repeat: <EI d={<><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></>} />,
  gift: <EI d={<><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9"/><path d="M12 8C12 5 10.5 3 8.5 3S6 4 6 5s1 3 6 3zM12 8c0-3 1.5-5 3.5-5S18 4 18 5s-1 3-6 3z"/></>} />,
  pin: <EI d={<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></>} />,
  diff: <EI d={<><path d="M12 3v18"/><path d="M5 8h14M5 16h14"/><circle cx="8" cy="8" r="0"/></>} />,
  arrow: <EI d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />,
  chev: <EI d={<polyline points="6 9 12 15 18 9"/>} />,
  telIc: <EI d={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>} />,
};

/* EC illustration — 藍基調のショップ画面＋カート＋グラフ */
const EC_ILLUS = (
  <svg viewBox="0 0 400 300" className="ec-illus" role="img" aria-label="ECショップ・カート・販売データのイメージ">
    <rect width="400" height="300" fill="#E9EDF3"/>
    {/* browser window */}
    <rect x="30" y="34" width="248" height="188" rx="10" fill="#FFFFFF" stroke="#DDE3EC"/>
    <rect x="30" y="34" width="248" height="30" rx="10" fill="#1F3D6B"/>
    <rect x="30" y="52" width="248" height="12" fill="#1F3D6B"/>
    <circle cx="46" cy="49" r="3.5" fill="#6B9BD1"/><circle cx="58" cy="49" r="3.5" fill="#6B9BD1" opacity="0.6"/><circle cx="70" cy="49" r="3.5" fill="#6B9BD1" opacity="0.4"/>
    {/* product image + lines */}
    <rect x="48" y="80" width="86" height="86" rx="6" fill="#E9EDF3" stroke="#DDE3EC"/>
    <path d="M62 150 L82 122 L96 138 L108 126 L120 150 Z" fill="#1F3D6B" opacity="0.85"/>
    <circle cx="112" cy="98" r="8" fill="#D17A3F" opacity="0.85"/>
    <rect x="150" y="82" width="104" height="10" rx="5" fill="#232A3A"/>
    <rect x="150" y="102" width="80" height="7" rx="3.5" fill="#DDE3EC"/>
    <rect x="150" y="116" width="92" height="7" rx="3.5" fill="#DDE3EC"/>
    <rect x="150" y="138" width="60" height="16" rx="4" fill="#D17A3F"/>
    <rect x="48" y="182" width="206" height="26" rx="6" fill="#1F3D6B"/>
    <rect x="120" y="192" width="62" height="7" rx="3.5" fill="#FFFFFF" opacity="0.9"/>
    {/* cart badge */}
    <circle cx="300" cy="70" r="30" fill="#1F3D6B"/>
    <g stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M289 62h4l2.4 12h9l2.2-8h-14"/><circle cx="296" cy="79" r="1.6"/><circle cx="305" cy="79" r="1.6"/>
    </g>
    <circle cx="316" cy="56" r="9" fill="#D17A3F"/><text x="316" y="60" fontSize="10" fill="#fff" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700">3</text>
    {/* data graph card */}
    <rect x="288" y="116" width="86" height="106" rx="10" fill="#FFFFFF" stroke="#DDE3EC"/>
    <rect x="300" y="128" width="40" height="7" rx="3.5" fill="#6F7689"/>
    <g fill="#1F3D6B">
      <rect x="300" y="188" width="12" height="20" rx="2" opacity="0.55"/>
      <rect x="318" y="176" width="12" height="32" rx="2" opacity="0.7"/>
      <rect x="336" y="160" width="12" height="48" rx="2" opacity="0.85"/>
      <rect x="354" y="146" width="12" height="62" rx="2"/>
    </g>
    <path d="M304 182 L322 172 L340 158 L360 146" stroke="#D17A3F" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* waves */}
    <g stroke="#6B9BD1" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7">
      <path d="M0 250 Q25 245 50 250 T100 250 T150 250 T200 250 T250 250 T300 250 T350 250 T400 250"/>
      <path d="M0 262 Q25 257 50 262 T100 262 T150 262 T200 262 T250 262 T300 262 T350 262 T400 262" opacity="0.55"/>
    </g>
  </svg>
);

/* ---- content (添付テキストを忠実に使用) ---- */
const WORRIES = [
  "EC販売を始めたいが、何から始めればいいか分からない",
  "楽天市場やAmazonに出品したいが、運用に不安がある",
  "自社EC担当者を採用するほどの余裕がない",
  "商品ページ作成や画像準備に時間をかけられない",
  "ネット販売を始めたが、思うように売上が伸びない",
  "広告や販促の運用方法が分からない",
  "卸先や小売店だけでなく、ネット販売の販路も広げたい",
  "在庫や既存商品を、もっと多くのお客様に届けたい",
];
const SERVICES = [
  { ic: "page", t: "商品ページ作成", d: "楽天市場やAmazonで販売するための商品ページを作成します。商品の特徴、使用シーン、価格帯、競合商品を確認しながら、購入につながりやすいページ作りを行います。" },
  { ic: "route", t: "販売導線の改善", d: "お客様が商品を見つけ、比較し、購入しやすくなるように、商品名・説明文・画像構成・価格設定・訴求内容を改善します。" },
  { ic: "clipboard", t: "受注対応・販売管理", d: "注文確認、販売状況の確認、必要に応じたお客様対応など、EC販売に必要な実務をサポートします。" },
  { ic: "megaphone", t: "広告運用・販促施策", d: "楽天市場やAmazon内での広告、クーポン、ポイント施策、キャンペーン時期に合わせた販売改善を行います。" },
  { ic: "chart", t: "販売データの分析", d: "販売数、アクセス数、転換率、広告効果、競合状況を確認しながら、継続的に改善していきます。" },
];
const TARGETS = [
  { ic: "factory", t: "メーカー様" },
  { ic: "truck", t: "卸業者様" },
  { ic: "box", t: "食品・日用品・雑貨・ペット用品などを扱う事業者様" },
  { ic: "store", t: "自社商品をECで販売したい事業者様" },
  { ic: "network", t: "実店舗や既存取引先以外の販路を広げたい事業者様" },
  { ic: "flask", t: "EC担当者採用の前に、まずはテスト販売をしたい事業者様" },
];
const CHANNELS = ["楽天市場", "Amazon", "メルカリShops", "その他EC販路"];
const CRITERIA = ["商品内容", "卸価格", "想定販売価格", "利益率", "在庫数", "供給体制", "競合状況", "EC販売との相性"];
const FIT = [
  { ic: "store", t: "すでに店舗や卸先で販売実績がある商品" },
  { ic: "coins", t: "粗利が確保しやすい商品" },
  { ic: "repeat", t: "継続購入が見込める商品" },
  { ic: "gift", t: "ギフト需要がある商品" },
  { ic: "pin", t: "地域性や独自性がある商品" },
  { ic: "diff", t: "競合商品と差別化できる商品" },
  { ic: "box", t: "食品、日用品、雑貨、ペット用品、ホビー用品など" },
];
const EC_FLOW = [
  { t: "お問い合わせ", d: "まずは、取り扱い商品や現在の販売状況についてお聞かせください。" },
  { t: "商品内容の確認", d: "商品内容、卸価格、想定販売価格、在庫数、供給体制を確認します。" },
  { t: "販売可否の判断", d: "EC販売との相性、利益率、競合状況を確認し、販売可能か判断します。" },
  { t: "販売ページ作成", d: "商品ページ、商品説明、販売導線を整えます。" },
  { t: "販売開始", d: "楽天市場など、商品に合った販路で販売を開始します。" },
  { t: "販売改善", d: "販売データを確認しながら、価格、ページ内容、広告、販促施策を改善していきます。" },
];
const EC_FAQ = [
  { q: "初期費用はかかりますか？", a: "商品内容や販売条件によって異なります。初期費用・月額固定費を抑えた成果報酬型でのご相談も可能です。" },
  { q: "どんな商品でも販売できますか？", a: "すべての商品をお受けできるわけではありません。商品内容、卸価格、想定販売価格、利益率、供給体制、競合状況を確認したうえで判断させていただきます。" },
  { q: "在庫はどちらが持ちますか？", a: "商品や販売条件によってご相談となります。メーカー様・卸業者様からの直送、または弊社側での在庫管理など、商品に合わせて検討します。" },
  { q: "楽天市場以外でも販売できますか？", a: "可能です。商品内容に応じて、Amazon、メルカリShops、他ECなども含めて検討します。" },
  { q: "広告費はかかりますか？", a: "販売を伸ばすために広告や販促施策を行う場合があります。広告費の有無や金額については、事前にご相談のうえ決定します。" },
];

function EcFaqItem({ item, i }) {
  const [open, setOpen] = useEcState(i === 0);
  return (
    <div className={`lp-faq__item ${open ? "is-open" : ""}`}>
      <button className="lp-faq__q" aria-expanded={open} onClick={() => setOpen(v => !v)}>
        <span className="lp-faq__qmark">Q</span>
        <span className="lp-faq__qtxt">{item.q}</span>
        <span className="lp-faq__chev">{E.chev}</span>
      </button>
      <div className="lp-faq__a"><div className="lp-faq__a-inner">{item.a}</div></div>
    </div>
  );
}

function EcSupportLP() {
  return (
    <>
      <SiteHeader current="support" headerCta={{ tel: EC_TEL }} />
      <main>
        {/* FV */}
        <section className="lp-fv">
          <div className="lp-fv__pattern" aria-hidden="true"></div>
          <div className="container">
            <div className="lp-fv__crumb">
              <a href={HOME}>ホーム</a><span aria-hidden="true">/</span>
              <a href={HOME + "#business"}>事業内容</a><span aria-hidden="true">/</span>
              <span>EC販売支援事業</span>
            </div>
            <div className="lp-fv__inner">
              <div className="lp-fv__copy">
                <div className="lp-fv__head-row">
                  <span className="lp-fv__no">SALES SUPPORT · EC販売支援</span>
                </div>
                <h1 className="lp-fv__title">良い商品を、<br /><span className="accent">もっと多くのお客様へ。</span></h1>
                <p className="lp-fv__lead">東海オンラインショップでは、楽天市場を中心に、メーカー様・卸業者様の商品販売を支援しています。商品ページ作成から広告運用・販売データ分析まで、EC販売に必要な業務を実務ベースでサポートします。</p>
                <div className="ec-fv__cta">
                  <a href={CONTACT} className="btn btn--indigo btn--block">無料で相談する</a>
                  <a href="#services" className="btn btn--ghost btn--block">サービス内容を見る</a>
                </div>
              </div>
              <div className="lp-fv__visual">{EC_ILLUS}</div>
            </div>
          </div>
        </section>

        {/* Worries */}
        <section className="lp-sec">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">CHALLENGES</span>
              <h2 className="lp-head__jp">こんなお悩みはありませんか？</h2>
            </div>
            <div className="ec-checks">
              {WORRIES.map((w, i) => (
                <div key={i} className="ec-check">
                  <span className="ec-check__ic">{E.check}</span>
                  <p className="ec-check__t">{w}</p>
                </div>
              ))}
            </div>
            <p className="ec-lead">そのようなお悩みを、EC販売の実務経験をもとにサポートします。</p>
          </div>
        </section>

        {/* Services */}
        <section className="lp-sec lp-sec--alt" id="services">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">SERVICES</span>
              <h2 className="lp-head__jp">東海オンラインショップができること</h2>
            </div>
            <div className="ec-services">
              {SERVICES.map((s, i) => (
                <article key={i} className="ec-service">
                  <span className="ec-service__ic">{E[s.ic]}</span>
                  <span className="ec-service__no">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="ec-service__t">{s.t}</h3>
                  <p className="ec-service__d">{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Target businesses */}
        <section className="lp-sec">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">FOR</span>
              <h2 className="lp-head__jp">対象となる事業者様</h2>
            </div>
            <div className="ec-targets">
              {TARGETS.map((t, i) => (
                <div key={i} className="ec-target">
                  <span className="ec-target__ic">{E[t.ic]}</span>
                  <p className="ec-target__t">{t.t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="lp-sec lp-sec--alt">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">CHANNELS</span>
              <h2 className="lp-head__jp">対応可能な販売先</h2>
              <p className="lp-head__sub">楽天市場を中心に、商品内容や販売条件に応じて、各ECモールでの販売を検討します。</p>
            </div>
            <div className="ec-channels">
              {CHANNELS.map((c, i) => (
                <article key={i} className="ec-channel">
                  <span className="ec-channel__ic">{E.bag}</span>
                  <span className="ec-channel__t">{c}</span>
                </article>
              ))}
            </div>
            <div className="ec-note">
              <span className="ec-note__ic">{E.info}</span>
              <span>商品によって向き不向きがあるため、販売前に販路との相性を確認したうえでご提案します。</span>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="lp-cta">
          <div className="container lp-cta__inner">
            <span className="lp-cta__eyebrow">CONTACT</span>
            <h2 className="lp-cta__head">まずは商品情報をお聞かせください。</h2>
            <p className="lp-cta__sub">取り扱い商品や現在の販売状況をお伺いし、EC販売で伸ばせる可能性があるかを一緒に検討いたします。</p>
            <div className="lp-cta__btns"><a href={CONTACT} className="btn btn--paper btn--lg btn--block">お問い合わせ</a></div>
          </div>
        </section>

        {/* Performance-fee */}
        <section className="lp-sec lp-sec--ink">
          <div className="container">
            <div className="lp-head">
              <span className="lp-head__anchor">PERFORMANCE-BASED</span>
              <h2 className="lp-head__jp">成果報酬型でのご相談も可能です</h2>
            </div>
            <div className="ec-perf">
              <div>
                <p className="ec-perf__lead">初期費用や月額固定費を抑えた形で、EC販売を始められるプランのご相談も可能です。売れた分の利益から成果報酬をいただく形にすることで、メーカー様・卸業者様にとって低リスクでネット販売を始めやすい仕組みを目指しています。</p>
                <div className="ec-perf__pt"><span className="ec-perf__pt-ic">{E.check}</span><span>初期費用・月額固定費を抑えた成果報酬型</span></div>
                <div className="ec-perf__pt"><span className="ec-perf__pt-ic">{E.check}</span><span>低リスクでネット販売を始められる仕組み</span></div>
                <div className="ec-perf__pt"><span className="ec-perf__pt-ic">{E.check}</span><span>無理に販売を進めず、売れる可能性がある商品を見極めて継続的に改善</span></div>
              </div>
              <div className="ec-perf__card">
                <p className="ec-perf__card-h">販売可否の判断基準</p>
                <div className="ec-criteria">
                  {CRITERIA.map((c, i) => (
                    <div key={i} className="ec-criterion"><span className="ec-criterion__dot"></span>{c}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fit products */}
        <section className="lp-sec">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">GOOD FIT</span>
              <h2 className="lp-head__jp">このような商品に向いています</h2>
            </div>
            <div className="ec-fit">
              {FIT.map((f, i) => (
                <article key={i} className="ec-fit__card">
                  <span className="ec-fit__ic">{E[f.ic]}</span>
                  <p className="ec-fit__t">{f.t}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Flow */}
        <section className="lp-sec lp-sec--alt">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">FLOW</span>
              <h2 className="lp-head__jp">ご相談から販売開始までの流れ</h2>
            </div>
            <ol className="lp-flow ec-flow">
              {EC_FLOW.map((s, i) => (
                <li key={i} className="lp-flow__item">
                  <span className="lp-flow__no">STEP</span>
                  <span className="lp-flow__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="lp-flow__t">{s.t}</h3>
                  <p className="lp-flow__d">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="lp-sec">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">FAQ</span>
              <h2 className="lp-head__jp">よくある質問</h2>
            </div>
            <div className="lp-faq">
              {EC_FAQ.map((item, i) => <EcFaqItem key={i} item={item} i={i} />)}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="lp-cta lp-cta--closing">
          <div className="container lp-cta__inner">
            <span className="lp-cta__eyebrow">CONTACT</span>
            <h2 className="lp-cta__head">まずはお気軽にご相談ください。</h2>
            <p className="lp-cta__sub">EC販売を始めたい。今ある商品をもっと多くのお客様に届けたい。自社でEC担当者を採用する前に、まずは低リスクで試してみたい。そのようなメーカー様・卸業者様は、ぜひ一度ご相談ください。商品内容や販売条件を確認したうえで、EC販売で伸ばせる可能性があるかを一緒に検討いたします。</p>
            <div className="lp-cta__btns"><a href={CONTACT} className="btn btn--paper btn--lg btn--block">お問い合わせはこちら</a></div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* SP floating CTA (single, controlled) */}
      <nav className="lp-fab lp-fab--single" aria-label="お問い合わせ">
        <a href={CONTACT} className="lp-fab__btn lp-fab__btn--call">{E.telIc}無料で相談する</a>
      </nav>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<EcSupportLP />);
