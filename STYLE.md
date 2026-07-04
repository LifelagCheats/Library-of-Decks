```
# Code Style Guide (TypeScript / Astro)

Hey! Before you push anything, skim this. It's not meant to be a wall of rules — it's just how we've agreed to write things so the codebase doesn't look like 4 different people wrote it (even though it will be).

---

## Braces

Same-line braces. Always.

```ts
// ✅ This
function tick() {
  if (x > 0) {
    doSomething();
  }
}

// ❌ Not this
function tick() {
  if (x > 0)
  {
    doSomething();
  }
}
```
```
```
Yes, this applies to functions, classes, if/else, loops, arrow function bodies — everything.

> Arrow functions that return a single expression can omit braces, but keep them if they contain any logic or side‑effects.

---

## Indentation

2 spaces. No tabs. (Matches our existing code.)

```ts
export function setupDrag(): void {
  let dragged: HTMLElement | null = null;
  let offsetX: number = 0;
  // ...
}
```

---

## Modules (instead of namespaces)

We use ES modules (`import` / `export`) to group related code.

- Each file is a module.
- Prefer named exports over default exports for clarity.
- Keep imports at the top of the file, organised by:
  1. External libraries
  2. Internal helpers / types
  3. Relative imports (`.`, `..`)

```ts
// ✅
import { getSlots } from "./drag";
import { someUtil } from "../utils";
import type { SlotMap } from "./types";

// ❌ Avoid `import * as` unless absolutely necessary.
```

Do **not** use `namespace` or `<reference>` — they’re outdated.

---

## Types

Use TypeScript’s built‑in types and explicit annotations whenever possible.

- Prefer `interface` for object shapes, `type` for unions / utilities.
- Avoid `any` — use `unknown` if you truly don’t know the type.
- Use the `| null` or `| undefined` pattern explicitly. (We prefer `| null` for “no value”.)

```ts
// ✅
interface SlotAssignment {
  slot: HTMLElement;
  card: HTMLElement | null;
}

type SlotMap = Map<HTMLElement, HTMLElement | null>;

// ❌
let data: any;
```

For DOM elements, use `HTMLElement` (or more specific types like `HTMLDivElement`).  
Avoid `Element` unless you really mean it.

---

## Constants

Use `const` (or `as const` for literal objects) – never `var`.

- For truly constant values (configuration, magic numbers), use `const` at the top of the file or in a dedicated `config.ts` module.
- If a value is reused across files, place it in a shared constants file (e.g., `constants.ts`).

```ts
// ✅
const SLOT_SELECTOR = '.cardSlot';
const DRAG_Z_INDEX = 1000;

// ✅ For configuration objects
export const DRAG_CONFIG = {
  zIndex: 1000,
  rotationFactor: 0.2,
} as const;

// ❌
var MAX_RETRIES = 3;
```

---

## Data Structures: Interfaces & Types

- Use `interface` when describing an object that will be implemented or extended.
- Use `type` for unions, intersections, or complex mappings.

```ts
// ✅ Plain data bundle (no methods)
interface CardState {
  id: string;
  isStored: boolean;
}

// ✅ Type alias for a function signature or union
type SlotMap = Map<HTMLElement, HTMLElement | null>;
```

### Classes

Use classes when the thing needs to *do* something over time (like a drag manager or a state machine).  
Keep methods small and focused.

```ts
class DragManager {
  private dragged: HTMLElement | null = null;
  private offsetX = 0;

  startDrag(e: PointerEvent): void {
    // ...
  }

  moveDrag(e: PointerEvent): void {
    // ...
  }
}
```

---

## File Structure (rough order)

For a `.ts` file:

```ts
// 1. Import external libraries
import { someLib } from 'external';

// 2. Import local types / helpers
import type { SlotMap } from './types';
import { getSlots } from './drag';

// 3. Constants (if small enough to stay in this file)
const SLOT_SELECTOR = '.cardSlot';

// 4. Type / interface definitions
interface CardData { ... }

// 5. Helper functions (private / internal)
function elementOverlap(...) { ... }

// 6. Exported functions / classes
export function setupDrag(): void { ... }
export const getSlots = () => { ... };
```

For `.astro` files:

- Keep the frontmatter (`---`) at the top.
- Place component logic (imports, constants, props) inside the frontmatter.
- Keep the template (HTML) clean – move complex logic to helper modules.

```astro
---
// ✅ Good: imports first, then logic
import Card from '../components/Card.astro';
const slots = getSlots();
---
<div class="grid">
  {slots.map(slot => <Card {slot} />)}
</div>
```

---

## Naming

| Thing | Style | Example |
|---|---|---|
| Variables / properties | camelCase | `lastTime`, `rawValue`, `slotMap` |
| Functions | camelCase | `setupDrag()`, `assignCardToSlot()` |
| Classes / Interfaces | PascalCase | `DragManager`, `CardState` |
| Constants (local) | camelCase | `dragZIndex` (or SCREAMING_SNAKE if global config) |
| Type aliases | PascalCase | `SlotMap`, `CardData` |
| File names | kebab-case | `drag-helper.ts`, `card-utils.ts` |
| Private / internal members | camelCase, no prefix | `offsetX`, `draggedElement` |

No Hungarian notation (`bState`, `iCount`).  
No underscores at the start of names – that’s for `private` fields if you must, but we prefer using `private` keyword.

> Acronyms and part numbers keep their canonical capitalization — `I2C`, `GPIO`, `HTMLElement`.  
> Everything else follows PascalCase for types, camelCase for values.

---

## Comments

Write comments for *why*, not *what*. The code already shows what.

If you had to think hard about something or made a decision that isn’t obvious, write a note.

```ts
// Using overflow‑safe subtraction on timestamps — do NOT replace with direct comparison
if (now - lastTime >= INTERVAL) { ... }
```

For work in progress or uncertainties, leave a `// TODO:` comment so it’s searchable.

```ts
// TODO: Revamp this when we have a better state system
export function setupDrag(): void { ... }
```

Use JSDoc for public APIs (exported functions / classes) to clarify parameters and return types.

```ts
/**
 * Assigns a card to a slot and updates the visual position.
 * @param card - The card element to assign.
 * @param slot - The target slot element.
 * @param wrapper - The card's wrapper container.
 * @param slotMap - The global slot map.
 */
export function assignCardToSlot(
  card: HTMLElement,
  slot: HTMLElement,
  wrapper: HTMLElement,
  slotMap: SlotMap
): void { ... }
```

---

## What We're Not Doing

- No `console.log` left in production code. Use `console.debug` or a dedicated logger, and strip them in the build step.
- No `any` – use `unknown` and type guards if necessary.
- No magic numbers or strings floating in logic. Put them in `constants.ts` or as named `const` at the top.
- No `var` – use `const` or `let`.
- No side‑effects in modules at top level (except for constants). All logic should be inside functions/classes.

---

## Astro‑specific Notes

- Use `.astro` files for components that are mostly static or need server‑side rendering.
- Use `.ts` for pure logic, helpers, and state management.
- Prefer using `Astro.props` for passing data to components, and keep props typed with an interface.
- Avoid mixing client‑side scripts inside `.astro` templates – put them in a separate `.ts` module and import with `<script>` tags when needed.

---

That's it. When in doubt, look at how the existing files do it and match that.  
If you think a rule here is wrong or missing something, bring it up — this doc can change.
```
