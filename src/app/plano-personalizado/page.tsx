"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Shield, Clock, Users, Star, TrendingUp, Heart, Zap } from 'lucide-react';

type QuizAnswer = {
  questionId: string;
  answer: string | string[];
};

export default function PlanoPersonalizadoPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (!savedAnswers) {
      router.push('/quiz');
      return;
    }
    setAnswers(JSON.parse(savedAnswers));
    setLoading(false);
  }, [router]);

  const getPersonalizedInsights = () => {
    const yearsSmokingAnswer = answers.find(a => a.questionId === 'years_smoking')?.answer as string;
    const cigarettesAnswer = answers.find(a => a.questionId === 'cigarettes_per_day')?.answer as string;
    const attemptsAnswer = answers.find(a => a.questionId === 'previous_attempts')?.answer as string;
    const motivationAnswer = answers.find(a => a.questionId === 'main_motivation')?.answer as string;

    let severity = 'moderado';
    if (yearsSmokingAnswer?.includes('Mais de 20') || cigarettesAnswer?.includes('Mais de 40')) {
      severity = 'alto';
    } else if (yearsSmokingAnswer?.includes('Menos de 1') || cigarettesAnswer?.includes('Menos de 10')) {
      severity = 'baixo';
    }

    return { severity, yearsSmokingAnswer, cigarettesAnswer, attemptsAnswer, motivationAnswer };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu plano...</p>
        </div>
      </div>
    );
  }

  const insights = getPersonalizedInsights();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold mb-6 animate-pulse">
            <Zap className="w-5 h-5" />
            SEU PLANO ESTÁ PRONTO!
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Seu Plano Personalizado de Liberdade
          </h1>
          <p className="text-xl sm:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Baseado nas suas respostas, criamos um protocolo específico para o SEU perfil
          </p>
        </div>
      </section>

      {/* Análise Personalizada */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              📊 Análise do Seu Perfil
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Seu Histórico</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Tempo fumando: <span className="font-semibold">{insights.yearsSmokingAnswer}</span></li>
                  <li>• Consumo diário: <span className="font-semibold">{insights.cigarettesAnswer}</span></li>
                  <li>• Tentativas anteriores: <span className="font-semibold">{insights.attemptsAnswer}</span></li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Sua Motivação</h3>
                <p className="text-gray-700 mb-3">
                  Principal razão: <span className="font-semibold">{insights.motivationAnswer}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Vamos usar isso como combustível para sua jornada!
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
              <h3 className="font-bold text-xl mb-3">🎯 Seu Nível de Desafio: {insights.severity.toUpperCase()}</h3>
              <p className="text-emerald-100 leading-relaxed">
                {insights.severity === 'alto' && 
                  "Seu caso requer atenção especial, mas temos casos de sucesso de pessoas com perfil idêntico ao seu. O método foi desenhado exatamente para situações como a sua."}
                {insights.severity === 'moderado' && 
                  "Você está na média dos nossos alunos. Com o método correto, você terá resultados excelentes nos primeiros 14 dias."}
                {insights.severity === 'baixo' && 
                  "Você tem grandes chances de sucesso rápido! Seu perfil indica que você pode eliminar a vontade de fumar em menos de 10 dias."}
              </p>
            </div>
          </div>

          {/* O Que Você Vai Receber */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🎁 O Que Você Vai Receber
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Protocolo de 21 Dias",
                  description: "Passo a passo diário com técnicas específicas para eliminar a vontade de fumar"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Comunidade Exclusiva",
                  description: "Acesso ao grupo privado com 10.247 pessoas na mesma jornada"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Acompanhamento Diário",
                  description: "Sistema de tracking que mostra sua evolução, economia e conquistas"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Técnicas Anti-Recaída",
                  description: "Estratégias comprovadas para lidar com gatilhos e momentos difíceis"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Garantia de 30 Dias",
                  description: "Dinheiro de volta se não ficar satisfeito, sem perguntas"
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: "Suporte Prioritário",
                  description: "Tire dúvidas e receba orientação quando precisar"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Planos de Pagamento */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              💳 Escolha Seu Plano
            </h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Investimento menor que 1 mês de cigarro para se libertar para sempre
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Plano Mensal */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-6 text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">Plano Mensal</h3>
                  <p className="text-gray-200">Acesso completo por 1 mês</p>
                </div>
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      R$ 97
                      <span className="text-xl text-gray-600">/mês</span>
                    </div>
                    <p className="text-sm text-gray-600">ou 12x de R$ 9,70</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Acesso ao método completo',
                      'Comunidade exclusiva',
                      'Acompanhamento diário',
                      'Suporte prioritário',
                      'Garantia de 30 dias'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/checkout"
                    className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-center"
                  >
                    Começar Agora
                  </Link>
                </div>
              </div>

              {/* Plano Anual - DESTAQUE */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-emerald-600 relative hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg z-10">
                  🔥 MAIS POPULAR - 70% OFF
                </div>
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center mt-4">
                  <h3 className="text-2xl font-bold mb-2">Plano Anual</h3>
                  <p className="text-emerald-100">Acesso completo por 12 meses</p>
                </div>
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-gray-500 line-through text-xl mb-1">R$ 1.164</div>
                    <div className="text-5xl font-bold text-emerald-600 mb-2">
                      R$ 347
                      <span className="text-xl text-gray-600">/ano</span>
                    </div>
                    <p className="text-sm text-gray-600">ou 12x de R$ 34,70</p>
                    <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold mt-3">
                      Economize R$ 817
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Acesso ao método completo',
                      'Comunidade exclusiva',
                      'Acompanhamento diário',
                      'Suporte prioritário VIP',
                      'Garantia de 30 dias',
                      '🎁 Bônus: Guia Anti-Recaída',
                      '🎁 Bônus: Masterclass Exclusiva'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/checkout"
                    className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                  >
                    Garantir 70% de Desconto
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Comparação de Economia */}
            <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                💰 Compare: Cigarro vs. Liberdade
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-bold text-lg text-red-600 mb-4">Continuar Fumando</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 1 mês: <span className="font-bold text-red-600">R$ 450</span></li>
                    <li>• 6 meses: <span className="font-bold text-red-600">R$ 2.700</span></li>
                    <li>• 1 ano: <span className="font-bold text-red-600">R$ 5.400</span></li>
                    <li className="pt-2 text-sm text-gray-600">+ Risco de doenças graves</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-500">
                  <h4 className="font-bold text-lg text-emerald-600 mb-4">Investir na Liberdade</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Plano Anual: <span className="font-bold text-emerald-600">R$ 347</span></li>
                    <li>• Economia em 1 ano: <span className="font-bold text-emerald-600">R$ 5.053</span></li>
                    <li>• ROI: <span className="font-bold text-emerald-600">1.456%</span></li>
                    <li className="pt-2 text-sm text-emerald-700 font-semibold">+ Saúde + Liberdade + Vida</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Garantia */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 sm:p-12 border-4 border-emerald-500 text-center mb-12">
            <Shield className="w-20 h-20 text-emerald-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Garantia Blindada de 30 Dias
            </h3>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Teste o método por 30 dias completos. Se não ficar satisfeito, devolvemos <span className="font-bold text-emerald-600">100% do seu dinheiro</span>. Sem perguntas, sem burocracia.
            </p>
          </div>

          {/* CTA Final */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full font-bold mb-6 animate-pulse">
              <Clock className="w-5 h-5" />
              ÚLTIMAS VAGAS DESTA SEMANA
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Pronto Para Começar Sua Jornada?
            </h3>
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110"
            >
              GARANTIR MINHA LIBERDADE AGORA
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="mt-6 text-gray-600">
              🔒 Pagamento 100% seguro • Acesso imediato
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
