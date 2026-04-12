# Dylanz.one

This is a Vite + React site that renders long-form content from markdown files in `public/` using a unified `MarkdownArticle` renderer.

## Dev

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

## Markdown authoring extensions

### 1) Frontmatter (Hero + Title + Subtitle)

Markdown files may start with YAML frontmatter:

```md
---
title: "My Page Title"
subtitle: "One-line subtitle shown under the title"
hero:
  src: "hero-image.png"
  alt: "Hero alt text"
  width: 160      # optional (px)
  align: center   # left | center | right
---

## Content starts here
...
```

Notes:
- `title` and `subtitle` are rendered by React above the markdown body.
- The hero image is rendered above the title.
- If no frontmatter is present, the page renders as normal markdown.

### 2) Split block (image on one side, content on the other)

Use a `split` container directive to place an image next to markdown content:

```md
:::split{img="some-image.jpg" side="left" width="260"}

## Heading inside the split

This content stays *real markdown*.

- bullet 1
- bullet 2

:::
```

Attributes:
- `img` (required): image URL/path
- `side`: `left` (default) or `right`
- `width`: image column width in pixels (defaults to 260)
- `alt`: optional image alt text

On small screens, the split block stacks vertically.
