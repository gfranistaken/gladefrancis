---
title: "PayPolka"
description: "Multi-tenant estimating, time tracking, and invoicing built with Rails 8, SQLite, and a lot of pain and experience using various invoicing apps for a decade."
category: "web-app"
date: 2026-05-06
externalUrl: "https://paypolka.com"
order: 2
---

Most estimating and invoicing tools are either bloated systems with dozens of menus you never use, or platforms that sit between a business and its money, taking extra transaction cuts.

## What drives people crazy about invoicing software

Spend ten minutes reading small business forums and the same complaints about billing software come up over and over:

- **Constant price hikes and client caps.** Big platforms raise their monthly rates every year, cap how many clients you're allowed to bill on the entry plan, or lock basic features behind $50+ tiers.
- **Middleman payment holds and extra fees.** "Free" invoicing tools force you to use their built-in payment processor, mark up transaction fees, and occasionally freeze your payout for a week while a bot "reviews" a normal invoice.
- **Accounting bloat when you just need to bill.** Service businesses don't want to navigate fifty double-entry bookkeeping menus just to send an estimate, track hours, and collect a deposit.
- **Friday afternoon admin fatigue.** Reconstructing a week of billable hours and Home Depot receipts from text messages and a paper notebook every Friday is miserable.

## How PayPolka fixes it

PayPolka strips out the accounting bloat and handles the actual billing loop for contractors, consultants, and studios:

- **Flat pricing, no caps.** $9 per person a month with every feature and unlimited clients included.
- **Direct Stripe payments with zero cut.** You connect your own Stripe account directly. PayPolka never touches your funds and takes zero transaction fees—card, ACH, and Cash App Pay go straight from your customer to your bank.
- **Estimates to invoices without retyping.** Send a public estimate link for one-click approval, automatically generate a deposit invoice when the client accepts, and bill progress payments or closeouts from the same job.
- **Automatic follow-ups.** Scheduled payment reminders and optional late fees chase overdue invoices so you don't have to.
- **Connected to Claude and ChatGPT.** Dictate or paste rough notes into the AI assistant you already use to log hours, check unbilled work, and draft invoices.

## Architectural requirements

When building software that handles financial transactions, speed cannot compromise security or reliability:

1. **Direct payment routing:** Tenants connect their own Stripe account with their own API keys. I avoided Stripe Connect intentionally: there is no middleman account between a business and its revenue. PayPolka never holds customer funds and takes zero transaction fees.

2. **Minimal operational cost:** Deployed using Kamal to a single Linode box. Litestream replicates every database transaction continuously to Cloudflare R2 for off-site backup. No managed-database tier on the monthly bill, no Redis cluster, zero unnecessary hosting overhead.

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

Pairing twenty years of software architecture with modern AI tooling means development happens in weeks, not months. PayPolka went from an empty repository to production in three weeks—complete with Stripe Checkout, recurring invoices, CSV client imports, and two-factor authentication.

Since launch, I've connected PayPolka to Claude and ChatGPT over MCP. I wrote up [how the AI connection and its guardrails work](/blog/connecting-claude-and-chatgpt-to-paypolka).

PayPolka is live at [paypolka.com](https://paypolka.com).
