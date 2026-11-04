---
title: "CPA Relay"
description: "Practice management for small CPA firms: engagement letters, document collection, e-signatures, billing, and a client portal."
category: "web-app"
externalUrl: "https://cparelay.com"
order: 1
---

My wife runs a CPA firm. Every practice management tool on the market got in her way during tax season, so she walked me through the pain points and I built CPA Relay to her specs.

It handles the work around the return: chasing clients for documents, getting engagement letters and 8879s signed, tracking who owes what, and billing for it. It doesn't calculate taxes, e-file, or replace the general ledger. Firms keep Drake, QuickBooks, or whatever they already trust for that.

## Who it's for

Solo practitioners and firms with 1 to 15 people. These firms are too small for enterprise practice suites and too busy to run the season out of email threads and a shared drive.

## What drives small firms crazy about practice management software

Talk to CPAs or read through `r/taxpros` during tax season and you hear the same frustrations with the big practice management platforms:

- **Clients get lost in the portal.** Most portals give clients ten tabs they don't understand, or break down when a client owns three LLCs alongside their 1040, or fail when spouses share a single email address. When the portal is confusing, clients give up and go back to emailing PDFs.
- **Setup feels like a part-time IT job.** Building complex automated pipelines and conditional triggers takes weeks of off-season setup. If one rule is slightly off, clients get stuck in a broken workflow and stop getting reminders.
- **Annual lock-in and per-signature fees.** Firms get pushed into multi-year contracts upfront, or get nickel-and-dimed with extra module fees and per-envelope charges for 8879 e-signatures.
- **No clear line between internal work and what the client sees.** Staff waste time double-checking permissions so they don't accidentally expose an internal note or draft file to a client.

## How CPA Relay solves it

- **A client portal people actually use.** One login per client across all of their entities, and a home screen that shows only what the client needs to do next. Spouses who share an email address still get separate 8878/8879 signing sessions.
- **Color-coded visibility.** Client-visible folders and messages are amber. Staff-only items are sky blue. Nobody ever has to guess what the client can see.
- **Simple workflows without a flowchart degree.** Reusable PBC document checklists (phone photos included), automatic overdue reminders, and one firm-wide **What's Outstanding** board showing every open task, signature, message, and unpaid invoice in one place.
- **Engagement letters, e-signatures, and billing built in.** 53 engagement letter templates (including 7216 consents), Form 8878/8879 e-signing with identity verification and a SHA-256 audit trail, plus time tracking, proposals, and direct Stripe billing (ACH, card, or Cash App Pay with zero platform cut).

## Pricing

$55 per seat per month, or $45 per seat on annual billing, with every feature included. Client logins are free and unlimited. Stripe pays the firm directly and CPA Relay takes no cut.

I set up each firm personally at [cparelay.com](https://cparelay.com).
