export default function AboutPage() {
  return (
    <main>
      <header className="site-header" aria-label="DealSteal huvudmeny">
        <a className="brand" href="/" aria-label="DealSteal startsida">
          <span className="brand-mark" aria-hidden="true">
            <span className="bolt"> </span>
          </span>
          <span className="brand-name">
            dealsteal<span>.</span>se
          </span>
        </a>
        <nav className="nav-links" aria-label="Sidor">
          <a href="/om-oss">Om oss</a>
          <a href="/#kontakt">Kontakt</a>
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

      <section className="about-page" aria-labelledby="about-title">
        <p className="kicker">Om oss</p>
        <h1 id="about-title">DealSteal gör fynd enklare</h1>
        <p>
          DealSteal ger dig de bästa dealsen med fokus på enkelhet och
          tillgänglighet. Sidan är byggd för att snabbt visa aktuella Amazon-fynd
          utan onödigt brus.
        </p>
      </section>
    </main>
  );
}
