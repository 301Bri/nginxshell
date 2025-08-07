const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

// Homepage
app.get("/", (req, res) => {
  res.send(`<h2>Puppeteer Proxy</h2><p>Go to <a href="/play">/play</a> to launch Shell Shockers.</p>`);
});

// Game Proxy Route
app.get("/play", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto("https://shellshock.io", {
      waitUntil: "networkidle2"
    });

    const content = await page.content();

    await browser.close();

    res.send(content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Something went wrong.");
  }
});

app.listen(PORT, () => {
  console.log(`Puppeteer proxy running on port ${PORT}`);
});
