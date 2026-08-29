/* global React, ReactDOM, SiteHeader, SiteFooter, HOME */
/* 送信完了ページ。Formspree の _next からここへ戻ってくる。
   header/footer は shared.jsx、スタイルは pages.css の .cpage 系を流用。 */

function ThanksPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="cpage thanks">
          <div className="cpage__pattern" aria-hidden="true"></div>
          <div className="container thanks__inner">
            <span className="anchor">SENT</span>
            <h1 className="thanks__head">お問い合わせ<br />ありがとうございました</h1>
            <p className="lead thanks__body">
              内容を確認のうえ、担当者より2営業日以内にご返信いたします。
              お急ぎの場合はお電話（<a href="tel:07092045260">070-9204-5260</a>）までご連絡ください。
            </p>
            <div className="thanks__cta">
              <a href={HOME} className="btn btn--primary btn--lg">トップページへ戻る</a>
              <a href={HOME + "#business"} className="btn btn--ghost btn--lg">事業内容を見る</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ThanksPage />);
