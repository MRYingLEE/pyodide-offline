"use strict";
const CACHE = "precache",
  broadcast = new BroadcastChannel("/api/drive.v1");
function onInstall(t) {
  self.skipWaiting(), t.waitUntil(cacheAll());
}
function onActivate(t) {
  t.waitUntil(self.clients.claim());
}
async function onFetch(t) {
  const { request: a } = t,
    n = new URL(t.request.url);
  let e = null;
  shouldBroadcast(n)
    ? (e = broadcastOne(a))
    : shouldDrop(a, n) || (e = maybeFromCache(t)),
    e && t.respondWith(e);
}
/**
 * Whether the Request should be adapted
 */
function maybeAdapted(request, url) {
  return (
    request.method == 'GET' &&
    url.origin.match(/^http/) !== null
  );
}
/**
 * Whether the Requested wheel file is cached
 * Maybe we need a full list on the server side.
 */
function isCachedWheelFileName(fileName) {
  // Only browser friendly wheel files are cached.
  if ((!fileName.endsWith('-none-any.whl')) && (!fileName.endsWith('_wasm32.whl'))){
      return false;
  }
  // Regular expression pattern for Python Wheel file name
  // Not very perfect, but good enough
  const pattern = /^[a-z0-9_.]+-([a-z0-9_.!+-]+)-([a-z0-9_.!+-]+)(-([a-z0-9_.!+-]+))?(-([a-z0-9_.!+-]+))?(-([a-z0-9_.!+-]+))?.whl$/i;

  // Test the file name against the pattern
  return pattern.test(fileName);
}

/** Get an adapted Request according to the resource postfix. */
function adaptedRequest(request) {
  const url = new URL(request.url);
  // Extract the filename and parameters
  if (!maybeAdapted(request, url)) return request;
  const filename = url.pathname.split('/').pop();
  if (!isCachedWheelFileName(filename)) return request;

  const params = url.search;
  const newDomain = self.location.host;

  let pathSegments = self.location.href.split('/');
  pathSegments.pop();
  let pathWithoutFilename = pathSegments.join('/');

  let newURL = undefined;
  if (filename.startsWith('ipython-8.')) {
    newURL = new URL(`${pathWithoutFilename}/static/pyodide/ipython-8.21.0-py3-none-any.whl.zip${params}`);
  } else {
    // Construct the new URL
    newURL = new URL(`${pathWithoutFilename}/static/pyodide/${filename}.zip${params}`);
  }

  return new Request(newURL, { method: request.method, headers: request.headers, body: request.body, mode: request.mode });
}

async function maybeFromCache(t) {
  const { request: a } = t;
  let n = await fromCache(a);
  if (n) {
    t.waitUntil(refetch(a));
  } else {
    const na = adaptedRequest(a);
    n = await fetch(na);
    t.waitUntil(updateCache(a, n.clone()));
  }
  return n;
}
async function fromCache(t) {
  const a = await openCache(),
    n = await a.match(t);
  return n && 404 !== n.status ? n : null;
}
async function refetch(t) {
  const nt = adaptedRequest(t);
  const a = await fetch(nt);
  return await updateCache(t, a), a;
}
function shouldBroadcast(t) {
  return t.origin === location.origin && t.pathname.includes("/api/drive");
}
function shouldDrop(t, a) {
  return (
    "GET" !== t.method ||
    null === a.origin.match(/^http/) ||
    a.pathname.includes("/api/")
  );
}
async function broadcastOne(t) {
  const a = new Promise((t) => {
      broadcast.onmessage = (a) => {
        t(new Response(JSON.stringify(a.data)));
      };
    }),
    n = await t.json();
  return (n.receiver = "broadcast.ts"), broadcast.postMessage(n), await a;
}
async function openCache() {
  return await caches.open(CACHE);
}
async function updateCache(t, a) {
  return (await openCache()).put(t, a);
}
async function cacheAll() {
  const t = await openCache();
  return await t.addAll([]);
}
self.addEventListener("install", onInstall),
  self.addEventListener("activate", onActivate),
  self.addEventListener("fetch", onFetch);
