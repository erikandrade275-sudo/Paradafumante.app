import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    // Verifica se a API Key está configurada
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'OPENAI_API_KEY' || apiKey === 'sua_chave_openai_aqui') {
      return NextResponse.json(
        { 
          message: 'Olá! 👋 Nosso chat com IA está sendo configurado. Enquanto isso, você pode entrar em contato por:\n\n📧 Email: suporte@paradafumante.com.br\n⏰ Horário: Segunda a Sexta, 9h às 18h | Sábado, 9h às 13h\n\nNossa equipe responderá em até 24 horas! 😊' 
        },
        { status: 200 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { message: 'Por favor, envie uma mensagem válida.' },
        { status: 400 }
      );
    }

    const systemPrompt = `Você é um assistente virtual especializado em suporte ao cliente para o "Parada Fumante", um aplicativo que ajuda pessoas a pararem de fumar.

INFORMAÇÕES SOBRE O PRODUTO:
- Nome: Parada Fumante
- Propósito: Ajudar pessoas a pararem de fumar através de gamificação, acompanhamento de progresso e suporte motivacional
- Preço: R$ 97,00 (pagamento único com acesso vitalício)
- Garantia: 7 dias de garantia incondicional (devolução de 100% do valor)
- Funcionalidades principais:
  * Contador de dias sem fumar
  * Cálculo de economia financeira em tempo real
  * Monitoramento de saúde (6 marcos de recuperação)
  * Sistema de conquistas e badges (6 níveis)
  * Gráficos de progresso
  * Mensagens motivacionais personalizadas
  * Suporte com IA 24/7
  * Comunidade de apoio
  * Desafios diários
  * Lembretes motivacionais

INFORMAÇÕES DE SUPORTE:
- Email: suporte@paradafumante.com.br
- Horário de atendimento: Segunda a Sexta: 9h às 18h | Sábado: 9h às 13h
- Tempo de resposta por email: até 24 horas

PERGUNTAS FREQUENTES:
1. Como funciona o período de teste? 7 dias de garantia com devolução de 100% do valor, sem perguntas
2. Posso cancelar? Sim, sem taxas de cancelamento
3. Meus dados estão seguros? Sim, dados salvos apenas no seu navegador (localStorage)
4. Funciona em múltiplos dispositivos? Sim, acesse de qualquer lugar
5. Funciona offline? Funcionalidades básicas sim, mas sincronização requer internet
6. Oferece suporte médico? Não, apenas apoio motivacional. Sempre recomendamos consultar um profissional de saúde

COMO O APP AJUDA:
- Dashboard mostra progresso em tempo real (dias, economia, saúde)
- Sistema de badges motiva através de gamificação
- Mensagens diárias mantêm motivação alta
- Calculadora mostra economia financeira real
- Marcos de saúde mostram recuperação do corpo
- Chat com IA disponível 24/7 para suporte

DIRETRIZES DE ATENDIMENTO:
- Seja empático, motivador e encorajador
- Responda de forma clara e objetiva
- Se não souber algo específico, oriente o cliente a entrar em contato por email
- Incentive o cliente em sua jornada para parar de fumar
- Seja profissional mas amigável e acolhedor
- Use emojis moderadamente para tornar a conversa mais leve
- Nunca invente informações que não estão aqui
- Sempre reforce que parar de fumar é possível e o cliente está no caminho certo
- Celebre pequenas vitórias e progressos

TÉCNICAS DE SUPORTE EM CRISES:
Se o cliente disser que está com vontade de fumar:
1. Valide o sentimento ("É normal sentir vontade, você está indo bem!")
2. Ofereça técnica de respiração (4-4-4: inspire 4s, segure 4s, expire 4s)
3. Lembre do progresso já feito
4. Mostre que a vontade passa em 3-5 minutos
5. Incentive a ver as estatísticas no dashboard

Responda sempre em português do Brasil de forma natural, conversacional e motivadora.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0].message.content;

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error('Erro na API do chat:', error);
    
    // Tratamento específico de erros da OpenAI
    if (error?.status === 401) {
      return NextResponse.json(
        { 
          message: 'Desculpe, há um problema com a configuração do chat. Por favor, entre em contato por email: suporte@paradafumante.com.br. Nossa equipe responderá em até 24 horas! 😊' 
        },
        { status: 200 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { 
          message: 'Nosso chat está com muitas solicitações no momento. Por favor, tente novamente em alguns instantes ou entre em contato por email: suporte@paradafumante.com.br 😊' 
        },
        { status: 200 }
      );
    }

    // Erro genérico
    return NextResponse.json(
      { 
        message: 'Desculpe, estou com dificuldades técnicas no momento. Por favor, entre em contato por email: suporte@paradafumante.com.br. Nossa equipe responderá em até 24 horas! 😊' 
      },
      { status: 200 }
    );
  }
}
