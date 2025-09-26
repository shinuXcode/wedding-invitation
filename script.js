/* ─── tiny helpers ─── */
function setCookie(name, val, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${name}=${encodeURIComponent(
    val
  )}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}
function getCookie(name) {
  const m = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return m ? decodeURIComponent(m[1]) : null;
}
function removeQueryParam(param) {
  const u = new URL(location.href);
  u.searchParams.delete(param);
  history.replaceState({}, document.title, u.toString());
}

/* ─── gate logic ─── */
(function () {
  const cfg = window.APP_CONFIG;
  const url = new URL(location.href);
  const token = url.searchParams.get(cfg.tokenParam);

  /* QR token present & valid? */
  if (token && token === cfg.tokenValue) {
    setCookie(cfg.cookieName, "1", cfg.cookieDays);
    removeQueryParam(cfg.tokenParam);
  }

  const unlocked = getCookie(cfg.cookieName) === "1";
  if (!unlocked) {
    const gate = document.getElementById("gate");
    gate.classList.add("show");
    document.body.classList.add("gate-active"); // blur bg

    const input = document.getElementById("gate-input");
    const btn = document.getElementById("gate-btn");
    const err = document.getElementById("gate-error");

    const tryUnlock = () => {
      const val = (input.value || "").trim();
      if (!val) {
        err.textContent = "Passcode required.";
        return;
      }
      if (val === cfg.simplePassword) {
        setCookie(cfg.cookieName, "1", cfg.cookieDays);
        gate.classList.remove("show");
        document.body.classList.remove("gate-active");
        err.textContent = "Grab ypur invitation";
      } else {
        err.textContent = "Your are not invited.";
      }
    };

    btn.addEventListener("click", tryUnlock);
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") tryUnlock();
    });
  }
})();

/* ─── loader fade ─── */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const card = document.querySelector(".card");
  loader.style.opacity = "0";
  setTimeout(() => (loader.style.display = "none"), 500); // sync with CSS
  card.style.opacity = "1";
});

/* ─── open card transition ─── */
document.getElementById("openBtn").addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("fade-out");
  setTimeout(() => {
    location.href = "index2.html";
  }, 700);
});
