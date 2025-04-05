/**
 * Opens in a new tab a TinyURL creation link of the current page with a custom
 * alias based on a "slug" of the current page's title.
 */
window.open(
  `https://tinyurl.com/create.php?${new URLSearchParams({
    url: location.href,
    alias: `${document.title
      .toLowerCase()
      .trim()
      .replaceAll(/\s/g, "-") // Replace whitespace with hyphens
      .replaceAll(/[^\w-]/g, "") // Remove non-alphanumeric characters except hyphens and underscores
      .replaceAll(/--+/g, "-") // Replace duplicate hyphens with a single hyphen
      .substring(0, 15)}-${(Math.random() * 1_000_000) // 0-999,999
      .toFixed()
      .padStart(6, "0")}`,
  })}`,
  "_blank",
);
