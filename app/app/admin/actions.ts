'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '../../../lib/supabase/admin';
import { createClient } from '../../../lib/supabase/server';

function stringValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

function nullableString(formData: FormData, key: string) {
  const value = stringValue(formData, key);
  return value || null;
}

async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Sessão inválida.');
  }

  const role = user.app_metadata?.role;
  const roles = user.app_metadata?.roles;
  const isAdmin = role === 'admin' || (Array.isArray(roles) && roles.includes('admin'));

  if (!isAdmin) {
    throw new Error('Acesso restrito a administradores.');
  }

  return user;
}

export async function createStudentAction(formData: FormData) {
  await requireAdmin();

  const email = stringValue(formData, 'email').toLowerCase();
  const fullName = stringValue(formData, 'full_name');
  const password = stringValue(formData, 'password');
  const planId = nullableString(formData, 'plan_id');
  const startDate = nullableString(formData, 'start_date');

  if (!email || !password) {
    throw new Error('Informe e-mail e senha provisória.');
  }

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
    },
    app_metadata: {
      role: 'student',
    },
  });

  if (error || !data.user) {
    throw new Error(error?.message ?? 'Não foi possível criar o usuário.');
  }

  if (fullName) {
    await admin.from('profiles').insert({
      user_id: data.user.id,
      full_name: fullName,
    });
  }

  if (planId) {
    await admin.from('subscriptions').insert({
      user_id: data.user.id,
      plan_id: Number(planId),
      status: 'active',
      start_date: startDate || new Date().toISOString().slice(0, 10),
    });
  }

  revalidatePath('/app/admin');
}

export async function createPlanAction(formData: FormData) {
  await requireAdmin();

  const name = stringValue(formData, 'name');
  const description = nullableString(formData, 'description');
  const price = Number(stringValue(formData, 'price').replace(',', '.'));

  if (!name || Number.isNaN(price)) {
    throw new Error('Informe nome e preço do plano.');
  }

  const admin = createAdminClient();
  const { error } = await admin.from('plans').insert({
    name,
    description,
    price,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/app/admin');
}

export async function upsertSubscriptionAction(formData: FormData) {
  await requireAdmin();

  const subscriptionId = nullableString(formData, 'subscription_id');
  const userId = stringValue(formData, 'user_id');
  const planId = nullableString(formData, 'plan_id');
  const status = stringValue(formData, 'status') || 'active';
  const startDate = nullableString(formData, 'start_date');
  const endDate = nullableString(formData, 'end_date');

  if (!userId || !planId) {
    throw new Error('Informe usuário e plano.');
  }

  const payload = {
    user_id: userId,
    plan_id: Number(planId),
    status,
    start_date: startDate || new Date().toISOString().slice(0, 10),
    end_date: endDate,
  };

  const admin = createAdminClient();
  const { error } = subscriptionId
    ? await admin.from('subscriptions').update(payload).eq('id', Number(subscriptionId))
    : await admin.from('subscriptions').insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/app/admin');
}

export async function updateUserStatusAction(formData: FormData) {
  await requireAdmin();

  const userId = stringValue(formData, 'user_id');
  const action = stringValue(formData, 'user_action');

  if (!userId) {
    throw new Error('Usuário inválido.');
  }

  const admin = createAdminClient();
  const { error } =
    action === 'disable'
      ? await admin.auth.admin.updateUserById(userId, { ban_duration: '876000h' })
      : await admin.auth.admin.updateUserById(userId, { ban_duration: 'none' });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/app/admin');
}
