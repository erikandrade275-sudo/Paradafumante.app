"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown para redirecionar para página de boas-vindas
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/bem-vindo');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white/5 backdrop-blur-sm border border-[#00FF00]/30 rounded-3xl p-8 sm:p-12">
          {/* Ícone de Sucesso */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF00]/20 rounded-full mb-6 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-[#00FF00]" />
          </div>
          
          {/* Título */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Pagamento <span className="text-[#00FF00]">Confirmado!</span>
          </h1>
          
          {/* Subtítulo */}
          <p className="text-lg sm:text-xl text-gray-400 mb-8">
            Bem-vindo ao Parada Fumante! 🎉
          </p>

          {/* Card de E-mail */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-[#00FF00]" />
              <h3 className="text-lg font-bold">E-mail de Confirmação Enviado</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Enviamos todos os detalhes do seu plano e instruções de uso para o seu e-mail.
            </p>
          </div>

          {/* Benefícios Liberados */}
          <div className="space-y-3 text-left mb-8">
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-[#00FF00] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Acesso Imediato</p>
                <p className="text-gray-400 text-sm">Todas as funcionalidades já estão liberadas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
              <Sparkles className="w-5 h-5 text-[#00FF00] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Plano Personalizado</p>
                <p className="text-gray-400 text-sm">Criado especialmente para você</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
              <Mail className="w-5 h-5 text-[#00FF00] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Instruções Completas</p>
                <p className="text-gray-400 text-sm">Guia passo a passo no seu e-mail</p>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-4">
              Redirecionando para página de boas-vindas em <span className="text-[#00FF00] font-bold">{countdown}s</span>
            </p>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-[#00FF00] h-full transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Botão de Ação */}
          <Link
            href="/bem-vindo"
            className="inline-flex items-center gap-2 bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105"
          >
            Ver Boas-Vindas Agora
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Mensagem de Suporte */}
          <p className="text-gray-500 text-xs mt-8">
            Precisa de ajuda? Entre em contato com nosso suporte 24/7
          </p>
        </div>
      </div>
    </div>
  );
}
