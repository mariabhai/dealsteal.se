import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const outDir = new URL("../github-pages-dist/", import.meta.url);
const publicDir = new URL("../public/", import.meta.url);
const cssPath = new URL("../app/globals.css", import.meta.url);

const deals = [
  {
    title: "Sony WH-1000XM5",
    category: "Hörlurar",
    price: "2 490 kr",
    oldPrice: "4 290 kr",
    note: "Ovanligt lågt pris för modellen. Kontrollera alltid priset i kassan innan köp.",
    tag: "Prisfall",
  },
  {
    title: "Philips Hue startpaket",
    category: "Smart hem",
    price: "599 kr",
    oldPrice: "1 199 kr",
    note: "Bra läge för den som redan använder Hue. Lagret kan försvinna snabbt.",
    tag: "Möjligt prisfel",
  },
  {
    title: "Samsung T7 Shield 2 TB",
    category: "Lagring",
    price: "899 kr",
    oldPrice: "1 799 kr",
    note: "Starkt TB-pris jämfört med normalnivå. Dubbelkolla leverantör och frakt.",
    tag: "Snabb deal",
  },
  {
    title: "Logitech MX Master 3S",
    category: "Tillbehör",
    price: "499 kr",
    oldPrice: "1 099 kr",
    note: "Lågt pris för en populär produktivitetsmus. Kontrollera färg och säljare före köp.",
    tag: "Prisfall",
  },
];

function shell({ main }) {
  return `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DealSteal.se - Prisfel på Amazon</title>
    <meta name="description" content="Minimalistisk fyndsida för Amazon-prisfall, misstänkta prisfel och tydligt markerade reklamlänkar.">
    <link rel="icon" href="/favicon.svg">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    ${main}
  </body>
</html>`;
}

function header() {
  return `<header class="site-header" aria-label="DealSteal huvudmeny">
  <a class="brand" href="/" aria-label="DealSteal startsida">
    <span class="brand-mark" aria-hidden="true"><span class="bolt"> </span></span>
    <span class="brand-name">dealsteal<span>.</span>se</span>
  </a>
  <nav class="nav-links" aria-label="Sidor">
    <a href="/om-oss/">Om oss</a>
    <a href="/#kontakt">Kontakt</a>
    <a class="instagram-link" href="https://instagram.com/dealsteal.se" rel="noopener noreferrer" aria-label="DealSteal på Instagram">
      <span class="instagram-icon" aria-hidden="true"></span>
    </a>
  </nav>
</header>`;
}

function footer() {
  return `<footer class="site-footer" id="kontakt">
  <div>
    <h2>dealsteal.se</h2>
    <p>Senaste fynden på Amazon. Kontrollera alltid pris, lager och villkor hos Amazon innan köp.</p>
    <p class="associate-copy">Som Amazon-associate tjänar jag pengar på kvalificerade köp.</p>
  </div>
  <div>
    <h3>Kontakta oss</h3>
    <button class="contact-button" type="button">Kontakta oss</button>
  </div>
  <div>
    <h3>Följ oss</h3>
    <a class="instagram-link" href="https://instagram.com/dealsteal.se" rel="noopener noreferrer" aria-label="DealSteal på Instagram">
      <span class="instagram-icon" aria-hidden="true"></span>
    </a>
  </div>
</footer>`;
}

const dealCards = deals
  .map(
    (deal) => `<article class="deal-card">
  <div class="deal-main">
    <div>
      <p class="deal-category">${deal.category}</p>
      <h3>${deal.title}</h3>
    </div>
    <span class="deal-tag">${deal.tag}</span>
  </div>
  <p class="deal-note">${deal.note}</p>
  <div class="price-row">
    <span class="price">${deal.price}</span>
    <span class="old-price">${deal.oldPrice}</span>
  </div>
  <div class="affiliate-box">
    <span>Reklamlänk</span>
    <a href="https://amazon.se/" rel="sponsored noopener noreferrer">Öppna på Amazon</a>
  </div>
</article>`,
  )
  .join("\n");

const home = shell({
  main: `<main>
  ${header()}
  <section class="hero" id="top">
    <div class="hero-copy">
      <p class="kicker">Nya Amazon-fynd varje dag</p>
      <h1>
        <span class="hero-line">Prisfel på</span>
        <span class="hero-line hero-amazon">Amazon</span>
      </h1>
    </div>
  </section>
  <section class="deals-section" id="fynd" aria-labelledby="fynd-title">
    <h2 class="deals-title" id="fynd-title">Senaste fynden</h2>
    <div class="deal-list">${dealCards}</div>
  </section>
  ${footer()}
</main>`,
});

const about = shell({
  main: `<main>
  ${header()}
  <section class="about-page" aria-labelledby="about-title">
    <p class="kicker">Om oss</p>
    <h1 id="about-title">DealSteal gör fynd enklare</h1>
    <p>DealSteal ger dig de bästa dealsen med fokus på enkelhet och tillgänglighet. Sidan är byggd för att snabbt visa aktuella Amazon-fynd utan onödigt brus.</p>
  </section>
</main>`,
});

let css = await readFile(cssPath, "utf8");
css = css.replace('@import "tailwindcss";\n\n', "");

await rm(outDir, { force: true, recursive: true });
await mkdir(new URL("om-oss/", outDir), { recursive: true });
await cp(publicDir, outDir, { recursive: true });
await writeFile(new URL("index.html", outDir), home);
await writeFile(new URL("om-oss/index.html", outDir), about);
await writeFile(new URL("styles.css", outDir), css);
await writeFile(new URL("CNAME", outDir), "dealsteal.se\n");
