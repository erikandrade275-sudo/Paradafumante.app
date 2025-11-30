"use client";

import { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  Key,
  Globe,
  Shield,
  Zap,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface ConfigField {
  key: string;
  label: string;
  description: string;
  isSensitive: boolean;
  placeholder: string;
  icon: any;
}

export default function ConfigPage() {
  const [config, setConfig] = useState({
    app_url: '',
    resend_api_key: '',
    keoto_webhook_secret: '',
    openai_api_key: ''
  });

  const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const configFields: ConfigField[] = [
    {
      key: 'app_url',
      label: 'URL do Aplicativo',
      description: 'URL pública do seu aplicativo (ex: https://paradafumante.app)',
      isSensitive: false,
      placeholder: 'https://seu-dominio.com',
      icon: Globe
    },
    {
      key: 'resend_api_key',
      label: 'Resend API Key',
      description: 'Chave de API do Resend para envio de emails',
      isSensitive: true,
      placeholder: 're_xxxxxxxxxxxx',
      icon: Key
    },
    {
      key: 'keoto_webhook_secret',
      label: 'Keoto Webhook Secret',
      description: 'Secret para validação de webhooks do Keoto',
      isSensitive: true,
      placeholder: 'whsec_xxxxxxxxxxxx',
      icon: Shield
    },
    {
      key: 'openai_api_key',
      label: 'OpenAI API Key',
      description: 'Chave de API da OpenAI para funcionalidades de IA',
      isSensitive: true,
      placeholder: 'sk-xxxxxxxxxxxx',
      icon: Zap
    }
  ];

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('app_config')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao carregar configuração:', error);
        return;
      }

      if (data) {
        setConfig({
          app_url: data.app_url || '',
          resend_api_key: data.resend_api_key || '',
          keoto_webhook_secret: data.keoto_webhook_secret || '',
          openai_api_key: data.openai_api_key || ''
        });
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Validações básicas
      if (!config.app_url) {
        setMessage({ type: 'error', text: 'URL do aplicativo é obrigatória' });
        setLoading(false);
        return;
      }

      // Verificar se já existe configuração
      const { data: existing } = await supabase
        .from('app_config')
        .select('id')
        .single();

      if (existing) {
        // Atualizar configuração existente
        const { error } = await supabase
          .from('app_config')
          .update({
            ...config,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Criar nova configuração
        const { error } = await supabase
          .from('app_config')
          .insert([{
            ...config,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

        if (error) throw error;
      }

      setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
      
      // Atualizar variáveis de ambiente localmente
      if (typeof window !== 'undefined') {
        localStorage.setItem('app_config', JSON.stringify(config));
      }
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar configurações. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowSensitive = (key: string) => {
    setShowSensitive(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FF00] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para início
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#00FF00]/10 w-16 h-16 rounded-2xl flex items-center justify-center">
              <Settings className="w-8 h-8 text-[#00FF00]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Configurações</h1>
              <p className="text-gray-400 mt-1">Gerencie as variáveis de ambiente do seu aplicativo</p>
            </div>
          </div>
        </div>

        {/* Alert Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
            message.type === 'success' 
              ? 'bg-[#00FF00]/10 border-[#00FF00]/30 text-[#00FF00]' 
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-300">
              <p className="font-semibold mb-2">Sobre as variáveis de ambiente:</p>
              <ul className="space-y-1 text-blue-200">
                <li>• As configurações são armazenadas de forma segura no banco de dados</li>
                <li>• Você pode usar a URL da Lasy temporariamente até comprar seu domínio</li>
                <li>• Chaves sensíveis são criptografadas automaticamente</li>
                <li>• Após salvar, as variáveis estarão disponíveis para o aplicativo</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Configuration Form */}
        <div className="space-y-6">
          {configFields.map((field) => {
            const Icon = field.icon;
            const isVisible = showSensitive[field.key];
            
            return (
              <div key={field.key} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-[#00FF00]/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#00FF00]" />
                  </div>
                  <div className="flex-1">
                    <label className="text-lg font-bold block mb-1">
                      {field.label}
                    </label>
                    <p className="text-sm text-gray-400">{field.description}</p>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type={field.isSensitive && !isVisible ? 'password' : 'text'}
                    value={config[field.key as keyof typeof config]}
                    onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF00]/50 transition-colors"
                  />
                  {field.isSensitive && (
                    <button
                      type="button"
                      onClick={() => toggleShowSensitive(field.key)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00FF00] transition-colors"
                    >
                      {isVisible ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-[#00FF00]/30"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-[#0D0D0D] border-t-transparent rounded-full animate-spin"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar Configurações
              </>
            )}
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#00FF00]" />
            Precisa de ajuda?
          </h3>
          <div className="space-y-3 text-gray-400">
            <p>
              <strong className="text-white">URL do Aplicativo:</strong> Use a URL da Lasy temporariamente (ex: https://seu-projeto.lasy.app) ou configure seu domínio personalizado.
            </p>
            <p>
              <strong className="text-white">Resend API Key:</strong> Obtenha sua chave em{' '}
              <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:underline">
                resend.com
              </a>
            </p>
            <p>
              <strong className="text-white">OpenAI API Key:</strong> Crie sua chave em{' '}
              <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:underline">
                platform.openai.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
