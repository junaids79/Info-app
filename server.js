const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.post("/screenshot", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle0" });
    const screenshot = await page.screenshot();

    await browser.close();

    res.setHeader("Content-Type", "image/png");
    res.send(screenshot);
  } catch (err) {
    res.status(500).send("Screenshot failed.");
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
