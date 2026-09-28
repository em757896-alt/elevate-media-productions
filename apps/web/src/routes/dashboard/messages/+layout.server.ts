import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const { user } = await locals.safeGetSession();
  const supabase = locals.supabase;

  if (!user || !supabase) {
    return { me: null, members: [], configured: false };
  }

  const { data: members } = await supabase
    .from('profiles')
    .select('id,full_name,username,avatar_url,role')
    .neq('id', user.id)
    .limit(100);

  const myProfile = await supabase.from('profiles').select('id,full_name,username,avatar_url,role').eq('id', user.id).maybeSingle();

  return {
    me: (myProfile.data ?? {
      id: user.id,
      full_name: user.user_metadata?.full_name ?? user.email ?? 'Member',
      username: user.email,
      avatar_url: null,
      role: 'member'
    }) as Profile,
    members: (members ?? []) as Profile[],
    configured: true
  };
};