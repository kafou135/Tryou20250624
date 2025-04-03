'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RefreshButton() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh(); // Refresh the page every second
    }, 60000); // 1000ms = 1 second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [router]);

  return null; // No need to render anything
}