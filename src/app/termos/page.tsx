"use client";

import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermosPage() {
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
            <FileText className="w-8 h-8 text-[#00FF00]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Termos de <span className="text-[#00FF00]">Serviço</span>
          </h1>
          <p className="text-gray-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        {/* Content */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">1. Aceitação dos Termos</h2>
            <p className="text-gray-300 leading-relaxed">
              Ao acessar e usar o Parada Fumante, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nosso serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">2. Descrição do Serviço</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              O Parada Fumante é uma plataforma digital que oferece ferramentas e recursos para auxiliar pessoas que desejam parar de fumar. Nossos serviços incluem:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Dashboard de acompanhamento de progresso</li>
              <li>Sistema de conquistas e gamificação</li>
              <li>Calculadora de economia e benefícios à saúde</li>
              <li>Mensagens motivacionais diárias</li>
              <li>Comunidade de apoio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">3. Cadastro e Conta</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Para utilizar nossos serviços, você deve:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Ter pelo menos 18 anos de idade</li>
              <li>Fornecer informações precisas e completas durante o cadastro</li>
              <li>Manter a confidencialidade de sua senha</li>
              <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">4. Assinatura e Pagamento</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Nosso serviço opera sob modelo de assinatura mensal:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>O pagamento é processado mensalmente de forma automática</li>
              <li>Você pode cancelar sua assinatura a qualquer momento</li>
              <li>Oferecemos garantia de reembolso de 7 dias</li>
              <li>Não há taxas de cancelamento</li>
              <li>O acesso continua até o final do período pago</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">5. Uso Aceitável</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Você concorda em NÃO:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Usar o serviço para qualquer propósito ilegal</li>
              <li>Compartilhar sua conta com terceiros</li>
              <li>Tentar acessar áreas restritas do sistema</li>
              <li>Interferir no funcionamento do serviço</li>
              <li>Copiar, modificar ou distribuir nosso conteúdo sem autorização</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">6. Isenção de Responsabilidade Médica</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-yellow-500">IMPORTANTE:</strong> O Parada Fumante é uma ferramenta de apoio e motivação. Não somos um serviço médico e não fornecemos aconselhamento médico, diagnóstico ou tratamento. Sempre consulte um profissional de saúde qualificado antes de fazer mudanças significativas em sua saúde ou estilo de vida.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">7. Propriedade Intelectual</h2>
            <p className="text-gray-300 leading-relaxed">
              Todo o conteúdo, design, código, logotipos e materiais do Parada Fumante são de propriedade exclusiva da empresa e estão protegidos por leis de direitos autorais e propriedade intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">8. Modificações do Serviço</h2>
            <p className="text-gray-300 leading-relaxed">
              Reservamos o direito de modificar, suspender ou descontinuar qualquer parte do serviço a qualquer momento, com ou sem aviso prévio. Não seremos responsáveis por qualquer modificação, suspensão ou descontinuação do serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">9. Limitação de Responsabilidade</h2>
            <p className="text-gray-300 leading-relaxed">
              O Parada Fumante não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar nosso serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">10. Alterações nos Termos</h2>
            <p className="text-gray-300 leading-relaxed">
              Podemos atualizar estes termos periodicamente. Notificaremos você sobre mudanças significativas por email ou através de um aviso em nosso site. O uso continuado do serviço após as alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">11. Lei Aplicável</h2>
            <p className="text-gray-300 leading-relaxed">
              Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">12. Contato</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-gray-300">
                <strong className="text-[#00FF00]">Email:</strong> suporte@paradafumante.com.br<br />
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
