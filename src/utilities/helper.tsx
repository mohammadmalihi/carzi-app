import React from "react";

import { configAddress as defaultConfigAddress } from "../customized/default/configAddress";

export function dImport(
  componentName: string
): React.LazyExoticComponent<React.FC> {
  const theme = process.env.REACT_APP_THEME;
  console.log("Current theme:", theme);

  let componentPath: string | undefined;

  switch (theme) {
    case "default":
      componentPath = defaultConfigAddress[componentName];
      break;
    // case "cu-og":
    //   componentPath = cuOgConfigAddress[componentName];
    //   break;
    // case "cu-kar":
    //   componentPath = cuKarConfigAddress[componentName];
    //   break;

    default:
      componentPath = defaultConfigAddress[componentName];
      break;
  }

  if (componentPath) {
    return React.lazy(async () => {
      const module = await import(`../views/${componentPath}`);

      if (!module || !module.default) {
        throw new Error(`Component ${componentName} not found in module.`);
      }

      return module;
    });
  } else {
    throw new Error(
      `Component ${componentName} not found in any configAddress.`
    );
  }
}
