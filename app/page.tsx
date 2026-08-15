const deals = [
  {
    title: "Sony WH-1000XM5",
    category: "Hörlurar",
    price: "2 490 kr",
    oldPrice: "4 290 kr",
    note: "Ovanligt lågt pris för modellen. Kontrollera alltid priset i kassan innan köp.",
    tag: "Prisfall",
    url: "https://amazon.se/",
  },
  {
    title: "Philips Hue startpaket",
    category: "Smart hem",
    price: "599 kr",
    oldPrice: "1 199 kr",
    note: "Bra läge för den som redan använder Hue. Lagret kan försvinna snabbt.",
    tag: "Möjligt prisfel",
    url: "https://amazon.se/",
  },
  {
    title: "Samsung T7 Shield 2 TB",
    category: "Lagring",
    price: "899 kr",
    oldPrice: "1 799 kr",
    note: "Starkt TB-pris jämfört med normalnivå. Dubbelkolla leverantör och frakt.",
    tag: "Snabb deal",
    url: "https://amazon.se/",
  },
];

const rules = [
  "Reklammärkning ska synas innan besökaren klickar.",
  "Vi skriver egna kommentarer och kopierar inte produkttexter rakt av.",
  "Vi säger inte att Amazon sponsrar DealSteal.",
  "Vi kallar bara något prisfel när det finns tydlig grund för det.",
];

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="DealSteal huvudmeny">
        <a className="brand" href="#top" aria-label="DealSteal startsida">
          <span className="brand-mark" aria-hidden="true">
            <span className="bolt"> </span>
          </span>
          <span className="brand-name">
            dealsteal<span>.</span>se
          </span>
        </a>
        <nav className="nav-links" aria-label="Sidor">
          <a href="#fynd">Fynd</a>
          <a href="#om">Om</a>
          <a href="#reklam">Reklam</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">Nya Amazon-fynd varje dag</p>
          <h1>
            Prisfel på <span>Amazon</span>
          </h1>
          <p className="hero-text">
            DealSteal samlar snabba prisfall, misstänkta prisfel och korta
            kommentarer så att du kan avgöra om fyndet är värt ett klick.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#fynd">
              Se dagens fynd
            </a>
            <a className="secondary-link" href="#reklam">
              Affiliate/reklam
            </a>
          </div>
        </div>
        <div className="hero-art" aria-label="DealSteal logotyp">
          <img src="/brand/ds-mark.png" alt="DealSteal ds-logotyp" />
        </div>
      </section>

      <section className="disclosure-banner" aria-label="Allman affiliateinformation">
        <strong>Amazon-associate:</strong> Som Amazon-associate tjänar jag pengar
        på kvalificerade köp.
      </section>

      <section className="deals-section" id="fynd" aria-labelledby="fynd-title">
        <div className="section-heading">
          <p className="kicker">Senaste poster</p>
          <h2 id="fynd-title">Aktuella fynd</h2>
        </div>

        <div className="deal-list">
          {deals.map((deal) => (
            <article className="deal-card" key={deal.title}>
              <div className="deal-main">
                <div>
                  <p className="deal-category">{deal.category}</p>
                  <h3>{deal.title}</h3>
                </div>
                <span className="deal-tag">{deal.tag}</span>
              </div>

              <p className="deal-note">{deal.note}</p>

              <div className="price-row">
                <span className="price">{deal.price}</span>
                <span className="old-price">{deal.oldPrice}</span>
              </div>

              <div className="affiliate-box">
                <span>Reklamlänk</span>
                <a href={deal.url} rel="sponsored noopener noreferrer">
                  Öppna på Amazon
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="info-grid" id="om" aria-labelledby="om-title">
        <div>
          <p className="kicker">Om DealSteal</p>
          <h2 id="om-title">Kort, enkelt och granskat</h2>
          <p>
            DealSteal är en minimalistisk fyndsida för Amazon-priser. Fokus är
            korta poster, tydliga knappar och snabb navigering utan brus.
          </p>
        </div>
        <div className="rule-list" aria-label="Publiceringsregler">
          {rules.map((rule) => (
            <p key={rule}>{rule}</p>
          ))}
        </div>
      </section>

      <section className="affiliate-section" id="reklam" aria-labelledby="reklam-title">
        <div>
          <p className="kicker">Affiliate/reklam</p>
          <h2 id="reklam-title">Tydligt innan klick</h2>
        </div>
        <p>
          Länkar till Amazon markeras med "Reklamlänk" eller "Betald länk" nära
          själva länken. Det betyder att DealSteal kan få ersättning om du gör
          ett kvalificerat köp via länken, utan extra kostnad för dig.
        </p>
        <p>
          Som Amazon-associate tjänar jag pengar på kvalificerade köp.
        </p>
      </section>

      <footer>
        <span>dealsteal.se</span>
        <span>Som Amazon-associate tjänar jag pengar på kvalificerade köp.</span>
      </footer>
    </main>
  );
}
