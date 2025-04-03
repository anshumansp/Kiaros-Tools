# ToolsZone

A web application providing various utility tools like PDF merging, resume making, etc.

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
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
   git clone https://github.com/yourusername/toolzone.git
   cd toolzone
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
POSTGRES_DB=toolzone
POSTGRES_HOST=postgres
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Features

- PDF Merger: Combine multiple PDF files into one
- Resume Maker (Coming Soon)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
