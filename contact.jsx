/* global React, ReactDOM, SiteHeader, SiteFooter, FeatureIcon, HOME, CONTACT_ECO */
const { useState: useContactState } = React;

/* 送信は Formspree への通常の form POST。送信後は _next の thanks.html に戻る。
   総合 / eco は同じエンドポイントを共用し、hidden の _subject で件名を振り分ける。 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjyvvqny";
/* _next は絶対 URL でないと Formspree が受け付けない。公開先に合わせて変更する。 */
const THANKS_URL = "https://ryuasa28-ada.github.io/ICHIHO/thanks.html";

const TEL = "070-9204-5260";
const MAIL = "info@tokai-onlineshop.jp";
const LINE_URL = "https://line.me/R/ti/p/@379dykgb";

const VARIANTS = {
  general: {
    current: "contact",
    crumb: "総合お問い合わせ",
    title: "総合お問い合わせ",
    lead: "事業全般・EC販売支援・商品掲載・お取引のご相談など、お気軽にお問い合わせください。担当スタッフが迅速に対応いたします。",
    endpoint: FORMSPREE_ENDPOINT,
    subject: "【総合】お問い合わせが届きました",
    lineNote: "友だち追加はこちら",
    topics: [
      ["stock", "法人・事業者様からの在庫相談"],
      ["maker", "地域メーカー様のEC販売相談"],
      ["sell",  "出品・卸・取引のご相談"],
      ["other", "その他お問い合わせ"],
    ],
    defaultTopic: "stock",
    crossLabel: "中古品の買取・出張査定はこちら",
    crossSub: "ecoサイクル 買取のご相談",
    crossHref: CONTACT_ECO,
  },
  eco: {
    current: "contact-eco",
    crumb: "ecoサイクル 買取のご相談",
    title: "ecoサイクル 買取のご相談",
    lead: "家電・ゲーム機・スマホ・パソコンなどの出張買取についてのご相談窓口です。出張費・査定・キャンセルはすべて無料。商品名・型番・状態・お写真を添えていただけるとスムーズです。",
    endpoint: FORMSPREE_ENDPOINT,
    subject: "【ecoサイクル】買取のご相談が届きました",
    lineNote: "LINEなら写真送付もかんたん",
    topics: [
      ["quote", "出張買取・無料査定のご依頼"],
      ["item",  "買取可能か商品を相談したい"],
      ["corp",  "法人・店舗の在庫買取"],
      ["other", "その他ご相談"],
    ],
    defaultTopic: "quote",
    /* eco だけ「買取希望品目」のチェックボックスを出す */
    items: ["家電", "ゲーム機", "スマートフォン", "パソコン・プリンター", "おもちゃ・ホビー", "古本・漫画", "その他"],
    crossLabel: "事業・EC販売支援のお問い合わせはこちら",
    crossSub: "総合お問い合わせ",
    crossHref: "contact.html",
  },
};

const MSG_MAX = 1000;

function DirectCard({ icon, anchor, value, sub, href, big }) {
  const inner = (
    <React.Fragment>
      <FeatureIcon name={icon} className="cpage__direct-icon" />
      <span className="anchor">{anchor}</span>
      <span className={big ? "num cpage__direct-val" : "cpage__direct-addr"}>{value}</span>
      <span className="small cpage__direct-sub">{sub}</span>
    </React.Fragment>);

  if (!href) return <div className="cpage__direct-card">{inner}</div>;
  const external = href.indexOf("http") === 0;
  return (
    <a
      className="cpage__direct-card cpage__direct-card--link"
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {inner}
    </a>);

}

