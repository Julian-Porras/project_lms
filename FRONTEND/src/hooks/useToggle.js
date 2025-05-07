import { useState } from 'react';

export default function useToggle(defaultValue = true) {
  const [value, setValue] = useState(defaultValue);
  const toggle = () => setValue(prev => !prev);
  return [value, toggle];
}