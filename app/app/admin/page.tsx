import { redirect } from 'next/navigation';
import { createAdminClient } from '../../../lib/supabase/admin';
import { hasSupabaseAdminConfig, hasSupabaseConfig } from '../../../lib/supabase/config';
import { createClient } from '../../../lib/supabase/server';
import {
  createPlanAction,
  createStudentAction,
  updateUserStatusAction,
  upsertSubscriptionAction,
} from './actions';

export const dynamic = 'force-dynamic';

type Plan = {
  id: number;
  name: string;
  description: string | null;
  price: number | string;
};

type Subscription = {
  id: number;
  user_id: string;
  plan_id: number | null;
  status: 'active' | 'canceled';
  start_date: string;
  end_date: string | null;
  created_at: string;
};

type Profile = {
  user_id: string;
  full_name: string | null;
};

function currency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function isAdminRole(appMetadata: Record<string, unknown>) {
  const role = appMetadata.role;
  const roles = appMetadata.roles;

  return role === 'admin' || (Array.isArray(roles) && roles.includes('admin'));
}

export default async function AdminPage() {
  if (!hasSupabaseConfig() || !hasSupabaseAdminConfig()) {
    return (
      <div className="page-shell">
        <section className="surface-hero p-5 md:p-7">
          <div className="page-header">
            <p className="page-kicker">Administração</p>
            <h1 className="app-title">Configuração pendente</h1>
            <p className="page-copy">
              Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
              e `SUPABASE_SERVICE_ROLE_KEY` no `.env.local` para habilitar a gestão.
            </p>
          </div>
        </section>
      </div>
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');
  if (!isAdminRole(user.app_metadata)) redirect('/app');

  const admin = createAdminClient();
  const [
    usersResult,
    profilesResult,
    plansResult,
    subscriptionsResult,
  ] = await Promise.all([
    admin.auth.admin.listUsers({ page: 1, perPage: 100 }),
    admin.from('profiles').select('user_id, full_name'),
    admin.from('plans').select('id, name, description, price').order('price', { ascending: true }),
    admin
      .from('subscriptions')
      .select('id, user_id, plan_id, status, start_date, end_date, created_at')
      .order('created_at', { ascending: false }),
  ]);

  const users = usersResult.data.users;
  const profiles = (profilesResult.data ?? []) as Profile[];
  const plans = (plansResult.data ?? []) as Plan[];
  const subscriptions = (subscriptionsResult.data ?? []) as Subscription[];

  const profileByUser = new Map(profiles.map((profile) => [profile.user_id, profile]));
  const planById = new Map(plans.map((plan) => [plan.id, plan]));
  const subscriptionByUser = new Map<string, Subscription>();

  subscriptions.forEach((subscription) => {
    if (!subscriptionByUser.has(subscription.user_id)) {
      subscriptionByUser.set(subscription.user_id, subscription);
    }
  });

  const activeSubscriptions = subscriptions.filter((subscription) => subscription.status === 'active');
  const monthlyRevenue = activeSubscriptions.reduce((total, subscription) => {
    const plan = subscription.plan_id ? planById.get(subscription.plan_id) : null;
    return total + Number(plan?.price ?? 0);
  }, 0);

  return (
    <div className="page-shell">
      <section className="surface-hero p-5 md:p-7">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div className="page-header">
            <p className="page-kicker">Administração</p>
            <h1 className="app-title">Usuários e financeiro</h1>
            <p className="page-copy">
              Crie acessos manualmente, acompanhe alunos cadastrados e registre
              o plano ativo de cada pagamento.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="surface-card-soft p-3">
              <p className="text-2xl font-extrabold text-white">{users.length}</p>
              <p className="text-xs font-semibold text-[var(--text-muted)]">usuários</p>
            </div>
            <div className="surface-card-soft p-3">
              <p className="text-2xl font-extrabold text-white">{activeSubscriptions.length}</p>
              <p className="text-xs font-semibold text-[var(--text-muted)]">ativos</p>
            </div>
            <div className="surface-card-soft p-3">
              <p className="text-2xl font-extrabold text-white">{currency(monthlyRevenue)}</p>
              <p className="text-xs font-semibold text-[var(--text-muted)]">mensal</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="surface-card p-5">
          <div className="mb-5">
            <p className="page-kicker">Novo aluno</p>
            <h2 className="section-title mt-1">Criar login provisório</h2>
            <p className="section-copy mt-2">
              O aluno entra com a senha provisória e pode redefinir senha pela tela de recuperação.
            </p>
          </div>

          <form action={createStudentAction} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="full_name" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                  Nome
                </label>
                <input id="full_name" name="full_name" className="input-field" placeholder="Nome do aluno" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                  E-mail
                </label>
                <input id="email" name="email" type="email" required className="input-field" placeholder="aluno@email.com" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                  Senha provisória
                </label>
                <input id="password" name="password" type="text" required minLength={8} className="input-field" placeholder="mínimo 8 caracteres" />
              </div>
              <div>
                <label htmlFor="plan_id" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                  Plano
                </label>
                <select id="plan_id" name="plan_id" className="select-field">
                  <option value="">Sem plano inicial</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - {currency(Number(plan.price))}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="start_date" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                  Início
                </label>
                <input id="start_date" name="start_date" type="date" className="input-field" />
              </div>
            </div>

            <button type="submit" className="btn-primary w-fit">
              Criar aluno
            </button>
          </form>
        </section>

        <section className="surface-card p-5">
          <div className="mb-5">
            <p className="page-kicker">Planos</p>
            <h2 className="section-title mt-1">Cadastro financeiro básico</h2>
          </div>

          <form action={createPlanAction} className="grid gap-3 md:grid-cols-[1fr_1fr_140px_auto] md:items-end">
            <div>
              <label htmlFor="plan-name" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                Nome
              </label>
              <input id="plan-name" name="name" required className="input-field" placeholder="Mensal, Turma 01..." />
            </div>
            <div>
              <label htmlFor="plan-description" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                Descrição
              </label>
              <input id="plan-description" name="description" className="input-field" placeholder="Observação interna" />
            </div>
            <div>
              <label htmlFor="plan-price" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                Valor
              </label>
              <input id="plan-price" name="price" required inputMode="decimal" className="input-field" placeholder="197,00" />
            </div>
            <button type="submit" className="btn-secondary">
              Criar plano
            </button>
          </form>

          <div className="mt-5 grid gap-2">
            {plans.length === 0 ? (
              <div className="empty-state !p-5">
                <h3 className="section-title">Nenhum plano cadastrado</h3>
                <p className="section-copy mt-2">Crie um plano para registrar assinaturas.</p>
              </div>
            ) : (
              plans.map((plan) => (
                <div key={plan.id} className="surface-item flex items-center justify-between gap-3 p-3">
                  <div>
                    <p className="text-sm font-extrabold text-[var(--text-primary)]">{plan.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{plan.description || 'Sem descrição'}</p>
                  </div>
                  <span className="badge badge-cyan">{currency(Number(plan.price))}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <section className="surface-card p-5">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="page-kicker">Alunos</p>
            <h2 className="section-title mt-1">Usuários cadastrados</h2>
          </div>
          <p className="text-xs font-semibold text-[var(--text-muted)]">
            Exibe até 100 usuários por enquanto.
          </p>
        </div>

        <div className="grid gap-3">
          {users.map((listedUser) => {
            const profile = profileByUser.get(listedUser.id);
            const subscription = subscriptionByUser.get(listedUser.id);
            const currentPlan = subscription?.plan_id ? planById.get(subscription.plan_id) : null;
            const banned = Boolean(listedUser.banned_until && new Date(listedUser.banned_until) > new Date());

            return (
              <article key={listedUser.id} className="surface-item p-4">
                <div className="grid gap-4 xl:grid-cols-[1fr_1.3fr_auto] xl:items-center">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className={`badge ${subscription?.status === 'active' ? 'badge-cyan' : 'badge'}`}>
                        {subscription?.status === 'active' ? 'Ativo' : 'Sem assinatura ativa'}
                      </span>
                      {isAdminRole(listedUser.app_metadata) && <span className="badge badge-purple">Admin</span>}
                      {banned && <span className="badge badge-orange">Bloqueado</span>}
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                      {profile?.full_name || listedUser.user_metadata?.full_name || 'Aluno sem nome'}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[var(--text-muted)]">{listedUser.email}</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      Criado em {new Date(listedUser.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <form action={upsertSubscriptionAction} className="grid gap-3 md:grid-cols-[1fr_130px_130px_130px_auto] md:items-end">
                    <input type="hidden" name="user_id" value={listedUser.id} />
                    <input type="hidden" name="subscription_id" value={subscription?.id ?? ''} />
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase text-[var(--text-muted)]">
                        Plano
                      </label>
                      <select name="plan_id" defaultValue={subscription?.plan_id ?? ''} className="select-field">
                        <option value="">Selecionar</option>
                        {plans.map((plan) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase text-[var(--text-muted)]">
                        Status
                      </label>
                      <select name="status" defaultValue={subscription?.status ?? 'active'} className="select-field">
                        <option value="active">Ativo</option>
                        <option value="canceled">Cancelado</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase text-[var(--text-muted)]">
                        Início
                      </label>
                      <input name="start_date" type="date" defaultValue={subscription?.start_date ?? ''} className="input-field" />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase text-[var(--text-muted)]">
                        Fim
                      </label>
                      <input name="end_date" type="date" defaultValue={subscription?.end_date ?? ''} className="input-field" />
                    </div>
                    <button type="submit" className="btn-secondary">
                      Salvar
                    </button>
                  </form>

                  <div className="flex flex-col gap-2 xl:min-w-40">
                    <div className="surface-card-soft p-3 text-sm">
                      <p className="font-bold text-[var(--text-primary)]">
                        {currentPlan ? currency(Number(currentPlan.price)) : currency(0)}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {currentPlan?.name || 'Sem plano'}
                      </p>
                    </div>

                    <form action={updateUserStatusAction}>
                      <input type="hidden" name="user_id" value={listedUser.id} />
                      <input type="hidden" name="user_action" value={banned ? 'enable' : 'disable'} />
                      <button type="submit" className="btn-ghost w-full">
                        {banned ? 'Reativar acesso' : 'Bloquear acesso'}
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
