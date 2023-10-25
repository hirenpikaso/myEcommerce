import { useState, useEffect } from "react";

export const useDebounce = (value, milliSeconds) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  console.log("debouncedValue >>", debouncedValue);
  // useEffect(() => {
  //   console.log("debouncedValue", debouncedValue);
  // }, [debouncedValue]);
  useEffect(() => {
    const handler = setTimeout(
      (value) => {
        setDebouncedValue(value);
      },
      milliSeconds,
      value
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};
