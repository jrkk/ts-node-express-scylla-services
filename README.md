# Express TypeScript Node MySQL Services

A production-ready boilerplate application built with Node.js, Express, and TypeScript. Perfect for building RESTful APIs with best practices and modern tooling.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: MySQL
- **Testing**: Mocha & Chai
- **Process Management**: PM2
- **Linting**: ESLint
- **Formatting**: Prettier

## 📁 Project Structure

```
express-ts-node-services/
├── src/
│   ├── Config/           # Application configuration files
│   ├── Controller/       # Route controllers (business logic)
│   ├── Entities/         # Sequelize models/entities
│   ├── Middleware/       # Express middleware functions
│   ├── Plugins/          # Plugin integrations
│   ├── Services/         # Business logic services
│   └── index.ts          # Application entry point
├── test/                 # Test files
├── .vscode/              # VS Code configuration
├── .cursorrules          # Cursor IDE rules
├── .cursorignore         # Cursor IDE ignore file
├── tsconfig.json         # TypeScript configuration
├── eslint.config.js      # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .mocharc.json         # Mocha configuration
└── package.json          # Project dependencies and scripts
```

## 🛠️ Installation

### Traditional Setup

1. Clone the repository:

```bash
git clone https://github.com/jrkk/ts-node-express-mysql-services.git
cd ts-node-express-mysql-services
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=express_db
DB_USERNAME=root
DB_PASSWORD=password
```

### 🐳 Docker Setup

For a quick start with Docker (includes database):

```bash
# Using Docker Compose (recommended)
docker-compose up --build

# The application will be available at http://localhost:3000
```

📖 **For detailed Docker instructions, see [docs/docker.md](docs/docker.md)**

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### PM2 Process Management

For production environments, use PM2 for process management:

```bash
# Start with PM2 (builds automatically)
npm run pm2:start:prod

# Monitor processes
npm run pm2:monit

# View logs
npm run pm2:logs
```

📖 **For detailed PM2 instructions, see [docs/pm2.md](docs/pm2.md)**

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Watch Mode

```bash
npm run test:watch
```

## 🔍 Linting and Formatting

### Lint Code

```bash
npm run lint
```

### Fix Linting Issues

```bash
npm run lint:fix
```

### Format Code

```bash
npm run format
```

### Check Formatting

```bash
npm run format:check
```

## 🐛 Debugging

### VS Code Debugger

This project includes VS Code debug configurations:

1. **Debug TypeScript**: Debug the main application
2. **Debug Current Test**: Debug the currently open test file
3. **Debug All Tests**: Debug all test files
4. **Attach to Process**: Attach debugger to a running process

Press `F5` or use the Debug panel in VS Code to start debugging.

## 📝 API Endpoints

### Health Check

```
GET /api/health
```

### Users (Example)

```
GET    /api/users      - Get all users
GET    /api/users/:id  - Get user by ID
POST   /api/users      - Create a new user
```

## 🎨 Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Prettier for code formatting
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required

## 🔧 IDE Support

### VS Code

The project includes VS Code settings for:

- Format on save
- ESLint auto-fix on save
- TypeScript IntelliSense
- Recommended extensions

### Cursor IDE

The project is fully compatible with Cursor IDE:

- `.cursorrules` file contains project-specific guidelines
- `.cursorignore` excludes unnecessary files

## 📦 Available Scripts

| Script                   | Description                              |
| ------------------------ | ---------------------------------------- |
| `npm run dev`            | Start development server with hot reload |
| `npm run build`          | Build TypeScript to JavaScript           |
| `npm start`              | Run production build                     |
| `npm run pm2:start`      | Start with PM2 (builds automatically)    |
| `npm run pm2:start:dev`  | Start PM2 in development mode            |
| `npm run pm2:start:prod` | Start PM2 in production mode             |
| `npm run pm2:stop`       | Stop PM2 processes                       |
| `npm run pm2:restart`    | Restart PM2 processes                    |
| `npm run pm2:reload`     | Reload PM2 processes (zero-downtime)     |
| `npm run pm2:logs`       | View PM2 logs                            |
| `npm run pm2:monit`      | PM2 monitoring dashboard                 |
| `npm test`               | Run unit tests                           |
| `npm run test:watch`     | Run tests in watch mode                  |
| `npm run lint`           | Lint code with ESLint                    |
| `npm run lint:fix`       | Fix linting issues automatically         |
| `npm run format`         | Format code with Prettier                |
| `npm run format:check`   | Check code formatting                    |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## 📄 License

ISC License

## 👤 Author

Jrk Kiran<kiran.jrk@abhibus.com>

## 🙏 Acknowledgments

- Express.js team
- TypeScript team
- Sequelize team
- All contributors
