import { useRef, useEffect } from "react";

export const useFocus = () => {
  // this allows us to get a reference to the rendered input element
  //typescript doesnt know what the type of the element is
  //so we provide the type to it, that is "htmlinputelement"
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);
  return ref;
};
