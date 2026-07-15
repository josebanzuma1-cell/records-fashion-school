import { Archivo, Bodoni_Moda, Space_Mono } from "next/font/google";

/**
 * The three (and only three) project typefaces.
 *
 * NOTE: Google Fonts ships "Archivo Expanded" as the variable `Archivo`
 * family with a `wdth` axis (62–125). We load the wdth axis and render
 * display type at font-stretch: 125% (see `.font-display` in globals.css)
 * to get the wide, industrial cut the art direction calls for.
 */
export const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
});

export const serif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});
