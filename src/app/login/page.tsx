"use client"



import { useState } from "react"

import { Activity, User, Lock, Eye, EyeOff, Building2, ShieldCheck, ArrowRight } from "lucide-react"



export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false)



  return (

    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

      {/* Left Panel */}

      <div className="relative hidden w-full flex-col bg-[#0a2540] p-10 text-white lg:flex">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">

            <Activity className="h-6 w-6" />

          </div>

          <span className="text-xl font-bold tracking-tight">Aura Path</span>

        </div>



        <div className="flex flex-1 flex-col justify-center">

          <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">

            Raciocínio Clínico<br />Baseado em Evidências

          </h1>

          <p className="max-w-lg text-lg text-blue-200">

            Inteligência de classe empresarial projetada para o médico moderno. Acesso seguro à síntese diagnóstica avançada e arquitetura de dados do paciente.

          </p>



          <div className="mt-12 flex h-64 w-full max-w-lg items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">

            <div className="flex flex-col items-center gap-4 opacity-50">

              <Activity className="h-12 w-12 text-blue-300" />

              <span className="text-sm font-medium tracking-widest text-blue-300">XAI ENGINE MODULE</span>

            </div>

          </div>

        </div>



        <div className="mt-auto">

          <p className="text-sm font-medium tracking-wider text-blue-300/50">

            CLINICAL INTELLIGENCE FRAMEWORK v2.4

          </p>

        </div>

      </div>



      {/* Right Panel */}

      <div className="flex flex-col bg-white p-6 md:p-10 lg:p-12 relative h-screen overflow-y-auto">

        {/* Mobile Header (visible only on small screens) */}

        <div className="mb-8 flex items-center gap-3 lg:hidden">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a2540] text-white">

            <Activity className="h-6 w-6" />

          </div>

          <span className="text-xl font-bold tracking-tight text-[#0a2540]">Aura Path</span>

        </div>



        <div className="flex flex-1 flex-col justify-center items-center h-full w-full">

          <div className="w-full max-w-[400px]">

            <div className="mb-8">

              <h2 className="text-2xl font-bold text-gray-900">Acessar Espaço de Trabalho</h2>

              <p className="mt-2 text-sm text-gray-500">

                Apenas pessoal autorizado. Credenciais clínicas necessárias.

              </p>

            </div>



            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

              <div className="space-y-2">

                <label className="text-xs font-semibold text-gray-700 tracking-wide" htmlFor="email">

                  E-MAIL OU CRM

                </label>

                <div className="relative">

                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">

                    <User className="h-5 w-5 text-gray-400" />

                  </div>

                  <input

                    id="email"

                    type="text"

                    className="block w-full rounded-lg border-0 bg-slate-50 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-[#0a2540] sm:text-sm sm:leading-6"

                    placeholder="ex: medico@hospital.org ou 123456-SP"

                  />

                </div>

              </div>



              <div className="space-y-2">

                <div className="flex items-center justify-between">

                  <label className="text-xs font-semibold text-gray-700 tracking-wide" htmlFor="password">

                    SENHA

                  </label>

                  <a href="#" className="text-sm font-medium text-[#0a2540] hover:underline">

                    Esqueceu sua senha?

                  </a>

                </div>

                <div className="relative">

                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">

                    <Lock className="h-5 w-5 text-gray-400" />

                  </div>

                  <input

                    id="password"

                    type={showPassword ? "text" : "password"}

                    className="block w-full rounded-lg border-0 bg-slate-50 py-3 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-200 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-[#0a2540] sm:text-sm sm:leading-6"

                    placeholder="••••••••"

                  />

                  <button

                    type="button"

                    onClick={() => setShowPassword(!showPassword)}

                    className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"

                  >

                    {showPassword ? (

                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />

                    ) : (

                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />

                    )}

                  </button>

                </div>

              </div>



              <button

                type="submit"

                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0a2540] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a2540]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a2540]"

              >

                Acessar Espaço de Trabalho

                <ArrowRight className="h-4 w-4" />

              </button>



              <div className="relative my-8">

                <div className="absolute inset-0 flex items-center" aria-hidden="true">

                  <div className="w-full border-t border-gray-200" />

                </div>

                <div className="relative flex justify-center text-sm font-medium leading-6">

                  <span className="bg-white px-4 text-gray-500">OU</span>

                </div>

              </div>



              <button

                type="button"

                className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200 border border-gray-200/50"

              >

                <Building2 className="h-5 w-5 text-gray-600" />

                Entrar via Portal do Hospital (SSO)

              </button>

            </form>



            <div className="mt-8 flex items-start gap-2 rounded-lg bg-slate-50 p-4 ring-1 ring-inset ring-gray-200/50">

              <ShieldCheck className="h-5 w-5 flex-shrink-0 text-emerald-600" />

              <p className="text-xs leading-5 text-gray-500">

                Conexão criptografada. Totalmente em conformidade com <span className="font-semibold text-gray-700">LGPD</span> e <span className="font-semibold text-gray-700">HIPAA</span>.

              </p>

            </div>

          </div>

        </div>



        {/* Page Footer */}

        <div className="mt-auto pt-8 flex flex-col items-center gap-3 pb-4">

          <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs font-semibold tracking-wider text-gray-500">

            <a href="#" className="hover:text-gray-900 transition-colors">POLÍTICA DE PRIVACIDADE</a>

            <a href="#" className="hover:text-gray-900 transition-colors">TERMOS DE SERVIÇO</a>

            <a href="#" className="hover:text-gray-900 transition-colors">ARQUITETURA DE SEGURANÇA</a>

          </div>

          <p className="text-[10px] text-gray-400 sm:text-xs text-center">

            © 2024 AURA PATH. AMBIENTE CLÍNICO EM CONFORMIDADE COM HIPAA & LGPD.

          </p>

        </div>

      </div>

    </div>

  )

}