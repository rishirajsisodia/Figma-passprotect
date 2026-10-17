// /deck?deck=1  (Vercel sends it here)
// Checks the pass ticket. If OK, sends the visitor to the right Figma file.
//
// Figma links live on Vercel (so nobody can see them in the code):
//   DECK_1, DECK_2, DECK_3 ...   → one per case study
//   FIGMA_URL                    → still works as case study 1 (older setup)

const { COOKIE_NAME, makeTicket, sameText, readCookie } = require("./_auth");

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  // Which case study? Keep only letters, numbers, - and _
  const deck = String((req.query && req.query.deck) || "1").replace(/[^a-zA-Z0-9_-]/g, "") || "1";

  const realPassword = process.env.SITE_PASSWORD;
  const ticket = readCookie(req, COOKIE_NAME);
  const hasTicket = realPassword && ticket && sameText(ticket, makeTicket(realPassword));

  const redirect = (to) => { res.statusCode = 302; res.setHeader("Location", to); res.end(); };

  // No ticket → back to the password page (remember which case study).
  if (!hasTicket) return redirect("/?deck=" + encodeURIComponent(deck));

  const figmaUrl = process.env["DECK_" + deck] || (deck === "1" ? process.env.FIGMA_URL : "");

  // Link not set up on Vercel → show a short message on the password page.
  if (!figmaUrl || !figmaUrl.startsWith("https://")) {
    return redirect("/?deck=" + encodeURIComponent(deck) + "&missing=1");
  }

  // Right ticket → open the Figma file.
  redirect(figmaUrl);
};
