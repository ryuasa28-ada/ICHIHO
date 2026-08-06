/* global React, ReactDOM, SiteHeader, SiteFooter, HOME, CONTACT */
/* EC販売支援事業 — BtoB向けページ。header/footer は shared.jsx から。
   スタイルは support-page.css（このページ専用）。
   デザインはトップページと共通のシステム（Noto Sans JP / 紺ブルー + スカイブルー /
   波型の区切り / フラットなベクターイラスト / 丸いブルーの矢印）。
   文言・セクション構成は既存のまま。 */
const { useState: useEcState, useEffect: useEcEffect } = React;

const EC_TEL = "070-9204-5260";

const ES = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
function EI({ d, box = 24 }) { return <svg viewBox={`0 0 ${box} ${box}`} {...ES}>{d}</svg>; }
const E = {
  check: <EI d={<polyline points="20 6 9 17 4 12"/>} />,
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
  diff: <EI d={<><path d="M12 3v18"/><path d="M5 8h14M5 16h14"/></>} />,
  arrow: <EI d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />,
  chev: <EI d={<polyline points="6 9 12 15 18 9"/>} />,
  telIc: <EI d={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>} />,
};

/* ---- content (既存テキストをそのまま使用) ---- */
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
  { t: "商品ページ作成", d: "楽天市場やAmazonで販売するための商品ページを作成します。商品の特徴、使用シーン、価格帯、競合商品を確認しながら、購入につながりやすいページ作りを行います。" },
  { t: "販売導線の改善", d: "お客様が商品を見つけ、比較し、購入しやすくなるように、商品名・説明文・画像構成・価格設定・訴求内容を改善します。" },
  { t: "受注対応・販売管理", d: "注文確認、販売状況の確認、必要に応じたお客様対応など、EC販売に必要な実務をサポートします。" },
  { t: "広告運用・販促施策", d: "楽天市場やAmazon内での広告、クーポン、ポイント施策、キャンペーン時期に合わせた販売改善を行います。" },
  { t: "販売データの分析", d: "販売数、アクセス数、転換率、広告効果、競合状況を確認しながら、継続的に改善していきます。" },
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

/* ---- 共通パーツ ---- */
function SecHead({ anchor, jp, sub, align = "center" }) {
  return (
    <div className={`sp-head ${align === "left" ? "sp-head--left" : ""}`}>
      <span className="sp-head__row">
        <span className="sp-head__mark" aria-hidden="true"></span>
        <span className="sp-head__anchor">{anchor}</span>
      </span>
      <h2 className="sp-head__jp">{jp}</h2>
      {sub && <p className="sp-head__sub">{sub}</p>}
      <hr className="sp-head__rule" />
    </div>
  );
}

function SpBtn({ href, variant, children, size = "" }) {
  return (
    <a href={href} className={`sp-btn sp-btn--${variant} ${size}`}>
      {children}
      <span className="sp-arrow" aria-hidden="true">{E.arrow}</span>
    </a>
  );
}

function EcFaqItem({ item, i }) {
  const [open, setOpen] = useEcState(i === 0);
  return (
    <div className={`sp-faq__item ${open ? "is-open" : ""}`}>
      <button className="sp-faq__q" aria-expanded={open} onClick={() => setOpen(v => !v)}>
        <span className="sp-faq__qmark">Q</span>
        <span className="sp-faq__qtxt">{item.q}</span>
        <span className="sp-faq__chev">{E.chev}</span>
      </button>
      <div className="sp-faq__a"><div className="sp-faq__a-inner"><span>{item.a}</span></div></div>
    </div>
  );
}

