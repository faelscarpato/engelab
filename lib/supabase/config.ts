const fallbackPublicSupabaseUrl = 'https://ljdjvribchuqpcygpbzx.supabase.co';
const fallbackPublicSupabaseKey =
  'sb_publishable_Ttf5VRoBvRL6FlAaL_avmQ_ua_flzM5';

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? fallbackPublicSupabaseUrl;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    fallbackPublicSupabaseKey;

  if (!url || !key) {
    throw new Error(
      'Configuração pública do Supabase não encontrada. Verifique as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY no ambiente de build.'
    );
  }

  return { url, key };
}

export function getSupabaseAdminConfig() {
  const { url } = getSupabaseConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error('Configure SUPABASE_SERVICE_ROLE_KEY no .env.local.');
  }

  return { url, serviceRoleKey };
}

export function hasSupabaseConfig() {
  return Boolean(
    (process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackPublicSupabaseUrl) &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        fallbackPublicSupabaseKey)
  );
}

export function hasSupabaseAdminConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
