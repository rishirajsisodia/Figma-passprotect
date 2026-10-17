// Shared helpers. Files that start with "_" are NOT web pages on Vercel,
// so nobody can open this file from the browser.

const crypto = require("crypto");

const COOKIE_NAME = "gate";

// Makes a "pass ticket" from your password.
// If you change SITE_PASSWORD on Vercel, all old tickets stop working.
function makeTicket(password) {
  return crypto.createHmac("sha256", password).update("unlocked-v1").digest("hex");
}

// Compares two strings safely (so timing can't leak the answer).
function sameText(a, b) {
  const x = crypto.createHash("sha256").update(String(a)).digest();
  const y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}

// Reads one cookie from the request.
function readCookie(req, name) {
  const all = req.headers.cookie || "";
  for (const part of all.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return "";
}

module.exports = { COOKIE_NAME, makeTicket, sameText, readCookie };
