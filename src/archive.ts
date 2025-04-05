/**
 * Opens the latest archived version of the current page from Archive.today.
 *
 * @remarks
 *
 * The equivalent URL for the Internet Archive's Wayback Machine
 * (web.archive.org) is `https://web.archive.org/web/${URL}`
 */
location.assign(
  `https://archive.today/latest/${encodeURIComponent(location.href)}`,
);
