"use client";

import { CheckCircle, Sparkles, TrendingUp, Heart, Trophy, MessageCircle, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BemVindoPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Pega o email do localStorage se disponível
    const userEmail = localStorage.getItem('userEmail') || '';
    setEmail(userEmail);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF00]/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF00] rounded-full mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-[#0D0D0D]" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              🎉 Bem-vindo ao <span className="text-[#00FF00]">Parada Fumante!</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Parabéns por dar o primeiro passo rumo a uma vida mais saudável!
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-lg text-gray-400">
                Sua compra foi confirmada com sucesso! 🎊<br />
                {email && <span className="text-[#00FF00]">Enviamos um email para {email} com todas as informações.</span>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* O que você ganhou */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          O que você <span className="text-[#00FF00]">ganhou hoje</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: TrendingUp,
              title: "Dashboard Completo",
              description: "Acompanhe seu progresso em tempo real com estatísticas detalhadas",
              benefit: "Veja quantos dias livre, dinheiro economizado e vida recuperada"
            },
            {
              icon: Trophy,
              title: "Sistema de Conquistas",
              description: "Desbloqueie badges e celebre cada vitória",
              benefit: "Gamificação que torna a jornada divertida e motivadora"
            },
            {
              icon: Heart,
              title: "Monitoramento de Saúde",
              description: "Acompanhe a recuperação do seu corpo",
              benefit: "6 marcos de saúde desde 20 minutos até 1 ano"
            },
            {
              icon: MessageCircle,
              title: "Suporte com IA 24/7",
              description: "Chat inteligente sempre disponível",
              benefit: "Respostas instantâneas para suas dúvidas e motivação"
            },
            {
              icon: Sparkles,
              title: "Mensagens Motivacionais",
              description: "Receba inspiração diária personalizada",
              benefit: "Mantenha-se motivado todos os dias"
            },
            {
              icon: Download,
              title: "Acesso Vitalício",
              description: "Use quando e onde quiser, para sempre",
              benefit: "Sem mensalidades, sem taxas escondidas"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-[#00FF00]/20 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-[#00FF00]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 mb-3">{item.description}</p>
              <p className="text-sm text-[#00FF00]">✓ {item.benefit}</p>
            </div>
          ))}
        </div>

        {/* Próximos Passos */}
        <div className="bg-gradient-to-r from-[#00FF00]/20 to-transparent border border-[#00FF00]/30 rounded-3xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🚀 Seus <span className="text-[#00FF00]">Próximos Passos</span>
          </h2>
          
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Configure sua Data de Parada",
                description: "Acesse o dashboard e defina quando você parou de fumar",
                action: "Ir para Dashboard",
                link: "/dashboard"
              },
              {
                step: "2",
                title: "Explore suas Estatísticas",
                description: "Veja quanto dinheiro você está economizando e como sua saúde está melhorando",
                action: "Ver Progresso",
                link: "/dashboard"
              },
              {
                step: "3",
                title: "Conheça o Suporte com IA",
                description: "Tire dúvidas e receba motivação 24/7 com nosso assistente inteligente",
                action: "Falar com Suporte",
                link: "/suporte"
              }
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-[#00FF00] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#0D0D0D] text-xl">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  <Link
                    href={step.link}
                    className="inline-flex items-center gap-2 text-[#00FF00] hover:underline font-semibold"
                  >
                    {step.action}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Garantia */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00FF00]/20 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-[#00FF00]" />
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Garantia de <span className="text-[#00FF00]">7 Dias</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Você tem 7 dias para testar o Parada Fumante sem riscos. Se não ficar satisfeito, 
            devolvemos 100% do seu dinheiro, sem perguntas.
          </p>
          <p className="text-sm text-gray-500">
            Para solicitar reembolso, entre em contato: suporte@paradafumante.com.br
          </p>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-400 mt-4">
            Sua jornada para uma vida sem cigarro começa agora! 💪
          </p>
        </div>
      </div>
    </div>
  );
}
