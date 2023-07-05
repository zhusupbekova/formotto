"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";
import posthog from "posthog-js";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { PostHogProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "development") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PHProvider>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
      </PHProvider>
    </ThemeProvider>
  );
}
