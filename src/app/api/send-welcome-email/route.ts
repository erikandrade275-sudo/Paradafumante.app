import { NextRequest, NextResponse } from 'next/server';

// Template de email de boas-vindas
const getWelcomeEmailTemplate = (customerName: string, customerEmail: string) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vindo ao Parada Fumante!</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: #ffffff;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #00FF00;
      margin-bottom: 10px;
    }
    .title {
      font-size: 28px;
      font-weight: bold;
      color: #0D0D0D;
      margin-bottom: 10px;
    }
    .subtitle {
      font-size: 18px;
      color: #666;
    }
    .section {
      margin: 30px 0;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      border-left: 4px solid #00FF00;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #0D0D0D;
      margin-bottom: 15px;
    }
    .benefit-item {
      margin: 10px 0;
      padding-left: 25px;
      position: relative;
    }
    .benefit-item:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #00FF00;
      font-weight: bold;
      font-size: 18px;
    }
    .cta-button {
      display: inline-block;
      background-color: #00FF00;
      color: #0D0D0D;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 16px;
      margin: 20px 0;
      text-align: center;
    }
    .steps {
      counter-reset: step-counter;
      list-style: none;
      padding: 0;
    }
    .step {
      counter-increment: step-counter;
      margin: 15px 0;
      padding-left: 40px;
      position: relative;
    }
    .step:before {
      content: counter(step-counter);
      position: absolute;
      left: 0;
      top: 0;
      background-color: #00FF00;
      color: #0D0D0D;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      color: #666;
      font-size: 14px;
    }
    .highlight {
      background-color: #fff9e6;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      border: 1px solid #ffd700;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🚭 Parada Fumante</div>
      <h1 class="title">Bem-vindo, ${customerName}! 🎉</h1>
      <p class="subtitle">Sua jornada para uma vida sem cigarro começa agora!</p>
    </div>

    <div class="section">
      <h2 class="section-title">✅ Pagamento Confirmado</h2>
      <p>Parabéns por dar o primeiro passo! Seu pagamento foi processado com sucesso e você já tem acesso completo ao Parada Fumante.</p>
      <div style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://paradafumante.com.br'}/bem-vindo" class="cta-button">
          Acessar Meu Painel Agora →
        </a>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🎁 O Que Você Ganhou Hoje</h2>
      <div class="benefit-item">Dashboard completo com estatísticas em tempo real</div>
      <div class="benefit-item">Sistema de conquistas e gamificação motivadora</div>
      <div class="benefit-item">Monitoramento de saúde com 6 marcos de recuperação</div>
      <div class="benefit-item">Calculadora de economia financeira</div>
      <div class="benefit-item">Suporte com IA disponível 24/7</div>
      <div class="benefit-item">Mensagens motivacionais personalizadas</div>
      <div class="benefit-item">Comunidade exclusiva de apoio</div>
      <div class="benefit-item">Acesso vitalício sem mensalidades</div>
    </div>

    <div class="section">
      <h2 class="section-title">🚀 Primeiros Passos</h2>
      <ol class="steps">
        <li class="step">
          <strong>Acesse seu painel</strong><br>
          Clique no botão acima ou acesse: ${process.env.NEXT_PUBLIC_APP_URL || 'https://paradafumante.com.br'}/dashboard
        </li>
        <li class="step">
          <strong>Configure sua data de parada</strong><br>
          Informe quando você parou de fumar para começar a ver seu progresso
        </li>
        <li class="step">
          <strong>Defina seus dados</strong><br>
          Quantos cigarros fumava por dia e o preço do maço
        </li>
        <li class="step">
          <strong>Explore o dashboard</strong><br>
          Veja suas estatísticas, conquistas e progresso de saúde
        </li>
        <li class="step">
          <strong>Conheça o suporte com IA</strong><br>
          Tire dúvidas e receba motivação 24/7
        </li>
      </ol>
    </div>

    <div class="highlight">
      <h3 style="margin-top: 0;">💡 Dica Importante</h3>
      <p style="margin-bottom: 0;">
        <strong>Acesse o app diariamente!</strong> Estudos mostram que usuários que checam seu progresso diariamente têm 3x mais chances de sucesso. Configure lembretes no seu celular para não esquecer!
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">📚 Materiais Exclusivos</h2>
      <p>Preparamos conteúdos especiais para você:</p>
      <div class="benefit-item">E-book: "10 Estratégias Comprovadas para Parar de Fumar"</div>
      <div class="benefit-item">Guia de Gerenciamento de Crises</div>
      <div class="benefit-item">Técnicas de Respiração para Momentos Difíceis</div>
      <div class="benefit-item">Seu Plano de Ação Personalizado</div>
      <p style="margin-top: 15px;">
        <em>Acesse todos os materiais dentro do app na seção "Recursos"</em>
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">🛡️ Garantia de 7 Dias</h2>
      <p>
        Você tem <strong>7 dias</strong> para testar o Parada Fumante sem riscos. 
        Se não ficar satisfeito, devolvemos <strong>100% do seu dinheiro</strong>, 
        sem perguntas e sem burocracia.
      </p>
      <p style="margin-top: 10px; font-size: 14px; color: #666;">
        Para solicitar reembolso: suporte@paradafumante.com.br
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">💬 Precisa de Ajuda?</h2>
      <p><strong>Chat com IA:</strong> Disponível 24/7 dentro do app</p>
      <p><strong>E-mail:</strong> suporte@paradafumante.com.br</p>
      <p><strong>Horário de atendimento humano:</strong><br>
        Segunda a Sexta: 9h às 18h<br>
        Sábado: 9h às 13h
      </p>
      <p style="margin-top: 15px; color: #666; font-size: 14px;">
        Respondemos todos os e-mails em até 24 horas!
      </p>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <p style="font-size: 18px; font-weight: bold; color: #0D0D0D;">
        Você não está sozinho nessa jornada! 💪
      </p>
      <p style="color: #666;">
        Estamos aqui para apoiar você em cada passo do caminho.
      </p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://paradafumante.com.br'}/dashboard" class="cta-button">
        Começar Agora →
      </a>
    </div>

    <div class="footer">
      <p><strong>Parada Fumante</strong></p>
      <p>Sua jornada para uma vida mais saudável e livre do cigarro</p>
      <p style="margin-top: 20px; font-size: 12px;">
        Este e-mail foi enviado para ${customerEmail}<br>
        Se você não fez essa compra, entre em contato conosco imediatamente.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

// API Route para enviar email de boas-vindas
export async function POST(request: NextRequest) {
  try {
    const { customerName, customerEmail, orderId } = await request.json();

    // Validação básica
    if (!customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 }
      );
    }

    // Aqui você integraria com um serviço de email como:
    // - Resend (recomendado)
    // - SendGrid
    // - AWS SES
    // - Mailgun

    // Exemplo com Resend (quando configurado):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Parada Fumante <noreply@paradafumante.com.br>',
      to: customerEmail,
      subject: '🎉 Bem-vindo ao Parada Fumante! Sua jornada começa agora',
      html: getWelcomeEmailTemplate(customerName, customerEmail),
    });
    */

    // Por enquanto, retorna sucesso (email será configurado depois)
    console.log('Email de boas-vindas preparado para:', customerEmail);
    console.log('Nome:', customerName);
    console.log('Order ID:', orderId);

    return NextResponse.json({
      success: true,
      message: 'Email de boas-vindas será enviado em breve',
      template: getWelcomeEmailTemplate(customerName, customerEmail)
    });

  } catch (error) {
    console.error('Erro ao processar email:', error);
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    );
  }
}

// Endpoint para visualizar template (desenvolvimento)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const preview = searchParams.get('preview');

  if (preview === 'true') {
    const html = getWelcomeEmailTemplate('João Silva', 'joao@exemplo.com');
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return NextResponse.json({
    message: 'API de email de boas-vindas',
    endpoints: {
      POST: 'Enviar email de boas-vindas',
      GET: 'Visualizar template (adicione ?preview=true)'
    }
  });
}
