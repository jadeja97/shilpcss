import {
  Bitter as displayFont,
  Inter as bodyFont,
  Intel_One_Mono as codeFont,
} from "next/font/google";

/* ============================================================================================= */

export const display = displayFont({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  style: ["italic", "normal"],
  preload: true,
  variable: "--user-font-display",
});

/* ============================================================================================= */

export const body = bodyFont({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  style: ["italic", "normal"],
  preload: true,
  variable: "--user-font-body",
});

/* ============================================================================================= */

export const code = codeFont({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  style: ["italic", "normal"],
  preload: true,
  adjustFontFallback: false,
  variable: "--user-font-code",
});
