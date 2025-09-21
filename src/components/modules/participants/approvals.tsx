'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function ApprovalsTab() {
  const supabase = createClient();

  const [databyemail, setDatabyemail] = useState<any>(null);
  const [fetchError, setFetchError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('participants')
        .select(
          `
          name,
          total_trees,
          updated_at,
          status (
            id,
            name
          )
        `
        )
        .eq('email', 'testing@gmail.com')
        .single();

      setDatabyemail(data);
      setFetchError(error);
    };

    fetchData();
  }, [supabase]);

  console.log('databyemail', databyemail);
  return <div>Approvals</div>;
}
