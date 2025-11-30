// Definição do plano único mensal

export type PlanType = 'mensal';

export interface PlanFeatures {
  dashboard: boolean;
  statistics: boolean;
  achievements: boolean;
  motivationalMessages: boolean;
  economyCalculator: boolean;
  community: boolean;
  personalizedCoaching: boolean;
  detailedReports: boolean;
  prioritySupport: boolean;
  weeklyLiveSessions: boolean;
  personalizedActionPlan: boolean;
  advancedHealthTracking: boolean;
  exclusiveMaterial: boolean;
  completionCertificate: boolean;
}

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  monthlyPrice: number;
  features: PlanFeatures;
  featuresList: string[];
}

export const SINGLE_PLAN: Plan = {
  id: 'mensal',
  name: 'Plano Mensal',
  description: 'Acesso completo a todas as funcionalidades',
  monthlyPrice: 39.90,
  features: {
    dashboard: true,
    statistics: true,
    achievements: true,
    motivationalMessages: true,
    economyCalculator: true,
    community: true,
    personalizedCoaching: true,
    detailedReports: true,
    prioritySupport: true,
    weeklyLiveSessions: true,
    personalizedActionPlan: true,
    advancedHealthTracking: true,
    exclusiveMaterial: true,
    completionCertificate: true,
  },
  featuresList: [
    'Dashboard completo com estatísticas em tempo real',
    'Sistema de conquistas e gamificação',
    'Mensagens motivacionais personalizadas',
    'Calculadora de economia e benefícios',
    'Comunidade exclusiva de apoio',
    'Coaching personalizado',
    'Relatórios detalhados de progresso',
    'Suporte prioritário 24/7',
    'Sessões ao vivo semanais',
    'Plano de ação personalizado',
    'Acompanhamento de saúde avançado',
    'Material exclusivo e certificado',
  ],
};

// Manter compatibilidade com código existente
export const PLANS: Record<PlanType, Plan> = {
  mensal: SINGLE_PLAN,
};

// Função para verificar se o usuário tem acesso a uma funcionalidade
export function hasFeatureAccess(
  userPlan: PlanType,
  feature: keyof PlanFeatures
): boolean {
  return SINGLE_PLAN.features[feature] === true;
}

// Função para obter o plano do usuário
export function getUserPlan(planId: string): Plan | null {
  return SINGLE_PLAN;
}
