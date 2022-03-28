export function animationInterval(
  ms: number,
  signal: AbortSignal,
  callback: any,
  firstRun?: boolean
) {
  // Prefer currentTime, as it'll better sync animtions queued in the
  // same frame, but if it isn't supported, performance.now() is fine.
  const start = document.timeline
    ? document.timeline.currentTime
    : performance.now();

  function frame(time: any) {
    if (signal.aborted) return;
    callback(time);
    scheduleFrame(time);
  }

  function scheduleFrame(time: any) {
    if (start) {
      const elapsed = time - start;
      const roundedElapsed = Math.round(elapsed / ms) * ms;
      const targetNext = start + roundedElapsed + ms;
      const delay = targetNext - performance.now();
      setTimeout(() => requestAnimationFrame(frame), delay);
    }
  }
  if (firstRun) {
    callback(0);
  }
  scheduleFrame(start);
}

export class AnimationInterval {
  public timeoutId: NodeJS.Timeout | undefined;
  constructor(
    public ms: number,
    public controller: AbortController,
    public callback: Function,
    public firstRun: boolean
  ) {}

  start() {
    // Prefer currentTime, as it'll better sync animtions queued in the
    // same frame, but if it isn't supported, performance.now() is fine.
    const start = document.timeline
      ? document.timeline.currentTime
      : performance.now();

    const frame = (time: any) => {
      if (this.controller.signal.aborted) return;
      this.callback(time);
      scheduleFrame(time);
    };

    const scheduleFrame = (time: any) => {
      if (start) {
        const elapsed = time - start;
        const roundedElapsed = Math.round(elapsed / this.ms) * this.ms;
        const targetNext = start + roundedElapsed + this.ms;
        const delay = targetNext - performance.now();
        this.timeoutId = setTimeout(() => requestAnimationFrame(frame), delay);
      }
    };
    if (this.firstRun) {
      this.callback(0);
    }
    scheduleFrame(start);
    return this;
  }

  end() {
    this.controller.abort();
  }

  clear() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}
