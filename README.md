# bookmarklets

<!-- Link references -->

[github-actions]: https://www.github.com/jeremy-code/bookmarklets/actions/workflows/ci.yml
[github-actions-badge]: https://www.github.com/jeremy-code/bookmarklets/actions/workflows/ci.yml/badge.svg
[license-badge]: https://img.shields.io/github/license/jeremy-code/bookmarklets

[![GitHub Actions][github-actions-badge]][github-actions]
[![License][license-badge]](LICENSE)

[Bookmarklets](http://www.bookmarklets.com/) for various tasks and functions. I am currently using [Firefox 137](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/137) Developer Edition, so your milage may vary in terms of browser compatibility.

## Installation

```
git clone https://github.com/jeremy-code/bookmarklets.git
cd bookmarklets
corepack enable
pnpm install
```

## Usage

```
# Lint and format code with ESLint and Prettier
pnpm lint
pnpm format

# Build
pnpm build
```

## Bookmarklets

The bookmarklets are built using [`tsup`](https://tsup.egoist.dev/) and [esbuild](https://esbuild.github.io/) to minify, remove comments, etc. and stored in the [`bookmarklets`](bookmarklets) directory. The reason for writing the code in TypeScript and adding a build step is that by default, writing bookmarklets in one line is difficult to maintain and read, especially as complexity increases.

Outputs are committed to the repository, so you can use them without building the project yourself by just adding the code to your bookmarks.

1. archive ([source code](src/archive.ts), [bookmarklet](bookmarklets/archive.global.js)) - Archive the current page using [archive.today](https://archive.today/)
2. reddit ([source code](src/reddit.ts), [bookmarklet](bookmarklets/reddit.global.js)) - Opens a Reddit image or video directly
3. respimagelint ([source code](src/respimagelint.ts), [bookmarklet](bookmarklets/respimagelint.global.js)) - Lint responsive images on the current page using Martin Auswöger’s [RespImageLint](https://ausi.github.io/respimagelint/) script (see [ausi/respimagelint](https://github.com/ausi/respimagelint))
4. tinyurl ([source code](src/tinyurl.ts), [bookmarklet](bookmarklets/tinyurl.global.js)) - Shorten the current page URL using [tinyurl.com](https://tinyurl.com/) with a slug-like alias
5. whois ([source code](src/whois.ts), [bookmarklet](bookmarklets/whois.global.js)) - Get the WHOIS information for the current page using [lookup.icann.org](https://lookup.icann.org)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
