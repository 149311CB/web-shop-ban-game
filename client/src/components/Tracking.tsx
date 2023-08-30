import React from "react";
import { useReactGA } from "../hooks/useTracker";

const Tracking: React.FC = ({ children }) => {
  useReactGA({pageView: true});

  return <>{children}</>;
};

export default Tracking;
