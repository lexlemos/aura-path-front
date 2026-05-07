import { DashboardClient } from "./components/DashboardClient";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#F0F4F8] overflow-hidden">
      <main className="flex-1 overflow-auto p-6">
        <DashboardClient />
      </main>
    </div>
  );
}
