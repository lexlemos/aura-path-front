import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AppSidebar } from "@/app/components/AppSidebar";
import { ProfileTopNav } from "./components/ProfileTopNav";
import { ProfileCard } from "./components/ProfileCard";
import { ImpactCard } from "./components/ImpactCard";
import { WorkflowSettings } from "./components/WorkflowSettings";
import { ProfileActionButtons } from "./components/ProfileActionButtons";

export default function PerfilPage() {
  return (
    <div className="flex h-screen bg-[#F0F4F8] overflow-hidden">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ProfileTopNav />

        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-5">
            Conta e Preferências
          </h1>

          <Tabs defaultValue="identidade" className="flex-1">
            {/* Abas */}
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto gap-6 mb-6 justify-start w-full">
              <TabsTrigger
                value="identidade"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#163254] data-[state=active]:text-[#163254] data-[state=active]:shadow-none data-[state=active]:bg-transparent pb-3 pt-0 px-0 text-sm text-gray-500 bg-transparent"
              >
                Identidade do Perfil
              </TabsTrigger>
              <TabsTrigger
                value="fluxo"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#163254] data-[state=active]:text-[#163254] data-[state=active]:shadow-none data-[state=active]:bg-transparent pb-3 pt-0 px-0 text-sm text-gray-500 bg-transparent"
              >
                Configurações de Fluxo
              </TabsTrigger>
              <TabsTrigger
                value="seguranca"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#163254] data-[state=active]:text-[#163254] data-[state=active]:shadow-none data-[state=active]:bg-transparent pb-3 pt-0 px-0 text-sm text-gray-500 bg-transparent"
              >
                Segurança
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo: Identidade do Perfil */}
            <TabsContent value="identidade" className="mt-0">
              <div className="flex gap-6">
                {/* Coluna esquerda: perfil + impacto */}
                <div className="w-64 flex-shrink-0">
                  <ProfileCard />
                  <ImpactCard />
                </div>

                {/* Coluna direita: configurações */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-0">
                  <WorkflowSettings />
                  <div className="mt-auto pt-6">
                    <ProfileActionButtons />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Conteúdo: Configurações de Fluxo */}
            <TabsContent value="fluxo" className="mt-0">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
                Configurações de fluxo em breve.
              </div>
            </TabsContent>

            {/* Conteúdo: Segurança */}
            <TabsContent value="seguranca" className="mt-0">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
                Configurações de segurança em breve.
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
