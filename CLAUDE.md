# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "곤충 탐험대" (Insect Explorer), an educational bug-catching game built with React and Vite. Players catch insects by clicking them, earning points and collecting educational facts about each species via the Gemini AI API.

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript check then Vite build)
- `npm run preview` - Preview production build

## Environment Setup

The app requires a Gemini API key. Set `GEMINI_API_KEY` in `.env.local` (the app expects `process.env.API_KEY` at runtime, which is injected via `vite-plugin-environment`).

## Architecture

### Core Game Flow
The game state machine has three states: `START` → `PLAYING` → `GAME_OVER`. The main game loop handles:
- **Spawning**: Bugs and webs spawn at intervals controlled by `INITIAL_SETTINGS`
- **Movement**: Bugs move via `requestAnimationFrame` with boundary collision and web slowdown mechanics
- **Interaction**: Clicking bugs catches them; clicking webs clears them for bonus points
- **AI Facts**: Each caught bug triggers an async Gemini API call for educational content

### Key Files

- **`App.tsx`**: Main game controller. Manages all state (game state, bugs, webs, score, encyclopedia), timers for spawning/movement, and game clock. The `catchBug` callback updates caught counts immediately and fetches AI facts in background.
- **`types.ts`**: Defines `BugType` enum (14 Korean insect names), `GameState` enum, and interfaces for `BugInstance`, `WebInstance`, `CaughtBug`, `GameSettings`.
- **`constants.tsx`**: `BUG_DATA` maps each bug type to emoji/points/rarity; `INITIAL_SETTINGS` configures game duration (45s) and spawn rate (1000ms).
- **`services/geminiService.ts`**: `getBugFact()` calls Gemini 3 Flash Preview with high temperature (0.9) for variety. Korean prompts ask for single-sentence facts suitable for children.
- **`components/`**:
  - `BugComponent.tsx`: Renders clickable bug emoji with absolute positioning
  - `WebComponent.tsx`: Renders spider web obstacle (clickable for bonus)
  - `Encyclopedia.tsx`: Modal showing caught bugs, counts, and collected AI-generated facts

### Game Mechanics

- Bugs spawn at random positions (10-95% x, 15-85% y) with type-specific sizes and speeds
- Movement: trigonometric calculation using `angle`, affected by web collisions (35% speed)
- Web collision detection: distance-based check within 10 units
- Scoring: Points per bug type (5-100), +5 for clearing webs
- AI facts are deduplicated and stored per bug type (max 10 facts each)

### UI/UX

- Korean UI throughout with "font-jua" custom font
- Responsive header with score/time display, encyclopedia button
- Real-time capture notifications (2-second auto-dismiss)
- Encyclopedia shows locked/unlocked states; unlocked bugs show collected facts
- 45-second game timer with visual countdown pulse under 10s

### TypeScript Configuration

- Strict mode enabled
- Vite with React plugin and environment variable injection
- Build output to `dist/` with relative base path for GitHub Pages deployment
