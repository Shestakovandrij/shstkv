# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is **not** a software project — there is no build system, no package manifest, no source code, no tests. It is a curated collection of **design/engineering skill prompts** loaded as project instructions for Claude Code via `.claude/rules/`.

Every `.md` under `.claude/rules/*/SKILL.md` is auto-injected into the system prompt of any Claude Code session opened in this directory. They stack: all of them are active simultaneously, which is intentional — each one biases output toward premium, anti-slop frontend design.

The only other directory, `.sixth/skills/`, is currently empty.

## Repo layout

- `.claude/rules/llms.txt` — one-line index of every skill and its purpose. Read this first to know what each skill is for.
- `.claude/rules/<skill-name>/SKILL.md` — the actual skill prompt. Some (e.g. `stitch-skill`) also ship a `DESIGN.md` companion.

## The active skill set (per `llms.txt`)

| Skill | Purpose |
|---|---|
| `taste-skill` | Main premium frontend skill — layout, typography, color, spacing, motion. |
| `gpt-tasteskill` | Awwwards-tier GSAP-heavy variant with deterministic Python-RNG layout selection. |
| `soft-skill` | "Apple/Linear-tier" haptic depth, double-bezel cards, fluid spring motion. |
| `minimalist-skill` | Notion/Linear editorial monochrome. |
| `brutalist-skill` | Swiss / tactical-telemetry industrial UI. |
| `stitch-skill` | Generates `DESIGN.md` files for Google Stitch. |
| `redesign-skill` | Audits and upgrades existing projects in place. |
| `image-to-code-skill` | Image-first workflow: generate references, analyze, then code. |
| `imagegen-frontend-web` | Website reference images only (no code). |
| `imagegen-frontend-mobile` | Mobile app screen concepts only (no code). |
| `brandkit` | Brand-kit overview images (no code). |
| `output-skill` | Hard ban on truncation, `// ...`, and "rest follows same pattern". |

## How the skills interact

When working in this repo, treat the skill prompts as the source of truth — they contain hundreds of hard rules and explicit bans (no `Inter`, no pure black, no AI-purple gradients, no `h-screen`, no emojis, no 3-equal-card feature rows, etc.). Many rules repeat across skills because they are mutually reinforcing.

If asked to add or modify a skill:
- Edit the relevant `SKILL.md` directly. Keep tone, structure, and bullet rhythm consistent with the existing files.
- Update `.claude/rules/llms.txt` if you add or rename a skill.
- Do not silently weaken bans — these skills are intentionally opinionated.

## What this repo is not

There is nothing to build, lint, test, or run. Commands like `npm`, `pip`, `make` do not apply. Work here is purely prompt editing.
