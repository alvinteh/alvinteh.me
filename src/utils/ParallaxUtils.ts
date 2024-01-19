import keyMirror from 'keymirror';

type AnimationDirection = 'FORWARD' | 'REVERSE';

interface AnimationDurations {
  NONE: number;
  XXFAST: number;
  XFAST: number;
  FAST: number;
  MEDIUM: number;
  SLOW: number;
  XSLOW: number;
}

const animationDurations: AnimationDurations = {
  NONE: 0,
  XXFAST: 0.1,
  XFAST: 0.2,
  FAST: 0.4,
  MEDIUM: 0.8,
  SLOW: 1.2,
  XSLOW: 1.6,
};

const animationDirections: Record<AnimationDirection, AnimationDirection> = keyMirror({
  FORWARD: null,
  REVERSE: null,
});

const pageTimelineId = 'page-timeline';

export type { AnimationDirection };

export {
  animationDirections,
  animationDurations,
  pageTimelineId,
};