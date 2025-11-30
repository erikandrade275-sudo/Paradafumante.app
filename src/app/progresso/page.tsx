"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, Calendar, TrendingUp, Heart, Award, Target, Flame, DollarSign, Loader2 } from 'lucide-react';

export default function ProgressoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [quitDate, setQuitDate] = useState<Date | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/login');
      return;
    }

    setUser(session.user);
    
    // Verificar se existe data de início salva
    const savedDate = localStorage.getItem('quitDate');
    if (savedDate) {
      setQuitDate(new Date(savedDate));
    }
    
    setLoading(false);
  }

  const handleSetQuitDate = () => {
    const today = new Date();
    localStorage.setItem('quitDate', today.toISOString());
    setQuitDate(today);
  };

  const calculateStats = () => {
    if (!quitDate) return null;

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - quitDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    // Assumindo 1 maço por dia (R$ 15) e 20 cigarros por maço
    const cigarettesNotSmoked = diffDays * 20;
    const moneySaved = diffDays * 15;
    const lifeRegained = Math.floor(cigarettesNotSmoked * 11); // 11 minutos por cigarro

    return {
      days: diffDays,
      hours: diffHours,
      minutes: diffMinutes,
      cigarettesNotSmoked,
      moneySaved,
      lifeRegained: Math.floor(lifeRegained / 60), // em horas
    };
  };

  const stats = calculateStats();

  const achievements = [
    { id: 1, title: 'Primeiro Dia', description: '24 horas sem fumar', days: 1, icon: '🎯', unlocked: stats && stats.days >= 1 },
    { id: 2, title: 'Fim de Semana', description: '3 dias de liberdade', days: 3, icon: '🌟', unlocked: stats && stats.days >= 3 },
    { id: 3, title: 'Uma Semana', description: '7 dias sem cigarro', days: 7, icon: '🏆', unlocked: stats && stats.days >= 7 },
    { id: 4, title: 'Duas Semanas', description: '14 dias de conquista', days: 14, icon: '💪', unlocked: stats && stats.days >= 14 },
    { id: 5, title: 'Três Semanas', description: '21 dias de transformação', days: 21, icon: '🔥', unlocked: stats && stats.days >= 21 },
    { id: 6, title: 'Um Mês', description: '30 dias de liberdade', days: 30, icon: '👑', unlocked: stats && stats.days >= 30 },
    { id: 7, title: 'Dois Meses', description: '60 dias sem recaída', days: 60, icon: '💎', unlocked: stats && stats.days >= 60 },
    { id: 8, title: 'Três Meses', description: '90 dias de vitória', days: 90, icon: '🌈', unlocked: stats && stats.days >= 90 },
  ];

  const healthBenefits = [
    { time: '20 minutos', benefit: 'Pressão arterial e batimentos cardíacos voltam ao normal', achieved: stats && stats.minutes >= 20 },
    { time: '8 horas', benefit: 'Nível de oxigênio no sangue normaliza', achieved: stats && stats.hours >= 8 },
    { time: '24 horas', benefit: 'Risco de ataque cardíaco começa a diminuir', achieved: stats && stats.days >= 1 },
    { time: '48 horas', benefit: 'Terminações nervosas começam a se regenerar', achieved: stats && stats.days >= 2 },
    { time: '72 horas', benefit: 'Respiração fica mais fácil, pulmões começam a se limpar', achieved: stats && stats.days >= 3 },
    { time: '2 semanas', benefit: 'Circulação sanguínea melhora significativamente', achieved: stats && stats.days >= 14 },
    { time: '1 mês', benefit: 'Função pulmonar melhora em até 30%', achieved: stats && stats.days >= 30 },
    { time: '3 meses', benefit: 'Tosse e falta de ar diminuem drasticamente', achieved: stats && stats.days >= 90 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando seu progresso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!quitDate ? (
          /* Configuração Inicial */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comece Sua Jornada Agora!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Marque hoje como o primeiro dia da sua liberdade
              </p>
              <button
                onClick={handleSetQuitDate}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Iniciar Minha Jornada
              </button>
            </div>
          </div>
        ) : (
          /* Dashboard de Progresso */
          <>
            {/* Stats Principais */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-emerald-600" />
                  <span className="text-3xl font-bold text-emerald-600">{stats?.days}</span>
                </div>
                <h3 className="text-gray-900 font-semibold">Dias Livre</h3>
                <p className="text-sm text-gray-600">Parabéns pela sua conquista!</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-600">{stats?.cigarettesNotSmoked}</span>
                </div>
                <h3 className="text-gray-900 font-semibold">Cigarros Evitados</h3>
                <p className="text-sm text-gray-600">Que você não fumou</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <span className="text-3xl font-bold text-green-600">R$ {stats?.moneySaved}</span>
                </div>
                <h3 className="text-gray-900 font-semibold">Economizado</h3>
                <p className="text-sm text-gray-600">Dinheiro que você salvou</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                  <span className="text-3xl font-bold text-red-600">{stats?.lifeRegained}h</span>
                </div>
                <h3 className="text-gray-900 font-semibold">Vida Recuperada</h3>
                <p className="text-sm text-gray-600">Tempo de vida ganho</p>
              </div>
            </div>

            {/* Conquistas */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-900">Suas Conquistas</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                        : 'bg-gray-50 border-gray-200 opacity-50'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {achievement.unlocked && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <Flame className="w-4 h-4" />
                        Desbloqueado!
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Benefícios de Saúde */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">Benefícios de Saúde</h2>
              </div>
              <div className="space-y-4">
                {healthBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                      benefit.achieved
                        ? 'bg-emerald-50 border-2 border-emerald-300'
                        : 'bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      benefit.achieved ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}>
                      {benefit.achieved ? (
                        <Heart className="w-6 h-6 text-white" />
                      ) : (
                        <span className="text-white font-bold">?</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{benefit.time}</span>
                        {benefit.achieved && (
                          <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            ✓ Alcançado
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700">{benefit.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
