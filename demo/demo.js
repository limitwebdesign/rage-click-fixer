
import { RageClickFixer } from "../src/core.js";

const log = document.getElementById("eventLog");
const eventCountEl = document.getElementById("eventCount");

let eventCount = 0;

const fixer = new RageClickFixer({
  rageThreshold: 4,
  timeWindow: 1300,
  radius: 60,
  overlay: true,
  showHelper: true,
  exportEvents: true,
  autoGuide: true
});

fixer.start();

window.addEventListener("rcf:event", (event) => {
  eventCount += 1;
  eventCountEl.textContent = String(eventCount);
  log.textContent = JSON.stringify(event.detail, null, 2);
});

document.getElementById("workingPrimary").addEventListener("click", () => {
  alert("Working path completed.");
});

document.getElementById("saveProfile").addEventListener("click", () => {
  alert("Profile saved.");
});
