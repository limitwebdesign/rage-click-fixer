
export function createExportPayload({ type, reason, clickCount, target, nearestWorking }) {
  return {
    type,
    reason,
    clickCount,
    timestamp: new Date().toISOString(),
    target: target ? serializeElement(target) : null,
    nearestWorking: nearestWorking ? serializeElement(nearestWorking) : null
  };
}

export function emitEvent(payload) {
  window.dispatchEvent(new CustomEvent("rcf:event", { detail: payload }));
}

function serializeElement(el) {
  return {
    tag: el.tagName,
    id: el.id || "",
    classes: [...el.classList],
    text: (el.textContent || "").trim().slice(0, 120)
  };
}
