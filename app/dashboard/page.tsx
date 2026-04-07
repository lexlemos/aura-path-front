import { AppSidebar } from "@/app/components/AppSidebar";
import { TopNav } from "./components/TopNav";
import { PatientCard } from "./components/PatientCard";
import { AlertCard } from "./components/AlertCard";
import { XAIReasoningPath } from "./components/XAIReasoningPath";
import { ActionButtons } from "./components/ActionButtons";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#F0F4F8] overflow-hidden">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />

        <main className="flex-1 overflow-auto p-6">
          <AlertCard />

          <div className="flex gap-5">
            <PatientCard />
            <XAIReasoningPath />
          </div>

          <ActionButtons />
        </main>
      </div>
    </div>
  );
}
