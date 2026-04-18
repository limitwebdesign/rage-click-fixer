
export function detectCluster(clicks, threshold, radius) {
  if (clicks.length < threshold) {
    return { triggered: false };
  }

  const recent = clicks.slice(-threshold);
  const first = recent[0];
  const last = recent[recent.length - 1];
  const distance = Math.hypot(first.x - last.x, first.y - last.y);

  return {
    triggered: distance <= radius,
    distance,
    count: recent.length
  };
}

export function classifyTarget(target) {
  if (!target) {
    return {
      reason: "unknown-target",
      message: "A likely broken interaction was detected."
    };
  }

  const disabled =
    target.matches?.(":disabled") ||
    target.getAttribute?.("aria-disabled") === "true" ||
    target.classList?.contains("disabled") ||
    target.classList?.contains("is-disabled");

  if (disabled) {
    return {
      reason: "disabled-element",
      message: "This control looks disabled or blocked."
    };
  }

  const interactive = target.closest?.("button, a, input, select, textarea, [role='button']");
  if (!interactive) {
    return {
      reason: "dead-zone",
      message: "Users may be clicking a non-interactive area."
    };
  }

  return {
    reason: "blocked-or-confusing-flow",
    message: "A likely friction point was detected."
  };
}

export function findNearestWorkingElement(target) {
  if (!target || !document) return null;

  const candidates = [...document.querySelectorAll("button, a, input, select, textarea, [role='button']")].filter((el) => {
    const isDisabled =
      el.matches?.(":disabled") ||
      el.getAttribute?.("aria-disabled") === "true" ||
      el.classList?.contains("disabled") ||
      el.classList?.contains("is-disabled");

    const style = window.getComputedStyle(el);
    const hidden = style.display === "none" || style.visibility === "hidden";

    return !isDisabled && !hidden;
  });

  if (!candidates.length) return null;

  const targetRect = target.getBoundingClientRect();
  let best = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const el of candidates) {
    if (el === target) continue;

    const rect = el.getBoundingClientRect();
    const distance = Math.hypot(rect.left - targetRect.left, rect.top - targetRect.top);

    if (distance < bestDistance) {
      bestDistance = distance;
      best = el;
    }
  }

  return best;
}
