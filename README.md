# RoutinePilot – AI Daily Routine Copilot

RoutinePilot is an AI-inspired planner that orchestrates your daily rhythm. Feed it your intent, energy profile, and anchor tasks; it synthesizes an energy-aware schedule complete with micro rituals, coaching nudges, and soundtrack pairings.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A modern web browser

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd agentic-bc4361ec
```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified in the console)

## 📁 Project Structure

```
├── app/                 # Next.js app router entrypoints
├── components/          # UI building blocks
├── lib/                 # Planning heuristics and helpers
├── store/               # Zustand state store
├── package.json         # Project dependencies and scripts
└── tailwind.config.ts   # Tailwind design tokens
```

## 🛠️ Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm start` - Starts the production server
- `npm run lint` - Runs the linter to check code quality
- `npm run typecheck` - Validates TypeScript types

## 🎨 Features

- AI-crafted routine blueprint grounded in your energy profile, wake/sleep schedule, and priority tasks
- Interactive task grid with category, duration, and energy demand presets
- Adaptive micro rituals plus coaching nudges for focus, energy, and wellness
- Soundtrack pairings for each day-part
- Fully responsive, dark-mode-first interface powered by Tailwind CSS and Framer Motion

## 📚 Technologies

- [Next.js 14 App Router](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [date-fns](https://date-fns.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
