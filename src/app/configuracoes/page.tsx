"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Palette,
  ArrowLeft,
  Save,
  Trash2,
  LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ConfiguracoesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Configurações
  const [quitDate, setQuitDate] = useState<string>('');
  const [cigarettesPerDay, setCigarettesPerDay] = useState(20);
  const [pricePerPack, setPricePerPack] = useState(12);
  const [notifications, setNotifications] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);

  useEffect(() => {
    checkUser();
    loadSettings();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = () => {
    const savedQuitDate = localStorage.getItem('quitDate');
    const savedCigarettesPerDay = localStorage.getItem('cigarettesPerDay');
    const savedPricePerPack = localStorage.getItem('pricePerPack');
    const savedNotifications = localStorage.getItem('notifications');
    const savedDailyReminders = localStorage.getItem('dailyReminders');
    const savedAchievementAlerts = localStorage.getItem('achievementAlerts');

    if (savedQuitDate) setQuitDate(new Date(savedQuitDate).toISOString().split('T')[0]);
    if (savedCigarettesPerDay) setCigarettesPerDay(Number(savedCigarettesPerDay));
    if (savedPricePerPack) setPricePerPack(Number(savedPricePerPack));
    if (savedNotifications) setNotifications(savedNotifications === 'true');
    if (savedDailyReminders) setDailyReminders(savedDailyReminders === 'true');
    if (savedAchievementAlerts) setAchievementAlerts(savedAchievementAlerts === 'true');
  };

  const saveSettings = () => {
    if (quitDate) {
      localStorage.setItem('quitDate', new Date(quitDate).toISOString());
    }
    localStorage.setItem('cigarettesPerDay', cigarettesPerDay.toString());
    localStorage.setItem('pricePerPack', pricePerPack.toString());
    localStorage.setItem('notifications', notifications.toString());
    localStorage.setItem('dailyReminders', dailyReminders.toString());
    localStorage.setItem('achievementAlerts', achievementAlerts.toString());
    
    alert('Configurações salvas com sucesso!');
  };

  const resetData = () => {
    if (confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
      localStorage.clear();
      alert('Dados resetados com sucesso!');
      router.push('/dashboard');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

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
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 text-[#00FF00]" />
              <h1 className="text-2xl font-bold">Configurações</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Perfil */}
        <section className="mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#00FF00]" />
              Perfil
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white opacity-50 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dados de Parada */}
        <section className="mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#00FF00]" />
              Dados de Parada
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Data que parou de fumar</label>
                <input
                  type="date"
                  value={quitDate}
                  onChange={(e) => setQuitDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cigarros por dia (antes de parar)</label>
                <input
                  type="number"
                  value={cigarettesPerDay}
                  onChange={(e) => setCigarettesPerDay(Number(e.target.value))}
                  min="1"
                  max="100"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Preço por maço (R$)</label>
                <input
                  type="number"
                  value={pricePerPack}
                  onChange={(e) => setPricePerPack(Number(e.target.value))}
                  min="1"
                  max="100"
                  step="0.5"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Notificações */}
        <section className="mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#00FF00]" />
              Notificações
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Notificações Gerais</div>
                  <div className="text-sm text-gray-400">Receber todas as notificações do app</div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications ? 'bg-[#00FF00]' : 'bg-white/10'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      notifications ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Lembretes Diários</div>
                  <div className="text-sm text-gray-400">Mensagens motivacionais diárias</div>
                </div>
                <button
                  onClick={() => setDailyReminders(!dailyReminders)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    dailyReminders ? 'bg-[#00FF00]' : 'bg-white/10'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      dailyReminders ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Alertas de Conquistas</div>
                  <div className="text-sm text-gray-400">Notificações ao desbloquear badges</div>
                </div>
                <button
                  onClick={() => setAchievementAlerts(!achievementAlerts)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    achievementAlerts ? 'bg-[#00FF00]' : 'bg-white/10'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      achievementAlerts ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Ações */}
        <section className="space-y-4">
          <button
            onClick={saveSettings}
            className="w-full bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar Configurações
          </button>

          <button
            onClick={resetData}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Resetar Todos os Dados
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sair da Conta
          </button>
        </section>
      </div>
    </div>
  );
}
