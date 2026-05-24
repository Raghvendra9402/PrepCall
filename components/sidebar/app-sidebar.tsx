"use client";

import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { LayoutDashboard, Mic, PhoneCall } from "lucide-react";
import { redirect } from "next/navigation";

const data = {
  teams: [
    {
      name: "PrepCall",
      logo: <Mic />,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Calls",
      url: "/calls",
      icon: PhoneCall,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.fullName ?? "Unknown User",
            avatar: user.imageUrl ?? "/unknown-user.png",
            email: user.emailAddresses[0]?.emailAddress ?? "No Email",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
