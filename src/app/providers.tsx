"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "development") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // loaded: (ph) => {
    //     if (process.env.NODE_ENV === "development") {
    //         ph.debug();
    //     }
    // },
  });
}

function PHProvider({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Track pageviews
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <PHProvider>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </PHProvider>
  );
}
