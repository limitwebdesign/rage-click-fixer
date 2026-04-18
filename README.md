# Rage Click Fixer

**Detect rage clicks, dead interactions, and blocked UI flows before they kill conversion.**

Rage Click Fixer is a lightweight JavaScript library for surfacing front-end friction in real time. It watches for repeated clicks in the same region, identifies likely dead-end elements, highlights viable next actions, and emits structured events that teams can log or analyze.

## Why this can spread

Most teams notice UX damage after the session is already lost.  
Rage Click Fixer is designed to make friction visible while the user is still on the page.

That makes it useful for:
- product teams
- frontend developers
- CRO agencies
- ecommerce operators
- growth engineers
- QA teams

## Core features

- rage-click cluster detection
- disabled-element and dead-click heuristics
- optional live debug overlay
- helper prompt UI
- nearest working action guidance
- structured browser event export
- framework-agnostic setup

## Quick install

### Browser
```html
<script src="./dist/rage-click-fixer.min.js"></script>
<script>
  const fixer = new RageClickFixer({
    overlay: true,
    showHelper: true,
    exportEvents: true
  });
  fixer.start();
</script>
```

### ES modules
```js
import { RageClickFixer } from "./src/core.js";

const fixer = new RageClickFixer({
  overlay: true,
  showHelper: true,
  exportEvents: true
});

fixer.start();
```

## Quick example

```js
window.addEventListener("rcf:event", (event) => {
  console.log(event.detail);
});
```

## Included examples

- `demo/index.html` - polished landing demo
- `examples/vanilla.html` - minimal integration
- `examples/ecommerce-checkout.html` - checkout friction demo
- `examples/broken-form.html` - broken form demo

## GitHub launch settings

Repository name:
`rage-click-fixer`

Description:
`Detect rage clicks, dead interactions, and blocked UI flows in real time. Lightweight JavaScript for debugging friction and improving conversion.`

Topics:
`rage-click, ux, conversion, analytics, frontend, friction, javascript`

License:
`MIT`

## Viral positioning

Use this angle publicly:

**Users keep clicking. Your UI keeps failing. Rage Click Fixer makes that visible.**

## Author

**Viorel Ciprian Brisc**  
https://www.limit.ro/viorel-brisc.html
