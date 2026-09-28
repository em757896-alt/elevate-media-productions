import type { User } from '@supabase/supabase-js';
import { session } from '$lib/stores/session';
import { clientSupabase, getClientSession } from '$lib/supabase-client';

export const supabase = clientSupabase;
export const supabaseConfigured = Boolean(clientSupabase);

function fallbackProfile(user: User): Profile {
  return {
    id: user.id,
    username: user.email ?? null,
    full_name: (user.user_metadata?.full_name as string | undefined) ?? user.email ?? null,
    avatar_url: null,
    bio: null,
    role: 'member',
    created_at: new Date().toISOString()
  };
}

async function getProfile(user: User): Promise<Profile> {
  if (!supabase) return fallbackProfile(user);
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    if (error || !data) return fallbackProfile(user);
    return data as unknown as Profile;
  } catch {
    return fallbackProfile(user);
  }
}

export function syncAuthState(): () => void {
  if (!supabase) {
    session.set({ user: null, loading: false });
    return () => {};
  }
  const hydrate = async (user: User | null) => {
    if (!user) {
      session.set({ user: null, loading: false });
      return;
    }
    const profile = await getProfile(user);
    session.set({ user: profile, loading: false });
  };
  getClientSession().then(({ data }) => hydrate(data.session?.user ?? null));
  const { data: sub } = supabase.auth.onAuthStateChange((_event, supabaseSession) => {
    hydrate(supabaseSession?.user ?? null);
  });
  return () => sub.subscription.unsubscribe();
}

export async function signOut() {
  if (!supabase) {
    session.reset();
    return;
  }
  await supabase.auth.signOut();
  session.reset();
}