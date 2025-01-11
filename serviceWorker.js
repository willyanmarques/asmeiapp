const staticAsmeiApp = "dev-asmei-site-v1"
const assets = [
  "/",
  "/index.html",
  "/index.css",
  "/index.js"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticAsmeiApp).then(cache => {
      cache.addAll(assets)
    })
  )
})