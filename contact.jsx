/* global React, SiteHeader, SiteFooter, HOME */
const { useState: useContactState } = React;

const TOPICS = [
  ["buy",   "商品の買取について"],
  ["stock", "法人・事業者様からの在庫相談"],
  ["maker", "地域メーカー様のEC販売相談"],
  ["sell",  "出品・卸・取引のご相談"],
  ["other", "その他お問い合わせ"],
];

function ContactPage() {
  const params = new URLSearchParams(window.location.search);
  const initial = TOPICS.some(t => t[0] === params.get("topic")) ? params.get("topic") : "buy";
  const [submitted, setSubmitted] = useContactState(false);
  const [form, setForm] = useContactState({ company: "", name: "", phone: "", email: "", topic: initial, message: "" });
  const h = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const reset = () => { setSubmitted(false); setForm({ company: "", name: "", phone: "", email: "", topic: "buy", message: "" }); };

  return (
    <>
      <SiteHeader current="contact" />
      <main>
        <section className="cpage">
          <div className="cpage__pattern" aria-hidden="true"></div>
          <div className="container cpage__inner">
            {/* Left — intro + direct contact */}
            <aside className="cpage__aside">
              <div className="dhero__crumb">
                <a href={HOME}>ホーム</a>
                <span aria-hidden="true">/</span>
                <span>お問い合わせ</span>
              </div>
              <div className="dhead__row" style={{ marginTop: "10px" }}>
                <span className="dhead__num">CONTACT</span>
              </div>
              <h1 className="cpage__title">お問い合わせ</h1>
              <p className="lead cpage__lead">
                お取引・買取・EC販売支援・商品掲載のご相談など、
                お気軽にお問い合わせください。担当スタッフが迅速に対応いたします。
              </p>
              <div className="cpage__direct">
                <a className="cpage__direct-card cpage__direct-card--tel" href="tel:07092045260">
                  <span className="anchor">TEL</span>
                  <span className="num cpage__direct-val">070-9204-5260</span>
                  <span className="small cpage__direct-sub">平日 10:00 – 18:00</span>
                </a>
                <div className="cpage__direct-card">
                  <span className="anchor">ADDRESS</span>
                  <span className="cpage__direct-addr">静岡県</span>
                  <span className="small cpage__direct-sub">古物商許可 取得済み</span>
                </div>
              </div>
            </aside>

            {/* Right — form card */}
            <div className="cpage__formwrap">
              <form className="contact__form cpage__form" onSubmit={submit}>
                {submitted ? (
                  <div className="contact__thanks">
                    <span className="anchor">SENT</span>
                    <h2 className="h2 contact__thanks-head">お問い合わせを受け付けました。</h2>
                    <p className="body contact__thanks-body">
                      この度はお問い合わせいただき、ありがとうございます。
                      担当スタッフより、改めてご連絡いたします。
                    </p>
                    <div className="cpage__thanks-cta">
                      <a href={HOME} className="btn btn--primary">ホームへ戻る</a>
                      <button type="button" className="btn btn--quiet" onClick={reset}>もう一度送る</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="contact__form-head">
                      <span className="anchor">FORM</span>
                      <span className="small">所要時間 約2分</span>
                    </div>
                    <div className="field">
                      <label className="label">お問い合わせ種別 <span className="label-req">必須</span></label>
                      <div className="contact__topic">
                        {TOPICS.map(([v, l]) => (
                          <label key={v} className={`contact__topic-opt ${form.topic === v ? "is-on" : ""}`}>
                            <input type="radio" name="topic" value={v} checked={form.topic === v} onChange={h("topic")} />
                            <span>{l}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">会社名・屋号等 <span className="label-opt">任意</span></label>
                      <input className="input" value={form.company} onChange={h("company")} placeholder="例：株式会社○○" />
                    </div>
                    <div className="field">
                      <label className="label">ご担当者名 <span className="label-req">必須</span></label>
                      <input className="input" required value={form.name} onChange={h("name")} placeholder="山田 太郎" />
                    </div>
                    <div className="field-row">
                      <div className="field">
                        <label className="label">電話番号 <span className="label-opt">任意</span></label>
                        <input className="input" value={form.phone} onChange={h("phone")} placeholder="090-0000-0000" />
                      </div>
                      <div className="field">
                        <label className="label">メールアドレス <span className="label-req">必須</span></label>
                        <input className="input" type="email" required value={form.email} onChange={h("email")} placeholder="name@example.com" />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">お問い合わせ内容 <span className="label-req">必須</span></label>
                      <textarea className="textarea" required value={form.message} onChange={h("message")} placeholder="お問い合わせ内容をご記入ください。" />
                    </div>
                    <p className="micro cpage__privacy">
                      送信いただいた個人情報は、お問い合わせへの対応のみに利用いたします。
                    </p>
                    <button type="submit" className="btn btn--primary btn--lg contact__submit">送信する</button>
                  </>
                )}
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
