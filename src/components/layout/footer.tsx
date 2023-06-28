import { siteConfig } from "@/config/site";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-black underline underline-offset-4"
          >
            Alina
          </a>
          . The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-black underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>

        <div className="flex items-end justify-center">
          <a
            className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto lg:p-0 text-center text-sm leading-loose text-muted-foreground md:text-right"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={60}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
