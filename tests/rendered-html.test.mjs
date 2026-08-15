import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.match(html, /Affiliate\/reklam/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("keeps compliance copy near affiliate links", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /rel="sponsored noopener noreferrer"/);
  assert.match(page, /Reklamlänk/);
  assert.match(page, /Vi säger inte att Amazon sponsrar DealSteal/);
  assert.doesNotMatch(page, /garanterat prisfel/i);
});