function ContactPage() {
  const rootEl = document.getElementById("root");
  const V = VARIANTS[rootEl && rootEl.dataset.variant === "eco" ? "eco" : "general"];
  const TOPICS = V.topics;
  const params = new URLSearchParams(window.location.search);
  const initial = TOPICS.some(t => t[0] === params.get("topic")) ? params.get("topic") : V.defaultTopic;
  const [form, setForm] = useContactState({ company: "", name: "", phone: "", email: "", topic: initial, message: "" });
  const [sending, setSending] = useContactState(false);
  const h = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  /* preventDefault しない。ブラウザにそのまま POST させ、Formspree から thanks.html へ戻る。 */
  const submit = () => setSending(true);

  return (
    <>
      <SiteHeader current={V.current} />
      <main>
        <section className="cpage">
          <div className="cpage__pattern" aria-hidden="true"></div>
          <div className="container cpage__inner">
            {/* Left — intro + direct contact */}
            <aside className="cpage__aside">
              <div className="dhero__crumb">
                <a href={HOME}>ホーム</a>
                <span aria-hidden="true">/</span>
                <span>{V.crumb}</span>
              </div>
              <div className="dhead__row" style={{ marginTop: "10px" }}>
                <span className="dhead__num">CONTACT</span>
              </div>
              <h1 className="cpage__title">{V.title}</h1>
              <p className="lead cpage__lead">{V.lead}</p>
              <div className="cpage__direct">
                <DirectCard icon="tel" anchor="TEL" value={TEL} sub="平日 10:00 – 18:00"
                  href={"tel:" + TEL.replace(/-/g, "")} big />
                <DirectCard icon="line" anchor="LINE" value="LINE公式アカウント" sub={V.lineNote}
                  href={LINE_URL} />
                <DirectCard icon="mail" anchor="MAIL" value={MAIL} sub="24時間受付"
                  href={"mailto:" + MAIL} />
                <DirectCard icon="address" anchor="ADDRESS" value="静岡県" sub="古物商許可 取得済み" />
              </div>
              <a className="cpage__cross" href={V.crossHref}>
                <span className="cpage__cross-txt">
                  <span className="cpage__cross-sub">{V.crossSub}</span>
                  <span className="cpage__cross-label">{V.crossLabel}</span>
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </aside>

            {/* Right — form card */}
            <div className="cpage__formwrap">
              {/*
                Formspree エンドポイント（開発・検証用）
                本番運用時は、info@tokai-onlineshop.jp で発行した本番用エンドポイントに
                差し替えてください。現在は開発者アカウントの xjyvvqny を使用中。
                総合 / eco の振り分けは hidden の _subject（件名）で行う。
              */}
              <form className="contact__form cpage__form" action={V.endpoint} method="POST" onSubmit={submit}>
                {/* Formspree 用の制御フィールド。_gotcha はハニーポット（人間は触らない） */}
                <input type="hidden" name="_subject" value={V.subject} />
                <input type="hidden" name="_next" value={THANKS_URL} />
                <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" style={{ display: "none" }} />

                <div className="contact__form-head">
                  <span className="anchor">FORM</span>
                  <span className="small">所要時間 約2分</span>
                </div>
                <div className="field">
                  <label className="label">お問い合わせ種別 <span className="label-req">必須</span></label>
                  <div className="contact__topic">
                    {TOPICS.map(([v, l]) => (
                      <label key={v} className={`contact__topic-opt ${form.topic === v ? "is-on" : ""}`}>
                        <input type="radio" name="inquiry_type" value={l} required
                          checked={form.topic === v}
                          onChange={() => setForm(f => ({ ...f, topic: v }))} />
                        <span>{l}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {V.items && (
                  <div className="field">
                    <label className="label">買取希望品目 <span className="label-opt">任意・複数選択可</span></label>
                    <div className="contact__items">
                      {V.items.map((it) => (
                        <label key={it} className="contact__item-opt">
                          <input type="checkbox" name="items" value={it} />
                          <span>{it}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div className="field">
                  <label className="label" htmlFor="f-company">会社名・屋号等 <span className="label-opt">任意</span></label>
                  <input id="f-company" name="company" className="input" autoComplete="organization"
                    value={form.company} onChange={h("company")} placeholder="例：株式会社○○" />
                </div>
                <div className="field">
                  <label className="label" htmlFor="f-name">ご担当者名 <span className="label-req">必須</span></label>
                  <input id="f-name" name="name" className="input" required autoComplete="name"
                    value={form.name} onChange={h("name")} placeholder="山田 太郎" />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label className="label" htmlFor="f-tel">電話番号 <span className="label-opt">任意</span></label>
                    <input id="f-tel" name="tel" className="input" type="tel" inputMode="tel" autoComplete="tel"
                      value={form.phone} onChange={h("phone")} placeholder="090-0000-0000" />
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="f-email">メールアドレス <span className="label-req">必須</span></label>
                    <input id="f-email" name="email" className="input" type="email" required autoComplete="email"
                      value={form.email} onChange={h("email")} placeholder="name@example.com" />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="f-message">お問い合わせ内容 <span className="label-req">必須</span></label>
                  <textarea id="f-message" name="message" className="textarea" required maxLength={MSG_MAX}
                    value={form.message} onChange={h("message")} placeholder="お問い合わせ内容をご記入ください。" />
                  <span className="micro contact__count">{form.message.length} / {MSG_MAX} 文字</span>
                </div>
                <p className="micro cpage__privacy">
                  送信いただいた個人情報は、お問い合わせへの対応のみに利用いたします。
                  <a className="cpage__privacy-link" href="#">プライバシーポリシー →</a>
                </p>
                <button type="submit" className="btn btn--primary btn--lg contact__submit" disabled={sending}>
                  {sending ? "送信中…" : "送信する"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ContactPage />);
