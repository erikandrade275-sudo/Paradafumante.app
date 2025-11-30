import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-3">
              Parada <span className="text-[#00FF00]">Fumante</span>
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Sua jornada para uma vida livre do cigarro começa aqui. Ferramentas completas para te ajudar a parar de fumar de vez.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-[#00FF00] fill-[#00FF00]" />
              <span>para sua saúde</span>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-bold mb-4 text-white">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#00FF00] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/vendas" className="text-gray-400 hover:text-[#00FF00] transition-colors">
                  Página de Vendas
                </Link>
              </li>
              <li>
                <Link href="/precos" className="text-gray-400 hover:text-[#00FF00] transition-colors">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="/suporte" className="text-gray-400 hover:text-[#00FF00] transition-colors">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/termos" className="text-gray-400 hover:text-[#00FF00] transition-colors">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-400 hover:text-[#00FF00] transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Parada Fumante. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Este aplicativo não substitui orientação médica profissional.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
