# Kiaros - Premium Tools Directory

A modern, high-performance tools directory built with Next.js 15.2.4.

## Tech Stack

- Next.js 15.2.4
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Headless UI
- Framer Motion
- NextAuth.js

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication related routes
│   ├── (tools)/           # Tool-specific routes
│   ├── (marketing)/       # Marketing pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # UI components
│   ├── shared/           # Shared components
│   ├── layout/           # Layout components
│   └── tools/            # Tool-specific components
├── lib/                  # Utilities and configurations
│   ├── store/           # Redux store
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom hooks
│   └── constants/       # Constants and configurations
├── styles/              # Global styles
└── types/               # TypeScript type definitions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Modern, minimalist design
- High-performance and SEO optimized
- Responsive and mobile-first
- Authentication with Google Sign-in
- Secure payment integration
- Smooth animations with Framer Motion

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
