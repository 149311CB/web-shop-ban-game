export function animateTo(
  element: Element,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
  signal?: AbortSignal
) {
  const anim = element.animate(keyframes, { ...options });
  anim.addEventListener("finish", () => {
    if (signal?.aborted) {
      return;
    }
    anim.commitStyles();
    anim.cancel();
  });

  return anim;
}
