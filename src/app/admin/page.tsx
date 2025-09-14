import { createClient } from '@/utils/supabase/server';

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase.from('participants').select(`
    id,
    name,
    email,
    total_trees,
    created_at,
    status (
      id,
      name
    )
  `);

  return (
    <div className='p-6'>
      <h1>Welcome {user?.email}</h1>
      <pre>{JSON.stringify(data, null, 1)}</pre>
    </div>
  );
}
