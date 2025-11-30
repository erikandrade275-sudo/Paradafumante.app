"use client";

import { useState, useEffect } from 'react';
import { 
  Calendar, 
  TrendingDown, 
  Heart, 
  Trophy, 
  DollarSign, 
  Cigarette,
  Clock,
  Target,
  Award,
  Sparkles,
  LogOut,
  Settings,
  MessageCircle,
  Crown,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getUser, hasActivePlan, getUserPlanType } from '@/lib/user';
import { PLANS, hasFeatureAccess } from '@/lib/plans';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [quitDate, setQuitDate] = useState<Date | null>(null);
  const [cigarettesPerDay, setCigarettesPerDay] = useState(20);
  const [pricePerPack, setPricePerPack] = useState(12);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState('Usuário');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userPlan, setUserPlan] = useState<'basico' | 'premium' | 'intensivo' | null>(null);

  useEffect(() => {
    loadUserData();
    
    // Verificar se veio de um pagamento bem-sucedido
    const paymentSuccess = searchParams.get('payment');
    if (paymentSuccess === 'success') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  const loadUserData = () => {
    try {
      // Carregar dados do usuário (plano)
      const user = getUser();
      if (user) {
        setUserName(user.name);
        setUserPlan(user.plan);
      }

      // Carregar dados salvos do localStorage
      const savedQuitDate = localStorage.getItem('quitDate');
      const savedCigarettesPerDay = localStorage.getItem('cigarettesPerDay');
      const savedPricePerPack = localStorage.getItem('pricePerPack');
      const savedUserName = localStorage.getItem('userName');
      
      if (savedQuitDate) setQuitDate(new Date(savedQuitDate));
      if (savedCigarettesPerDay) setCigarettesPerDay(Number(savedCigarettesPerDay));
      if (savedPricePerPack) setPricePerPack(Number(savedPricePerPack));
      if (savedUserName && !user) setUserName(savedUserName);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  const saveSettings = () => {
    if (quitDate) {
      localStorage.setItem('quitDate', quitDate.toISOString());
    }
    localStorage.setItem('cigarettesPerDay', cigarettesPerDay.toString());
    localStorage.setItem('pricePerPack', pricePerPack.toString());
    setShowSettings(false);
  };

  // Cálculos
  const calculateStats = () => {
    if (!quitDate) {
      return {
        daysSmokeFree: 0,
        cigarettesAvoided: 0,
        moneySaved: 0,
        healthProgress: 0,
        lifeRegained: 0
      };
    }

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - quitDate.getTime());
    const daysSmokeFree = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const cigarettesAvoided = daysSmokeFree * cigarettesPerDay;
    const packsSaved = cigarettesAvoided / 20;
    const moneySaved = packsSaved * pricePerPack;
    const healthProgress = Math.min((daysSmokeFree / 365) * 100, 100);
    const lifeRegained = Math.floor(cigarettesAvoided * 11 / 60); // 11 minutos por cigarro

    return {
      daysSmokeFree,
      cigarettesAvoided,
      moneySaved,
      healthProgress,
      lifeRegained
    };
  };

  const stats = calculateStats();

  // Badges e conquistas
  const badges = [
    { id: 1, name: "Primeiro Dia", icon: "🎯", unlocked: stats.daysSmokeFree >= 1, requirement: "1 dia livre" },
    { id: 2, name: "Uma Semana", icon: "⭐", unlocked: stats.daysSmokeFree >= 7, requirement: "7 dias livres" },
    { id: 3, name: "Um Mês", icon: "🏆", unlocked: stats.daysSmokeFree >= 30, requirement: "30 dias livres" },
    { id: 4, name: "Três Meses", icon: "💎", unlocked: stats.daysSmokeFree >= 90, requirement: "90 dias livres" },
    { id: 5, name: "Seis Meses", icon: "👑", unlocked: stats.daysSmokeFree >= 180, requirement: "180 dias livres" },
    { id: 6, name: "Um Ano", icon: "🎖️", unlocked: stats.daysSmokeFree >= 365, requirement: "365 dias livres" },
  ];

  // Mensagens motivacionais
  const motivationalMessages = [
    "Cada dia sem fumar é uma vitória! Continue firme! 💪",
    "Seu corpo está se recuperando a cada minuto. Você está incrível! 🌟",
    "O dinheiro que você está economizando pode realizar seus sonhos! 💰",
    "Sua saúde agradece cada decisão de não fumar. Parabéns! ❤️",
    "Você é mais forte que qualquer vício. Continue assim! 🔥",
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  // Verificar acesso a funcionalidades
  const canAccessCommunity = userPlan && hasFeatureAccess(userPlan, 'community');
  const canAccessCoaching = userPlan && hasFeatureAccess(userPlan, 'personalizedCoaching');
  const hasPrioritySupport = userPlan && hasFeatureAccess(userPlan, 'prioritySupport');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-[#00FF00] text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Cigarette className="w-8 h-8 text-[#00FF00]" />
              <h1 className="text-2xl font-bold">Parada <span className="text-[#00FF00]">Fumante</span></h1>
            </Link>
            <div className="flex items-center gap-4">
              {userPlan && (
                <div className="hidden sm:flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/30 px-4 py-2 rounded-lg">
                  <Crown className="w-4 h-4 text-[#00FF00]" />
                  <span className="text-sm font-semibold text-[#00FF00]">
                    Plano {PLANS[userPlan].name}
                  </span>
                </div>
              )}
              <Link
                href="/motivacao"
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                title="Motivação"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link
                href="/configuracoes"
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                title="Configurações"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mensagem de Sucesso do Pagamento */}
        {showSuccessMessage && (
          <div className="mb-8 bg-gradient-to-r from-[#00FF00]/20 to-transparent border border-[#00FF00]/40 rounded-2xl p-6 animate-in fade-in slide-in-from-top">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-[#00FF00] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">🎉 Pagamento Confirmado!</h3>
                <p className="text-gray-300 mb-3">
                  Seu plano {userPlan && PLANS[userPlan].name} está ativo! Todas as funcionalidades foram liberadas.
                </p>
                <p className="text-sm text-gray-400">
                  Verifique seu e-mail para instruções detalhadas e materiais exclusivos.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem de Boas-vindas */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Olá, {userName}! 👋</h2>
          <p className="text-gray-400">
            Acompanhe seu progresso e conquistas
            {userPlan && ` • Plano ${PLANS[userPlan].name} ativo`}
          </p>
        </div>

        {/* Upgrade Banner (se não tiver plano) */}
        {!userPlan && (
          <div className="mb-8 bg-gradient-to-r from-[#00FF00]/10 to-transparent border border-[#00FF00]/30 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <Crown className="w-8 h-8 text-[#00FF00] flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Desbloqueie Todo o Potencial</h3>
                <p className="text-gray-300 mb-4">
                  Acesse coaching personalizado, comunidade exclusiva, suporte prioritário e muito mais!
                </p>
                <Link
                  href="/precos"
                  className="inline-flex items-center gap-2 bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-6 py-3 rounded-lg font-bold transition-all duration-300"
                >
                  Ver Planos
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#00FF00]" />
              Configurações Rápidas
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Data que parou de fumar</label>
                <input
                  type="date"
                  value={quitDate ? quitDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setQuitDate(new Date(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cigarros por dia (antes)</label>
                <input
                  type="number"
                  value={cigarettesPerDay}
                  onChange={(e) => setCigarettesPerDay(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Preço por maço (R$)</label>
                <input
                  type="number"
                  value={pricePerPack}
                  onChange={(e) => setPricePerPack(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={saveSettings}
                  className="flex-1 bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] py-3 rounded-lg font-bold transition-colors"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-bold transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem Motivacional */}
        <div className="mb-8 bg-gradient-to-r from-[#00FF00]/10 to-transparent border border-[#00FF00]/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-[#00FF00] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">Mensagem do Dia</h3>
              <p className="text-gray-300">{randomMessage}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {!quitDate && (
          <div className="mb-8 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-2xl p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#00FF00]" />
              Configure sua jornada
            </h3>
            <p className="text-gray-300 mb-4">Defina a data em que você parou de fumar para começar a acompanhar seu progresso!</p>
            <button
              onClick={() => setShowSettings(true)}
              className="bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Configurar Agora
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <Calendar className="w-8 h-8 text-[#00FF00] mb-4" />
            <div className="text-4xl font-bold text-[#00FF00] mb-2">{stats.daysSmokeFree}</div>
            <div className="text-gray-400 text-sm">Dias Livre do Cigarro</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <TrendingDown className="w-8 h-8 text-[#00FF00] mb-4" />
            <div className="text-4xl font-bold text-[#00FF00] mb-2">{stats.cigarettesAvoided}</div>
            <div className="text-gray-400 text-sm">Cigarros Não Fumados</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <DollarSign className="w-8 h-8 text-[#00FF00] mb-4" />
            <div className="text-4xl font-bold text-[#00FF00] mb-2">R$ {stats.moneySaved.toFixed(2)}</div>
            <div className="text-gray-400 text-sm">Dinheiro Economizado</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <Clock className="w-8 h-8 text-[#00FF00] mb-4" />
            <div className="text-4xl font-bold text-[#00FF00] mb-2">{stats.lifeRegained}h</div>
            <div className="text-gray-400 text-sm">Vida Recuperada</div>
          </div>
        </div>

        {/* Health Progress */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-[#00FF00]" />
            <h3 className="text-xl font-bold">Recuperação da Saúde</h3>
            {userPlan && hasFeatureAccess(userPlan, 'advancedHealthTracking') && (
              <span className="text-xs bg-[#00FF00]/20 text-[#00FF00] px-2 py-1 rounded-full">
                Avançado
              </span>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progresso Geral</span>
                <span className="text-[#00FF00] font-bold">{stats.healthProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#00FF00] to-[#00FF00]/70 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${stats.healthProgress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                { milestone: "20 minutos", benefit: "Pressão arterial normaliza", achieved: stats.daysSmokeFree >= 0 },
                { milestone: "12 horas", benefit: "Nível de CO no sangue normaliza", achieved: stats.daysSmokeFree >= 1 },
                { milestone: "2 semanas", benefit: "Circulação melhora", achieved: stats.daysSmokeFree >= 14 },
                { milestone: "1 mês", benefit: "Função pulmonar melhora", achieved: stats.daysSmokeFree >= 30 },
                { milestone: "3 meses", benefit: "Risco de infarto reduz", achieved: stats.daysSmokeFree >= 90 },
                { milestone: "1 ano", benefit: "Risco de doença cardíaca cai 50%", achieved: stats.daysSmokeFree >= 365 },
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl border ${
                    item.achieved 
                      ? 'bg-[#00FF00]/10 border-[#00FF00]/30' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {item.achieved ? (
                      <Trophy className="w-5 h-5 text-[#00FF00]" />
                    ) : (
                      <Target className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="font-bold text-sm">{item.milestone}</span>
                  </div>
                  <p className="text-sm text-gray-400">{item.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges e Conquistas */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-[#00FF00]" />
            <h3 className="text-xl font-bold">Conquistas</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                  badge.unlocked
                    ? 'bg-[#00FF00]/10 border-[#00FF00]/30 hover:scale-105'
                    : 'bg-white/5 border-white/10 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="font-bold text-sm mb-1">{badge.name}</div>
                <div className="text-xs text-gray-400">{badge.requirement}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/motivacao"
            className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border border-[#00FF00]/20 rounded-2xl p-6 hover:border-[#00FF00]/40 transition-all duration-300 group"
          >
            <MessageCircle className="w-8 h-8 text-[#00FF00] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Motivação & Comunidade</h3>
            <p className="text-gray-400 text-sm">Mensagens inspiradoras e histórias de sucesso</p>
            {canAccessCommunity && (
              <span className="inline-block mt-3 text-xs bg-[#00FF00]/20 text-[#00FF00] px-2 py-1 rounded-full">
                Acesso Premium
              </span>
            )}
          </Link>

          {canAccessCoaching ? (
            <Link
              href="/coaching"
              className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 group"
            >
              <Crown className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Coaching Personalizado</h3>
              <p className="text-gray-400 text-sm">Orientação exclusiva para sua jornada</p>
              <span className="inline-block mt-3 text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                Seu Plano
              </span>
            </Link>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="relative">
                <Lock className="w-8 h-8 text-gray-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-400">Coaching Personalizado</h3>
                <p className="text-gray-500 text-sm mb-4">Disponível nos planos Premium e Intensivo</p>
                <Link
                  href="/precos"
                  className="inline-block text-sm text-[#00FF00] hover:underline"
                >
                  Fazer upgrade →
                </Link>
              </div>
            </div>
          )}

          <Link
            href="/configuracoes"
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            <Settings className="w-8 h-8 text-[#00FF00] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Configurações</h3>
            <p className="text-gray-400 text-sm">Personalize sua experiência no app</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
