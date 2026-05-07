import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const profileInfo = [
  { label: "CRM", value: "SP-1928374-A" },
  { label: "EMAIL", value: "c.silva@aura-hospital.org" },
  { label: "DEPARTAMENTO", value: "Imagens de Diagnóstico Avançado" },
];

export function ProfileCard() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Avatar com fundo gradiente */}
      <div className="relative mb-4">
        <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#163254] to-teal-500 flex items-center justify-center overflow-hidden">
          <Avatar size="lg" className="w-full h-full rounded-2xl">
            <AvatarImage
              src="/assets/dr-carlos.jpg"
              alt="Dr. Carlos Eduardo Silva"
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="bg-transparent text-white text-3xl font-bold rounded-2xl">
              CS
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute -top-2 -right-2">
          <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">
            Verificado
          </Badge>
        </div>
      </div>

      {/* Nome e cargo */}
      <h2 className="text-base font-bold text-gray-900 leading-tight">
        Dr. Carlos Eduardo Silva
      </h2>
      <p className="text-sm font-medium text-[#163254] mt-1">
        Neuro-Oncologista Sênior
      </p>

      <Separator className="my-5 w-full" />

      {/* Informações */}
      <div className="w-full space-y-3 text-left">
        {profileInfo.map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
              {label}
            </p>
            <p className="text-sm text-gray-800 font-medium">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
