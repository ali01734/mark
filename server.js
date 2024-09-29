const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10); // You can set this to the port you need
const dev = process.env.NODE_ENV !== "production"; // Set NODE_ENV to "production" when deploying
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true); // Safeguard for req.url being null or undefined
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(
      `> Server is running at http://node.markdrawing.com:${port} in ${dev ? "development" : "production"} mode`
    );
  });
});
