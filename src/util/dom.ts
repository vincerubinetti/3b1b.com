/** theme css variables https://stackoverflow.com/a/78994961/2180570 */
export const getThemeVariables = () =>
  typeof window === "undefined"
    ? {}
    : Object.fromEntries(
        Array.from(document.styleSheets)
          .flatMap((styleSheet) => {
            try {
              return Array.from(styleSheet.cssRules);
            } catch (error) {
              return [];
            }
          })
          .filter((cssRule) => cssRule instanceof CSSStyleRule)
          .flatMap((cssRule) => Array.from(cssRule.style))
          .filter((style) => style.startsWith("--"))
          .map((variable) => [
            variable,
            window
              .getComputedStyle(document.documentElement)
              .getPropertyValue(variable),
          ]),
      );
