import { AppSidebar } from "@/app/components/AppSidebar";
import { TopNav } from "./components/TopNav";
import { DashboardClient } from "./components/DashboardClient";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#F0F4F8] overflow-hidden">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />

        <main className="flex-1 overflow-auto p-6">
          <DashboardClient />
        </main>
      </div>
    </div>
  );
}
