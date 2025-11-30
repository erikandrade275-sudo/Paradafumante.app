import { NextRequest, NextResponse } from 'next/server';
import { getKeotoClient } from '@/lib/keoto';
import type { KeotoWebhookPayload } from '@/lib/keoto';
import { updateUserPlan } from '@/lib/user';
import { sendConfirmationEmail, sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Obter o payload e a assinatura do webhook
    const payload = await request.text();
    const signature = request.headers.get('x-keoto-signature') || '';

    // Validar assinatura do webhook
    const keotoClient = getKeotoClient();
    const webhookSecret = process.env.KEOTO_WEBHOOK_SECRET || '';
    
    const isValid = keotoClient.validateWebhook(payload, signature, webhookSecret);
    
    if (!isValid) {
      console.error('Webhook inválido - assinatura não confere');
      return NextResponse.json(
        { error: 'Webhook inválido' },
        { status: 401 }
      );
    }

    // Processar o webhook
    const webhookData: KeotoWebhookPayload = JSON.parse(payload);

    console.log('Webhook recebido:', webhookData.event);

    // Processar apenas pagamentos confirmados
    if (webhookData.event === 'payment.paid') {
      const { customer, metadata } = webhookData.data;

      // Mapear o produto da Keoto para o plano correto
      // Assumindo que o metadata contém informações do produto
      const productId = metadata?.product_id || 'basico';
      
      // Mapear produto para plano válido
      let planType: 'basico' | 'premium' | 'intensivo' = 'basico';
      
      if (productId.includes('premium')) {
        planType = 'premium';
      } else if (productId.includes('intensivo')) {
        planType = 'intensivo';
      }

      // Atualizar plano do usuário
      const user = updateUserPlan(
        planType,
        'monthly',
        customer.email,
        customer.name
      );

      // Enviar e-mails de confirmação
      try {
        await sendConfirmationEmail(user);
        await sendWelcomeEmail(user);
        console.log('E-mails enviados com sucesso para:', customer.email);
      } catch (emailError) {
        console.error('Erro ao enviar e-mails:', emailError);
        // Não falhar o webhook por erro de e-mail
      }

      console.log('Pagamento processado com sucesso:', customer.email);
    }

    // Retornar sucesso para a Keoto
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}
