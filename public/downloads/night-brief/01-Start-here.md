# Night Brief Starter
By codemantix.lab · Starter edition · 23 September 2026

Turn a few project notes into a short briefing: what changed, what is still open, and where to start next.

This is a small, portable version of the workflow shown in the video. It includes a prompt, example notes and an automation blueprint. It does not include my personal vault or dashboard, and it is not a one-click installer.

## Try it first

1. Open `02-Briefing-prompt.txt` and copy the prompt into Codex or your preferred AI chat.
2. Add the contents of `03-Example-notes.md` underneath it. These are fictional examples, safe to experiment with.
3. Ask for the briefing. Check that completed items stay completed and unfinished work stays unfinished.
4. Replace the examples with two or three notes you choose to share with your AI provider. You do not need to upload your whole vault.
5. Keep the resulting briefing in a separate note. Do not replace your original project notes.

Using the prompt manually needs no script or dashboard. Obsidian is optional: these files are plain Markdown. You need access to your chosen AI tool; its normal usage limits or charges apply.

## What a useful result looks like

Illustrative result, written for this guide; not a recorded model run:

- **Changed:** The website hero is finished. [demo-website.md]
- **Still open:** The contact form and mobile layout need checking. [demo-website.md]
- **Suggested next step:** Test the contact form, which the note explicitly lists as the next action. [demo-website.md]
- **Needs clarification:** The timer's reminder toggle is planned, but there is no completion update. [demo-timer.md]

No invented launch date. No claim that the form has already passed its tests.

## Make your notes easier to summarize

A short note is enough:

```markdown
# Project name
Updated: YYYY-MM-DD
Done:
- What actually changed
Open:
- What is unfinished
Next:
- One small action
Questions:
- Anything you have not decided
```

The AI cannot reconstruct missing progress. When a note is out of date, the briefing should say that its current state is unknown.

## Make it run at night

Use `04-Automation-blueprint.md` after the manual result is useful. The nightly part needs a runner and a scheduler; the prompt by itself does not schedule anything.

Start with one notes folder and one dated output file. A dashboard is an optional later addition — you can read the generated Markdown directly in Obsidian.

## Before you rely on it

- Try an empty note, contradictory notes and a normal project update.
- Check that source notes remain unchanged.
- Confirm that failed runs do not replace the last good briefing.
- For a local scheduled run, the computer must be available and have network access. A sleeping/offline machine may miss the intended time unless catch-up is implemented.

This starter's text and fictional examples have been reviewed. An independent installation and live scheduled run of this starter have not been tested. The original private workflow is running separately.
