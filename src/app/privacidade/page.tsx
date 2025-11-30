"use client";

import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PrivacidadePage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00FF00]/20 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-[#00FF00]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Política de <span className="text-[#00FF00]">Privacidade</span>
          </h1>
          <p className="text-gray-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        {/* Content */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">1. Introdução</h2>
            <p className="text-gray-300 leading-relaxed">
              A privacidade dos nossos usuários é extremamente importante para nós. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você usa o Parada Fumante.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">2. Informações que Coletamos</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Coletamos diferentes tipos de informações para fornecer e melhorar nosso serviço:
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-white">2.1 Informações Fornecidas por Você</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6">
              <li>Nome e email</li>
              <li>Informações de pagamento (processadas por terceiros seguros)</li>
              <li>Dados sobre seus hábitos de fumo (quantidade, frequência)</li>
              <li>Progresso e conquistas no aplicativo</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-white">2.2 Informações Coletadas Automaticamente</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Endereço IP e localização aproximada</li>
              <li>Tipo de dispositivo e navegador</li>
              <li>Páginas visitadas e tempo de uso</li>
              <li>Interações com o aplicativo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">3. Como Usamos Suas Informações</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Fornecer e manter nosso serviço</li>
              <li>Personalizar sua experiência no aplicativo</li>
              <li>Processar pagamentos e gerenciar assinaturas</li>
              <li>Enviar atualizações e mensagens motivacionais</li>
              <li>Melhorar nossos serviços e desenvolver novos recursos</li>
              <li>Detectar e prevenir fraudes ou abusos</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">4. Compartilhamento de Informações</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Não vendemos suas informações pessoais. Podemos compartilhar seus dados apenas nas seguintes situações:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Processadores de Pagamento:</strong> Para processar transações (Keoto, Stripe, etc.)</li>
              <li><strong>Provedores de Serviços:</strong> Empresas que nos ajudam a operar o serviço</li>
              <li><strong>Requisitos Legais:</strong> Quando exigido por lei ou ordem judicial</li>
              <li><strong>Proteção de Direitos:</strong> Para proteger nossos direitos, propriedade ou segurança</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">5. Segurança dos Dados</h2>
            <div className="bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-4">
                <li>Criptografia SSL/TLS para transmissão de dados</li>
                <li>Armazenamento seguro em servidores protegidos</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">6. Seus Direitos (LGPD)</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Acesso:</strong> Solicitar cópias de seus dados pessoais</li>
              <li><strong>Correção:</strong> Corrigir dados imprecisos ou incompletos</li>
              <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados</li>
              <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
              <li><strong>Revogação:</strong> Retirar consentimento a qualquer momento</li>
              <li><strong>Oposição:</strong> Opor-se ao processamento de seus dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">7. Cookies e Tecnologias Similares</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Utilizamos cookies e tecnologias similares para:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Manter você conectado</li>
              <li>Lembrar suas preferências</li>
              <li>Analisar o uso do aplicativo</li>
              <li>Personalizar conteúdo e anúncios</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Você pode controlar o uso de cookies através das configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">8. Retenção de Dados</h2>
            <p className="text-gray-300 leading-relaxed">
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei. Quando você cancela sua conta, seus dados são excluídos dentro de 90 dias, exceto informações que devemos manter por obrigações legais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">9. Menores de Idade</h2>
            <p className="text-gray-300 leading-relaxed">
              Nosso serviço não é destinado a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores. Se você é pai/mãe ou responsável e acredita que seu filho nos forneceu informações pessoais, entre em contato conosco.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">10. Alterações nesta Política</h2>
            <p className="text-gray-300 leading-relaxed">
              Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página e atualizando a data de "última atualização". Recomendamos revisar esta política periodicamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">11. Contato</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade ou quiser exercer seus direitos, entre em contato conosco:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-gray-300">
                <strong className="text-[#00FF00]">Email:</strong> privacidade@paradafumante.com.br<br />
                <strong className="text-[#00FF00]">DPO (Encarregado de Dados):</strong> dpo@paradafumante.com.br<br />
                <strong className="text-[#00FF00]">Horário:</strong> Segunda a Sexta, 9h às 18h
              </p>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#00FF00] hover:bg-[#00FF00]/90 text-[#0D0D0D] px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
          >
            Voltar para o Início
          </Link>
        </div>
      </div>
    </div>
  );
}
