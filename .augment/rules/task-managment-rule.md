---
type: 'always_apply'
---

Task Management Rules

## 🎯 AI Task Planning Protocol

### Core Philosophy: Always Create Tasks with Sub-tasks

- Always break down work into tasks with detailed sub-tasks
- Use built-in task creation capabilities
- Show dependencies and logical order
- Update task progress as sub-tasks complete
- **Store task files in `.ai/tasks/` folder for tracking**

### Task Storage Protocol

**AI must manage `.ai/tasks/` folder:**

1. **Create `.ai/tasks/` folder** if it doesn't exist
2. **Save each task** as separate file in `.ai/tasks/`
3. **Use descriptive filenames** (e.g., `create-user-profile-component.md`)
4. **Update task files** as sub-tasks complete
5. **Ask user at completion** if they want to delete completed tasks

### Task File Structure

```markdown
# Task: Create User Profile Component

**Created**: 2024-07-05
**Status**: In Progress / Completed

## Sub-tasks:

- [x] 1. Use sequential-thinking to analyze requirements
- [ ] 2. Check .ai/project-info.md for UI patterns
- [ ] 3. Research React component best practices
- [ ] 4. Create component structure
- [ ] 5. Implement styling using design system
- [ ] 6. Add TypeScript types
- [ ] 7. Write tests
- [ ] 8. Update project-info.md with patterns

## Notes:

- Following project's shadcn/ui base components
- Using Tailwind for styling consistency
```

### Task Creation Protocol

For any request, AI must:

1. **Create `.ai/tasks/` folder** if it doesn't exist
2. **Analyze** the request and understand full scope
3. **Create** structured task with detailed sub-tasks (never single tasks)
4. **Save task file** in `.ai/tasks/` with descriptive filename
5. **Show** dependencies and logical order between sub-tasks
6. **Start** implementation following the task breakdown
7. **Update task file** progress as each sub-task completes
8. **Ask user** if they want to delete completed task files

### Task Creation Rules

- **ALL requests**: Always create task with sub-tasks (minimum 3 sub-tasks)
- **Simple work**: Create 3-4 focused sub-tasks
- **Medium work**: Create 5-7 detailed sub-tasks
- **Complex work**: Create 8+ comprehensive sub-tasks with dependencies

**Never create single tasks without sub-tasks**

### Sequential Thinking Integration

- Use sequential-thinking to break down complex problems into logical steps
- Analyze each component of the problem systematically
- Create step-by-step solution approach with clear dependencies
- Map out conditional logic and data transformations

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
2. Save task file to `.ai/tasks/create-user-profile-component.md`
3. Check `.ai/project-info.md` for UI patterns, tech stack, conventions
4. Use context7 for latest React component best practices
5. Implement following task structure and established patterns
6. Update task file as each sub-task completes
7. Store any new patterns in `.ai/project-info.md`
8. **Ask user**: "Task completed! Would you like me to delete the task file from `.ai/tasks/`?"

### API Integration

User: "Integrate with payment provider"

**AI workflow:**

1. Create `.ai/tasks/` folder if needed
2. Use sequential-thinking to break down integration process
3. Save task file to `.ai/tasks/payment-provider-integration.md`
4. Check `.ai/project-info.md` for API patterns and tech stack decisions
5. Use context7 for latest API documentation
6. Use Tavily to research integration best practices and security
7. Use GitHub to find similar integration examples
8. Implement following project's established API patterns
9. Update task file progress throughout implementation
10. **Ask user**: "Integration complete! Delete task file from `.ai/tasks/`?"

### Debugging Complex Issues

User: "This component isn't rendering correctly"

**AI workflow:**

1. Create `.ai/tasks/` folder if needed
2. Save debugging task to `.ai/tasks/fix-component-rendering.md`
3. Check `.ai/project-info.md` for tech stack and debugging patterns
4. Use sequential-thinking to break down rendering pipeline step-by-step
5. Analyze component logic flow and identify potential issues
6. Use Tavily to research common rendering issues for current stack
7. Update task file with findings and solutions
8. Provide systematic debugging approach with clear steps
9. **Ask user**: "Debugging complete! Remove task file from `.ai/tasks/`?"

## 💡 Pro Usage Tips

### 1. Session-First Approach

For any request:
"Always check/create `.ai` folder first, create `.ai/tasks/` folder, load `.ai/project-info.md` for context, create detailed task with sub-tasks using sequential-thinking, save task file to `.ai/tasks/`, then implement following the task structure"

### 2. Structured Implementation

Follow task breakdown religiously:
"Create task file in `.ai/tasks/`, mark completed sub-tasks in file, update progress, maintain logical sequence, document architectural decisions in `.ai/project-info.md`, and ask user about deleting completed task files"

### 3. Research Depth

For important decisions:
"Do comprehensive research using all available tools, present options with trade-offs, let user choose approach"

## 🚨 Task Management Rules

### Task Management Rules:

- **Always check**: `.ai` folder exists before starting work
- **Always create**: `.ai/tasks/` folder for task file storage
- **Always create tasks**: With detailed sub-tasks for every request
- **Always save**: Task files in `.ai/tasks/` with descriptive names
- **Always update**: Task file progress as sub-tasks complete
- **Always ask**: User if they want to delete completed task files

### Common Mistakes to Avoid

#### ❌ Don't:

- Skip task creation with sub-tasks for any requests
- Create single tasks without breaking them down
- Implement without systematic task planning
- Skip progress updates on sub-tasks
- Forget to create `.ai/tasks/` folder
- Skip saving task files for tracking
- Forget to ask about deleting completed tasks

#### ✅ Do:

- Always create structured tasks with minimum 3 sub-tasks
- Use sequential-thinking for complex problem breakdown
- Create `.ai/tasks/` folder and save all task files
- Update task file progress as sub-tasks complete
- Ask user about deleting completed task files
- Document decisions and patterns in `.ai/project-info.md`

This ensures every piece of work is properly planned, tracked, and executed systematically!
