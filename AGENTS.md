# Agent Guidelines for Galler

## Commands

- `pnpm dev` - Start dev server
- `pnpm build` - Build to `docs/` for GitHub Pages
- `pnpm typecheck` - Type check with tsc
- `pnpm format` - Format code with Prettier

## Architecture

- SolidJS app that extracts images from URLs via query param `?url=`
- Image providers in `src/providers/` convert thumbnail URLs to full-size
- Add new providers to `IMAGE_PROVIDERS` array in `src/providers/index.ts`

## Style

- SolidJS: use `Component` type, prefer signals over props drilling
- Import types: `import type { Gallery } from '../types'`
- All types in `src/types.ts`
- Named exports (except `App` default export)
- Error handling: try-catch async, local `showError/showLoading` helpers in components
