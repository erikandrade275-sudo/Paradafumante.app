"use client";

import { ArrowLeft, Mail, Clock, HelpCircle, Send, Bot, User } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function SuportePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! 👋 Sou o assistente virtual do Parada Fumante. Como posso ajudar você hoje?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Adiciona mensagem do usuário
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      // Verifica se a resposta é JSON válida
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Resposta inválida do servidor');
      }

      const data = await response.json();

      if (data.message) {
        setMessages([...newMessages, { role: 'assistant', content: data.message }]);
      } else {
        setMessages([...newMessages, { 
          role: 'assistant', 
          content: 'Desculpe, ocorreu um erro. Por favor, entre em contato por email: suporte@paradafumante.com.br' 
        }]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Desculpe, estou com dificuldades técnicas no momento. Por favor, entre em contato por email: suporte@paradafumante.com.br. Nossa equipe responderá em até 24 horas! 😊' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00FF00]/20 rounded-2xl mb-6">
            <Bot className="w-8 h-8 text-[#00FF00]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Central de <span className="text-[#00FF00]">Suporte</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Converse com nosso assistente virtual com IA. Respostas instantâneas 24/7!
          </p>
        </div>

        {/* Chat Interface */}
        <div className="mb-16">
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            {/* Chat Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-[#00FF00]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-[#00FF00]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-[#00FF00] text-[#0D0D0D]'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-[#00FF00]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-[#00FF00]" />
                  </div>
                  <div className="bg-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua dúvida aqui..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF00]/50 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Canais de Contato Alternativos */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-[#00FF00]/20 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#00FF00]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Email</h3>
            <p className="text-gray-400 mb-4">
              Prefere email? Responderemos em até 24 horas
            </p>
            <a
              href="mailto:suporte@paradafumante.com.br"
              className="text-[#00FF00] hover:underline font-semibold"
            >
              suporte@paradafumante.com.br
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-[#00FF00]/20 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-[#00FF00]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Horário de Atendimento</h3>
            <p className="text-gray-400 mb-4">
              Atendimento humano disponível em
            </p>
            <p className="text-white font-semibold">
              Segunda a Sexta: 9h às 18h<br />
              Sábado: 9h às 13h
            </p>
          </div>
        </div>

        {/* FAQ Rápido */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Perguntas <span className="text-[#00FF00]">Frequentes</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                question: "Como funciona o período de teste?",
                answer: "7 dias de garantia com devolução de 100% do valor"
              },
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim! Sem taxas de cancelamento"
              },
              {
                question: "Meus dados estão seguros?",
                answer: "Sim! Criptografia de ponta e conformidade com LGPD"
              },
              {
                question: "Funciona em múltiplos dispositivos?",
                answer: "Sim! Sincronização automática entre todos os dispositivos"
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-[#00FF00] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
