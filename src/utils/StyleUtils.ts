interface Size {
  phone: string
  tablet: string
  desktopS: string
  desktopM: string
  desktopL: string
  desktopXL: string
}

const breakpoints: Size = {
  phone: '576px',         // 320 * x, 480 * x, etc.
  tablet: '800px',        // 768 * x, 800 * x, etc.
  desktopS: '1024px',     // 1024 & 768, 1280 * 800 (1.6), 1366 * 768 (1.78), 1440 * 900 (1.6)
  desktopM: '1680px',     // 1680 * 1050 (1.6), 1920 * 1080 (1.78)
  desktopL: '2560px',     // 2560 * 1440 (1.78), 2560 * 1600 (1.6)
  desktopXL: '3840px',    // 3440 * 1440 (2.39), 3840 * 2160 (1.78)
};

const aspectRatios: Record<string, string> = {
  a16x10: `(min-aspect-ratio: 16/10)`,
  a16x9: `(min-aspect-ratio: 16/9)`,
  a21x9: `(min-aspect-ratio: 21/9)`,
};

const screenSizes: Size = {
  phone: `(max-width: ${breakpoints.phone})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
  desktopS: `(min-width: ${breakpoints.desktopS})`,
  desktopM: `(min-width: ${breakpoints.desktopM})`,
  desktopL: `(min-width: ${breakpoints.desktopL})`,
  desktopXL: `(min-width: ${breakpoints.desktopXL})`,
};

export { aspectRatios, screenSizes };