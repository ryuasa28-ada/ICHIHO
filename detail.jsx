/* global React, PAGE_DATA, SiteHeader, SiteFooter, HOME, CONTACT */
/* Detail-page body. Header/footer come from shared.jsx (window.SiteHeader / SiteFooter). */

/* =========================================================
   Detail hero (data-driven)
   ========================================================= */
function DetailHero({ d }) {
  return (
    <section className="dhero">
      <div className="dhero__pattern" aria-hidden="true"></div>
      <div className="container dhero__inner">
        <div className="dhero__copy">
          <div className="dhero__crumb">
            <a href={HOME}>ホーム</a>
            <span aria-hidden="true">/</span>
            <a href={HOME + "#business"}>事業内容</a>
            <span aria-hidden="true">/</span>
            <span>{d.title}</span>
          </div>
          <div className="dhero__head-row">
            <span className="dhero__no">{d.no} · {d.anchor}</span>
            {d.logo && <img className="dhero__logo" src={d.logo} alt="" />}
          </div>
          <h1 className="dhero__title">
            {d.titleLines.map((ln, i) => (
              <React.Fragment key={i}>
                {ln.accent ? <span className="dhero__tagline">{ln.text}</span> : ln.text}
                {i < d.titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="lead dhero__lead">{d.lead}</p>
          <div className="dhero__cta">
            <a href={CONTACT} className="btn btn--primary">お問い合わせ</a>
            <a href={HOME + "#business"} className="btn btn--ghost">事業一覧へ戻る</a>
          </div>
        </div>
        <div className="dhero__card">
          {d.facts.map((f, i) => (
            <div key={i} className="dhero__card-row">
              <span className="dhero__card-k">{f[0]}</span>
              <span className="dhero__card-v">{f[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailApp() {
  const d = window.PAGE_DATA;
  return (
    <>
      <SiteHeader current={d.key} />
      <main>
        <DetailHero d={d} />

        {/* Overview */}
        <section className="dsection dsection--alt">
          <div className="container">
            <div className="dhead">
              <div className="dhead__row"><span className="dhead__num">01</span><span className="anchor">OVERVIEW</span></div>
              <h2 className="h1 dhead__jp">{d.overview.title}</h2>
            </div>
            <div className="prose-2">
              {d.overview.paras.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="dsection">
          <div className="container">
            <div className="dhead">
              <div className="dhead__row"><span className="dhead__num">02</span><span className="anchor">{d.features.anchor}</span></div>
              <h2 className="h1 dhead__jp">{d.features.title}</h2>
              {d.features.sub && <p className="lead dhead__sub">{d.features.sub}</p>}
            </div>
            <div className="feat-grid">
              {d.features.items.map((f, i) => (
                <article key={i} className="feat">
                  <span className="feat__no">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="feat__t">{f.t}</h3>
                  <p className="feat__d">{f.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Optional categories */}
        {d.categories && (
          <section className="dsection dsection--alt">
            <div className="container">
              <div className="dhead">
                <div className="dhead__row"><span className="dhead__num">03</span><span className="anchor">{d.categories.anchor}</span></div>
                <h2 className="h1 dhead__jp">{d.categories.title}</h2>
                {d.categories.sub && <p className="lead dhead__sub">{d.categories.sub}</p>}
              </div>
              {d.categories.chips ? (
                <div className="chips">
                  {d.categories.items.map((c, i) => (
                    <span key={i} className="chip">{c.en && <span className="chip__en">{c.en}</span>}{c.t}</span>
                  ))}
                </div>
              ) : (
                <div className="cat-grid">
                  {d.categories.items.map((c, i) => (
                    <article key={i} className="cat">
                      <h3 className="cat__t">{c.t}</h3>
                      {c.d && <p className="cat__d">{c.d}</p>}
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Flow */}
        {d.flow && (
          <section className="dsection dsection--alt">
            <div className="container">
              <div className="dhead">
                <div className="dhead__row"><span className="dhead__num">{d.categories ? "04" : "03"}</span><span className="anchor">{d.flow.anchor}</span></div>
                <h2 className="h1 dhead__jp">{d.flow.title}</h2>
                {d.flow.sub && <p className="lead dhead__sub">{d.flow.sub}</p>}
              </div>
              <ol className="flow" style={{ "--flow-cols": d.flow.items.length }}>
                {d.flow.items.map((s, i) => (
                  <li key={i} className="flow__item">
                    <span className="flow__no">STEP {i + 1}</span>
                    <h3 className="flow__t">{s.t}</h3>
                    <p className="flow__d">{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* CTA band */}
        <section className="cta-band">
          <div className="container cta-band__inner">
            <div>
              <h2 className="cta-band__head">{d.cta.head}</h2>
              <p className="cta-band__sub">{d.cta.sub}</p>
            </div>
            <div className="cta-band__btns">
              {d.cta.line ? (
                <a href={d.cta.line} className="btn btn--lg btn--line" target="_blank" rel="noreferrer">LINEで相談する</a>
              ) : (
                <a href={CONTACT} className="btn btn--lg">お問い合わせフォーム</a>
              )}
              {d.cta.tel && (
                <a href={`tel:${d.cta.tel.replace(/-/g, "")}`} className="btn btn--tel">
                  <span className="t-sub">お電話でのご相談</span>
                  <span className="t-num">{d.cta.tel}</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<DetailApp />);
