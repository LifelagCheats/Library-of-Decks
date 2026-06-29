// textfit.ts
import fitty from "fitty";

export const setupFitty = () => {
  fitty(".cardname", {
    minSize: 4,
    maxSize: 16
  });
};
