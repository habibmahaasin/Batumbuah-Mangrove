import AdminModules from '@/components/modules/admin';
import ParticipantsTable from '@/components/modules/admin/table';

export default async function Dashboard() {
  return (
    <AdminModules>
      <ParticipantsTable />
    </AdminModules>
  );
}
