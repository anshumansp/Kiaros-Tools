# Kiaros

A comprehensive suite of productivity tools designed for professionals to streamline their workflow and boost efficiency.

## Tool Suite

- **PDF Tools**: Merge, split, compress, and convert PDF files
- **Image Converter**: Convert images between different formats (JPEG, PNG, WebP, GIF)
- **Resume Builder**: Create professional resumes with customizable templates
- **More tools coming soon!**

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL
- Infrastructure: Docker, Nginx

## Prerequisites

- Docker and Docker Compose
- Node.js 20.x (for local development)
- OpenSSL (for generating SSL certificates)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kiaros.git
   cd kiaros
   ```

2. Generate SSL certificates for local development:
   ```bash
   ./scripts/generate-ssl.sh
   ```

3. Start the development environment:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: https://localhost
   - Backend API: https://localhost/api
   - Swagger Documentation: https://localhost/api-docs

## Development

### Frontend Development

```bash
cd client
npm install
npm run dev
```

### Backend Development

```bash
cd server
npm install
npm run dev
```

## Environment Variables

Create `.env` files in both `client` and `server` directories:

### Client (.env)
```
NEXT_PUBLIC_API_URL=https://localhost/api
```

### Server (.env)
```
NODE_ENV=development
PORT=5000
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=kiaros
POSTGRES_HOST=postgres
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Features

- Modern, responsive UI with smooth animations
- Dark mode support
- Premium subscription model for advanced features
- Interactive chatbot assistant
- Mobile-optimized experience

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
