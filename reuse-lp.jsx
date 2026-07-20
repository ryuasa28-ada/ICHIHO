/* global React, ReactDOM, SiteHeader, SiteFooter, HOME, CONTACT, CONTACT_ECO */
/* リユース事業 / ecoサイクル — 集客LP。header/footer は shared.jsx から。 */
const { useState: useLpState } = React;

const TEL = "070-9204-5260";
const TELHREF = "tel:" + TEL.replace(/-/g, "");
const LINE = "#"; /* TODO: LINE公式アカウントURLに差し替え */

/* ---- inline stroke icons (lucide-style, 24x24) ---- */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
function I({ d, box = 24, extra }) {
  return <svg viewBox={`0 0 ${box} ${box}`} {...S}>{d}{extra}</svg>;
}
const IC = {
  gamepad: <I d={<><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><rect x="2" y="6" width="20" height="12" rx="2"/></>} />,
  phone: <I d={<><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>} />,
  appliance: <I d={<><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="8" y1="14" x2="8" y2="17"/></>} />,
  printer: <I d={<><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>} />,
  laptop: <I d={<><rect x="3" y="4" width="18" height="12" rx="1"/><line x1="2" y1="20" x2="22" y2="20"/></>} />,
  recorder: <I d={<><rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="8" cy="12" r="2.5"/><line x1="15" y1="10" x2="18" y2="10"/><line x1="15" y1="14" x2="18" y2="14"/></>} />,
  toy: <I d={<><path d="M12 2v6M12 8a4 4 0 0 0-4 4v8h8v-8a4 4 0 0 0-4-4z"/><circle cx="12" cy="4" r="2"/></>} />,
  hobby: <I d={<><path d="M5 13l-1.5 4.5L8 16"/><path d="M12 2c3 2 6 5 6 10 0 2-1 4-3 5H9c-2-1-3-3-3-5 0-5 3-8 6-10z"/><circle cx="12" cy="9" r="1.3"/></>} />,
  book: <I d={<><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5z"/><line x1="8" y1="7" x2="16" y2="7"/></>} />,
  boxes: <I d={<><path d="M12 2l8 4-8 4-8-4 8-4z"/><path d="M4 6v8l8 4 8-4V6"/><line x1="12" y1="10" x2="12" y2="18"/></>} />,
  check: <I d={<polyline points="20 6 9 17 4 12"/>} />,
  telIc: <I d={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>} />,
  mail: <I d={<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></>} />,
  chat: <I d={<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-3.9-.9L3 21l1.9-5.6A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/>} />,
  star: <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  chev: <I d={<polyline points="6 9 12 15 18 9"/>} />,
  arrow: <I d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />,
};

/* ---- content (添付テキストを忠実に使用) ---- */
const ITEMS = [
  { t: "ゲーム機", ic: "gamepad" }, { t: "スマートフォン", ic: "phone" }, { t: "家電", ic: "appliance" },
  { t: "プリンター", ic: "printer" }, { t: "パソコン", ic: "laptop" }, { t: "レコーダー", ic: "recorder" },
  { t: "おもちゃ", ic: "toy" }, { t: "ホビー", ic: "hobby" }, { t: "古本・漫画", ic: "book" },
  { t: "その他在庫品", ic: "boxes" },
];
const REC = [
  "自宅の不要品を売りたい方",
  "店舗や倉庫の在庫を整理したい方",
  "型落ち商品をまとめて売りたい方",
  "処分する前に買取できるか知りたい方",
];
const FLOW = [
  { t: "お問い合わせ", d: "LINE・電話・メールよりお問い合わせください。商品名・型番・状態・お写真をお送りいただけるとスムーズです。" },
  { t: "商品内容の確認", d: "お品物の内容や点数、対応エリアを確認いたします。" },
  { t: "査定", d: "商品の状態や需要、付属品の有無などを確認し、査定金額をご案内いたします。" },
  { t: "買取成立", d: "査定金額にご納得いただけましたら、買取成立となります。" },
  { t: "お支払い", d: "その場で現金買取が可能です。法人様や高額買取の場合は、お振込みでの対応となる場合もございます。" },
];
const REASONS = [
  { t: "静岡市地域密着の出張買取", d: "静岡市を中心に、地域密着で出張買取を行っています。地元のお客様に安心してご利用いただけるよう、丁寧な対応を心がけています。" },
  { t: "出張費・査定費無料", d: "出張費や査定費は無料です。「売れるか分からない」というお品物でも、まずはお気軽にご相談ください。" },
  { t: "古い商品も相談可能", d: "年式が古い商品でも、状態や需要によって買取できる場合があります。テレビ・パソコン・プリンター・AV機器など、処分する前に一度ご相談ください。" },
  { t: "無理な押し買いは一切なし", d: "査定金額にご納得いただけない場合は、キャンセル可能です。無理に買取をすすめることはありませんので、初めての方も安心してご利用いただけます。" },
  { t: "Google口コミでもご評価いただいています", d: "実際にご利用いただいたお客様から、対応の丁寧さや安心感について口コミをいただいております。初めてご依頼される方は、ぜひ口コミもご参考ください。" },
];
const REVIEWS = [
  { tag: "プリンター・パソコンの買取", body: "プリンターとパソコンの2台を買い取っていただきました。ご親切かつ丁寧な対応をしていただき、誠にありがとうございました。安心してお任せできる業者さんです。" },
  { tag: "急な買取のご相談", body: "急な買い取りでも、相談に応じて下さり、親切丁寧な買い取りでした。これからも、何か有れば、お願いしたいと思いました。本日は、有難うございました😊" },
  { tag: "42インチテレビの買取", body: "42インチテレビ年式が古かったけど引き取っていただけました。プリンターもふるかったにもかかわらず、買い取っていただきました。" },
  { tag: "テレビの買取・丁寧な対応", body: "TVを買い取っていただきました。とても丁寧に対応していただき、安心してお取引ができました。他のリサイクルショップに持ち込んだ際は、製造年だけで判断され「古いから」と冷たく断られたのですが、こちらのショップでは丁寧に対応していただきとても嬉しかったです。また何か不用品が出てきた際には真っ先にこちらにご相談しようと思いました。" },
];
const FAQ = [
  { q: "出張費はかかりますか？", a: "出張費は無料です。査定のみの場合でも、出張費はいただいておりませんので、お気軽にご相談ください。" },
  { q: "何点から出張買取に来てもらえますか？", a: "1点からでもご相談可能です。ただし、商品内容やお住まいの地域によっては、複数点まとめてのご依頼をお願いする場合がございます。" },
  { q: "対応エリアはどこまでですか？", a: "静岡県内を中心に出張買取を行っております。地域や商品内容によって対応可否が変わる場合がありますので、まずはお気軽にお問い合わせください。" },
  { q: "土日祝日でも対応できますか？", a: "土日祝日も対応可能です。平日がお忙しい方でもご利用いただけるよう、できる限りご希望の日時に合わせて調整いたします。" },
  { q: "当日でも依頼できますか？", a: "当日のご依頼も可能です。予約状況やお伺いするエリアによっては、別日でのご案内となる場合がございます。" },
  { q: "査定時間はどれくらいかかりますか？", a: "査定時間は、商品の点数や内容によって異なります。目安として、少量の場合は15分〜30分程度、点数が多い場合は1時間以上かかることもあります。" },
  { q: "その場で現金買取してもらえますか？", a: "買取金額にご納得いただけましたら、その場で現金にてお支払い可能です。法人様や高額買取の場合は、お振込みでの対応となる場合もございます。" },
  { q: "査定後にキャンセルできますか？", a: "査定金額にご納得いただけない場合は、キャンセル可能です。無理にお売りいただく必要はありませんので、ご安心ください。" },
  { q: "キャンセル料はかかりますか？", a: "査定後にキャンセルされた場合でも、キャンセル料はいただいておりません。まずは査定額だけ知りたいという方も、お気軽にご相談ください。" },
  { q: "大型家電や重たい商品の買取はできますか？", a: "商品内容によって対応可否が異なります。大型冷蔵庫・洗濯機・大型家具など、搬出に人手が必要な商品は対応できない場合がございます。まずは商品名・型番・サイズ・お写真をお送りいただけますと、対応可能か確認いたします。" },
];

/* ---- reusable CTA trio ---- */
function CtaTrio({ size = "", closing = false }) {
  return (
    <>
      <a href={LINE} className={`btn btn--line btn--block ${size}`} target="_blank" rel="noreferrer">
        <span className="btn__ic">{IC.chat}</span>LINEで無料査定する
      </a>
      <a href={TELHREF} className={`btn btn--call btn--block ${size}`}>
        <span className="btn__ic">{IC.telIc}</span>電話で相談する
      </a>
      <a href={CONTACT_ECO} className={`btn btn--mail btn--block ${size}`}>
        <span className="btn__ic">{IC.mail}</span>メールで問い合わせる
      </a>
    </>
  );
}

function Stars() {
  return <div className="lp-review__stars">{[0,1,2,3,4].map(i => <React.Fragment key={i}>{IC.star}</React.Fragment>)}</div>;
}

function FaqItem({ item, i }) {
  const [open, setOpen] = useLpState(i === 0);
  return (
    <div className={`lp-faq__item ${open ? "is-open" : ""}`}>
      <button className="lp-faq__q" aria-expanded={open} onClick={() => setOpen(v => !v)}>
        <span className="lp-faq__qmark">Q</span>
        <span className="lp-faq__qtxt">{item.q}</span>
        <span className="lp-faq__chev">{IC.chev}</span>
      </button>
      <div className="lp-faq__a"><div className="lp-faq__a-inner">{item.a}</div></div>
    </div>
  );
}

function ReuseLP() {
  return (
    <>
      <SiteHeader current="reuse" headerCta={{ tel: TEL }} />
      <main>
        {/* 3 · First view */}
        <section className="lp-fv">
          <div className="lp-fv__pattern" aria-hidden="true"></div>
          <div className="container">
            <div className="lp-fv__crumb">
              <a href={HOME}>ホーム</a><span aria-hidden="true">/</span>
              <a href={HOME + "#business"}>事業内容</a><span aria-hidden="true">/</span>
              <span>リユース事業</span>
            </div>
            <div className="lp-fv__inner">
              <div className="lp-fv__copy">
                <div className="lp-fv__head-row">
                  <span className="lp-fv__no">REUSE · ecoサイクル</span>
                  <img className="lp-fv__logo" src="assets/eco-cycle-logo.png" alt="ecoサイクル" />
                </div>
                <div className="lp-fv__badges">
                  <span className="lp-fv__badge">出張費無料</span>
                  <span className="lp-fv__badge">査定無料</span>
                  <span className="lp-fv__badge">キャンセル無料</span>
                  <span className="lp-fv__badge">その場で現金買取</span>
                </div>
                <h1 className="lp-fv__title">捨てる前に、<br /><span className="accent">まずは無料査定。</span></h1>
                <p className="lp-fv__lead">静岡県内で、家電・ゲーム機・スマホ・おもちゃ・ホビー用品などの出張買取。出張費無料・査定無料・キャンセル無料。査定金額にご納得いただけましたら、その場で現金買取も可能です。</p>
                <div className="lp-fv__cta"><CtaTrio /></div>
              </div>
              <div className="lp-fv__visual">
                <img className="lp-fv__illus" src="assets/illustration-shizuoka.svg" alt="富士山と駿河湾" />
                <div className="lp-fv__facts">
                  <div className="lp-fv__fact"><span className="lp-fv__fact-k">サービス名</span><span className="lp-fv__fact-v">ecoサイクル</span></div>
                  <div className="lp-fv__fact"><span className="lp-fv__fact-k">対応品目</span><span className="lp-fv__fact-v">家電・PC・スマホ・ホビー ほか</span></div>
                  <div className="lp-fv__fact"><span className="lp-fv__fact-k">許可</span><span className="lp-fv__fact-v">古物商許可 取得済み</span></div>
                  <div className="lp-fv__fact"><span className="lp-fv__fact-k">対象</span><span className="lp-fv__fact-v">個人・法人どちらも対応</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 · Buy items */}
        <section className="lp-sec">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">ITEMS</span>
              <h2 className="lp-head__jp">買取対象アイテム</h2>
              <p className="lp-head__sub">家電・デジタル機器からホビー用品まで、幅広く買取いたします。</p>
            </div>
            <div className="lp-items">
              {ITEMS.map((it, i) => (
                <article key={i} className="lp-item">
                  <span className="lp-item__ic">{IC[it.ic]}</span>
                  <span className="lp-item__t">{it.t}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5 · Recommend */}
        <section className="lp-sec lp-sec--alt">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">RECOMMENDED</span>
              <h2 className="lp-head__jp">こんな方におすすめ</h2>
            </div>
            <div className="lp-rec">
              {REC.map((t, i) => (
                <article key={i} className="lp-rec__card">
                  <span className="lp-rec__check">{IC.check}</span>
                  <p className="lp-rec__t">{t}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6 · Flow */}
        <section className="lp-sec">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">FLOW</span>
              <h2 className="lp-head__jp">買取の流れ</h2>
              <p className="lp-head__sub">LINE・電話・メールから、かんたんにご相談いただけます。</p>
            </div>
            <ol className="lp-flow">
              {FLOW.map((s, i) => (
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

        {/* 7 · Reasons */}
        <section className="lp-sec lp-sec--alt">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">WHY CHOOSE US</span>
              <h2 className="lp-head__jp">選ばれる理由</h2>
            </div>
            <div className="lp-reasons">
              {REASONS.map((r, i) => (
                <article key={i} className="lp-reason">
                  <span className="lp-reason__no">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="lp-reason__t">{r.t}</h3>
                    <p className="lp-reason__d">{r.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 8 · Mid CTA */}
        <section className="lp-cta">
          <div className="container lp-cta__inner">
            <span className="lp-cta__eyebrow">FREE ASSESSMENT</span>
            <h2 className="lp-cta__head">まずは無料査定から。</h2>
            <p className="lp-cta__sub">出張費・査定費・キャンセルすべて無料。売れるか分からないお品物でも、まずはお気軽にご相談ください。</p>
            <div className="lp-cta__btns"><CtaTrio /></div>
          </div>
        </section>

        {/* 9 · Reviews */}
        <section className="lp-sec">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">REVIEWS</span>
              <h2 className="lp-head__jp">お客様からの声</h2>
              <p className="lp-head__sub">実際にご利用いただいたお客様からいただいた口コミです。</p>
            </div>
            <div className="lp-reviews">
              {REVIEWS.map((r, i) => (
                <article key={i} className="lp-review">
                  <Stars />
                  <p className="lp-review__body">{r.body}</p>
                  <span className="lp-review__tag">{r.tag}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 10 · FAQ */}
        <section className="lp-sec lp-sec--alt">
          <div className="container">
            <div className="lp-head lp-head--center">
              <span className="lp-head__anchor">FAQ</span>
              <h2 className="lp-head__jp">よくある質問</h2>
            </div>
            <div className="lp-faq">
              {FAQ.map((item, i) => <FaqItem key={i} item={item} i={i} />)}
            </div>
          </div>
        </section>

        {/* 11 · Sell-tips banner */}
        <section className="lp-sec">
          <div className="container">
            <div className="lp-tips">
              <div>
                <span className="lp-tips__eyebrow">TIPS</span>
                <h2 className="lp-tips__head">中古品を、少しでも高く売るコツ。</h2>
                <div className="lp-tips__points">
                  <p className="lp-tips__point"><span className="lp-tips__pno">POINT 1</span>季節商品や新商品は、売るタイミングが大切です。</p>
                  <p className="lp-tips__point"><span className="lp-tips__pno">POINT 2</span>説明書・保証書・付属品は大切に保管しておきましょう。</p>
                  <p className="lp-tips__point"><span className="lp-tips__pno">POINT 3</span>複数の商品をまとめて売ると査定額アップにつながります。</p>
                </div>
              </div>
              <a href="sell-tips.html" className="btn btn--indigo btn--lg btn--block">高く売るコツを見る<span className="btn__ic" style={{ marginLeft: 4 }}>{IC.arrow}</span></a>
            </div>
          </div>
        </section>

        {/* 12 · Closing CTA */}
        <section className="lp-cta lp-cta--closing">
          <div className="container lp-cta__inner">
            <span className="lp-cta__eyebrow">CONTACT</span>
            <h2 className="lp-cta__head">お問い合わせ</h2>
            <p className="lp-cta__sub">無料査定・出張買取のご相談は、LINE・電話・メールよりお気軽にお問い合わせください。</p>
            <div className="lp-cta__btns"><CtaTrio size="btn--lg" closing /></div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* SP floating CTA bar */}
      <nav className="lp-fab" aria-label="お問い合わせ">
        <a href={LINE} className="lp-fab__btn lp-fab__btn--line" target="_blank" rel="noreferrer">{IC.chat}LINE査定</a>
        <a href={TELHREF} className="lp-fab__btn lp-fab__btn--call">{IC.telIc}電話</a>
        <a href={CONTACT_ECO} className="lp-fab__btn lp-fab__btn--mail">{IC.mail}メール</a>
      </nav>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ReuseLP />);
