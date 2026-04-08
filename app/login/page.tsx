import { Library, ShieldCheck } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {

  return (
    <div className="flex h-screen w-full font-sans overflow-hidden">

      <div className="hidden w-1/2 flex-col justify-between bg-[#00446A] p-8 lg:p-10 xl:p-12 text-white md:flex relative overflow-hidden">

        <div className="flex items-center gap-2 z-10 shrink-0">
          <Library className="h-[22px] w-[22px]" />
          <span className="text-[18px] font-bold tracking-wide">Aura Path</span>
        </div>

        <div className="relative z-10 flex flex-col justify-center flex-1 w-full max-w-[400px] xl:max-w-[480px] mx-auto py-4 mt-8">
          <div className="mb-8 xl:mb-10 flex flex-col items-start text-left w-full">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.15] tracking-tight mb-5 w-full">
              Raciocínio Clínico<br />
              Baseado em Evidências
            </h1>
            <p className="text-base lg:text-lg xl:text-xl font-light leading-relaxed text-blue-50/90 w-full">
              Inteligência de classe empresarial projetada para o médico moderno. Acesso seguro à síntese diagnóstica avançada e arquitetura de dados do paciente.
            </p>
          </div>

          <div className="mt-2 relative shrink-0 flex justify-center w-full">
            <div className="w-[260px] h-[260px] lg:w-[320px] lg:h-[320px] xl:w-[380px] xl:h-[380px] bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl relative">
              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="text-cyan-400 text-5xl lg:text-6xl xl:text-7xl font-black italic tracking-widest drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
                  X<span className="text-cyan-200">A</span>I
                </span>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 border-[30px] border-cyan-500/5 mix-blend-overlay rounded-[2rem]"></div>
            </div>
          </div>
        </div>

        <div className="z-10 mt-auto shrink-0 text-center">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-semibold">
            CLINICAL INTELLIGENCE FRAMEWORK v2.4
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col bg-white md:w-1/2 relative overflow-y-auto overflow-x-hidden md:overflow-hidden">
        <div className="flex flex-1 items-center justify-center p-6 lg:p-8">

          <div className="w-full max-w-[400px] xl:max-w-[440px] rounded-[1rem] border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-6 lg:p-8 xl:p-10 flex flex-col bg-white">

            <div className="mb-6 xl:mb-8 flex flex-col gap-1.5">
              <h2 className="text-[20px] xl:text-[22px] font-bold tracking-tight text-gray-900">
                Acessar Espaço de Trabalho
              </h2>
              <p className="text-[12px] xl:text-[13px] text-gray-500 leading-relaxed">
                Apenas pessoal autorizado. Credenciais clínicas necessárias.
              </p>
            </div>

            <LoginForm />

            <div className="mt-6 flex items-start gap-3">
              <ShieldCheck className="h-4 w-4 flex-shrink-0 text-[#00446A] mt-0.5" />
              <p className="text-[10px] xl:text-[11px] leading-relaxed text-gray-600 font-medium tracking-tight">
                Conexão criptografada. Totalmente em conformidade com LGPD<br />e HIPAA.
              </p>
            </div>
          </div>
        </div>

        <div className="pb-6 xl:pb-8 px-6 flex flex-col items-center justify-center gap-4 xl:gap-6 text-center mt-auto shrink-0">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[9px] xl:text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Termos de Serviço</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Arquitetura de Segurança</a>
          </div>
          <p className="text-[9px] xl:text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
            © 2024 AURA PATH. AMBIENTE CLÍNICO EM CONFORMIDADE COM HIPAA & LGPD.
          </p>
        </div>
      </div>
    </div>
  )
}