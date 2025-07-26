---
type: 'always_apply'
---

Available MCP Tools & When to Use Them

### Research & Documentation Tools

- **Tavily**: Expert insights, best practices, comprehensive research
- **context7**: Official documentation, latest API references
- **GitHub**: Real-world code examples, implementation patterns

### Project Tools

- **sequential-thinking**: Break down complex problems step-by-step, analyze logic flows, create
  systematic approaches
- **project-info**: Store and recall project stack, architecture decisions, patterns

### Database Tools (if configured)

- **database/postgres**: Schema analysis, query optimization, data operations

## 🎯 Tool Usage Patterns

### Complex Problem Solving & Sequential Thinking

For debugging, errors, or complex implementation:

**AI should:**

1. Use sequential-thinking to break down the problem into logical steps
2. Analyze each component of the problem systematically
3. Create step-by-step solution approach
4. Use Tavily/context7 to research solutions for each step
5. Provide clear implementation plan with dependencies

**Sequential Thinking Use Cases:**

- **Debugging**: Step through code execution flow to identify issues
- **Architecture Planning**: Break down system design into components
- **Problem Analysis**: Decompose complex requirements into manageable parts
- **Logic Flow**: Map out conditional logic and data transformations
- **Error Resolution**: Systematically eliminate potential causes

**Example:** User: "Fix this hydration error" AI: Uses sequential-thinking → analyzes step-by-step
(client vs server rendering, component lifecycle, data flow) → provides systematic solution

## 🔧 Tool Combination Rules

### Always Combine These:

- **Tavily + context7**: For any research or "best practices" questions
- **project-info + sequential-thinking**: Before creating any new functionality
- **sequential-thinking + Tavily**: For debugging complex issues
- **context7 + GitHub**: When learning new APIs or frameworks

### Never Use Alone:

- Don't use only Tavily (might miss official updates)
- Don't use only context7 (might miss practical gotchas)
- Don't use only GitHub (might use outdated examples)
- Don't use only sequential-thinking (might miss external best practices)

### Specific Tool Usage Commands

#### Research Mode

"Research [topic] using Tavily for best practices, context7 for official docs, and GitHub for
examples"

#### Problem Solving

"Use sequential-thinking to analyze [problem], then research solutions using available tools"

#### Learning Mode

"Use context7 for official docs, Tavily for expert insights, GitHub for real examples, explain with
practical focus"

## 🎪 Advanced Tool Usage Examples

### Package Research

User: "What's the best React state management library?"

**AI workflow:**

1. Use Tavily for current expert opinions and comparisons
2. Use context7 for official documentation of top options
3. Use GitHub to find real-world usage examples
4. Use sequential-thinking to analyze pros/cons systematically
5. Present comprehensive comparison with recommendations

### Error Resolution

User: "Getting TypeScript errors in my component"

**AI workflow:**

1. Use sequential-thinking to analyze error systematically
2. Check `.ai/project-info.md` for TypeScript configuration
3. Use context7 for latest TypeScript best practices
4. Use Tavily for common error solutions
5. Provide step-by-step fix with explanation

### Implementation Planning

User: "How should I structure my API routes?"

**AI workflow:**

1. Check `.ai/project-info.md` for existing API patterns
2. Use sequential-thinking to break down API requirements
3. Use context7 for framework-specific best practices
4. Use Tavily for expert architectural insights
5. Use GitHub for real-world API structure examples
6. Present structured approach following project conventions

## 🎯 Tool Selection Guidelines

### When to Use Tavily:

- Current best practices and expert insights
- Industry trends and comparisons
- Security considerations and gotchas
- Performance optimization techniques

### When to Use context7:

- Official API documentation
- Framework-specific features
- Latest syntax and methods
- Configuration options

### When to Use GitHub:

- Real-world implementation examples
- Code patterns and structures
- Integration examples
- Common use cases

### When to Use sequential-thinking:

- Complex problem breakdown
- Debugging systematic analysis
- Architecture planning
- Logic flow mapping
- Error elimination process

## 🚨 Tool Usage Best Practices

### ✅ Do:

- Always combine multiple tools for comprehensive answers
- Use sequential-thinking for systematic problem analysis
- Validate advice against latest official documentation
- Check project context before suggesting solutions
- Follow established patterns and document new ones

### ❌ Don't:

- Research using only one tool
- Give outdated advice without checking latest docs
- Solve problems without systematic analysis
- Ignore project-specific context and conventions

### Quality Assurance for Tool Usage:

- Used appropriate tool combinations for the query type
- Validated information across multiple authoritative sources
- Applied systematic thinking for complex problems
- Considered project-specific context and constraints
- Provided actionable, current, and accurate guidance

This ensures comprehensive, accurate, and contextually appropriate assistance using all available
MCP tools effectively!
