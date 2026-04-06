#!/bin/bash

# Encerra o script imediatamente caso algum comando falhe
set -e

echo "🚀 Iniciando a criação da arquitetura modular para Next.js 15..."

# 1. Criação da árvore de diretórios raiz dentro de src
mkdir -p src/{actions,app,components/{shared,ui},data,hooks,lib,types,utils}

# 2. Criação do scaffolding básico de roteamento do App Router
touch src/app/layout.tsx
touch src/app/page.tsx
touch src/app/globals.css

# 3. Geração do utilitário padrão do Shadcn UI em src/lib/utils.ts
# Usado para compor classes com tailwind-merge de forma otimizada
cat << 'EOF' > src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

# 4. Geração do arquivo vazio de validações (Zod Schemas, etc.)
touch src/lib/validations.ts

# 5. Adicionando persistência ao Git em diretórios inicialmente vazios
# O app routing e lib já possuem arquivos e não precisam de .gitkeep
touch src/actions/.gitkeep
touch src/components/shared/.gitkeep
touch src/components/ui/.gitkeep
touch src/data/.gitkeep
touch src/hooks/.gitkeep
touch src/types/.gitkeep
touch src/utils/.gitkeep

echo "✅ Estrutura enxuta criada com sucesso!"
echo "✨ Seu repositório já pode ser inicializado com sua arquitetura modular."
