// Serves an Expo static web export: exact files, then <path>.html, then a
// dynamic [param].html in the same folder, else +not-found.html.
const http = require("node:http")
const fs = require("node:fs")
const path = require("node:path")

const root = path.resolve(process.argv[2])
const port = Number(process.argv[3] || 8098)
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".ico": "image/x-icon" }

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/+$/, "") || "/index"
  const candidates = [path.join(root, clean), path.join(root, `${clean}.html`)]
  const dir = path.join(root, path.dirname(clean))
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    const dynamic = fs.readdirSync(dir).find((f) => /^\[[^.]+\]\.html$/.test(f))
    if (dynamic) candidates.push(path.join(dir, dynamic))
  }
  return candidates.find((f) => f.startsWith(root) && fs.existsSync(f) && fs.statSync(f).isFile()) || path.join(root, "+not-found.html")
}

http.createServer((req, res) => {
  const file = resolve(req.url)
  console.log(req.url, "->", path.relative(root, file))
  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" })
  fs.createReadStream(file).pipe(res)
}).listen(port, () => console.log(`Serving ${root} on http://localhost:${port}`))
