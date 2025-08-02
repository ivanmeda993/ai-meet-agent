# Project Info

Ovaj fajl služi za dokumentovanje UI paterna, tehničkih odluka, konvencija i napretka zadataka u
projektu.

## UI Patterns

- (Ovde se dodaju šabloni i konvencije za UI komponente)

## Tech Stack

- Next.js (App Router, TypeScript)
- Radix UI + Tailwind CSS
- Drizzle ORM + PostgreSQL
- Zod za validaciju

## Task Progress

- (Ovde se ažurira napredak po zadacima i pod-zadacima)

## Decision Log

### AI Agent Auto-Greeting (2025-01-02)

**Decision**: Implement automatic greeting behavior for AI agents joining video calls
**Implementation**:

- Enhanced agent instructions to include greeting behavior
- Added `sendUserMessageContent` trigger for initial introduction
- Added event listener for new participant joins to acknowledge them **Files**:
  `src/app/api/webhook/route.ts` **Reasoning**: Improves user experience by making AI agents more
  welcoming and proactive
