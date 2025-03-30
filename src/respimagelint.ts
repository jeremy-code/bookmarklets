/**
 * Uses Martin Auswöger’s RespImageLint script to lint responsive images on the
 * page. Useful in development to verify the `srcset` and `sizes` attributes
 * of images on the page are correct and valid for all screen sizes.
 *
 * @see {@link https://ausi.github.io/respimagelint/}
 * @see {@link https://github.com/ausi/respimagelint}
 * @see {@link https://github.com/ausi/respimagelint/blob/master/src/bookmarklet.js}
 */
const element = Object.assign(document.createElement("script"), {
  id: "respimagelint-script",
  src: `https://ausi.github.io/respimagelint/collector.js?${Date.now()}`,
});

document.body.appendChild(element);
