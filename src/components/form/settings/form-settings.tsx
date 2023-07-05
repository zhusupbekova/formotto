"use client";

import { SidebarNav } from "@/components/form/side-bar-nav";
import { useState } from "react";
import { GeneralSettingsForm } from "@/components/form/settings/general-settings";

const sidebarNavItems = [
  {
    title: "General",
    key: "general",
  },
  // {
  //   title: "Thank you page",
  //   key: "thank-you-page",
  // },
  // {
  //   title: "Email notifications",
  //   key: "email-notifications",
  // },
];
export function FormSettings({ formId }: { formId: string }) {
  const [currentSetting, setCurrentSetting] = useState(sidebarNavItems[0].key);
  return (
    <div className="w-full flex flex-col justify-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="lg:w-1/5">
        <SidebarNav
          items={sidebarNavItems}
          current={currentSetting}
          setCurrent={setCurrentSetting}
        />
      </aside>
      <div className="flex-1 lg:max-w-2xl">
        {currentSetting === "general" && (
          <GeneralSettingsForm formId={formId} />
        )}
      </div>
    </div>
  );
}
