"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState } from "react";

interface ActionButtonProps extends ButtonProps {}

export function ActionButton({ children, ...props }: ActionButtonProps) {
  return (
    <Button type="button" {...props}>
      {children}
    </Button>
  );
}

export function CopyButton({ data }: { data: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data)}>
      {copied ? (
        <Icons.copyDone className="h-4 w-4 text-green-600" />
      ) : (
        <Icons.copy className="h-4 w-4" />
      )}
      <span className="sr-only">Copy</span>
    </Button>
  );

  function copyToClipboard(text: string) {
    setCopied(true);
    navigator.clipboard.writeText(text);
    return setTimeout(() => setCopied(false), 800);
  }
}
