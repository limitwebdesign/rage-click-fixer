
export function createHelper() {
  const el = document.createElement("div");
  el.setAttribute("data-rcf-helper", "true");
  document.body.appendChild(el);

  const style = document.createElement("style");
  style.textContent = `
    [data-rcf-helper="true"] {
      position: fixed;
      right: 16px;
      bottom: 16px;
      z-index: 2147483645;
      max-width: 320px;
      padding: 14px 16px;
      border-radius: 14px;
      background: rgba(17, 20, 32, 0.96);
      color: #fff;
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.45;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transform: translateY(16px);
      opacity: 0;
      transition: transform 180ms ease, opacity 180ms ease;
      pointer-events: none;
    }

    [data-rcf-helper="true"].is-visible {
      transform: translateY(0);
      opacity: 1;
    }

    [data-rcf-highlight="true"] {
      outline: 3px solid #ff6b6b;
      outline-offset: 2px;
      box-shadow: 0 0 0 6px rgba(255, 107, 107, 0.16);
    }
  `;

  document.head.appendChild(style);
  return el;
}

export function showHelperMessage(el, message, duration) {
  el.textContent = message;
  el.classList.add("is-visible");

  clearTimeout(el._rcfTimeout);
  el._rcfTimeout = setTimeout(() => {
    el.classList.remove("is-visible");
  }, duration);
}

export function highlightElement(el) {
  if (!el) return;

  el.setAttribute("data-rcf-highlight", "true");
  clearTimeout(el._rcfHighlightTimeout);
  el._rcfHighlightTimeout = setTimeout(() => {
    el.removeAttribute("data-rcf-highlight");
  }, 1800);
}
