/* global React, ReactDOM, SiteHeader, SiteFooter, HOME, CONTACT */
/* 高く売るコツ — リユース事業のサブページ */
const TEL2 = "070-9204-5260";
const TELHREF2 = "tel:" + TEL2.replace(/-/g, "");
const LINE2 = "#";
const S2 = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
const chatIc = <svg viewBox="0 0 24 24" {...S2}><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-3.9-.9L3 21l1.9-5.6A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>;
const telIc2 = <svg viewBox="0 0 24 24" {...S2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const mailIc2 = <svg viewBox="0 0 24 24" {...S2}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>;
const arrowL = <svg viewBox="0 0 24 24" {...S2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;

const POINTS = [
  { n: "POINT 1", t: "季節商品や新商品は、売るタイミングが大切です", paras: [
    "中古品は、売る時期によって査定額が大きく変わります。液晶テレビ、パソコン、AV機器などは、流行の機能や需要が短期間で変化するため、数ヶ月の違いで買取価格に差が出ることがあります。",
    "「まだ買ったばかりだからもったいない」と思う商品でも、使わないと感じた時点で早めに査定へ出すことが高価買取のポイントです。",
    "ブランド品の新作は、少し使って「もう使わないかも」と思ったタイミングで、暖房器具などの季節商品はシーズンが始まる前後にご相談ください。その時期に需要が高まっている商品ほど、高額査定につながりやすくなります。早めの判断が、中古品を少しでも高く売るコツです。",
  ] },
  { n: "POINT 2", t: "説明書・保証書・付属品は大切に保管しておきましょう", paras: [
    "日本のリサイクル市場では、新品に近い状態の商品ほど人気があります。本体の状態はもちろん、説明書、保証書、付属品の有無も査定額に影響します。",
    "パソコンなどの場合は、元箱が残っているかどうかも重要なポイントです。また、ブランド品ではギャランティカードの有無が査定額を左右することもあります。",
    "購入時についていたものは、できるだけまとめて保管しておくことをおすすめします。",
  ] },
  { n: "POINT 3", t: "複数の商品をまとめて売ると査定額アップにつながります", paras: [
    "出張買取の際に複数の商品をまとめてお売りいただける場合は、1点ずつの査定額に加えて、まとめ売りによる上乗せ査定を行っております。",
    "当店では、商品の点数や内容に応じて、数千円から3万円程度の上乗せをさせていただく場合があります。売りたい商品が複数ある場合は、ぜひまとめてご相談ください。",
  ] },
];

function CtaTrio2({ size = "" }) {
  return (
    <>
      <a href={LINE2} className={`btn btn--line btn--block ${size}`} target="_blank" rel="noreferrer"><span className="btn__ic">{chatIc}</span>LINEで無料査定する</a>
      <a href={TELHREF2} className={`btn btn--call btn--block ${size}`}><span className="btn__ic">{telIc2}</span>電話で相談する</a>
      <a href={CONTACT} className={`btn btn--mail btn--block ${size}`}><span className="btn__ic">{mailIc2}</span>メールで問い合わせる</a>
    </>
  );
}

function SellTips() {
  return (
    <>
      <SiteHeader current="reuse" headerCta={{ tel: TEL2 }} />
      <main>
        <section className="lp-fv">
          <div className="lp-fv__pattern" aria-hidden="true"></div>
          <div className="container">
            <div className="lp-fv__crumb">
              <a href={HOME}>ホーム</a><span aria-hidden="true">/</span>
              <a href={HOME + "#business"}>事業内容</a><span aria-hidden="true">/</span>
              <a href="business-reuse.html">リユース事業</a><span aria-hidden="true">/</span>
              <span>高く売るコツ</span>
            </div>
            <div className="tips-hero">
              <span className="lp-head__anchor">TIPS</span>
              <h1 className="lp-fv__title">中古品を、少しでも<br /><span className="accent">高く売るコツ。</span></h1>
              <p className="lp-fv__lead">同じ商品でも、売るタイミングや保管状態によって査定額は変わります。ecoサイクルが、高価買取につながる3つのポイントをご紹介します。</p>
            </div>
          </div>
        </section>

        <section className="lp-sec">
          <div className="container">
            <div className="tips-list">
              {POINTS.map((p, i) => (
                <article key={i} className="tips-card">
                  <div className="tips-card__head">
                    <span className="tips-card__no">{p.n}</span>
                    <h2 className="tips-card__t">{p.t}</h2>
                  </div>
                  <div className="tips-card__body">
                    {p.paras.map((para, j) => <p key={j}>{para}</p>)}
                  </div>
                </article>
              ))}
            </div>
            <div className="tips-back">
              <a href="business-reuse.html" className="btn btn--quiet"><span className="btn__ic" style={{ marginRight: 4 }}>{arrowL}</span>リユース事業ページへ戻る</a>
            </div>
          </div>
        </section>

        <section className="lp-cta lp-cta--closing">
          <div className="container lp-cta__inner">
            <span className="lp-cta__eyebrow">CONTACT</span>
            <h2 className="lp-cta__head">まずは無料査定から。</h2>
            <p className="lp-cta__sub">無料査定・出張買取のご相談は、LINE・電話・メールよりお気軽にお問い合わせください。</p>
            <div className="lp-cta__btns"><CtaTrio2 size="btn--lg" /></div>
          </div>
        </section>
      </main>
      <SiteFooter />

      <nav className="lp-fab" aria-label="お問い合わせ">
        <a href={LINE2} className="lp-fab__btn lp-fab__btn--line" target="_blank" rel="noreferrer">{chatIc}LINE査定</a>
        <a href={TELHREF2} className="lp-fab__btn lp-fab__btn--call">{telIc2}電話</a>
        <a href={CONTACT} className="lp-fab__btn lp-fab__btn--mail">{mailIc2}メール</a>
      </nav>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<SellTips />);
