

## PDFConverter

Basic converter from text to pdf

Current tech-stack:
* Next.js
* React-pdf-viewer
* Tailwindcss
* Jest and React Test Library
* Vercel

## Deploy on Vercel

For deploying the app used the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

## Installation

`yarn` is highly recommend as a package manager.
```bash
yarn install
```

## Development

Running the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## TypeScript

* Please don't use `any`, it is allowed **only as a last resort**;


## File structure
├── public                     # images
├── src                        
│   ├── app                    
│   │   ├── (page)             # home (main) page
│   │   │   ├── actions        # server actions
│   │   │   ├── components     # components for this page
│   │   │   ├── page.tsx       # entry file for this page
│   │   │   ├── layout.tsx     # entry layout for this page
│   │   ├── global.css         # global styles
│   │   └── layout.tsx         # entry layout

## Branches
* `main` - Branch for production version
* `dev` - Branch for development

## Guidelines
1. Prefer `const` to `let`.
2. Prefer `async` / `await` to `then`.
3. Prefer function expression with arrows
