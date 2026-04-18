
export function createOverlay() {
  const root = document.createElement("div");
  root.setAttribute("data-rcf-overlay", "true");
  root.innerHTML = `
    <div class="rcf-overlay-card">
      <div class="rcf-overlay-title">Rage Click Fixer</div>
      <div class="rcf-overlay-grid">
        <div><span>Status</span><strong data-rcf-status>Watching</strong></div>
        <div><span>Cluster</span><strong data-rcf-cluster>0</strong></div>
        <div><span>Reason</span><strong data-rcf-reason>-</strong></div>
        <div><span>Events</span><strong data-rcf-events>0</strong></div>
      </div>
    </div>
  `;

  const style = document.createElement("style");
  style.textContent = `
    [data-rcf-overlay="true"] {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 2147483646;
      font-family: Arial, sans-serif;
    }

    .rcf-overlay-card {
      min-width: 240px;
      padding: 14px;
      border-radius: 14px;
      background: rgba(15, 18, 30, 0.94);
      color: #fff;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.24);
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(8px);
    }

    .rcf-overlay-title {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .rcf-overlay-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      font-size: 12px;
    }

    .rcf-overlay-grid span {
      display: block;
      opacity: 0.7;
      margin-bottom: 4px;
    }

    .rcf-overlay-grid strong {
      display: block;
      font-size: 13px;
      line-height: 1.2;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(root);

  return {
    root,
    style,
    totalEvents: 0,
    status: root.querySelector("[data-rcf-status]"),
    cluster: root.querySelector("[data-rcf-cluster]"),
    reason: root.querySelector("[data-rcf-reason]"),
    events: root.querySelector("[data-rcf-events]")
  };
}

export function updateOverlay(api, values) {
  api.cluster.textContent = String(values.clusterSize ?? 0);
  api.reason.textContent = String(values.lastReason ?? "-");
  api.events.textContent = String(values.totalEvents ?? 0);
}

export function setOverlayStatus(api, text) {
  api.status.textContent = text;
}
