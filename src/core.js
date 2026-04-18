
import { detectCluster, classifyTarget, findNearestWorkingElement } from "./detector.js";
import { createOverlay, updateOverlay, setOverlayStatus } from "./overlay.js";
import { createHelper, showHelperMessage, highlightElement } from "./heuristics.js";
import { createExportPayload, emitEvent } from "./export.js";

export class RageClickFixer {
  constructor(options = {}) {
    this.options = {
      rageThreshold: 4,
      timeWindow: 1200,
      radius: 56,
      overlay: false,
      showHelper: true,
      helperDuration: 2800,
      exportEvents: true,
      autoGuide: true,
      ...options
    };

    this.clicks = [];
    this.started = false;
    this.handleClick = this.handleClick.bind(this);
    this.overlayApi = null;
    this.helperEl = null;
  }

  start() {
    if (this.started) return;
    this.started = true;

    if (this.options.overlay) {
      this.overlayApi = createOverlay();
      setOverlayStatus(this.overlayApi, "Watching for friction");
    }

    if (this.options.showHelper) {
      this.helperEl = createHelper();
    }

    document.addEventListener("click", this.handleClick, true);
  }

  stop() {
    if (!this.started) return;
    this.started = false;
    document.removeEventListener("click", this.handleClick, true);
  }

  handleClick(event) {
    const now = Date.now();
    const target = event.target;

    this.clicks.push({
      time: now,
      x: event.clientX,
      y: event.clientY,
      target
    });

    this.clicks = this.clicks.filter((click) => now - click.time <= this.options.timeWindow);

    const cluster = detectCluster(this.clicks, this.options.rageThreshold, this.options.radius);

    if (!cluster.triggered) {
      if (this.overlayApi) {
        updateOverlay(this.overlayApi, {
          clusterSize: this.clicks.length,
          lastReason: "-",
          totalEvents: this.overlayApi.totalEvents
        });
      }
      return;
    }

    const classification = classifyTarget(target);
    const nearestWorking = this.options.autoGuide ? findNearestWorkingElement(target) : null;

    const payload = createExportPayload({
      type: "rage-click",
      reason: classification.reason,
      clickCount: this.clicks.length,
      target,
      nearestWorking
    });

    if (this.options.exportEvents) {
      emitEvent(payload);
    }

    if (this.overlayApi) {
      this.overlayApi.totalEvents += 1;
      updateOverlay(this.overlayApi, {
        clusterSize: this.clicks.length,
        lastReason: classification.reason,
        totalEvents: this.overlayApi.totalEvents
      });
      setOverlayStatus(this.overlayApi, "Friction detected");
    }

    if (this.helperEl && this.options.showHelper) {
      const message = nearestWorking
        ? classification.message + " Try the highlighted path."
        : classification.message;

      showHelperMessage(this.helperEl, message, this.options.helperDuration);
    }

    if (nearestWorking && this.options.autoGuide) {
      highlightElement(nearestWorking);
      nearestWorking.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    this.clicks = [];
  }
}

if (typeof window !== "undefined") {
  window.RageClickFixer = RageClickFixer;
}
