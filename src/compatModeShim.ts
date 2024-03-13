// src/compatModeShim.ts
if (typeof document !== "undefined") {
  Object.defineProperty(document, "compatMode", {
    get: function() {
      return "CSS1Compat";
    }
  });
}