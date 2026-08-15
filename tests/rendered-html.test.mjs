import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders DealSteal with clear affiliate disclosure", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>DealSteal\.se - Prisfel på Amazon<\/title>/i);
  assert.match(html, /Prisfel på/);
  assert.match(html, /Reklamlänk/);
  assert.match(
    html,
    /Som Amazon-associate tjänar jag pengar på kvalificerade köp/,
  );
  assert.match(html, /Senaste fynden på Amazon/);
  assert.match(html, /Kontakta oss/);
  assert.match(html, /href="\/om-oss"/);
  assert.match(html, /https:\/\/instagram\.com\/dealsteal\.se/);
  assert.match(html, /DealSteal på Instagram/);
  assert.doesNotMatch(html, /kontakt@dealsteal\.se|href="#fynd">Fynd/);
  assert.doesNotMatch(html, /Aktuella fynd|Om DealSteal|Affiliate\/reklam/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("server-renders the about page", async () => {
  const response = await render("/om-oss");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Om oss/);
  assert.match(html, /DealSteal gör fynd enklare/);
  assert.match(html, /fokus på enkelhet och tillgänglighet/);
});

test("keeps compliance copy near affiliate links", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /rel="sponsored noopener noreferrer"/);
  assert.match(page, /Reklamlänk/);
  assert.match(page, /Som Amazon-associate tjänar jag pengar på kvalificerade köp/);
  assert.doesNotMatch(page, /garanterat prisfel/i);
});
