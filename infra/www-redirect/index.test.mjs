import assert from "node:assert/strict";
import test from "node:test";
import worker from "./index.mjs";

test("HTTP and HTTPS www requests go straight to the secure apex", () => {
  for (const protocol of ["http:", "https:"]) {
    const result = worker.fetch(new Request(`${protocol}//www.codemantix.com/`));
    assert.equal(result.status, 301);
    assert.equal(result.headers.get("location"), "https://codemantix.com/");
  }
});

test("deep links and encoded query strings survive the redirect", () => {
  const result = worker.fetch(
    new Request(
      "https://www.codemantix.com/projekte/kinokanon/?ref=a%2Fb&next=https%3A%2F%2Fexample.com",
    ),
  );
  assert.equal(
    result.headers.get("location"),
    "https://codemantix.com/projekte/kinokanon/?ref=a%2Fb&next=https%3A%2F%2Fexample.com",
  );
});

test("the apex and other project subdomains cannot enter a redirect loop", () => {
  for (const host of [
    "codemantix.com",
    "kinokanon.codemantix.com",
    "cloudframe.codemantix.com",
    "www.codemantix.com.example.com",
  ]) {
    const result = worker.fetch(new Request(`https://${host}/`));
    assert.equal(result.status, 404);
    assert.equal(result.headers.get("location"), null);
  }
});
