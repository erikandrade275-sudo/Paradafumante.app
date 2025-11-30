"use client";

import { useState, useEffect } from 'react';
import { Cigarette, TrendingDown, Heart, Trophy, Calendar, Target, Sparkles, ArrowRight, CheckCircle, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function AppPage() {
  const [mounted, setMounted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showPlan, setShowPlan] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const quizQuestions = [
    {
      id: 0,
      question: "Há quanto tempo você fuma?",
      options: [
        "Menos de 1 ano",
        "1-5 anos",
        "5-10 anos",
        "Mais de 10 anos"
      ]
    },
    {
      id: 1,
      question: "Quantos cigarros você fuma por dia?",
      options: [
        "Menos de 10",
        "10-20",
        "20-30",
        "Mais de 30"
      ]
    },
    {
      id: 2,
      question: "Qual sua principal motivação para parar?",
      options: [
        "Saúde",
        "Economia",
        "Família",
        "Qualidade de vida"
      ]
    },
    {
      id: 3,
      question: "Já tentou parar antes?",
      options: [
        "Nunca tentei",
        "Sim, 1-2 vezes",
        "Sim, 3-5 vezes",
        "Sim, mais de 5 vezes"
      ]
    },
    {
      id: 4,
      question: "Qual seu maior desafio?",
      options: [
        "Ansiedade",
        "Situações sociais",
        "Estresse",
        "Hábito/rotina"
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowPlan(true);
    }
  };

  const generatePersonalizedPlan = () => {
    const intensity = answers[1]?.includes("Mais de 30") || answers[0]?.includes("Mais de 10") 
      ? "intensivo" 
      : answers[1]?.includes("Menos de 10") 
      ? "moderado" 
      : "padrão";

    return {
      intensity,
      features: [
        "Dashboard completo com estatísticas em tempo real",
        "Sistema de conquistas e gamificação personalizado",
        "Mensagens motivacionais diárias",
        "Calculadora de economia e saúde",
        "Comunidade de apoio exclusiva",
        "Acompanhamento de marcos de saúde",
        intensity === "intensivo" ? "Suporte prioritário 24/7" : "Suporte por email",
        intensity === "intensivo" ? "Sessões de coaching personalizadas" : "Dicas personalizadas"
      ]
    };
  };

  if (!mounted) return null;

  if (showQuiz && !showPlan) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Quiz Personalizado</h2>
                <span className="text-[#00FF00] font-bold">
                  {currentQuestion + 1}/{quizQuestions.length}
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 mb-8">
                <div 
                  className="bg-[#00FF00] h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6">
              {quizQuestions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 bg-white/5 hover:bg-[#00FF00]/10 border border-white/10 hover:border-[#00FF00]/30 rounded-xl transition-all duration-300 group"
                >
                  <span className="text-lg group-hover:text-[#00FF00] transition-colors">
                    {option}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowQuiz(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}
              className="mt-8 text-gray-400 hover:text-white transition-colors"
            >
              ← Voltar ao início
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showPlan) {
    const plan = generatePersonalizedPlan();
    
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border border-[#00FF00]/30 rounded-3xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF00]/20 rounded-full mb-6">
                <Sparkles className="w-10 h-10 text-[#00FF00]" />
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Seu Plano <span className="text-[#00FF00]">Personalizado</span>
              </h2>
              <p className="text-xl text-gray-400">
                Baseado nas suas respostas, criamos o plano perfeito para você
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-[#00FF00]" />
                <h3 className="text-2xl font-bold">Plano {plan.intensity.charAt(0).toUpperCase() + plan.intensity.slice(1)}</h3>
              </div>

              <div className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00FF00] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="https://checkout.keoto.com/fa1ebae4-f355-473f-be79-8a6c2f6b985b"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] text-center py-5 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#00FF00]/20"
              >
                Aceitar Plano e Começar Agora
              </a>
              
              <button
                onClick={() => {
                  setShowPlan(false);
                  setShowQuiz(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-semibold transition-colors"
              >
                Refazer Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF00]/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/30 px-6 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-[#00FF00]" />
              <span className="text-[#00FF00] text-sm font-semibold">Método Científico Comprovado</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
              Parada <span className="text-[#00FF00]">Fumante</span>
              <span className="block mt-4 text-3xl sm:text-4xl text-gray-400 font-normal">
                Sua jornada para uma vida livre do cigarro
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Acompanhe seu progresso, economize dinheiro e recupere sua saúde com o app mais completo para parar de fumar
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => setShowQuiz(true)}
                className="group bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-10 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-lg shadow-[#00FF00]/20"
              >
                Fazer Quiz Personalizado
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/"
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center gap-3"
              >
                Voltar para Página Inicial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Preço em Destaque */}
            <div className="pt-8">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-8 py-4 rounded-2xl">
                <span className="text-gray-400">Apenas</span>
                <span className="text-3xl font-bold text-[#00FF00]">R$ 39,90</span>
                <span className="text-gray-400">/mês</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                label: "Dias Livre",
                value: "0",
                color: "#00FF00"
              },
              {
                icon: TrendingDown,
                label: "Cigarros Não Fumados",
                value: "0",
                color: "#00FF00"
              },
              {
                icon: Heart,
                label: "Saúde Recuperada",
                value: "0%",
                color: "#00FF00"
              },
              {
                icon: Trophy,
                label: "Economia Total",
                value: "R$ 0",
                color: "#00FF00"
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <stat.icon className="w-8 h-8 mb-4" style={{ color: stat.color }} />
                <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Por que escolher o <span className="text-[#00FF00]">Parada Fumante</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ferramentas poderosas para te ajudar em cada etapa da sua jornada
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Dashboard Completo",
                description: "Acompanhe seu progresso em tempo real com estatísticas detalhadas e motivadoras"
              },
              {
                icon: Trophy,
                title: "Sistema de Conquistas",
                description: "Ganhe badges e recompensas conforme atinge seus marcos importantes"
              },
              {
                icon: Heart,
                title: "Saúde em Foco",
                description: "Veja como seu corpo se recupera dia após dia sem o cigarro"
              },
              {
                icon: TrendingDown,
                title: "Economia Visível",
                description: "Calcule quanto dinheiro você está economizando ao parar de fumar"
              },
              {
                icon: Calendar,
                title: "Calendário de Progresso",
                description: "Visualize sua jornada e mantenha sua motivação sempre alta"
              },
              {
                icon: Sparkles,
                title: "Mensagens Motivacionais",
                description: "Receba dicas e motivação diária para te manter no caminho certo"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#00FF00]/30 transition-all duration-300 group">
                <div className="bg-[#00FF00]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00FF00]/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-[#00FF00]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border border-[#00FF00]/20 rounded-3xl p-12">
            <Cigarette className="w-16 h-16 text-[#00FF00] mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Pronto para começar sua transformação?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já conquistaram sua liberdade do cigarro
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowQuiz(true)}
                className="inline-flex items-center gap-3 bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-12 py-5 rounded-lg text-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#00FF00]/20"
              >
                Começar Minha Jornada
                <ArrowRight className="w-6 h-6" />
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white px-12 py-5 rounded-lg text-xl font-semibold transition-all duration-300"
              >
                Voltar para Página Inicial
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
