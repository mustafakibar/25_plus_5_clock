# FCC 25 + 5 Clock

React Pomodoro-style timer with session/break controls and an audible end-of-session alert, built for the FreeCodeCamp Front End Libraries certification.

## Features

- Configurable session length (default 25 min) and break length (default 5 min) via increment/decrement controls
- Start, pause, and reset controls for the countdown timer
- Automatic switch between session and break phases when a countdown reaches zero
- Audible beep played at phase transitions using an `<audio>` element
- Visual mode indicator ("Session" / "Break") and MM:SS countdown display
- Length controls disabled while the timer is running

## Tech Stack

- React 17 — functional components with hooks (`useState`, `useEffect`, `useRef`)
- TypeScript
- Vite
- Sass — component-scoped `.scss` stylesheets

## Requirements

- Node.js 18+
- Yarn 1.x (matching the `yarn.lock` in the repo)

## Installation

```bash
yarn install
```

## Usage

```bash
yarn dev
```

Open `http://localhost:5173` in your browser.

## Build

```bash
yarn build
```

## Project Structure

```
.
├── src/
├── index.html
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file.
