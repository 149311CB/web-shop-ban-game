import { useEffect, useRef, useState } from "react";

export const useClickOutside = (
  initial = false
): [boolean, Function, React.MutableRefObject<any>] => {
  const ref = useRef<any>(null);
  const [visible, setVisible] = useState<boolean>(initial);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) setVisible(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  return [visible, setVisible, ref];
};
