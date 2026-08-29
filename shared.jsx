/* global React */
/* Shared header (with 事業内容 dropdown) + footer for ICHIHO sub-pages. */
const { useState: useSharedState } = React;

const HOME = "index.html";
const CONTACT = "contact.html";
const CONTACT_ECO = "contact-eco.html";
const CONTACT_PAGES = [
  { key: "contact",     file: CONTACT,     jp: "総合お問い合わせ", en: "GENERAL",        note: "事業全般・EC販売支援・取引" },
  { key: "contact-eco", file: CONTACT_ECO, jp: "ecoサイクル買取相談", en: "REUSE / ecoサイクル", note: "出張買取・無料査定" },
];
const BUSINESS_PAGES = [
  { key: "ec",      file: "business-ec.html",     jp: "EC販売事業",     en: "EC SALES" },
  { key: "reuse",   file: "business-reuse.html",   jp: "リユース事業",   en: "REUSE" },
  { key: "support", file: "business-support.html", jp: "EC販売支援事業", en: "SALES SUPPORT" },
];

function SiteHeader({ current, headerCta }) {
  const [open, setOpen] = useSharedState(false);
  const [dd, setDd] = useSharedState(false);
  const [cdd, setCdd] = useSharedState(false);
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href={HOME} className="site-header__logo">
          <span className="site-header__logo-txt">
            <span className="site-header__logo-mark">ICHIHO</span>
            <span className="site-header__logo-name">株式会社ICHIHO</span>
          </span>
        </a>
        <nav className="site-header__nav">
          <a href={HOME + "#company"}>会社概要</a>
          <div className={`nav-dd ${dd ? "is-open" : ""}`}>
            <button
              className={`nav-dd__trigger ${["ec","reuse","support"].includes(current) ? "is-active" : ""}`}
              aria-haspopup="true"
              aria-expanded={dd}
              onClick={() => setDd(v => !v)}
            >
              事業内容
              <svg className="nav-dd__chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className="nav-dd__menu" role="menu">
              <a className="nav-dd__top" href={HOME + "#business"}>事業内容トップ ↗</a>
              <div className="nav-dd__sep"></div>
              {BUSINESS_PAGES.map(p => (
                <a key={p.key} className={`nav-dd__item ${current === p.key ? "is-active" : ""}`} href={p.file} role="menuitem">
                  <span className={`nav-dd__dot nav-dd__dot--${p.key}`}></span>
                  <span className="nav-dd__txt">
                    <span className="nav-dd__txt-jp">{p.jp}</span>
                    <span className="nav-dd__txt-en">{p.en}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className={`nav-dd nav-dd--right ${cdd ? "is-open" : ""}`}>
            <button
              className={`nav-dd__trigger ${current && current.indexOf("contact") === 0 ? "is-active" : ""}`}
              aria-haspopup="true"
              aria-expanded={cdd}
              onClick={() => setCdd(v => !v)}
            >
              お問い合わせ
              <svg className="nav-dd__chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className="nav-dd__menu" role="menu">
              {CONTACT_PAGES.map(p => (
                <a key={p.key} className={`nav-dd__item ${current === p.key ? "is-active" : ""}`} href={p.file} role="menuitem">
                  <span className={`nav-dd__dot nav-dd__dot--${p.key === "contact-eco" ? "reuse" : "ec"}`}></span>
                  <span className="nav-dd__txt">
                    <span className="nav-dd__txt-jp">{p.jp}</span>
                    <span className="nav-dd__txt-en">{p.note}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </nav>
        {headerCta && (
          <div className="site-header__cta">
            <a className="site-header__tel" href={`tel:${(headerCta.tel || "").replace(/-/g, "")}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span className="site-header__tel-txt">
                <span className="site-header__tel-num">{headerCta.tel}</span>
                <span className="site-header__tel-sub">お電話でのご相談</span>
              </span>
            </a>
            <a className="btn btn--indigo btn--sm" href={CONTACT}>WEB相談</a>
          </div>
        )}
        <button className="site-header__burger" aria-label="menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={`site-header__drawer ${open ? "is-open" : ""}`}>
        <a href={HOME + "#company"}>会社概要</a>
        <a href={HOME + "#business"}>事業内容</a>
        {BUSINESS_PAGES.map(p => (
          <a key={p.key} className="drawer-sub" href={p.file}>— {p.jp}</a>
        ))}
        <a href={CONTACT}>お問い合わせ</a>
        {CONTACT_PAGES.map(p => (
          <a key={p.key} className="drawer-sub" href={p.file}>— {p.jp}</a>
        ))}
      </div>
    </header>
  );
}

function SiteFooter() {
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
            {BUSINESS_PAGES.map(p => <a key={p.key} href={p.file}>{p.jp}</a>)}
            <a href={HOME + "#company"}>会社概要</a>
            <a href={CONTACT}>総合お問い合わせ</a>
            <a href={CONTACT_ECO}>ecoサイクル買取相談</a>
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

/* =========================================================
   Feature icons
   カードセクション用のフラット幾何アイコン。トップ FV と同じ
   「線 + ベタ塗り」のテイストで、駿河湾の藍 / そのライトトーン /
   富士朝焼けの 3 色だけを使う。他ページのカードにも展開するため
   ここに集約し、window.FeatureIcon で公開する。
   ========================================================= */
const ICON_INK = "#1F3D6B";   /* 駿河湾の藍 */
const ICON_FILL = "#C9D9EA";  /* 藍のライトトーン */
const ICON_ACC = "#D17A3F";   /* 富士朝焼け（差し色・少量） */
const ICON_MID = "#8CA6C6";   /* 藍のミドルトーン（矢印など控えめな要素） */

const FEATURE_ICONS = {
  /* 複数モールへ商品が広がる — 商品箱から 3 つの画面へ線が伸びる */
  channels: (
    <React.Fragment>
      <path d="M48 64 L17 37 M48 64 L48 27 M48 64 L79 37" />
      <rect x="5" y="20" width="24" height="17" rx="2" fill={ICON_FILL} />
      <rect x="36" y="10" width="24" height="17" rx="2" fill={ICON_FILL} />
      <rect x="67" y="20" width="24" height="17" rx="2" fill={ICON_FILL} />
      <rect x="34" y="64" width="28" height="22" rx="2" fill="#FFFFFF" />
      <path d="M34 71 L62 71" />
      <rect x="44" y="64" width="8" height="22" fill={ICON_ACC} stroke="none" />
    </React.Fragment>),

  /* 販売データの分析 — 棒グラフと右肩上がりのトレンド線 */
  data: (
    <React.Fragment>
      <rect x="8" y="14" width="80" height="68" rx="6" />
      <path d="M20 70 L78 70" />
      <rect x="24" y="52" width="12" height="18" fill={ICON_FILL} />
      <rect x="42" y="42" width="12" height="28" fill={ICON_FILL} />
      <rect x="60" y="30" width="12" height="40" fill={ICON_ACC} />
      <path d="M24 45 L42 35 L66 22" />
      <circle cx="66" cy="22" r="3.5" fill={ICON_INK} />
    </React.Fragment>),

  /* 仕入れ〜出荷の一貫体制 — 倉庫と配送トラック */
  operations: (
    <React.Fragment>
      <path d="M6 78 L90 78" />
      <path d="M6 41 L28 23 L50 41 Z" fill={ICON_FILL} />
      <rect x="11" y="41" width="34" height="37" fill={ICON_FILL} />
      <rect x="19" y="55" width="18" height="23" fill="#FFFFFF" />
      <rect x="40" y="48" width="28" height="22" fill="#FFFFFF" />
      <rect x="45" y="54" width="14" height="4" fill={ICON_ACC} stroke="none" />
      <path d="M68 56 L78 56 L86 65 L86 70 L68 70 Z" fill={ICON_FILL} />
      <circle cx="50" cy="73" r="5" fill="#FFFFFF" />
      <circle cx="78" cy="73" r="5" fill="#FFFFFF" />
    </React.Fragment>),

  /* 丁寧なカスタマー対応 — 吹き出しとハート */
  support: (
    <React.Fragment>
      <rect x="54" y="10" width="34" height="26" rx="8" fill="#FFFFFF" />
      <rect x="8" y="26" width="58" height="42" rx="10" fill={ICON_FILL} />
      <path d="M23 67 L23 80 L37 67" fill={ICON_FILL} />
      <path d="M37 58 C26.5 50.5 23 45.5 23 41 C23 36.5 26.5 34 30 34 C32.8 34 35.6 35.7 37 38 C38.4 35.7 41.2 34 44 34 C47.5 34 51 36.5 51 41 C51 45.5 47.5 50.5 37 58 Z" fill={ICON_ACC} stroke="none" />
    </React.Fragment>),

  /* STEP01 お問い合わせ — スマホと吹き出し */
  contact: (
    <React.Fragment>
      <rect x="14" y="16" width="44" height="68" rx="8" fill="#FFFFFF" />
      <path d="M28 25 L44 25 M30 76 L42 76" />
      <path d="M56 55 L56 68 L68 55" fill={ICON_FILL} />
      <rect x="44" y="26" width="42" height="30" rx="9" fill={ICON_FILL} />
      <circle cx="56" cy="41" r="3" fill={ICON_ACC} stroke="none" />
      <circle cx="65" cy="41" r="3" fill={ICON_ACC} stroke="none" />
      <circle cx="74" cy="41" r="3" fill={ICON_ACC} stroke="none" />
    </React.Fragment>),

  /* STEP02 商品内容の確認 — クリップボードとチェック */
  checklist: (
    <React.Fragment>
      <rect x="18" y="16" width="60" height="72" rx="6" fill="#FFFFFF" />
      <rect x="38" y="9" width="20" height="13" rx="4" fill={ICON_FILL} />
      <rect x="28" y="34" width="12" height="12" rx="2" fill={ICON_FILL} />
      <rect x="28" y="52" width="12" height="12" rx="2" fill={ICON_FILL} />
      <path d="M46 40 L68 40 M46 58 L68 58" />
      <path d="M48 70 L57 80 L76 56" stroke={ICON_ACC} strokeWidth="5" />
    </React.Fragment>),

  /* STEP03 査定 — 商品箱を虫眼鏡で見る */
  appraisal: (
    <React.Fragment>
      <rect x="6" y="54" width="38" height="30" rx="3" fill={ICON_FILL} />
      <path d="M6 64 L44 64 M25 54 L25 64" />
      <circle cx="58" cy="36" r="22" />
      <path d="M74 52 L88 68" stroke={ICON_ACC} strokeWidth="6.5" />
    </React.Fragment>),

  /* STEP04 買取成立 — チェック入りのバッジ */
  deal: (
    <React.Fragment>
      <path d="M34 50 L28 88 L48 76 L68 88 L62 50 Z" fill={ICON_FILL} />
      <circle cx="48" cy="38" r="26" fill="#FFFFFF" />
      <path d="M36 39 L45 49 L62 28" stroke={ICON_ACC} strokeWidth="5.5" />
    </React.Fragment>),

  /* STEP05 お支払い — 紙幣と硬貨 */
  payment: (
    <React.Fragment>
      <rect x="6" y="28" width="62" height="36" rx="4" fill="#FFFFFF" />
      <circle cx="32" cy="46" r="9" fill={ICON_ACC} stroke="none" />
      <circle cx="66" cy="62" r="22" fill={ICON_FILL} />
      <path d="M58 52 L66 62 L74 52 M66 62 L66 76 M59 65 L73 65 M59 71 L73 71" />
    </React.Fragment>),

  /* 商品ページ作成 — ブラウザ内の商品ページ（画像・テキスト・購入ボタン） */
  productpage: (
    <React.Fragment>
      <rect x="8" y="14" width="80" height="68" rx="6" fill="#FFFFFF" />
      <path d="M8 28 L88 28" />
      <circle cx="17" cy="21" r="2.5" fill={ICON_INK} stroke="none" />
      <circle cx="25" cy="21" r="2.5" fill={ICON_INK} stroke="none" />
      <circle cx="33" cy="21" r="2.5" fill={ICON_INK} stroke="none" />
      <rect x="18" y="38" width="28" height="28" rx="3" fill={ICON_FILL} />
      <path d="M54 42 L78 42 M54 52 L70 52" />
      <rect x="54" y="60" width="24" height="12" rx="6" fill={ICON_ACC} stroke="none" />
    </React.Fragment>),

  /* 販売導線の改善 — 下へ絞り込まれるファネル */
  funnel: (
    <React.Fragment>
      <path d="M10 16 L86 16 L55 52 L41 52 Z" fill={ICON_FILL} />
      <path d="M41 52 L55 52 L55 82 L41 82 Z" fill={ICON_ACC} />
    </React.Fragment>),

  /* 受注対応・販売管理 — ヘッドセット */
  orders: (
    <React.Fragment>
      <path d="M18 56 A30 30 0 0 1 78 56" strokeWidth="5" />
      <rect x="10" y="52" width="18" height="26" rx="8" fill={ICON_FILL} />
      <rect x="68" y="52" width="18" height="26" rx="8" fill={ICON_FILL} />
      <path d="M77 78 L77 84 L58 84" />
      <circle cx="53" cy="84" r="5" fill={ICON_ACC} stroke="none" />
    </React.Fragment>),

  /* 広告運用・販促施策 — メガホン */
  promo: (
    <React.Fragment>
      <path d="M28 58 L32 78" strokeWidth="4" />
      <path d="M20 38 L20 58 L44 58 L76 76 L76 20 L44 38 Z" fill={ICON_FILL} />
      <path d="M84 36 A14 14 0 0 1 84 60" stroke={ICON_ACC} strokeWidth="4" />
    </React.Fragment>),

  /* 販売データの分析 — 円グラフと棒グラフ */
  analytics: (
    <React.Fragment>
      <circle cx="34" cy="34" r="22" fill={ICON_FILL} />
      <path d="M34 34 L34 12 A22 22 0 0 1 56 34 Z" fill={ICON_ACC} />
      <path d="M46 82 L88 82" />
      <rect x="50" y="64" width="10" height="18" fill={ICON_FILL} />
      <rect x="64" y="54" width="10" height="28" fill={ICON_FILL} />
      <rect x="78" y="44" width="10" height="38" fill={ICON_FILL} />
    </React.Fragment>),

  /* 販売可否の判断 — 天秤 */
  balance: (
    <React.Fragment>
      <path d="M14 32 L82 32 M48 32 L48 76 M22 32 L22 42 M74 32 L74 42" />
      <path d="M32 80 L64 80 L58 70 L38 70 Z" fill={ICON_FILL} />
      <path d="M8 42 L36 42 L30 56 L14 56 Z" fill={ICON_FILL} />
      <path d="M60 42 L88 42 L82 56 L66 56 Z" fill={ICON_ACC} />
      <circle cx="48" cy="32" r="4.5" fill={ICON_INK} stroke="none" />
    </React.Fragment>),

  /* 販売開始 — ロケット */
  launch: (
    <React.Fragment>
      <path d="M39 58 L48 84 L57 58 Z" fill={ICON_ACC} />
      <path d="M31 42 L18 62 L31 58 Z" fill={ICON_FILL} />
      <path d="M65 42 L78 62 L65 58 Z" fill={ICON_FILL} />
      <path d="M48 8 C61 24 65 40 65 56 L31 56 C31 40 35 24 48 8 Z" fill={ICON_FILL} />
      <circle cx="48" cy="34" r="8.5" fill="#FFFFFF" />
    </React.Fragment>),

  /* 販売改善 — 右肩上がりの折れ線と矢印 */
  growth: (
    <React.Fragment>
      <path d="M14 14 L14 82 L86 82" />
      <path d="M24 70 L42 54 L58 62 L76 30" strokeWidth="4" />
      <circle cx="42" cy="54" r="3.5" fill={ICON_INK} stroke="none" />
      <circle cx="58" cy="62" r="3.5" fill={ICON_INK} stroke="none" />
      <path d="M64 30 L76 30 L76 42" stroke={ICON_ACC} strokeWidth="4" />
    </React.Fragment>),

  /* --- お問い合わせ導線カード用（小さめに使う） --- */
  tel: (
    <React.Fragment>
      <path d="M30 12 L46 12 L52 32 L40 40 C46 54 42 50 56 56 L64 44 L84 50 L84 66 C84 76 76 84 66 84 C36 84 12 60 12 30 C12 20 20 12 30 12 Z" fill={ICON_FILL} />
      <circle cx="72" cy="24" r="6" fill={ICON_ACC} stroke="none" />
    </React.Fragment>),

  line: (
    <React.Fragment>
      <rect x="8" y="16" width="80" height="52" rx="16" fill={ICON_FILL} />
      <path d="M32 66 L28 86 L52 66" fill={ICON_FILL} />
      <path d="M26 34 L70 34 M26 48 L56 48" strokeWidth="4" />
      <circle cx="76" cy="24" r="5" fill={ICON_ACC} stroke="none" />
    </React.Fragment>),

  mail: (
    <React.Fragment>
      <rect x="8" y="22" width="80" height="54" rx="7" fill="#FFFFFF" />
      <path d="M10 27 L48 54 L86 27" />
      <path d="M8 22 L88 22 L48 50 Z" fill={ICON_FILL} />
      <circle cx="80" cy="30" r="6" fill={ICON_ACC} stroke="none" />
    </React.Fragment>),

  address: (
    <React.Fragment>
      <path d="M48 88 C48 88 78 58 78 38 C78 21.4 64.6 8 48 8 C31.4 8 18 21.4 18 38 C18 58 48 88 48 88 Z" fill={ICON_FILL} />
      <circle cx="48" cy="37" r="12" fill="#FFFFFF" />
      <circle cx="48" cy="37" r="5" fill={ICON_ACC} stroke="none" />
    </React.Fragment>),
};

function FeatureIcon({ name, className = "feat__icon" }) {
  const art = FEATURE_ICONS[name];
  if (!art) return null;
  return (
    <svg className={className} viewBox="0 0 96 96" aria-hidden="true"
      fill="none" stroke={ICON_INK} strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round">
      {art}
    </svg>);

}

window.HOME = HOME;
window.CONTACT = CONTACT;
window.CONTACT_ECO = CONTACT_ECO;
window.CONTACT_PAGES = CONTACT_PAGES;
window.BUSINESS_PAGES = BUSINESS_PAGES;
window.SiteHeader = SiteHeader;
window.SiteFooter = SiteFooter;
window.FeatureIcon = FeatureIcon;
