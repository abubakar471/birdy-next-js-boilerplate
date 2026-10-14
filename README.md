# Next.js 16 Production-Ready Boilerplate By Abu Bakar

A battle-tested, enterprise-grade Next.js 16 boilerplate built with the **src/** directory layout, implementing a strict **Feature-Driven Architecture**. It comes fully integrated with modern linting guardrails, strict path protection, automated code formatting, and local environment schema validation.

## 🚀 Technologies & Core Stack

- **Framework:** Next.js 16 (App Router) with TypeScript & Tailwind CSS
- **UI & Layout:** Shadcn UI, Class Variance Authority (CVA), and Lucide React
- **Validation Engine:** Zod (Automated runtime & build-time environment verification)
- **Linter:** ESLint 9+ (Enforcing strict naming conventions & file layout constraints)
- **Code Formatter:** Prettier (With plugins for automated Tailwind class sorting & import structure separation)
- **Git Automation:** Husky & lint-staged (Automated formatting and type/lint checks on commit)

---

## 📁 Directory Structure & Code Organization

The workspace layout strictly decouples high-level application entry points, shared systems, and individual domain modules.

### Root Architecture (`src/`)

```text
src/
├── app/         # Core application setup, routing, and entry points
├── components/  # Reusable global UI components (not feature-specific)
├── config/      # Global configuration files (environment schemas, etc.)
├── features/    # Isolated, domain-driven business feature modules
│   ├── auth/    # Authentication feature
│   ├── ideas/   # Ideas management feature
│   ├── profile/ # User profile feature
│   └── reviews/ # Reviews feature
├── hooks/       # Custom React hooks (shared globally across features)
├── lib/         # Shared utility functions and third-party integrations
├── stores/      # Global state management modules
├── types/       # Shared TypeScript type definitions
```

### Feature-Level Structure (`src/features/*`)

Each feature module is treated like a mini-application, keeping context localized and completely self-contained:

```text
features/ideas/
├── api/         # API fetch calls and data mutations for this feature
├── components/  # Feature-specific layout items and UI modules
├── config/      # Feature configurations (query keys, feature flags)
├── hooks/       # Custom React hooks isolated strictly to this feature
└── locales/     # Internationalization (i18n) translations for this feature
```

---

## 🛠️ Architecture Guardrails (Built-in)

This boilerplate includes powerful, automated rules to ensure your codebase stays clean as it scales:

1. **Strict Path Restrictions:** Shared utilities (`/components`, `/lib`, `/hooks`) are programmatically blocked from importing business domains from the `/features` folder.
2. **Explicit Feature Isolation:** Feature clusters can only depend on other features if explicitly white-listed.
3. **Kebab-Case Naming:** The linter strictly enforces `kebab-case-naming.tsx` for all system files to ensure absolute folder consistency.
4. **Environment Safety:** All `process.env` properties are validated against a strict schema using Zod inside `src/config/env.ts`.

### 🔄 How to add a new Feature down the line

When scaling the application and introducing a new business block:

1. **Create the Folder Structure:** Scaffold your new domain sub-directory inside `src/features/` (e.g., `src/features/billing/`).
2. **Register the Boundaries:** Open **`infra/eslint-import-rules.mjs`** and append the new feature definition to the `features` configuration array. Explicitly declare its dependencies:
   ```javascript
   const features = [
     { name: 'auth', allowedFeatures: [] },
     { name: 'ideas', allowedFeatures: ['auth'] },
     { name: 'profile', allowedFeatures: ['auth'] },
     { name: 'reviews', allowedFeatures: ['auth'] },
     // Adding your new feature securely:
     { name: 'billing', allowedFeatures: ['auth', 'profile'] },
   ];
   ```
   _The engine will dynamically generate and enforce path barriers automatically on commit._

---

## 💻 Local Project Setup

Follow these quick steps to detach this boilerplate and initialize it for your new project:

### 1. Clear Boilerplate Footprints

Delete the `package-lock.json` file and the old hidden `.git` folder from your root directory. Open `package.json` and change the `"name"` property to your new project title.

### 2. Initialize Your New Repository

Run the following commands in your terminal to initialize your fresh Git timeline and install dependencies:

```bash
# Initialize a brand new Git setup
git init

# Install the project packages (Also links your Husky pre-commit hooks)
npm install

# Create a local environment variables profile
echo "NEXT_PUBLIC_API_URL=https://example.com" > .env.local

# Run your first automated pre-commit pass
git add .
git commit -m 'chore: bootstrap project from next-16 production boilerplate'

# Map your repository to your remote hosting service
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL.git>
git push -u origin main
```

---

## 🏃 Running the Application

Manage your local server or build parameters using these npm scripts:

```bash
# Start the local development server with Hot Reloading
npm run dev

# Run a manual code cleanliness assessment over all files
npm run lint

# Manually format all source files using Prettier parameters
npm run format

# Compile your codebase into a production-optimized build
npm run build

# Boot up the compiled production build locally
npm run start
```
