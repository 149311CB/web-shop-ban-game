export const getTransparentOverlay = ({
  alpha = 0.6,
  background = "hsl(0,100%,100%)",
  radius = "0.3rem",
  animationDuration = 125,
}) => {
  return {
    transition: `opacity ${animationDuration}ms ease-in-out`,
    content: '""',
    background: background,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
    borderRadius: radius,
    opacity: alpha,
  };
};
