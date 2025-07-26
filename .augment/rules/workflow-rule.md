---
type: 'always_apply'
---

AI Session Start Protocol

### Essential First Steps

Before any work, AI must:

1. **Check for `.ai` folder** - If it doesn't exist, create it immediately
2. **Check for `.ai/project-info.md`** - If missing, create comprehensive project analysis
3. **Load project context** from `.ai/project-info.md` to understand current setup
4. **Then proceed** with user request following established patterns

### .ai Folder Structure

```
.ai/
├── project-info.md    # Main project configuration and decisions
└── tasks/            # Optional: Task history and tracking
```

## 📁 Project Info File: .ai/project-info.md

AI must maintain this file in the `.ai` folder with current project information:

```markdown
# Project Information

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: PayloadCMS, Node.js
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 🏗️ Architecture Decisions

### Authentication (2024-07-05)

**Decision**: NextAuth.js with JWT
**Reasoning**: Quick setup, good TypeScript support, team familiar
**Files**: `src/auth/`, `middleware.ts`

### Database Schema (2024-07-04)

**Decision**: PostgreSQL with Drizzle ORM
**Reasoning**: Better type safety than Prisma, performance
**Files**: `src/db/schema.ts`, `drizzle.config.ts`

## 📁 Project Structure

- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and configurations
- `src/types/` - TypeScript type definitions

## 🎨 UI/UX Patterns

- **Components**: Use shadcn/ui as base, extend with Tailwind
- **Naming**: PascalCase for components, kebab-case for files
- **State**: Zustand for global state, React Query for server state
- **Forms**: React Hook Form with Zod validation

## 🔧 Development Conventions

- **Code Style**: Prettier + ESLint with strict TypeScript
- **Commits**: Conventional commits format
- **Testing**: Vitest for unit tests, Playwright for E2E
- **API**: RESTful with PayloadCMS, tRPC for internal APIs
```

### Auto-Analysis Protocol

If `.ai` folder or `.ai/project-info.md` doesn't exist, AI should:

1. **Create `.ai` folder** first
2. Use sequential-thinking to analyze project structure systematically
3. Examine available project information and configuration
4. Identify folder structure and naming conventions
5. Create comprehensive `.ai/project-info.md` with findings
6. Update `.ai/project-info.md` as new decisions are made

## 🎯 Core Usage Patterns

### 1. Research First - Always Use Multiple Tools

When user asks: "What's the best way to..." or "How should I implement..."

**AI must automatically:**

1. Use Tavily for expert insights and current best practices
2. Use context7 for official documentation validation
3. Use GitHub for real-world implementation examples
4. Synthesize all sources into comprehensive recommendation

### 2. Check Existing Context Before Creating New

Before implementing ANY new functionality:

**AI must:**

1. Check `.ai/project-info.md` for architectural decisions and tech stack
2. Follow established project conventions
3. Only create new if truly needed

### 3. Documentation & Learning

When asked about APIs, frameworks, or technologies:

**AI must:**

1. Use context7 for latest official documentation
2. Use Tavily for expert explanations and gotchas
3. Use GitHub for practical usage examples
4. Explain with current, accurate information

## 🎯 Quality Assurance Checks

### Before Every Response, AI Should Verify:

✅ Checked/created `.ai` folder and project-info.md
✅ Created task with detailed sub-tasks (never single tasks)
✅ Used sequential-thinking for problem analysis
✅ Referenced latest official documentation (context7)
✅ Validated with expert insights (Tavily)
✅ Found practical examples (GitHub)
✅ Considered project history (`.ai/project-info.md`)

### Red Flags - When AI Needs to Use Tools:

- User asks "What's the best..." → Must use Tavily + context7
- User asks "How do I..." → Must use context7 + GitHub
- User wants to create something → Must check `.ai/project-info.md` + sequential-thinking first
- User reports error/bug → Must use sequential-thinking + Tavily
- Complex implementation → Must create task with detailed sub-tasks using sequential-thinking

## 🎪 User Rules Compliance

### AI Must Always:

1. **Check/create `.ai` folder** at session start
2. **Follow project conventions** found in `.ai/project-info.md`
3. **Use multiple tools** for comprehensive research
4. **Document decisions** in `.ai/project-info.md`
5. **Maintain consistency** with existing codebase patterns

This ensures AI provides contextual, current, and project-aware assistance while maintaining consistent development practices!
