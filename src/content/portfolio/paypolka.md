---
title: "PayPolka"
description: "Multi-tenant estimating, time tracking, and invoicing built with Rails 8, SQLite, and 1,500 automated tests."
category: "web-app"
date: 2026-05-06
externalUrl: "https://paypolka.com"
order: 2
---

Most estimating and invoicing tools are either bloated systems with dozens of menus you never use, or platforms that sit between a business and its money, taking extra transaction cuts.

I built PayPolka to prove that a modern, multi-tenant web application can be designed, tested, and deployed to production in three weeks using modern AI tooling and senior engineering discipline.

## What PayPolka does

PayPolka handles the complete billing loop for small service businesses, contractors, and studios:
- Public estimate links with one-click digital acceptance.
- Deposit invoices generated automatically upon estimate acceptance.
- Staged progress payments and final project closeout invoices.
- Direct payments via Card, ACH, Cash App Pay, and check tracking.
- Automatic payment reminders and late fee assessments.
- Multi-user account access for office staff and bookkeepers.

## Architectural requirements

When building software that handles financial transactions, speed cannot compromise security or reliability:

1. **Direct payment routing:** Tenants connect their own Stripe account with their own API keys. I avoided Stripe Connect intentionally: there is no middleman account between a business and its revenue. PayPolka never holds customer funds and takes zero transaction fees.

2. **Strict multi-tenant data isolation:** Multi-tenancy in a shared database requires zero-leak guarantees. Every database query is scoped through Rack middleware before reaching a controller. Automated specs grep the codebase in CI to prevent unscoped queries from ever entering production.

3. **Minimal operational cost:** Deployed using Kamal to a single Linode box. Litestream replicates every database transaction continuously to Cloudflare R2 for off-site backup. No managed-database tier on the monthly bill, no Redis cluster, zero unnecessary hosting overhead.

## The name

Securing a short .com domain is usually the hardest step in launching a project. After testing ideas against domain registries, paypolka.com was available. I designed the brand and icon in Affinity, keeping the visual identity minimal.

<p style="font-size: 0.75rem; letter-spacing: 0.08em; color: var(--color-text-muted); margin-bottom: 0;">LOGO</p>

<img src="/images/paypolka-logo.svg" alt="PayPolka logo" style="height: 3rem; width: auto; margin-top: 0.5rem;" />

<p style="font-size: 0.75rem; letter-spacing: 0.08em; color: var(--color-text-muted); margin-bottom: 0;">ICON</p>

<img src="/images/paypolka-icon.svg" alt="PayPolka icon" style="height: 3rem; width: auto; margin-top: 0.5rem;" />

## The stack

Rails 8.1, Hotwire, Tailwind, and SQLite in production. Rails 8 made SQLite a capable production database for a single-server deployment. Litestream streams every change to Cloudflare R2 for backup. Solid Queue, Solid Cache, and Solid Cable handle background jobs, caching, and websockets, eliminating Redis entirely.

Sentry monitors errors and Healthchecks.io monitors uptime. The entire application deploys with Kamal to one Linode box. PDFs are generated via Prawn, and transactional email routes through Resend's HTTP API.

## The process

The repository runs on what I call the technical constitution. Before any coding session, the AI development agent reads five documents:
- `CLAUDE.md` sets coding conventions and tenant-scoping rules.
- `PRODUCT.md` defines product vocabulary and user flows.
- `DECISIONS.md` is a numbered log of every architectural call (from SQLite over Postgres to public payment edge cases).
- `STATUS.md` tracks what is live and what is next.
- `LESSONS.md` records edge cases and past incident resolutions.

Clear documentation prevents context drift between development sessions.

## Automated tests

~1,500 RSpec examples across 104 spec files. Request specs form the backbone (49 files): they run controllers against multi-tenant test data, catching regressions before code merges. Model specs (22 files), service specs (13 files), and mailer specs (11 files) cover core business logic. Even PDF generation is verified: pdf-inspector inspects Prawn output to verify invoice totals and layout.

Nothing merges until `bin/ci` passes locally: RuboCop, three security audits, and the full test suite.

## Security

Every tenant Stripe key is encrypted at rest. Each tenant has an independent webhook endpoint, verified by cryptographic signature against that tenant's secret. Public estimate and invoice URLs use non-guessable random share tokens.

CI runs Brakeman (configured to fail on any warning), bundler-audit against an updated vulnerability database, and dependency audits. Authentication uses Rails 8 built-in auth with bcrypt, email verification, and opt-in two-factor authentication.

## The timeline

First commit was April 15, 2026: clients, invoices, and core payments. Stripe Checkout was working in test mode two weeks later. First production deploy occurred May 6: exactly three weeks from an empty repository. By then, the application included recurring invoices, CSV client imports, and two-factor authentication.

Since launch, I've connected PayPolka to Claude and ChatGPT over MCP. I wrote up [how the AI connection and its guardrails work](/blog/connecting-claude-and-chatgpt-to-paypolka).

PayPolka is live at [paypolka.com](https://paypolka.com).
