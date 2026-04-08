"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, IdCard, Building2, ArrowRight } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <form className="flex flex-col gap-4 lg:gap-5" onSubmit={handleLogin}>
      <div className="grid gap-1.5">
        <label htmlFor="email" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-wider text-gray-500">
          E-mail ou CRM
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <IdCard className="h-[16px] w-[16px]" />
          </div>
          <input
            id="email"
            type="text"
            placeholder="ex: medico@hospital.org ou 123456-SP"
            required
            className="flex h-10 xl:h-11 w-full rounded-md bg-gray-100 border-transparent pl-9 pr-3 py-2 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00446A] focus:bg-white transition-colors"
          />
        </div>
      </div>
      
      <div className="grid gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Senha
          </label>
          <a href="#" className="text-[10px] xl:text-[11px] font-bold text-[#00446A] hover:underline">
            Esqueceu sua senha?
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Lock className="h-[16px] w-[16px]" />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="flex h-10 xl:h-11 w-full rounded-md bg-gray-100 border-transparent pl-9 pr-9 py-2 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00446A] focus:bg-white transition-colors tracking-widest"
          />
          <button
            type="button"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none rounded-r-md"
          >
            {showPassword ? <EyeOff className="h-[16px] w-[16px]" /> : <Eye className="h-[16px] w-[16px]" />}
          </button>
        </div>
      </div>
      
      <button
        type="submit"
        className="mt-1 xl:mt-2 inline-flex h-10 xl:h-11 items-center justify-center gap-2 rounded-md bg-[#00446A] px-4 py-2 text-[13px] xl:text-[14px] font-semibold text-white shadow hover:bg-[#003350] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00446A] focus-visible:ring-offset-2 transition-colors disabled:pointer-events-none disabled:opacity-50"
      >
        Acessar Espaço de Trabalho
        <ArrowRight className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
      </button>
      
      <div className="relative my-2 xl:my-4 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <span className="relative bg-white px-3 text-[9px] xl:text-[10px] uppercase tracking-widest text-gray-400 font-bold">
          OU
        </span>
      </div>
      
      <button
        type="button"
        onClick={() => router.push('/dashboard')}
        className="inline-flex h-10 xl:h-11 items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-[13px] xl:text-[14px] font-semibold text-gray-800 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 transition-colors"
      >
        <Building2 className="h-[16px] w-[16px] xl:h-[18px] xl:w-[18px]" />
        Entrar via Portal do Hospital (SSO)
      </button>
    </form>
  )
}
