---
applyTo: '**'
---

GitHub Copilot: Pravila za planiranje i upravljanje zadacima

### Osnovna filozofija

- Svaki zahtev razloži na zadatak sa pod-zadacima (min. 3)
- Prikaži zavisnosti i logički redosled
- Ažuriraj napredak po završetku svakog pod-zadatka

### Protokol

1. Analiziraj zahtev i obuhvat
2. Kreiraj strukturiran zadatak sa pod-zadacima
3. Prikaži zavisnosti i redosled
4. Implementiraj po planu
5. Ažuriraj napredak

### Primeri

- Za svaki zahtev koristi sequential-thinking za razlaganje
- Prati projektne konvencije iz `.ai/project-info.md`
- Dokumentuj odluke i šablone

## 📋 Task Examples

### Example Task Creation:

```
Task: "Create user profile component"
Sub-tasks:
1. Use sequential-thinking to analyze component requirements and dependencies
2. Check `.ai/project-info.md` for UI patterns and component structure
3. Research React component best practices (context7)
4. Create component structure following project conventions
5. Implement styling using project's design system
6. Add proper TypeScript types
7. Write tests following project testing patterns
8. Update `.ai/project-info.md` with new component patterns
```

### Example Simple Task Creation:

```
Task: "Fix button hover state"
Sub-tasks:
1. Analyze current button CSS and hover behavior
2. Check `.ai/project-info.md` for design system hover patterns
3. Research CSS hover best practices (context7)
4. Implement improved hover state following project conventions
```

## 🎪 Smart Workflow Examples

### Creating New Components

User: "Create a user profile component"

**AI workflow:**

1. Create detailed task with sub-tasks using sequential-thinking
2. Check `.ai/project-info.md` for UI patterns, tech stack, conventions
3. Use context7 for latest React component best practices
4. Implement following task structure and established patterns
5. Update sub-tasks as each completes
6. Store any new patterns in `.ai/project-info.md`

### API Integration

User: "Integrate with payment provider"

**AI workflow:**

1. Use sequential-thinking to break down integration process
2. Check `.ai/project-info.md` for API patterns and tech stack decisions
3. Use context7 for latest API documentation
4. Use Tavily to research integration best practices and security
5. Use GitHub to find similar integration examples
6. Implement following project's established API patterns

### Debugging Complex Issues

User: "This component isn't rendering correctly"

**AI workflow:**

1. Check `.ai/project-info.md` for tech stack and debugging patterns
2. Use sequential-thinking to break down rendering pipeline step-by-step
3. Analyze component logic flow and identify potential issues
4. Use Tavily to research common rendering issues for current stack
5. Provide systematic debugging approach with clear steps

## 💡 Pro Usage Tips

### 1. Session-First Approach

For any request: "Always check/create `.ai` folder first, load `.ai/project-info.md` for context,
create detailed task with sub-tasks using sequential-thinking, then implement following the task
structure"

### 2. Structured Implementation

Follow task breakdown religiously: "Mark completed sub-tasks, update progress, maintain logical
sequence, and document architectural decisions in `.ai/project-info.md`"

### 3. Research Depth

For important decisions: "Do comprehensive research using all available tools, present options with
trade-offs, let user choose approach"

## 🚨 Task Management Rules

### Task Management Rules:

- **Always check**: `.ai` folder exists before starting work
- **Always create tasks**: With detailed sub-tasks for every request
- **Always update**: Mark completed sub-tasks and suggest next steps

### Common Mistakes to Avoid

#### ❌ Don't:

- Skip task creation with sub-tasks for any requests
- Create single tasks without breaking them down
- Implement without systematic task planning
- Skip progress updates on sub-tasks

#### ✅ Do:

- Always create structured tasks with minimum 3 sub-tasks
- Use sequential-thinking for complex problem breakdown
- Update task progress as sub-tasks complete
- Document decisions and patterns in `.ai/project-info.md`

This ensures every piece of work is properly planned, tracked, and executed systematically!
