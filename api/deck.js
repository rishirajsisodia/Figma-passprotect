// /deck  (Vercel sends it here)
// Checks the pass ticket. If OK, sends the visitor to your Figma file.
// The Figma link lives on Vercel as FIGMA_URL, so nobody can see it in the code.

const { COOKIE_NAME, makeTicket, sameText, readCookie } = require("./_auth");

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  const realPassword = process.env.SITE_PASSWORD;
  const figmaUrl = process.env.FIGMA_URL;
  const ticket = readCookie(req, COOKIE_NAME);
  const hasTicket = realPassword && ticket && sameText(ticket, makeTicket(realPassword));

  // No ticket, or setup not finished → back to the password page.
  if (!hasTicket || !figmaUrl || !figmaUrl.startsWith("https://")) {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
    return;
  }

  // Right ticket → open the Figma file.
  res.statusCode = 302;
  res.setHeader("Location", figmaUrl);
  res.end();
};
