// Integração com Keoto - Plataforma de Pagamentos

export interface KeotoConfig {
  apiKey: string;
  apiSecret: string;
  webhookSecret: string;
}

export interface KeotoPaymentLink {
  id: string;
  url: string;
  amount: number;
  status: 'pending' | 'paid' | 'expired' | 'cancelled';
  createdAt: string;
}

export interface KeotoCustomer {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
}

export interface CreatePaymentLinkParams {
  amount: number;
  description: string;
  customer: KeotoCustomer;
  redirectUrl?: string;
  expiresIn?: number; // em minutos
  metadata?: Record<string, string>;
}

export interface KeotoWebhookPayload {
  event: 'payment.created' | 'payment.paid' | 'payment.cancelled' | 'payment.expired';
  data: {
    id: string;
    amount: number;
    status: string;
    customer: KeotoCustomer;
    metadata?: Record<string, string>;
    paidAt?: string;
  };
}

class KeotoClient {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl = 'https://api.keoto.com.br/v1';

  constructor(config: KeotoConfig) {
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
  }

  private getHeaders(): HeadersInit {
    const auth = Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64');
    return {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Cria um link de pagamento na Keoto
   */
  async createPaymentLink(params: CreatePaymentLinkParams): Promise<KeotoPaymentLink> {
    try {
      const response = await fetch(`${this.baseUrl}/payment-links`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          amount: Math.round(params.amount * 100), // Converter para centavos
          description: params.description,
          customer: {
            name: params.customer.name,
            email: params.customer.email,
            cpf: params.customer.cpf.replace(/\D/g, ''),
            phone: params.customer.phone,
          },
          redirect_url: params.redirectUrl,
          expires_in: params.expiresIn || 60, // 60 minutos por padrão
          metadata: params.metadata,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar link de pagamento: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        id: data.id,
        url: data.url,
        amount: data.amount / 100,
        status: data.status,
        createdAt: data.created_at,
      };
    } catch (error) {
      console.error('Erro na API Keoto:', error);
      throw error;
    }
  }

  /**
   * Consulta o status de um pagamento
   */
  async getPaymentStatus(paymentId: string): Promise<KeotoPaymentLink> {
    try {
      const response = await fetch(`${this.baseUrl}/payment-links/${paymentId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erro ao consultar pagamento: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        id: data.id,
        url: data.url,
        amount: data.amount / 100,
        status: data.status,
        createdAt: data.created_at,
      };
    } catch (error) {
      console.error('Erro ao consultar status:', error);
      throw error;
    }
  }

  /**
   * Valida webhook da Keoto
   */
  validateWebhook(payload: string, signature: string, webhookSecret: string): boolean {
    // Implementar validação de assinatura do webhook
    // A Keoto usa HMAC SHA256 para assinar os webhooks
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');
    
    return signature === expectedSignature;
  }
}

// Singleton do cliente Keoto
let keotoClient: KeotoClient | null = null;

export function getKeotoClient(): KeotoClient {
  if (!keotoClient) {
    const config: KeotoConfig = {
      apiKey: process.env.KEOTO_API_KEY || '',
      apiSecret: process.env.KEOTO_API_SECRET || '',
      webhookSecret: process.env.KEOTO_WEBHOOK_SECRET || '',
    };

    if (!config.apiKey || !config.apiSecret) {
      throw new Error('Credenciais da Keoto não configuradas. Configure KEOTO_API_KEY e KEOTO_API_SECRET no .env.local');
    }

    keotoClient = new KeotoClient(config);
  }

  return keotoClient;
}

// Função auxiliar para criar link de pagamento do plano mensal
export async function createSubscriptionPaymentLink(customer: KeotoCustomer): Promise<KeotoPaymentLink> {
  const client = getKeotoClient();
  
  return client.createPaymentLink({
    amount: 39.90,
    description: 'Parada Fumante - Plano Mensal',
    customer,
    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    expiresIn: 60, // 60 minutos
    metadata: {
      plan: 'mensal',
      product: 'parada-fumante-subscription',
    },
  });
}
