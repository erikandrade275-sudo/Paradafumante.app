"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, Heart, ThumbsUp, MessageCircle, TrendingUp, Users, Award, Send, Loader2, Filter, Search } from 'lucide-react';

type Post = {
  id: string;
  author_name: string;
  content: string;
  days_smoke_free: number;
  likes: number;
  comments: number;
  created_at: string;
  category: 'vitoria' | 'desafio' | 'dica' | 'apoio';
};

const mockPosts: Post[] = [
  {
    id: '1',
    author_name: 'Carlos Silva',
    content: 'Hoje completo 30 dias sem fumar! Não acredito que consegui. Nos primeiros dias foi difícil, mas a comunidade me ajudou muito. Para quem está começando: vale a pena, persista! 💪',
    days_smoke_free: 30,
    likes: 127,
    comments: 23,
    created_at: '2024-01-15T10:30:00',
    category: 'vitoria'
  },
  {
    id: '2',
    author_name: 'Mariana Costa',
    content: 'Dica que me salvou hoje: quando bater aquela vontade, beba um copo de água gelada BEM devagar. Funciona! A vontade passa em 3-5 minutos. Testado e aprovado! 🥤',
    days_smoke_free: 15,
    likes: 89,
    comments: 15,
    created_at: '2024-01-15T09:15:00',
    category: 'dica'
  },
  {
    id: '3',
    author_name: 'Roberto Oliveira',
    content: 'Estou no dia 5 e hoje foi MUITO difícil. Tive uma discussão no trabalho e a primeira coisa que pensei foi fumar. Mas respirei fundo, saí para caminhar 10 minutos e a vontade passou. Pequenas vitórias! 🙏',
    days_smoke_free: 5,
    likes: 156,
    comments: 31,
    created_at: '2024-01-15T08:45:00',
    category: 'desafio'
  },
  {
    id: '4',
    author_name: 'Juliana Santos',
    content: 'Para quem está começando: os 3 primeiros dias são os mais difíceis FISICAMENTE. Depois disso, é tudo mental. Você consegue! Estamos juntos nessa! ❤️',
    days_smoke_free: 45,
    likes: 203,
    comments: 42,
    created_at: '2024-01-15T07:20:00',
    category: 'apoio'
  },
  {
    id: '5',
    author_name: 'Fernando Alves',
    content: '100 DIAS SEM FUMAR! 🎉 Economizei R$ 3.000 que usei para levar minha família para a praia. Meus filhos estão orgulhosos. Eu estou orgulhoso. VALE A PENA!',
    days_smoke_free: 100,
    likes: 342,
    comments: 67,
    created_at: '2024-01-14T18:30:00',
    category: 'vitoria'
  },
  {
    id: '6',
    author_name: 'Patrícia Lima',
    content: 'Alguém mais sentindo que o paladar voltou? Hoje comi uma laranja e parecia que estava provando pela primeira vez na vida! As pequenas alegrias de ser livre! 🍊',
    days_smoke_free: 21,
    likes: 178,
    comments: 28,
    created_at: '2024-01-14T16:10:00',
    category: 'vitoria'
  },
  {
    id: '7',
    author_name: 'André Souza',
    content: 'Dia 2 aqui. Não vou mentir, está difícil. Mas toda vez que penso em desistir, leio os posts de vocês e vejo que é possível. Obrigado por compartilharem suas histórias! 🙏',
    days_smoke_free: 2,
    likes: 94,
    comments: 19,
    created_at: '2024-01-14T14:45:00',
    category: 'apoio'
  },
  {
    id: '8',
    author_name: 'Camila Rodrigues',
    content: 'Dica prática: baixei um app de meditação e faço 5 minutos toda vez que bate a vontade. Mudou meu jogo! Ansiedade controlada e mente mais tranquila. Recomendo! 🧘‍♀️',
    days_smoke_free: 38,
    likes: 112,
    comments: 21,
    created_at: '2024-01-14T12:20:00',
    category: 'dica'
  }
];

export default function ComunidadePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

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
    setLoading(false);
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author_name: user?.email?.split('@')[0] || 'Você',
      content: newPost,
      days_smoke_free: 0,
      likes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      category: 'apoio'
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'todos' || post.category === selectedCategory;
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      vitoria: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      desafio: 'bg-orange-100 text-orange-800 border-orange-300',
      dica: 'bg-blue-100 text-blue-800 border-blue-300',
      apoio: 'bg-purple-100 text-purple-800 border-purple-300'
    };
    return colors[category as keyof typeof colors] || colors.apoio;
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      vitoria: '🎉 Vitória',
      desafio: '💪 Desafio',
      dica: '💡 Dica',
      apoio: '❤️ Apoio'
    };
    return labels[category as keyof typeof labels] || labels.apoio;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando comunidade...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar</span>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-emerald-600" />
                Comunidade Liberdade Total
              </h1>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xl">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10.247</div>
              <div className="text-emerald-100">Membros Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2.847</div>
              <div className="text-emerald-100">Histórias de Sucesso</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">94%</div>
              <div className="text-emerald-100">Taxa de Sucesso</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900">Categorias</h3>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'todos', label: '📋 Todos', count: posts.length },
                  { id: 'vitoria', label: '🎉 Vitórias', count: posts.filter(p => p.category === 'vitoria').length },
                  { id: 'desafio', label: '💪 Desafios', count: posts.filter(p => p.category === 'desafio').length },
                  { id: 'dica', label: '💡 Dicas', count: posts.filter(p => p.category === 'dica').length },
                  { id: 'apoio', label: '❤️ Apoio', count: posts.filter(p => p.category === 'apoio').length }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-100 text-emerald-900 font-semibold'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{cat.label}</span>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">{cat.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-yellow-600" />
                <h3 className="font-bold text-gray-900">Destaques da Semana</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Fernando Alves', days: 100, badge: '🏆' },
                  { name: 'Juliana Santos', days: 45, badge: '⭐' },
                  { name: 'Carlos Silva', days: 30, badge: '💎' }
                ].map((user, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{user.badge}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.days} dias livre</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* New Post */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">Compartilhe sua jornada</h3>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Como está sendo sua experiência? Compartilhe vitórias, desafios ou dicas..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                rows={4}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handlePostSubmit}
                  disabled={!newPost.trim()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    newPost.trim()
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  Publicar
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                        {post.author_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{post.author_name}</div>
                        <div className="text-sm text-gray-600">
                          {post.days_smoke_free > 0 && `${post.days_smoke_free} dias livre • `}
                          {new Date(post.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
                      {getCategoryLabel(post.category)}
                    </span>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {post.content}
                  </p>

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span className="font-semibold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-semibold">{post.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center shadow-lg">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum post encontrado</h3>
                <p className="text-gray-600">Tente ajustar os filtros ou seja o primeiro a postar!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
