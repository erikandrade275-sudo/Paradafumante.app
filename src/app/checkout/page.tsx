"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, CreditCard, Lock, Shield, Star, ExternalLink, Loader2 } from 'lucide-react';
import { SINGLE_PLAN } from '@/lib/plans';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
  });

  const price = SINGLE_PLAN.monthlyPrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatação automática
    let formattedValue = value;
    
    if (name === 'cpf') {
      formattedValue = value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
    } else if (name === 'phone') {
      formattedValue = value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
    }
    
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Criar link de pagamento na Keoto
      const response = await fetch('/api/keoto/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar link de pagamento');
      }

      // Redirecionar para o link de pagamento da Keoto
      window.location.href = data.paymentLink;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      setError(error instanceof Error ? error.message : 'Erro ao processar pagamento. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/precos"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário de Checkout */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#00FF00]/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[#00FF00]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Checkout Seguro</h2>
                  <p className="text-sm text-gray-400">Pagamento via Keoto</p>
                </div>
              </div>

              {/* Informações sobre Keoto */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-300 font-semibold mb-1">Pagamento 100% Seguro</p>
                    <p className="text-gray-300">
                      Você será redirecionado para a plataforma Keoto para finalizar o pagamento de forma segura. 
                      Aceitamos cartão de crédito, débito e PIX.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome Completo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FF00] focus:border-transparent text-white placeholder-gray-500"
                  />
                </div>

                {/* E-mail */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FF00] focus:border-transparent text-white placeholder-gray-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Enviaremos a confirmação e acesso para este e-mail
                  </p>
                </div>

                {/* CPF */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    CPF *
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FF00] focus:border-transparent text-white placeholder-gray-500"
                  />
                </div>

                {/* Telefone (Opcional) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Telefone (Opcional)
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FF00] focus:border-transparent text-white placeholder-gray-500"
                  />
                </div>

                {/* Botão de Pagamento */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    loading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] shadow-lg shadow-[#00FF00]/20 hover:scale-105'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Criando link de pagamento...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-6 h-6" />
                      Ir para Pagamento - R$ {price.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Informações de Segurança */}
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#00FF00]" />
                    <span>Pagamento 100% seguro via Keoto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#00FF00]" />
                    <span>Seus dados são criptografados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF00]" />
                    <span>Acesso imediato após confirmação</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Métodos de Pagamento Aceitos */}
            <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-4 text-center">Métodos de Pagamento Aceitos</h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold">
                  💳 Cartão de Crédito
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold">
                  💳 Cartão de Débito
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold">
                  📱 PIX
                </div>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 sticky top-8">
              <h3 className="text-2xl font-bold mb-6">Resumo do Pedido</h3>

              {/* Plano Selecionado */}
              <div className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border border-[#00FF00]/30 rounded-xl p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{SINGLE_PLAN.name}</h4>
                    <p className="text-sm text-gray-400">{SINGLE_PLAN.description}</p>
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-[#00FF00] mb-2">
                  R$ {price.toFixed(2)}
                </div>
                
                <div className="text-sm text-gray-400">
                  por mês • renovação automática
                </div>
              </div>

              {/* O que está incluído */}
              <div className="mb-6">
                <h4 className="font-bold mb-4">O que está incluído:</h4>
                <ul className="space-y-3">
                  {SINGLE_PLAN.featuresList.slice(0, 6).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00FF00] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Garantia */}
              <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-8 h-8 text-blue-400" />
                  <h4 className="font-bold">Garantia de 7 Dias</h4>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Se não ficar satisfeito, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
                </p>
              </div>

              {/* Depoimentos Rápidos */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#00FF00] text-[#00FF00]" />
                  ))}
                  <span className="ml-2 text-sm font-semibold">4.9/5</span>
                </div>
                <p className="text-sm text-gray-400 italic">
                  "Melhor investimento que já fiz. Em 3 semanas estava livre do cigarro!" - Carlos S.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges de Segurança */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#00FF00]" />
            <span>SSL Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#00FF00]" />
            <span>Dados Protegidos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#00FF00]" />
            <span>Garantia de 7 dias</span>
          </div>
        </div>
      </main>
    </div>
  );
}
