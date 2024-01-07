interface AnimationDurations {
  NONE: number;
  XFAST: number;
  FAST: number;
  MEDIUM: number;
  SLOW: number;
  XSLOW: number;
}

const animationDurations: AnimationDurations = {
  NONE: 0,
  XFAST: 1,
  FAST: 2,
  MEDIUM: 4,
  SLOW: 6,
  XSLOW: 8,
};

const parallaxUnit = 250;

export {
  animationDurations,
  parallaxUnit,
};