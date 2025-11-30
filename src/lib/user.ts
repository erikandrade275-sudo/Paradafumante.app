// Sistema de gerenciamento de usuários e planos

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'basico' | 'premium' | 'intensivo' | null;
  billingCycle: 'monthly' | 'yearly';
  purchaseDate: string;
  expiryDate: string;
  quizAnswers?: Record<number, string>;
  personalizedPlan?: {
    intensity: string;
    features: string[];
  };
}

// Simulação de banco de dados local (localStorage)
const STORAGE_KEY = 'parada_fumante_user';

export function saveUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}

export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function updateUserPlan(
  planId: 'basico' | 'premium' | 'intensivo',
  billingCycle: 'monthly' | 'yearly',
  email: string,
  name: string
): User {
  const now = new Date();
  const expiryDate = new Date(now);
  
  if (billingCycle === 'monthly') {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  } else {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  }

  const existingUser = getUser();
  
  const user: User = {
    id: existingUser?.id || `user_${Date.now()}`,
    email,
    name,
    plan: planId,
    billingCycle,
    purchaseDate: now.toISOString(),
    expiryDate: expiryDate.toISOString(),
    quizAnswers: existingUser?.quizAnswers,
    personalizedPlan: existingUser?.personalizedPlan,
  };

  saveUser(user);
  return user;
}

export function hasActivePlan(): boolean {
  const user = getUser();
  if (!user || !user.plan) return false;
  
  const now = new Date();
  const expiry = new Date(user.expiryDate);
  
  return now < expiry;
}

export function getUserPlanType(): 'basico' | 'premium' | 'intensivo' | null {
  const user = getUser();
  return user?.plan || null;
}

export function clearUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
