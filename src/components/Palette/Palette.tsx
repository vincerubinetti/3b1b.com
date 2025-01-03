import { useEffect, useState } from "react";
import { getThemeVariables } from "@/util/dom";

/** test card for color palette */
const Palette = () => {
  const [variables, setVariables] = useState<
    ReturnType<typeof getThemeVariables>
  >({});

  useEffect(() => {
    /** get root css vars on page load */
    setVariables(getThemeVariables());
  }, []);

  return (
    <div>
      {Object.entries(variables)
        .filter(([, value]) => value.startsWith("#") || value.startsWith("hsl"))
        .map(([variable, color], index) => (
          <div
            key={index}
            title={variable}
            aria-hidden
            style={{
              display: "inline-block",
              width: 50,
              height: 50,
              background: color,
            }}
          />
        ))}
    </div>
  );
};

export default Palette;
