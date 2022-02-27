export function animateTo(
  element: Element,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions
) {
  const anim = element.animate(keyframes, { ...options });
  anim.addEventListener("finish", () => {
    anim.commitStyles();
    anim.cancel();
  });

  return anim;
}
