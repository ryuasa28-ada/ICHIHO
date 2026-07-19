/* global React */
const { useState: useState2 } = React;

function ProductGlyph({ kind, line }) {
  const stroke = line === "new" ? "var(--sunrise)" : "var(--indigo)";
  const bg = "#E9EDF3";
  const glyphs = {
    fridge: (
      <g stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="130" y="80" width="140" height="220" rx="10" />
        <line x1="130" y1="150" x2="270" y2="150" />
        <line x1="148" y1="105" x2="148" y2="130" />
        <line x1="148" y1="170" x2="148" y2="200" />
      </g>
    ),
    washer: (
      <g stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="120" y="80" width="160" height="220" rx="10" />
        <circle cx="200" cy="205" r="58" />
        <circle cx="200" cy="205" r="38" />
        <circle cx="155" cy="115" r="3.5" />
        <circle cx="180" cy="115" r="3.5" />
        <rect x="225" y="105" width="40" height="18" rx="3" />
      </g>
    ),
    aircon: (
      <g stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="90" y="140" width="220" height="80" rx="8" />
        <line x1="100" y1="180" x2="300" y2="180" />
        <line x1="110" y1="200" x2="180" y2="200" />
        <circle cx="280" cy="200" r="4" />
      </g>
    ),
    rice: (
      <g stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="200" cy="120" rx="90" ry="14" />
        <path d="M 110 120 Q 100 230 200 270 Q 300 230 290 120" />
        <line x1="140" y1="155" x2="260" y2="155" opacity="0.45" />
      </g>
    ),
    laptop: (
      <g stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="120" y="110" width="160" height="110" rx="6" />
        <line x1="135" y1="125" x2="265" y2="125" opacity="0.4" />
        <path d="M 100 240 L 300 240 L 290 260 L 110 260 Z" />
      </g>
    ),
    speaker: (
      <g stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="140" y="80" width="120" height="220" rx="8" />
        <circle cx="200" cy="135" r="14" />
        <circle cx="200" cy="220" r="44" />
        <circle cx="200" cy="220" r="22" />
      </g>
    ),
    printer: (
      <g stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="100" y="160" width="200" height="110" rx="6" />
        <rect x="130" y="100" width="140" height="60" />
        <rect x="130" y="240" width="140" height="50" />
        <circle cx="265" cy="195" r="3" fill={stroke} />
      </g>
    ),
    camera: (
      <g stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="90" y="130" width="220" height="140" rx="8" />
        <circle cx="200" cy="200" r="48" />
        <circle cx="200" cy="200" r="26" />
        <rect x="170" y="110" width="60" height="22" rx="3" />
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg" className="prod__svg" aria-hidden="true">
      <rect width="400" height="380" fill={bg} />
      {glyphs[kind] || glyphs.fridge}
    </svg>
  );
}

const PRODUCTS = {
  new: [
    { id: 1, kind: "fridge",  category: "冷蔵庫",   name: "シャープ 280L 冷蔵庫 SJ-D28J",         price: 64800, note: "送料無料",   channel: "楽天市場" },
    { id: 2, kind: "washer",  category: "洗濯機",   name: "アイリスオーヤマ ドラム式 7.5kg",      price: 89800, note: "新生活応援", channel: "Amazon" },
    { id: 3, kind: "aircon",  category: "エアコン", name: "ダイキン 8畳用 AN25YES-W",             price: 78900, note: "工事込",     channel: "楽天市場" },
    { id: 4, kind: "rice",    category: "炊飯器",   name: "象印 5.5合 圧力IH NW-JC10",            price: 32800, note: "本日入荷",   channel: "Amazon" },
  ],
  reuse: [
    { id: 5, kind: "laptop",  category: "ノートPC",   name: "ThinkPad X1 Carbon Gen9 (i5/16GB/512GB)", price: 78000, grade: "A", channel: "メルカリ" },
    { id: 6, kind: "speaker", category: "オーディオ", name: "JBL FLIP 5 Bluetoothスピーカー",          price: 8800,  grade: "B", channel: "メルカリ" },
    { id: 7, kind: "printer", category: "プリンター", name: "Canon TS8330 インクジェット複合機",       price: 14500, grade: "A", channel: "eBay" },
    { id: 8, kind: "camera",  category: "カメラ",     name: "SONY α6400 ボディ (ショット数 8,400)",   price: 89800, grade: "S", channel: "メルカリ" },
  ],
};

function FeaturedSection() {
  const [line, setLine] = useState2("new");
  const items = PRODUCTS[line];
  const fmt = (n) => "¥" + n.toLocaleString("ja-JP");
  const condition = { S: "S 未使用", A: "A 美品", B: "B 良品", C: "C 並品" };
  return (
    <section id="featured" className="section section--featured">
      <div className="container">
        <div className="featured__head">
          <SectionHead num="04" anchor="PRODUCTS" jp="取扱商品" sub="家電・玩具・日用品・食品・ホビー用品まで。新品とリユースの両方を取り扱っています。" />
          <div className="featured__toggle" role="tablist" aria-label="商品ラインの切替">
            <button
              role="tab"
              aria-selected={line === "new"}
              className={`featured__toggle-btn ${line === "new" ? "is-active is-new" : ""}`}
              onClick={() => setLine("new")}
            >
              <span className="tag tag--new featured__toggle-pill">新品</span>
              <span className="anchor">NEW</span>
            </button>
            <button
              role="tab"
              aria-selected={line === "reuse"}
              className={`featured__toggle-btn ${line === "reuse" ? "is-active is-reuse" : ""}`}
              onClick={() => setLine("reuse")}
            >
              <span className="tag tag--reuse featured__toggle-pill">リユース</span>
              <span className="anchor">REUSE</span>
            </button>
          </div>
        </div>
        <div className="prod-grid" key={line}>
          {items.map((p, i) => (
            <article key={p.id} className={`prod prod--${line}`} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="prod__media">
                <div className="prod__tags">
                  <span className={`tag ${line === "new" ? "tag--new" : "tag--reuse"}`}>
                    {line === "new" ? "新品" : "リユース"}
                  </span>
                  {line === "reuse" && (
                    <span className="tag tag--sand prod__grade">{condition[p.grade]}</span>
                  )}
                </div>
                <ProductGlyph kind={p.kind} line={line} />
              </div>
              <div className="prod__meta">
                <div className="prod__cat micro">{p.category}</div>
                <h3 className="prod__name">{p.name}</h3>
                <div className="prod__row">
                  <span className={`prod__price ${line === "new" ? "is-new" : "is-reuse"}`}>{fmt(p.price)}</span>
                  <span className="small prod__channel">{p.channel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="featured__foot">
          <p className="small featured__foot-note">
            ※掲載は一例です。在庫・価格は各販売チャネルによって異なります。
          </p>
          <div className="featured__channels">
            <span className="anchor anchor--mute">SOLD ON</span>
            <span className="featured__channel-list">
              <span className="num">Amazon</span>
              <span className="num">楽天市場</span>
              <span className="num">メルカリShops</span>
              <span className="num">ヤフオク!</span>
              <span className="num">eBay</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

window.FeaturedSection = FeaturedSection;
window.ProductGlyph = ProductGlyph;
