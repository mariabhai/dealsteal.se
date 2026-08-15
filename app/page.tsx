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
  {
    title: "Logitech MX Master 3S",
    category: "Tillbehör",
    price: "499 kr",
    oldPrice: "1 099 kr",
    note: "Lågt pris för en populär produktivitetsmus. Kontrollera färg och säljare före köp.",
    tag: "Prisfall",
    url: "https://amazon.se/",
  },
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
          <a href="/om-oss">Om oss</a>
          <a href="#kontakt">Kontakt</a>
          <a
            className="instagram-link"
            href="https://instagram.com/dealsteal.se"
            rel="noopener noreferrer"
            aria-label="DealSteal på Instagram"
          >
            <span className="instagram-icon" aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">Nya Amazon-fynd varje dag</p>
          <h1>
            <span className="hero-line">Prisfel på</span>
            <span className="hero-line hero-amazon">Amazon</span>
          </h1>
        </div>
      </section>

      <section className="deals-section" id="fynd" aria-labelledby="fynd-title">
        <h2 className="deals-title" id="fynd-title">Senaste fynden</h2>

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

      <footer className="site-footer" id="kontakt">
        <div>
          <h2>dealsteal.se</h2>
          <p>
            Senaste fynden på Amazon. Kontrollera alltid pris, lager och villkor
            hos Amazon innan köp.
          </p>
          <p className="associate-copy">
            Som Amazon-associate tjänar jag pengar på kvalificerade köp.
          </p>
        </div>
        <div>
          <h3>Kontakta oss</h3>
          <button className="contact-button" type="button">Kontakta oss</button>
        </div>
        <div>
          <h3>Följ oss</h3>
          <a
            className="instagram-link"
            href="https://instagram.com/dealsteal.se"
            rel="noopener noreferrer"
            aria-label="DealSteal på Instagram"
          >
            <span className="instagram-icon" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  );
}
