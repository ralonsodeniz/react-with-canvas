import { useState, useEffect } from "react";

export default (key, initialValue) => {
  const [storageValues, setStorageValues] = useState(
    JSON.parse(localStorage.getItem(key)) || initialValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageValues));
  }, [key, storageValues]);

  return [storageValues, setStorageValues];
};
