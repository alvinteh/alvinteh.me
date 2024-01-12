const flattenLabels = (timeline: gsap.core.Timeline): void => {
  const convertTime = (tl: gsap.core.Timeline, time: number): number => {
    const convertedTime = tl.startTime() + time / tl.timeScale();
  
    // We can ignore the linting error as we are checking to see if there is a nested timeline
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let currentTimeline: gsap.core.Timeline | undefined = tl.timeline;
    
    while (currentTimeline && currentTimeline !== timeline) {
      time = currentTimeline.startTime() + time / currentTimeline.timeScale();
      // We can ignore the linting error as we are checking to see if there is a nested timeline
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      currentTimeline = currentTimeline.timeline;
    }
  
    return convertedTime;
  }

  const childTimelines = timeline.getChildren(true, false, true) as gsap.core.Timeline[];
  
  childTimelines.forEach((childTImeline: gsap.core.Timeline) => {
    for (const label in childTImeline.labels) {
      timeline.addLabel(label, convertTime(childTImeline, childTImeline.labels[label]));
    }
  });
};

export {
  flattenLabels
};