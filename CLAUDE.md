# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What This Is

This is a **Claude Workspace Template** — a structured environment designed for working with Claude Code as a powerful agent assistant across sessions. The user will spin up fresh Claude Code sessions repeatedly, using `/prime` at the start of each to load essential context without bloat.

**This file (CLAUDE.md) is the foundation.** It is automatically loaded at the start of every session. Keep it current — it is the single source of truth for how Claude should understand and operate within this workspace.

---

## The Claude-User Relationship

Claude operates as an **agent assistant** with access to the workspace folders, context files, commands, and outputs. The relationship is:

- **User**: Defines goals, provides context about their role/function, and directs work through commands
- **Claude**: Reads context, understands the user's objectives, executes commands, produces outputs, and maintains workspace consistency

Claude should always orient itself through `/prime` at session start, then act with full awareness of who the user is, what they're trying to achieve, and how this workspace supports that.

---

## Workspace Structure

```
.
├── CLAUDE.md              # This file — core context, always loaded
├── .claude/
│   └── commands/          # Slash commands Claude can execute
│       ├── prime.md       # /prime — session initialization
│       ├── create-plan.md  # /create-plan — create implementation plans
│       └── implement.md   # /implement — execute plans
├── context/               # Background context about the user and project
│                          # (User should populate with role, goals, strategies)
├── plans/                 # Implementation plans created by /create-plan
├── outputs/               # Work products and deliverables
├── reference/             # Templates, examples, reusable patterns
└── scripts/               # Automation scripts (if applicable)
```

**Key directories:**

| Directory    | Purpose                                                                             |
| ------------ | ----------------------------------------------------------------------------------- |
| `context/`   | Who the user is, their role, current priorities, strategies. Read by `/prime`.      |
| `plans/`     | Detailed implementation plans. Created by `/create-plan`, executed by `/implement`. |
| `outputs/`   | Deliverables, analyses, reports, and work products.                                 |
| `reference/` | Helpful docs, templates and patterns to assist in various workflows.                |
| `scripts/`   | Any automation or tooling scripts.                                                  |

---

## Commands

### /prime

**Purpose:** Initialize a new session with full context awareness.

Run this at the start of every session. Claude will:

1. Read CLAUDE.md and context files
2. Summarize understanding of the user, workspace, and goals
3. Confirm readiness to assist

### /create-plan [request]

**Purpose:** Create a detailed implementation plan before making changes.

Use when adding new functionality, commands, scripts, or making structural changes. Produces a thorough plan document in `plans/` that captures context, rationale, and step-by-step tasks.

Example: `/create-plan add a competitor analysis command`

### /implement [plan-path]

**Purpose:** Execute a plan created by /create-plan.

Reads the plan, executes each step in order, validates the work, and updates the plan status.

Example: `/implement plans/2026-01-28-competitor-analysis-command.md`

---

## Critical Instruction: Maintain This File

**Whenever Claude makes changes to the workspace, Claude MUST consider whether CLAUDE.md needs updating.**

After any change — adding commands, scripts, workflows, or modifying structure — ask:

1. Does this change add new functionality users need to know about?
2. Does it modify the workspace structure documented above?
3. Should a new command be listed?
4. Does context/ need new files to capture this?

If yes to any, update the relevant sections. This file must always reflect the current state of the workspace so future sessions have accurate context.

**Examples of changes requiring CLAUDE.md updates:**

- Adding a new slash command → add to Commands section
- Creating a new output type → document in Workspace Structure or create a section
- Adding a script → document its purpose and usage
- Changing workflow patterns → update relevant documentation

---

## For Users Downloading This Template

To customize this workspace to your own needs, fill in your context documents in `context/` and modify as needed. Then use `/create-plan` to plan out and `/implement` to execute any structural changes. This ensures everything stays in sync — especially CLAUDE.md, which must always reflect the current state of the workspace.

---

## Session Workflow

