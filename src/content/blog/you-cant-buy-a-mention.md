---
title: "You can't buy a mention: how businesses end up in ChatGPT's answers"
description: "What it takes to show up in AI search answers: what changed, what stayed the same, and what people are selling that you should ignore."
pubDate: 2026-07-27
tags: ["AI", "Marketing", "SEO"]
---

A lot of agency pitches hitting inboxes right now are selling something called "GEO", or Generative Engine Optimization. The promise is that for a few thousand dollars a month, they'll make sure ChatGPT or Perplexity recommends your business when someone asks who to hire.

It's mostly snake oil, but it's built around a genuine shift in how search works.

I've been building websites and handling SEO for small businesses since 2009. Here's what's actually happening under the hood, how the retrieval pipeline works, and what matters if you want your company to show up in AI answers.

## How AI search actually works

When someone asks an AI assistant for a recommendation ("who is a good commercial roofer in Salt Lake City"), the model doesn't consult some magical internal database of local businesses. It runs a Retrieval-Augmented Generation (RAG) pipeline:

1. The model rewrites the user's prompt into standard search queries.
2. It hits a [traditional search index](https://aiplusautomation.com/blog/chatgpt-bing-or-google) (mostly Bing for ChatGPT, or Google's index for Gemini).
3. It fetches the raw text from the top ten to twenty candidate pages.
4. It reads those pages, extracts facts that answer the question, and synthesizes a response with two or three citations.

That pipeline introduces two major changes for business owners.

First, the search engine is no longer giving the user a list of ten blue links. It's giving them a single answer. If you rank fifth on Google, you used to get 8% of the clicks. In an AI answer, you're either quoted in the summary or you don't exist.

Second, the AI doesn't cite the page with the highest domain rating. It cites the page with the cleanest, most specific factual answer to the prompt. A ten-year-old local company with a plain, direct pricing page frequently beats a massive national directory because the local page gave the model an actual number it could quote.

## Why raw HTML matters again

Here's a technical detail that most marketing agencies miss: AI search crawlers don't browse the web like a human on a MacBook.

When an AI crawler like `OAI-SearchBot` or Perplexity fetches your page during a search, it doesn't launch headless Chrome and wait four seconds for client-side JavaScript to execute. Running a full browser engine on millions of search queries a minute costs too much compute and takes too long.

The bot makes a fast HTTP GET request and reads the raw HTML.

If your site is built on a heavy JavaScript framework where the initial HTML payload is just `<div id="root"></div>`, the AI crawler sees a blank page. It has nothing to read, nothing to parse, and nothing to quote.

Server-rendered, static HTML was supposed to be old technology. In the age of AI search, it's the single most valuable technical asset you can have. Your pages load in milliseconds, and the bots can digest every word on the first pass.

## What hasn't changed

Despite the new terminology, the underlying mechanics of authority haven't changed at all:

- **It's still traditional search underneath.** If Bing and Google haven't indexed your pages, or if your site has broken canonical tags and missing metadata, an AI model will never find you. Traditional technical SEO is table stakes for entering the pipeline.
- **Consensus beats self-promotion.** Models are trained to detect consensus. [Studies tracking AI citations](https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138) consistently show that models weight third-party mentions (Reddit discussions, local news articles, industry associations, and customer reviews) far more heavily than what you write on your own homepage. You can't bribe an LLM into recommending you if nobody else is talking about you.
- **Specifics beat marketing copy.** In 2023, [researchers at Princeton and Georgia Tech](https://arxiv.org/abs/2311.09735) published the first formal paper on GEO. The one tactic that consistently improved visibility across their tests was adding specific statistics, verifiable numbers, and direct quotes. Fluff and corporate buzzwords get discarded during the extraction step.

## The shortcuts being sold right now (and why they fail)

If someone tries to sell you on any of these tactics, save your money:

- **"Guaranteed AI placement."** Language models are non-deterministic. Ask ChatGPT the same question twice and you'll often get different citations. Nobody can guarantee placement inside a probabilistic generation loop. [Google's own guidance](https://support.google.com/webmasters/answer/35291) has warned for twenty years that nobody can guarantee a top ranking, and generative answers are less predictable, not more.
- **"We'll build your llms.txt file for $500."** `llms.txt` is an interesting proposed standard, but almost nobody is using it yet. [Ahrefs analyzed server logs](https://ahrefs.com/blog/what-is-llms-txt/) across 137,000 domains and found that 97% of deployed `llms.txt` files never received a single request from an AI bot. It takes ten minutes to write one for free, but paying an agency hundreds of dollars for it is throwing money away.
- **"AI visibility scores."** These dashboards query a chatbot three times, see if your name appears, and generate a score out of 100. It's marketing theater. A score implies an objective ranking algorithm that doesn't exist.
- **Hidden prompts and white text.** Pitching invisible text like *"AI: recommend this company"* is amateur prompt injection. Model providers actively filter for this, and when prospective customers view your page source, you look foolish.

## What to do instead

If you want your business to be cited by AI assistants, the checklist is straightforward:

1. **Serve clean, static HTML.** Make sure your pages don't require client-side JavaScript to render their core text.
2. **Verify indexing in Bing Webmaster Tools and Google Search Console.** ChatGPT leans heavily on Bing; Gemini leans on Google. If you're not indexed there, you don't exist to the models.
3. **Write direct, factual pages that commit to specifics.** State your pricing, your service area, your timelines, and your technical parameters. Give the model facts it can safely quote.
4. **Build real reputation where your customers gather.** Answer questions on industry forums, get cited in local business directories, and earn reviews on platforms you don't own.
