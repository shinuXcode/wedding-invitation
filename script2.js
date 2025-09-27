/* script.js */
/* -------- configuration -------- */
const CONFIG = {
  cal: "https://www.google.com/calendar/render?action=TEMPLATE&text=Wedding&dates=20251013T140000Z/20251013T170000Z&location=Venue",
  dl: "wedding-card.png",
  targetISO: "2025-10-02T00:00:00+05:30",
};

/* -------- wire buttons -------- */
function wire() {
  const calBtn = document.getElementById("calBtn");
  const dlBtn = document.getElementById("dlBtn");
  if (calBtn) calBtn.href = CONFIG.cal;
  if (dlBtn) dlBtn.href = CONFIG.dl;
}

/* -------- countdown -------- */
function countdown() {
  const end = new Date(CONFIG.targetISO).getTime(),
    d = document.getElementById("d"),
    h = document.getElementById("h"),
    m = document.getElementById("m"),
    s = document.getElementById("s");

  function tick() {
    let diff = Math.max(0, end - Date.now());
    const D = Math.floor(diff / 864e5);
    diff -= D * 864e5;
    const H = Math.floor(diff / 36e5);
    diff -= H * 36e5;
    const M = Math.floor(diff / 6e4);
    diff -= M * 6e4;
    const S = Math.floor(diff / 1e3);
    d.textContent = String(D).padStart(2, "0");
    h.textContent = String(H).padStart(2, "0");
    m.textContent = String(M).padStart(2, "0");
    s.textContent = String(S).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}

/* -------- init -------- */
document.addEventListener("DOMContentLoaded", () => {
  wire();
  countdown();
});
