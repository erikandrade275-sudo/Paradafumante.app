import { NextRequest, NextResponse } from 'next/server';
import { getKeotoClient } from '@/lib/keoto';
import type { KeotoCustomer } from '@/lib/keoto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, cpf, phone } = body;

    // Validação básica
    if (!name || !email || !cpf) {
      return NextResponse.json(
        { error: 'Nome, email e CPF são obrigatórios' },
        { status: 400 }
      );
    }

    // Criar cliente Keoto
    const keotoClient = getKeotoClient();

    // Criar link de pagamento
    const customer: KeotoCustomer = {
      name,
      email,
      cpf,
      phone,
    };

    const paymentLink = await keotoClient.createPaymentLink({
      amount: 39.90,
      description: 'Parada Fumante - Plano Mensal',
      customer,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success`,
      expiresIn: 60,
      metadata: {
        plan: 'mensal',
        product: 'parada-fumante-subscription',
      },
    });

    return NextResponse.json({
      success: true,
      paymentLink: paymentLink.url,
      paymentId: paymentLink.id,
    });
  } catch (error) {
    console.error('Erro ao criar link de pagamento:', error);
    return NextResponse.json(
      { error: 'Erro ao criar link de pagamento. Tente novamente.' },
      { status: 500 }
    );
  }
}
