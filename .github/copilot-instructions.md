# Copilot Instructions — Card Generator Project

## Project Overview
A Magic: The Gathering custom card generator with:
- **Frontend**: React (JSX) with Chakra UI, built with craco
- **Backend**: Express.js in TypeScript, connecting to a PostgreSQL database
- **Shared**: Common route definitions in `/shared`

## Coding Style

### Braces — Allman Style (C++)
Opening braces go on a **new line**, aligned with the control statement:

```ts
function example()
{
	if (condition)
	{
		doSomething();
	}
	else
	{
		doSomethingElse();
	}
}
```

This applies to: functions, classes, if/else, for, while, switch, try/catch, arrow functions with blocks.

**Exception**: Single-line arrow functions without braces are fine: `(x) => x + 1`

### Indentation
- Use **spaces** (not tabs), with an indent size of 3.

### Naming Conventions
| Element               | Convention     | Example                  |
|----------------------|----------------|--------------------------|
| Variables, functions | camelCase      | `cardName`, `getCardById`|
| Classes, Components  | PascalCase     | `Card`, `UiPanel`        |
| Constants            | UPPER_SNAKE    | `MAX_RETRIES`            |
| File names           | snake_case     | `card_read_controller.ts`|
| Database columns     | snake_case     | `mana_cost`, `image_url` |
| CSS classes          | kebab-case     | `card-image-panel`       |

### Quotes & Semicolons
- Use **double quotes** for all strings in JS/TS and JSX: `"hello"`, `<Box color="red">`
- Always use **semicolons** at the end of statements.

### Trailing Commas
- Use trailing commas in multi-line arrays, objects, and parameter lists (ES5 style).

### Imports
- Group imports in this order, separated by a blank line:
  1. External libraries (`react`, `express`, `@chakra-ui/react`)
  2. Internal modules (project files)
- Use named imports when possible: `import { Card } from "./card.js";`

### TypeScript Specifics (Backend)
- Always add explicit return types to functions and methods.
- Use `interface` for object shapes, `type` for unions/aliases.
- Avoid `any` — use `unknown` and narrow with type guards when the type is uncertain.
- Use `.js` extensions in import paths (required by the ESM + TypeScript setup).

### React / JSX Specifics (Frontend)
- Use functional components (no class components).
- Prefer `useState`, `useEffect`, and other hooks.
- Destructure props when there are few; use `props.` prefix when there are many.
- Keep components in individual files under `src/components/`.

### Error Handling
- Backend: wrap route handlers in try/catch, return appropriate HTTP status codes.
- Frontend: handle fetch errors gracefully with user feedback.

### Comments
- Use `//` for single-line comments, `/* */` for multi-line.
- Use `/** */` JSDoc for public functions and classes in TypeScript.
- Don't state the obvious — comment *why*, not *what*.

### General
- Keep functions short and focused (single responsibility).
- Use descriptive and explicit names for variables and functions. Try to avoid abbreviations unless they are well-known (e.g., `id`, `url`, `db`...).
- Avoid magic numbers — use named constants.
- Prefer `const` over `let`; never use `var`.
