# Playground

Vue UI for previewing and copying contribution-wall SVG URLs.

## Run

Start the API from the repo root:

```shell
pnpm start:dev
```

Start the playground:

```shell
VITE_DEV_SERVER_PROXY_TARGET=http://localhost:3000 pnpm -C playground dev
```

For a remote API:

```shell
VITE_API_BASE_URL=https://your-api.example.com pnpm -C playground dev
```

`VITE_GITHUB_REPO_URL` changes the GitHub link in the playground header.

## Build

```shell
pnpm -C playground build
```

The Cloudflare Worker deployment is SVG-only. It is for README/profile images, not the full playground API.
