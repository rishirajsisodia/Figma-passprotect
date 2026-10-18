// /api/unlock
// The page sends the typed password here. This runs on Vercel's server,
// so visitors can never see the real password.

const { COOKIE_NAME, HINT_COOKIE, ONE_WEEK, makeTicket, sameText } = require("./_auth");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false });
    return;
  }

  const realPassword = process.env.SITE_PASSWORD;
  if (!realPassword) {
    res.status(500).json({ ok: false, error: "SITE_PASSWORD is not set on Vercel" });
    return;
  }

  let body = req.body || {};
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const typed = String(body.password || "").trim();

  if (!typed || !sameText(typed, realPassword)) {
    // Small wait on a wrong try, so guessing many passwords is slow.
    await new Promise((r) => setTimeout(r, 700));
    res.status(401).json({ ok: false });
    return;
  }

  // Right password → give the visitor:
  // 1. the real pass ticket (HttpOnly: page code can't read or fake it)
  // 2. a small flag so the page knows to skip straight to Figma next time
  res.setHeader("Set-Cookie", [
    `${COOKIE_NAME}=${makeTicket(realPassword)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${ONE_WEEK}`,
    `${HINT_COOKIE}=1; Path=/; Secure; SameSite=Lax; Max-Age=${ONE_WEEK}`,
  ]);
  res.status(200).json({ ok: true });
};
