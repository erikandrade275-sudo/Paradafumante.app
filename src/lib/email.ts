// Sistema de envio de e-mails de confirmação

import { User } from './user';
import { PLANS } from './plans';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

// Template de e-mail de confirmação
function generateConfirmationEmail(user: User): string {
  const plan = PLANS[user.plan!];
  const price = user.billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const cycle = user.billingCycle === 'monthly' ? 'Mensal' : 'Anual';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #0D0D0D 0%, #1a1a1a 100%);
          color: white;
          padding: 40px 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .highlight {
          color: #00FF00;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .plan-box {
          background: white;
          border: 2px solid #00FF00;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
        }
        .plan-name {
          font-size: 24px;
          font-weight: bold;
          color: #00FF00;
          margin-bottom: 10px;
        }
        .price {
          font-size: 32px;
          font-weight: bold;
          color: #0D0D0D;
          margin: 10px 0;
        }
        .features {
          list-style: none;
          padding: 0;
          margin: 20px 0;
        }
        .features li {
          padding: 8px 0;
          padding-left: 25px;
          position: relative;
        }
        .features li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #00FF00;
          font-weight: bold;
        }
        .button {
          display: inline-block;
          background: #00FF00;
          color: #0D0D0D;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          margin: 20px 0;
        }
        .instructions {
          background: #fff;
          border-left: 4px solid #00FF00;
          padding: 15px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          color: #666;
          font-size: 12px;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Parada <span class="highlight">Fumante</span></div>
        <p>Bem-vindo à sua jornada de transformação!</p>
      </div>
      
      <div class="content">
        <h2>Olá, ${user.name}! 🎉</h2>
        
        <p>Parabéns por dar este passo importante rumo a uma vida mais saudável e livre do cigarro!</p>
        
        <div class="plan-box">
          <div class="plan-name">${plan.name}</div>
          <div class="price">R$ ${price.toFixed(2)}</div>
          <p style="color: #666; margin: 5px 0;">Plano ${cycle}</p>
          
          <p style="margin-top: 20px;"><strong>Suas funcionalidades incluem:</strong></p>
          <ul class="features">
            ${plan.featuresList.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div class="instructions">
          <h3 style="margin-top: 0;">📋 Próximos Passos:</h3>
          <ol>
            <li><strong>Acesse seu Dashboard:</strong> Clique no botão abaixo para começar</li>
            <li><strong>Complete seu perfil:</strong> Adicione informações sobre seus hábitos</li>
            <li><strong>Defina sua meta:</strong> Estabeleça quando quer parar completamente</li>
            <li><strong>Acompanhe seu progresso:</strong> Use as ferramentas diariamente</li>
          </ol>
        </div>
        
        <center>
          <a href="https://seu-app.com/dashboard" class="button">Acessar Meu Dashboard</a>
        </center>
        
        <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <strong>💡 Dica Importante:</strong> Os primeiros dias são os mais desafiadores. Use nosso sistema de mensagens motivacionais e não hesite em buscar suporte na comunidade!
        </div>
        
        <h3>📧 Suporte</h3>
        <p>Precisa de ajuda? Nossa equipe está pronta para te apoiar:</p>
        <ul>
          <li><strong>Email:</strong> suporte@paradafumante.com</li>
          ${user.plan === 'premium' || user.plan === 'intensivo' ? '<li><strong>Suporte Prioritário 24/7:</strong> Disponível no app</li>' : ''}
          ${user.plan === 'intensivo' ? '<li><strong>Coach Dedicado:</strong> Você receberá contato em até 24h</li>' : ''}
        </ul>
        
        <p style="margin-top: 30px;">Estamos muito felizes em ter você conosco nesta jornada! 💚</p>
        
        <p><strong>Equipe Parada Fumante</strong></p>
      </div>
      
      <div class="footer">
        <p>© 2024 Parada Fumante. Todos os direitos reservados.</p>
        <p>Este é um e-mail automático de confirmação de compra.</p>
        <p style="font-size: 10px; margin-top: 10px;">
          Data da compra: ${new Date(user.purchaseDate).toLocaleDateString('pt-BR')}<br>
          Válido até: ${new Date(user.expiryDate).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </body>
    </html>
  `;
}

// Função para simular envio de e-mail (em produção, usar serviço real como SendGrid, Resend, etc.)
export async function sendConfirmationEmail(user: User): Promise<boolean> {
  try {
    const emailHtml = generateConfirmationEmail(user);
    
    // Em produção, você usaria um serviço de e-mail real:
    // const response = await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: user.email,
    //     subject: `Bem-vindo ao Parada Fumante - Plano ${PLANS[user.plan!].name}`,
    //     html: emailHtml
    //   })
    // });
    
    // Por enquanto, vamos simular o envio e mostrar no console
    console.log('📧 E-mail de confirmação enviado para:', user.email);
    console.log('Conteúdo do e-mail:', emailHtml);
    
    // Simular sucesso
    return true;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return false;
  }
}

// Função para enviar e-mail de boas-vindas com instruções detalhadas
export async function sendWelcomeEmail(user: User): Promise<boolean> {
  try {
    const plan = PLANS[user.plan!];
    
    const welcomeHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #0D0D0D 0%, #1a1a1a 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 10px;
          }
          .highlight { color: #00FF00; }
          .content {
            background: #f9f9f9;
            padding: 30px;
            margin-top: 20px;
            border-radius: 10px;
          }
          .tip-box {
            background: white;
            border-left: 4px solid #00FF00;
            padding: 15px;
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎯 Guia de Início Rápido</h1>
          <p>Tudo que você precisa saber para começar</p>
        </div>
        
        <div class="content">
          <h2>Olá, ${user.name}!</h2>
          
          <p>Preparamos este guia para você aproveitar ao máximo seu plano <strong>${plan.name}</strong>:</p>
          
          <div class="tip-box">
            <h3>🚀 Primeiros Passos</h3>
            <ol>
              <li>Acesse o Dashboard e configure seu perfil</li>
              <li>Defina sua data para parar de fumar</li>
              <li>Explore as ferramentas disponíveis</li>
              <li>Junte-se à comunidade</li>
            </ol>
          </div>
          
          <div class="tip-box">
            <h3>💪 Dicas para o Sucesso</h3>
            <ul>
              <li>Use o app diariamente para acompanhar seu progresso</li>
              <li>Participe das sessões ao vivo (disponível no seu plano)</li>
              <li>Não hesite em pedir ajuda ao suporte</li>
              <li>Celebre cada pequena vitória!</li>
            </ul>
          </div>
          
          <p>Estamos aqui para te apoiar em cada passo! 💚</p>
        </div>
      </body>
      </html>
    `;
    
    console.log('📧 E-mail de boas-vindas enviado para:', user.email);
    return true;
  } catch (error) {
    console.error('Erro ao enviar e-mail de boas-vindas:', error);
    return false;
  }
}
