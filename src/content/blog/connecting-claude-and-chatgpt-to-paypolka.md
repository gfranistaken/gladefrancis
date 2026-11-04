---
title: "Connecting Claude and ChatGPT directly to PayPolka"
description: "How I built AI time tracking and invoicing into PayPolka using MCP and OpenAPI, with draft-safe guardrails and no extra monthly fee."
pubDate: 2026-10-21
tags: ["Product", "AI", "PayPolka"]
---

I just added AI support to [PayPolka](https://paypolka.com), my time tracking and invoicing app for small service businesses.

I didn't build a chatbot in the bottom corner of the screen, and I didn't add an "AI tier" to the pricing page. PayPolka is still $9 per person a month, and AI access is included.

Instead of forcing users to use another chat widget, PayPolka connects directly to the AI you already use: Claude, ChatGPT, or Gemini.

## Why I skipped the built-in chat bubble

If you use AI for work, you already have Claude or ChatGPT open on your computer or phone. That's where your meeting notes, voice memos, and client emails already live.

Putting a separate chat box inside an invoicing app forces users to copy and paste notes from one window to another, and it usually comes with a paid AI add-on. Giving your existing assistant direct access to your PayPolka account is faster and costs nothing extra.

## What you can actually do with it

Most contractors, consultants, and small studios hate Friday afternoon admin work. You spend all week doing the job, then sit down on Friday to reconstruct your hours from a notebook, a calendar, and a pile of store receipts.

Once your AI assistant is connected to PayPolka, you can tell it what you did in plain English:

- **Log time and expenses from rough notes.** Type or dictate: *"Log 3.5 hours Tuesday on the Smith kitchen remodel under cabinet install, 2 hours Thursday on site prep, and $140 at Home Depot for brackets."* Your assistant finds the project, matches the task and expense category, and saves the entries.
- **Check unbilled work across every job.** Ask: *"What unbilled hours and expenses are sitting across our active projects?"* You get an immediate breakdown of what's waiting to be billed.
- **Create draft invoices.** Tell it to pull all unbilled time and expenses for a project onto a new draft invoice, or create a 25% deposit invoice from an accepted estimate.

Because PayPolka handles [time tracking and invoicing](https://paypolka.com/time-tracking-and-invoicing) in the same database, the assistant links your time entries directly to the draft invoice so nothing gets billed twice.

## The guardrails: why it can't accidentally email a client

Letting an AI touch your billing software sounds risky. Sending an invoice emails a real customer. Refunding a payment moves money on Stripe.

I built three hard rules into PayPolka so an AI can't make an expensive mistake:

1. **Draft-safe by default.** Every connection starts in draft-safe mode. It can log time, log expenses, run reports, and build **draft** estimates and invoices. It can't email a client or issue a Stripe refund unless an owner or admin turns that on when they create the token or approve the connection. The AI does the typing, and you look at the draft and click **Send**.
2. **Same permissions as the user.** Every connection inherits the role of the person who created it. A team member or subcontractor can use Claude to log their own hours, but they can't ask it for your company's billable rates, budgets, or revenue totals. An accountant's connection is strictly read-only.
3. **No big deletes.** An assistant can remove a duplicate time entry or delete a draft invoice, but it can't delete a client, a project, a sent invoice, or your account. Deletes are capped at 10 per hour across all your connections, so a bad prompt can't wipe out your week. Every delete shows up in PayPolka's activity log with the connection that made it.

An assistant can also record a manual payment or write off an invoice. In Claude's connector settings, I'd set those tools and the delete tools to ask first, so Claude checks with you before running any of them.

## How to connect it

PayPolka runs a hosted **MCP (Model Context Protocol)** server at `https://app.paypolka.com/mcp`, alongside a JSON REST API and an OpenAPI 3.1 spec at `https://app.paypolka.com/openapi.json`.

In Claude, or any assistant that supports custom MCP connectors, add PayPolka as a connector with the MCP URL. You sign in to PayPolka in your browser and approve the connection, so you never copy a token.

For Cursor or your own scripts, create a personal access token (`pp_...`) on your Profile page under **API & AI access**. Then enter the MCP URL with the header `Authorization: Bearer pp_YOUR_TOKEN`. You don't need a Zapier account. Full setup steps are in the [PayPolka API and AI docs](https://paypolka.com/docs/api-and-ai).
