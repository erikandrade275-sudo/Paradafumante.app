"use client";

import { useState } from 'react';
import { 
  Cigarette, 
  TrendingDown, 
  Heart, 
  Trophy, 
  Calendar, 
  Target, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Users,
  Shield,
  Zap,
  Clock,
  DollarSign,
  ChevronDown,
  X,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function VendasPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const testimonials = [
    {
      name: "Maria Silva",
      age: 42,
      years: "15 anos fumando",
      text: "Depois de 15 anos fumando, finalmente consegui parar! O app me ajudou a visualizar meu progresso e me manteve motivada todos os dias.",
      rating: 5,
      days: 127
    },
    {
      name: "João Santos",
      age: 35,
      years: "10 anos fumando",
      text: "Já tinha tentado parar 5 vezes antes. Com o Parada Fumante, consegui! O sistema de conquistas me manteve focado.",
      rating: 5,
      days: 89
    },
    {
      name: "Ana Costa",
      age: 28,
      years: "8 anos fumando",
      text: "Ver quanto dinheiro eu estava economizando foi o que me motivou. Já economizei mais de R$ 2.000!",
      rating: 5,
      days: 156
    }
  ];

  const faqs = [
    {
      question: "Como funciona o método?",
      answer: "Nosso método combina acompanhamento diário, gamificação, suporte motivacional e visualização de progresso. Você define sua data de parada e o app te guia em cada etapa da jornada."
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "Os primeiros benefícios aparecem em 20 minutos após parar de fumar! Seu corpo começa a se recuperar imediatamente, e você pode acompanhar cada melhoria no app."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim! Você pode cancelar sua assinatura a qualquer momento, sem taxas ou multas. Acreditamos que você deve ter total controle."
    },
    {
      question: "O app funciona offline?",
      answer: "Sim! Você pode acompanhar seu progresso e acessar mensagens motivacionais mesmo sem internet. Os dados são sincronizados quando você se conectar novamente."
    },
    {
      question: "Tem garantia?",
      answer: "Sim! Oferecemos 7 dias de garantia. Se não ficar satisfeito, devolvemos 100% do seu dinheiro, sem perguntas."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Saúde Recuperada",
      description: "Acompanhe em tempo real como seu corpo se recupera dia após dia",
      stats: "20min após parar: pressão normaliza"
    },
    {
      icon: DollarSign,
      title: "Economia Real",
      description: "Veja quanto dinheiro você está economizando e planeje seus sonhos",
      stats: "Média de R$ 450/mês economizados"
    },
    {
      icon: Trophy,
      title: "Conquistas Diárias",
      description: "Sistema de gamificação que torna sua jornada mais motivadora",
      stats: "15+ badges para desbloquear"
    },
    {
      icon: Users,
      title: "Comunidade de Apoio",
      description: "Conecte-se com pessoas que estão na mesma jornada que você",
      stats: "10.000+ membros ativos"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Config Button - Fixed */}
      <Link
        href="/config"
        className="fixed top-6 right-6 z-50 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 p-3 rounded-xl transition-all duration-300 hover:scale-105 group"
        title="Configurações"
      >
        <Settings className="w-6 h-6 text-gray-400 group-hover:text-[#00FF00] transition-colors" />
      </Link>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF00]/10 via-[#00FF00]/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#00FF00]/10 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/30 px-6 py-2 rounded-full animate-pulse">
              <Sparkles className="w-4 h-4 text-[#00FF00]" />
              <span className="text-[#00FF00] text-sm font-semibold">Mais de 10.000 pessoas já pararam de fumar</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
              Pare de Fumar em
              <span className="block mt-2 text-[#00FF00]">30 Dias ou Menos</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Método científico comprovado que já ajudou milhares de pessoas a conquistarem sua liberdade do cigarro
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/app"
                className="group bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-12 py-5 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-2xl shadow-[#00FF00]/30"
              >
                Começar Agora
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-12">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00FF00]" />
                <span className="text-gray-400 text-sm">Garantia de 7 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00FF00]" />
                <span className="text-gray-400 text-sm">10.000+ usuários</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#00FF00] fill-[#00FF00]" />
                <span className="text-gray-400 text-sm">4.9/5 estrelas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Usuários Ativos", value: "10.000+", icon: Users },
              { label: "Taxa de Sucesso", value: "87%", icon: Trophy },
              { label: "Economia Média", value: "R$ 5.400", icon: DollarSign },
              { label: "Dias Livres", value: "2.5M+", icon: Calendar }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
                <stat.icon className="w-10 h-10 text-[#00FF00] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#00FF00] mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Por que <span className="text-[#00FF00]">Funciona</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Método baseado em ciência e psicologia comportamental
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-[#00FF00]/30 transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="bg-[#00FF00]/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#00FF00]/20 transition-colors">
                    <benefit.icon className="w-8 h-8 text-[#00FF00]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{benefit.description}</p>
                    <div className="inline-flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/30 px-4 py-2 rounded-lg">
                      <Zap className="w-4 h-4 text-[#00FF00]" />
                      <span className="text-[#00FF00] text-sm font-semibold">{benefit.stats}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Como <span className="text-[#00FF00]">Funciona</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              3 passos simples para sua liberdade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Defina Sua Data",
                description: "Escolha o dia que você vai parar de fumar e configure seu perfil personalizado",
                icon: Calendar
              },
              {
                step: "2",
                title: "Acompanhe Diariamente",
                description: "Use o dashboard para ver seu progresso, economia e recuperação da saúde em tempo real",
                icon: Target
              },
              {
                step: "3",
                title: "Conquiste Sua Liberdade",
                description: "Desbloqueie conquistas, economize dinheiro e recupere sua saúde dia após dia",
                icon: Trophy
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#00FF00] rounded-full flex items-center justify-center text-[#0D0D0D] font-bold text-xl shadow-lg shadow-[#00FF00]/30">
                    {step.step}
                  </div>
                  <step.icon className="w-12 h-12 text-[#00FF00] mb-6 mt-4" />
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-[#00FF00]/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Histórias de <span className="text-[#00FF00]">Sucesso</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Veja o que nossos usuários estão dizendo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#00FF00] fill-[#00FF00]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.years}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#00FF00] font-bold">{testimonial.days} dias</div>
                      <div className="text-xs text-gray-400">livre do cigarro</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="investimento" className="py-20 border-t border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Investimento na Sua <span className="text-[#00FF00]">Liberdade</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Um único plano completo com tudo que você precisa
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#00FF00]/10 to-transparent border-2 border-[#00FF00] rounded-3xl p-12 shadow-2xl shadow-[#00FF00]/20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#00FF00] text-[#0D0D0D] px-8 py-2 rounded-full text-sm font-bold shadow-lg">
                  PLANO COMPLETO
                </div>
              </div>
              
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold mb-6">Acesso Total</h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-6xl font-bold text-[#00FF00]">R$ 39,90</span>
                  <span className="text-2xl text-gray-400">/mês</span>
                </div>
                <p className="text-gray-400">Cancele quando quiser, sem multas</p>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  "Dashboard completo com estatísticas em tempo real",
                  "Sistema de conquistas e gamificação personalizado",
                  "Mensagens motivacionais diárias",
                  "Calculadora de economia e saúde",
                  "Comunidade de apoio exclusiva",
                  "Acompanhamento de marcos de saúde",
                  "Suporte por email",
                  "Dicas personalizadas baseadas no seu perfil",
                  "Acesso ilimitado a todos os recursos",
                  "Atualizações gratuitas"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#00FF00] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/app"
                className="block w-full text-center bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] py-6 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#00FF00]/30"
              >
                Começar Agora
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl">
              <Shield className="w-5 h-5 text-[#00FF00]" />
              <span className="text-gray-300">Garantia de 7 dias - Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Perguntas <span className="text-[#00FF00]">Frequentes</span>
            </h2>
            <p className="text-xl text-gray-400">
              Tire suas dúvidas sobre o Parada Fumante
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-bold pr-8">{faq.question}</span>
                  <div className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-6 h-6 text-[#00FF00]" />
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-[#00FF00]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border border-[#00FF00]/30 rounded-3xl p-12">
            <Cigarette className="w-20 h-20 text-[#00FF00] mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Sua Nova Vida Começa <span className="text-[#00FF00]">Agora</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já conquistaram sua liberdade do cigarro. Não deixe para amanhã o que pode mudar sua vida hoje.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/app"
                className="inline-flex items-center gap-3 bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-12 py-5 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#00FF00]/30"
              >
                Começar Minha Jornada
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00FF00]" />
                <span>Acesso imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00FF00]" />
                <span>Garantia de 7 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-[#00FF00]" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
