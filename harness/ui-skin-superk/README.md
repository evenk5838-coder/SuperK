# SuperK personal workspace skin

Version 0.2.0, trial build for the existing SuperK launcher and Harness web profile.

## Model Experience

Conversation, permissions, attachments, model providers, session control, project browsing and native settings remain supplied by Harness. This package provides a navigation shell, theme-token overrides, personal library panels and composer additions. The SuperK overlay disables only the shipped navigation shell and mounts this replacement. It also exposes existing personal Skill directories through the native filesystem provider.

Multi-select loads actual SKILL.md contents into the unsent draft. This is explicit user-supplied instruction composition, not proof of concurrent agent execution. Native slash discovery is retained. Reference notes and uploaded text are inserted into the draft for review; no model request is sent automatically.

The Host uses the Connection authenticated Fetch registry at /api/superk. Knowledge saves are append-only JSON and Markdown revisions under SuperK/knowledge; Skill imports use exclusive creation under SuperK/skills. Local source files are never modified or deleted. The DeepSeek balance query uses the existing DEEPSEEK_API_KEY credential and the official endpoint; absent credentials and request failures remain visible.

## Validation

Package typecheck and bundles pass. Actual local browser verification covers both themes, navigation, persisted notes, selected references, multi-Skill draft insertion, undo and native slash discovery. Full GUI run passed 599 suites and 9779 tests; two unrelated suites failed in existing document-preview packaging and trajectory bundle registration. Browser replay was blocked by a missing installed Playwright Chromium headless executable. See SuperK/TRIAL.md for details.
