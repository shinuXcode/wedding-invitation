/* -------- config -------- */
const CONFIG = {
  rsvp: "https://forms.gle/yourFormId",
  map: "https://maps.google.com/?q=Venue",
  cal: "https://www.google.com/calendar/render?action=TEMPLATE&text=Wedding&dates=20251013T140000Z/20251013T170000Z&location=Venue",
  dl: "assets/card.jpg", // local download
  targetISO: "2025-10-02T00:00:00+05:30", // countdown end
};

/* -------- wire buttons -------- */
function wire() {
  document.getElementById("calBtn").href = CONFIG.cal;
  document.getElementById("dlBtn").href = CONFIG.dl;
}

/* -------- countdown -------- */
function countdown() {
  const T = new Date(CONFIG.targetISO).getTime(),
    d = document.getElementById("d"),
    h = document.getElementById("h"),
    m = document.getElementById("m"),
    s = document.getElementById("s");

  function tick() {
    let diff = Math.max(0, T - Date.now());
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

/* -------- optional helpers -------- */
const mapUrl =
  "https://www.google.com/maps/place/" +
  encodeURIComponent("Basantpur, Katihar, Bihar 854103");

const calUrl = "https://calendar.google.com/calendar/u/0/r/day/2025/10/02";

document.getElementById("calBtn").addEventListener("click", (e) => {
  e.preventDefault();
  window.open(calUrl, "_blank");
});
