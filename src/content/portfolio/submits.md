---
title: "Submits - Fast Form Endpoints with Built-in Spam Filtering"
description: "I built a form backend for websites: one URL per form and invisible spam filtering. It runs every contact form on Struxr and client sites."
category: "web-app"
date: 2026-08-04
order: 4
draft: true
---

Contact forms are a solved problem that few tools solve well.

The frontend form is simple: a few input fields, a textarea, and a submit button. Five minutes of HTML. The friction is everything behind it: where submissions route, how to block bots, how notifications trigger, and how to handle it all without paying $40 a month for software that wants to take over your marketing stack.

I have managed forms on production websites for years. The cycle repeats: a site launches, the form works, and spam bots arrive within days. Then you choose between bad options: a CAPTCHA that frustrates visitors, a WordPress plugin that breaks on the next core update, or a SaaS platform charging enterprise rates just to forward an email.

## The problem with form tooling

Bot spam is the obvious issue. A public form attracts automated scripts within days. But the tooling problem is worse.

Most form services insist on being your visual form builder: drag-and-drop editors, conditional logic, payment collection, file uploads, and team seats. That requires a large product footprint to maintain, and vendors charge accordingly ($30 to $50 every month for receiving a text payload and delivering an email).

On the other end are custom solutions: PHP mail scripts, serverless functions, or custom API routes. Those work until you need spam filtering, submission logs, and delivery monitoring. They also add another piece of infrastructure to manage per project.

I wanted something between "build custom endpoints every time" and "pay monthly for forty features you never touch."

## What I built

Submits is a lightweight form backend. You register, receive an endpoint URL, and point your HTML form's `action` attribute at it. There are no scripts or third-party widgets to embed. Your form stays in plain HTML, styled however you want.

Submissions hit the endpoint, pass through invisible spam filters, log to a dashboard, and forward directly to your inbox. Spam filtering runs silently: honeypot fields, origin locking, rate limiting, and optional Cloudflare Turnstile verification. Visitors never have to identify bicycles or traffic lights in photo grids.

Each form also includes a hosted page with its own URL and QR code. This is useful for print materials, trade shows, or quick sign-ups where a full website is unnecessary.

## Why it exists

Every web project needs a reliable contact form. Managing them across disparate platforms, plugins, and hosting environments was repetitive maintenance. Submits began as an internal utility to solve that: one endpoint per form, one dashboard, and automated spam filtering.

Every contact form on every Struxr project runs through Submits. It replaced an assortment of plugins and scripts with a single system I control.

## Access

Submits is part of the Struxr studio vault. I don't sell subscriptions to it. Struxr clients get it free for their sites, and I share it with partners and other business owners who ask.

If you want a form endpoint for your own site, [ask me for an invite](/contact).