1. **Start**: Run `/prime` to load context
2. **Work**: Use commands or direct Claude with tasks
3. **Plan changes**: Use `/create-plan` before significant additions
4. **Execute**: Use `/implement` to execute plans
5. **Maintain**: Claude updates CLAUDE.md and context/ as the workspace evolves

---

## VoiceType Website Project

The `website/` folder contains a Next.js 16 website for **VoiceType** — an AI voice dictation app for Mac and Windows.

### Repository
- **GitHub**: https://github.com/ankaravanas/VoiceType

### Tech Stack
- **Framework**: Next.js 16.1.6 with App Router
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Animations**: Motion for React (v12+)
- **Fonts**: Archivo (headings), Inter Tight (body)

### Motion Design System
The landing page uses Motion for React for scroll-triggered animations and micro-interactions.

**Animation Components** (`components/animations/`):
| Component | Purpose |
|-----------|---------|
| `FadeInWhenVisible` | Scroll-triggered fade up animation |
| `StaggerContainer` | Parent wrapper for staggered children |
| `StaggerItem` | Child element that staggers in sequence |
| `TextReveal` | Hero text with blur + fade effect |
| `AnimatedCounter` | Numbers count up when visible |
| `AnimatedWaveform` | Live pulsing waveform bars |
| `AnimatedFAQItem` | Smooth height expand/collapse |
| `TypingVsDictation` | Speed comparison animation |
| `AudioUploadDemo` | Audio upload feature demo |

**Loading** (`components/loading/`):
| Component | Purpose |
|-----------|---------|
| `PageLoader` | Initial loading indicator with pulsing logo |

**Shared Config** (`lib/animations.ts`):
- `TIMING` - Animation durations (fast: 0.2s, normal: 0.4s, slow: 0.6s)
- `EASING` - Apple-like ease curve `[0.16, 1, 0.3, 1]`
- Reusable animation variants for consistency

**Accessibility**: All animations respect `prefers-reduced-motion` via `useReducedMotion` hook.

### Design System Colors
| Name | Hex | Usage |
|------|-----|-------|
| Background | `#F4F9F8` | Page backgrounds |
| Dark Green | `#0E2E28` | Text, dark sections |
| Accent (Lemon) | `#CDFA8A` | CTAs, highlights |
| Muted | `#6E7C87` | Secondary text |
| Border | `#E5E9EB` | Borders, dividers |

### Website Structure
```
website/src/
├── app/
│   ├── page.tsx          # Homepage with all landing sections
│   ├── layout.tsx        # Root layout with fonts/metadata
│   ├── globals.css       # Design tokens and global styles
│   ├── pricing/          # Full pricing page with comparison table
│   ├── about/            # About us page with mission/story
│   ├── contact/          # Contact form page
│   ├── privacy/          # Privacy policy
│   ├── terms/            # Terms of service
│   ├── help/             # Help center with FAQs
│   └── changelog/        # Version history
├── components/
│   ├── Header.tsx        # Shared navigation header
│   ├── Footer.tsx        # Shared footer with links
│   ├── animations/       # Motion design components
│   └── loading/          # Loading state components
├── hooks/
│   └── useHydration.ts   # Hydration state hook
└── lib/
    └── animations.ts     # Shared animation config
```

### Pricing Tiers
| Tier | Monthly | Yearly | Key Features |
|------|---------|--------|--------------|
| Free | $0 | $0 | 5K words/week, 5-min audio |
| Pro | $10 | $100 | Unlimited, 30-min audio, priority |
| Agency | $15 | $150 | 10 team members, 60-min audio, admin dashboard |

### Contact
- Email: hello@wedohype.com
- Copyright: 2026 VoiceType

---

## Notes

- Keep context minimal but sufficient — avoid bloat
- Plans live in `plans/` with dated filenames for history
- Outputs are organized by type/purpose in `outputs/`
- Reference materials go in `reference/` for reuse
