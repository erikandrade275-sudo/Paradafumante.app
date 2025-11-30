"use client";

import { useState } from 'react';
import { Check, Sparkles, Crown, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { SINGLE_PLAN } from '@/lib/plans';
import Footer from '@/components/Footer';

export default function PrecosPage() {
  const handleSelectPlan = () => {
    window.open('https://checkout.keoto.com/fa1ebae4-f355-473f-be79-8a6c2f6b985b', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/30 px-6 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#00FF00]" />
            <span className="text-[#00FF00] text-sm font-semibold">Plano Único</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Um preço <span className="text-[#00FF00]">simples e justo</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Acesso completo a todas as funcionalidades por um preço único mensal. Sem surpresas, sem taxas escondidas.
          </p>
        </div>

        {/* Plano Único - Centralizado */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative bg-gradient-to-br from-[#00FF00]/10 to-transparent border-2 border-[#00FF00]/50 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-[#00FF00]/20">
            {/* Badge Popular */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-[#00FF00] text-[#0D0D0D] px-8 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Acesso Completo
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF00]/20 rounded-2xl mb-6">
                <Zap className="w-10 h-10 text-[#00FF00]" />
              </div>
              <h3 className="text-3xl font-bold mb-3">{SINGLE_PLAN.name}</h3>
              <p className="text-gray-400 text-lg">{SINGLE_PLAN.description}</p>
            </div>

            <div className="text-center mb-10">
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-6xl font-bold text-[#00FF00]">
                  R$ {SINGLE_PLAN.monthlyPrice.toFixed(2)}
                </span>
                <span className="text-gray-400 text-xl">/mês</span>
              </div>
              <p className="text-sm text-gray-400">
                ou 12x de R$ {(SINGLE_PLAN.monthlyPrice / 12).toFixed(2)} no cartão
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {SINGLE_PLAN.featuresList.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#00FF00] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleSelectPlan}
              className="w-full py-5 rounded-xl font-bold text-lg bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] shadow-lg shadow-[#00FF00]/30 transition-all duration-300 hover:scale-105"
            >
              Começar Agora
            </button>

            <p className="text-center text-sm text-gray-400 mt-6">
              ✓ Cancele quando quiser • ✓ Garantia de 7 dias • ✓ Suporte 24/7
            </p>
          </div>
        </div>

        {/* Benefícios Adicionais */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Check,
              title: "Sem Taxas Escondidas",
              description: "Preço fixo mensal, sem surpresas no final do mês"
            },
            {
              icon: Crown,
              title: "Acesso Completo",
              description: "Todas as funcionalidades liberadas desde o primeiro dia"
            },
            {
              icon: Sparkles,
              title: "Garantia Total",
              description: "7 dias para testar. Não gostou? Devolvemos seu dinheiro"
            }
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-[#00FF00]/20 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-[#00FF00]" />
              </div>
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. Seu acesso continua até o final do período pago."
              },
              {
                question: "Existe garantia de reembolso?",
                answer: "Oferecemos garantia de 7 dias. Se não estiver satisfeito, devolvemos 100% do seu dinheiro, sem perguntas."
              },
              {
                question: "Os dados são seguros?",
                answer: "Sim, utilizamos criptografia de ponta e seguimos todas as normas de proteção de dados (LGPD). Seus dados estão 100% seguros."
              },
              {
                question: "Como funciona o pagamento?",
                answer: "Aceitamos cartão de crédito com parcelamento em até 12x sem juros. O pagamento é processado de forma segura e você recebe acesso imediato."
              },
              {
                question: "Posso mudar de plano depois?",
                answer: "Como temos apenas um plano com acesso completo, você já tem tudo liberado! Não precisa se preocupar com upgrades."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border border-[#00FF00]/20 rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-gray-400 mb-6">
              Entre em contato com nossa equipe de suporte
            </p>
            <Link
              href="/suporte"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Falar com Suporte
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
