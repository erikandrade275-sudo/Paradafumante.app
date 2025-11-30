"use client";

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Heart, 
  TrendingUp, 
  Award,
  MessageCircle,
  ArrowLeft,
  Send,
  ThumbsUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MotivacaoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    // Mock de posts da comunidade
    const mockPosts = [
      {
        id: 1,
        author: "João Silva",
        daysSmokeFree: 45,
        content: "45 dias sem fumar! Nunca pensei que conseguiria. A cada dia fica mais fácil. Obrigado pelo apoio de todos! 💪",
        likes: 23,
        timestamp: "2 horas atrás"
      },
      {
        id: 2,
        author: "Maria Santos",
        daysSmokeFree: 120,
        content: "4 meses livre! Minha saúde melhorou muito, não tenho mais falta de ar e economizei mais de R$ 1.500. Vale muito a pena!",
        likes: 45,
        timestamp: "5 horas atrás"
      },
      {
        id: 3,
        author: "Pedro Costa",
        daysSmokeFree: 7,
        content: "Primeira semana completa! Os primeiros dias foram difíceis, mas agora estou me sentindo mais confiante. Vamos juntos! 🎯",
        likes: 18,
        timestamp: "1 dia atrás"
      },
    ];
    setPosts(mockPosts);
  };

  const motivationalQuotes = [
    {
      category: "Força",
      icon: "💪",
      quote: "Você é mais forte que qualquer vício. Cada dia é uma vitória!",
      author: "Parada Fumante"
    },
    {
      category: "Saúde",
      icon: "❤️",
      quote: "Seu corpo está se recuperando a cada minuto. Continue firme!",
      author: "Parada Fumante"
    },
    {
      category: "Economia",
      icon: "💰",
      quote: "O dinheiro que você economiza pode realizar seus sonhos!",
      author: "Parada Fumante"
    },
    {
      category: "Inspiração",
      icon: "✨",
      quote: "Cada cigarro não fumado é um passo em direção à liberdade!",
      author: "Parada Fumante"
    },
  ];

  const tips = [
    {
      title: "Beba Água",
      description: "Mantenha-se hidratado. A água ajuda a eliminar toxinas e reduz a vontade de fumar.",
      icon: "💧"
    },
    {
      title: "Pratique Exercícios",
      description: "Atividade física libera endorfina e reduz o estresse, ajudando no processo.",
      icon: "🏃"
    },
    {
      title: "Evite Gatilhos",
      description: "Identifique situações que te fazem querer fumar e evite-as nos primeiros dias.",
      icon: "🚫"
    },
    {
      title: "Respire Fundo",
      description: "Quando sentir vontade, faça respirações profundas por 5 minutos.",
      icon: "🧘"
    },
  ];

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
              <Sparkles className="w-8 h-8 text-[#00FF00]" />
              <h1 className="text-2xl font-bold">Motivação & Comunidade</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Frases Motivacionais */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#00FF00]" />
            Mensagens Inspiradoras
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {motivationalQuotes.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border border-[#00FF00]/20 rounded-2xl p-6 hover:border-[#00FF00]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-lg mb-4 leading-relaxed">{item.quote}</p>
                <div className="text-sm text-gray-400">— {item.author}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Dicas Práticas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#00FF00]" />
            Dicas Práticas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comunidade */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-[#00FF00]" />
            Comunidade
          </h2>

          {/* Novo Post */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="font-bold mb-4">Compartilhe sua história</h3>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Como está sendo sua jornada? Compartilhe suas conquistas e desafios..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 mb-4 min-h-[100px] resize-none"
            />
            <button
              onClick={() => {
                if (newPost.trim()) {
                  alert('Funcionalidade de postagem será implementada com backend!');
                  setNewPost('');
                }
              }}
              className="bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Publicar
            </button>
          </div>

          {/* Posts da Comunidade */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold">{post.author}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Award className="w-4 h-4 text-[#00FF00]" />
                      <span>{post.daysSmokeFree} dias livre</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FF00] transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
