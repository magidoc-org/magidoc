# Starter Skeleton-Multi-Page

This is a Magidoc Starter-Project for a GraphQL static documentation website built with [Svelte-Kit](https://kit.svelte.dev/), [Tailwind CSS](https://tailwindcss.com/) and [Skeleton](https://skeleton.dev/).

Svelte-Kit is the equivalent in Svelte of [NextJS](https://nextjs.org/) for React, which gives you file-system based routing in your application. If you are not familiar with Svelte yet, make sure you check out their amazing [tutorials by examples](https://svelte.dev/tutorial/basics).

UI components come from [Skeleton](https://skeleton.dev/docs/svelte). The theme is set with the `data-theme` attribute in `src/app.html` and imported in `src/app.css`; swap both to use any of [Skeleton's themes](https://skeleton.dev/docs/design/themes). Icons come from [carbon-icons-svelte](https://github.com/carbon-design-system/carbon-icons-svelte).

This template enforces strict TypeScript typing by default, making it easy to get auto-complete and to get type-safety in your code.

## Recommended IDE

The recommended IDE is VSCode. There is already a dedicated VSCode configuration in the starter that you can change if you need to. Make sure you install the recommended extensions for the best developing experience.

## Recommended package manager

The recommended package manager is [pnpm](https://pnpm.io/). This is the package manager this starter has been tested with, but other package managers should work just as fine.

## Commands

### Dev

To run locally with hot-reload:

```
pnpm dev
```

### Test

Test command runs type-checking. Since Svelte-Kit uses [ViteJS](https://vitejs.dev/) under the hood, there is no type-checking when building. It is done this way to increase the build speed. so it relies on your IDE and type-checking commands to enforce TypeScript.

```
pnpm test
```

### Build

Builds the production website. The output build defaults to a static website. This is the best way to build the documentation website as long as there is no Dynamic Content (API calls for instance). 

If you wish to use have a different output to use on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) for instance, you can change the adapter used by Svelte-Kit. See the documentation on [adapters](https://kit.svelte.dev/docs/adapters) for more information.

```
pnpm build
```

You can then preview your production build locally

```
pnpm preview
```
