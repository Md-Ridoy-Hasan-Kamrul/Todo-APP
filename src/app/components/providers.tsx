// src/app/providers.tsx
'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // attribute="class" is the key part that toggles the class on the <html> tag
  return <ThemeProvider attribute='class'>{children}</ThemeProvider>;
}
