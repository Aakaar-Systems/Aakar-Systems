/**
 * Runs before paint so the stored/system theme is applied without a flash.
 * Kept as a raw string: it must execute synchronously in <head>.
 */
const script = `
(function () {
  try {
    var stored = localStorage.getItem("aakaar-theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    /* localStorage blocked — the dark default in the markup stands. */
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
