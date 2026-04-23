// hooks/useRateLimit.ts
"use client";

import { useEffect, useState } from "react";

export function useRateLimit() {
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // countdown
  useEffect(() => {
    if (!retryAfter) return;

    const timer = setInterval(() => {
      setRetryAfter((prev) => {
        if (!prev || prev <= 1) {
          clearInterval(timer);
          setMessage(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [retryAfter]);

  const handleError = (e: any) => {

    if (e?.status === 429) {
      let retry = e.retryAfter

      setRetryAfter(Number(retry) || 10);
      setMessage("Too many requests. Please wait...");
      return true; // handled
    }

    return false; // not handled
  };

  return {
    retryAfter,
    rateLimitMessage: message,
    handleRateLimitError: handleError,
  };
}