function EcSupportPage() {
  /* スクロールで画面内に入った要素をフェード + スライドイン */
  useEcEffect(() => {
    const els = Array.from(document.querySelectorAll(
      ".sp-head, .sp-fv__copy, .sp-check, .sp-service, .sp-tile, " +
      ".sp-channel, .sp-note, .sp-cta__inner, .sp-perf > div, .sp-flow__item, " +
      ".sp-faq__item, .sp-lead-note"
    ));
    const perParent = new Map();
    els.forEach((el) => {
      const k = perParent.get(el.parentElement) || 0;
      perParent.set(el.parentElement, k + 1);
      el.style.setProperty("--sp-delay", `${Math.min(k, 6) * 70}ms`);
      el.setAttribute("data-sp-reveal", "");
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.setAttribute("data-sp-in", "");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SiteHeader current="support" headerCta={{ tel: EC_TEL }} />
      <main>
        {/* FV */}
        <section className="sp-fv">
          <div className="container">
            <div className="sp-fv__crumb">
              <a href={HOME}>ホーム</a><span aria-hidden="true">/</span>
              <a href={HOME + "#business"}>事業内容</a><span aria-hidden="true">/</span>
              <span>EC販売支援事業</span>
            </div>
            <div className="sp-fv__inner">
              <div className="sp-fv__copy">
                <span className="sp-fv__no">SALES SUPPORT · EC販売支援</span>
                <h1 className="sp-fv__title">良い商品を、<br /><span className="accent">もっと多くのお客様へ。</span></h1>
                <p className="sp-fv__lead">東海オンラインショップでは、楽天市場を中心に、メーカー様・卸業者様の商品販売を支援しています。商品ページ作成から広告運用・販売データ分析まで、EC販売に必要な業務を実務ベースでサポートします。</p>
                <div className="sp-fv__cta">
                  <SpBtn href={CONTACT} variant="primary">無料で相談する</SpBtn>
                  <SpBtn href="#services" variant="ghost">サービス内容を見る</SpBtn>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Worries */}
        <section className="sp-sec sp-wave sp-wave--white">
          <div className="container">
            <SecHead anchor="CHALLENGES" jp="こんなお悩みはありませんか？" />
            <div className="sp-checks">
              {WORRIES.map((w, i) => (
                <div key={i} className="sp-check">
                  <span className="sp-check__ic" aria-hidden="true">{E.check}</span>
                  <p className="sp-check__t">{w}</p>
                </div>
              ))}
            </div>
            <p className="sp-lead-note">そのようなお悩みを、EC販売の実務経験をもとにサポートします。</p>
          </div>
        </section>

        {/* Services */}
        <section className="sp-sec sp-sec--tint sp-wave sp-wave--tint" id="services">
          <div className="container">
            <SecHead anchor="SERVICES" jp="東海オンラインショップができること" />
            <div className="sp-services">
              {SERVICES.map((s, i) => (
                <article key={i} className="sp-service">
                  <span className="sp-service__no">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="sp-service__t">{s.t}</h3>
                  <p className="sp-service__d">{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Target businesses */}
        <section className="sp-sec sp-wave sp-wave--white">
          <div className="container">
            <SecHead anchor="FOR" jp="対象となる事業者様" />
            <div className="sp-tiles">
              {TARGETS.map((t, i) => (
                <div key={i} className="sp-tile">
                  <span className="sp-tile__ic" aria-hidden="true">{E[t.ic]}</span>
                  <p className="sp-tile__t">{t.t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="sp-sec sp-sec--tint sp-wave sp-wave--tint">
          <div className="container">
            <SecHead anchor="CHANNELS" jp="対応可能な販売先" sub="楽天市場を中心に、商品内容や販売条件に応じて、各ECモールでの販売を検討します。" />
            <div className="sp-channels">
              {CHANNELS.map((c, i) => (
                <article key={i} className="sp-channel">
                  <span className="sp-channel__ic" aria-hidden="true">{E.bag}</span>
                  <span className="sp-channel__t">{c}</span>
                </article>
              ))}
            </div>
            <div className="sp-note">
              <span className="sp-note__ic" aria-hidden="true">{E.info}</span>
              <span>商品によって向き不向きがあるため、販売前に販路との相性を確認したうえでご提案します。</span>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="sp-sec sp-sec--blue sp-wave sp-wave--blue">
          <div className="container">
            <div className="sp-cta__inner">
              <span className="sp-head__row">
                <span className="sp-head__mark" aria-hidden="true"></span>
                <span className="sp-head__anchor" style={{ color: "var(--sp-sky)" }}>CONTACT</span>
              </span>
              <h2 className="sp-cta__head">まずは商品情報をお聞かせください。</h2>
              <p className="sp-cta__sub">取り扱い商品や現在の販売状況をお伺いし、EC販売で伸ばせる可能性があるかを一緒に検討いたします。</p>
              <div className="sp-cta__btns"><SpBtn href={CONTACT} variant="onblue" size="sp-btn--lg">お問い合わせ</SpBtn></div>
            </div>
          </div>
        </section>

        {/* Performance-fee */}
        <section className="sp-sec sp-sec--ink sp-wave sp-wave--ink">
          <div className="container">
            <SecHead anchor="PERFORMANCE-BASED" jp="成果報酬型でのご相談も可能です" align="left" />
            <div className="sp-perf">
              <div>
                <p className="sp-perf__lead">初期費用や月額固定費を抑えた形で、EC販売を始められるプランのご相談も可能です。売れた分の利益から成果報酬をいただく形にすることで、メーカー様・卸業者様にとって低リスクでネット販売を始めやすい仕組みを目指しています。</p>
                <div className="sp-perf__pt"><span className="sp-perf__pt-ic" aria-hidden="true">{E.check}</span><span>初期費用・月額固定費を抑えた成果報酬型</span></div>
                <div className="sp-perf__pt"><span className="sp-perf__pt-ic" aria-hidden="true">{E.check}</span><span>低リスクでネット販売を始められる仕組み</span></div>
                <div className="sp-perf__pt"><span className="sp-perf__pt-ic" aria-hidden="true">{E.check}</span><span>無理に販売を進めず、売れる可能性がある商品を見極めて継続的に改善</span></div>
              </div>
              <div className="sp-perf__card">
                <p className="sp-perf__card-h">販売可否の判断基準</p>
                <div className="sp-criteria">
                  {CRITERIA.map((c, i) => (
                    <div key={i} className="sp-criterion"><span className="sp-criterion__dot" aria-hidden="true"></span>{c}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fit products */}
        <section className="sp-sec sp-wave sp-wave--white">
          <div className="container">
            <SecHead anchor="GOOD FIT" jp="このような商品に向いています" />
            <div className="sp-tiles">
              {FIT.map((f, i) => (
                <article key={i} className="sp-tile">
                  <span className="sp-tile__ic" aria-hidden="true">{E[f.ic]}</span>
                  <p className="sp-tile__t">{f.t}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Flow */}
        <section className="sp-sec sp-sec--tint sp-wave sp-wave--tint">
          <div className="container">
            <SecHead anchor="FLOW" jp="ご相談から販売開始までの流れ" />
            <ol className="sp-flow">
              {EC_FLOW.map((s, i) => (
                <li key={i} className="sp-flow__item">
                  <span className="sp-flow__no">STEP</span>
                  <span className="sp-flow__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="sp-flow__t">{s.t}</h3>
                  <p className="sp-flow__d">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="sp-sec sp-wave sp-wave--white">
          <div className="container">
            <SecHead anchor="FAQ" jp="よくある質問" />
            <div className="sp-faq">
              {EC_FAQ.map((item, i) => <EcFaqItem key={i} item={item} i={i} />)}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="sp-sec sp-sec--blue sp-wave sp-wave--blue">
          <div className="container">
            <div className="sp-cta__inner">
              <span className="sp-head__row">
                <span className="sp-head__mark" aria-hidden="true"></span>
                <span className="sp-head__anchor" style={{ color: "var(--sp-sky)" }}>CONTACT</span>
              </span>
              <h2 className="sp-cta__head">まずはお気軽にご相談ください。</h2>
              <p className="sp-cta__sub">EC販売を始めたい。今ある商品をもっと多くのお客様に届けたい。自社でEC担当者を採用する前に、まずは低リスクで試してみたい。そのようなメーカー様・卸業者様は、ぜひ一度ご相談ください。商品内容や販売条件を確認したうえで、EC販売で伸ばせる可能性があるかを一緒に検討いたします。</p>
              <div className="sp-cta__btns"><SpBtn href={CONTACT} variant="onblue" size="sp-btn--lg">お問い合わせはこちら</SpBtn></div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* SP floating CTA (single, controlled) */}
      <nav className="sp-fab" aria-label="お問い合わせ">
        <SpBtn href={CONTACT} variant="primary">無料で相談する</SpBtn>
      </nav>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<EcSupportPage />);
