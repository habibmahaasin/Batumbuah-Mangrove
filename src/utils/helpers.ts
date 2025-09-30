const ERROR_MESSAGES: Record<string, string> = {
  '23505': 'Partisipan sudah terdaftar.',
  '23503': 'Data terkait masih digunakan.',
  '23502': 'Field wajib tidak boleh kosong.',
};

export const parseError = (error: any) => {
  return ERROR_MESSAGES[error.code] || error.message;
};

export const IMAGE_URL =
  'https://lgdimdqopholrfpibips.supabase.co/storage/v1/object/public/batumbuah_mangrove/';

export type StatusName = 1 | 2 | 3;

export function getStatusValue(status: StatusName): String {
  switch (status) {
    case 1:
      return 'Approved';
    case 2:
      return 'Pending';
    case 3:
      return 'Rejected';
    default:
      return '-';
  }
}

export function getStatusVariant(status: StatusName) {
  switch (status) {
    case 1:
      return 'success';
    case 2:
      return 'warning';
    case 3:
      return 'destructive';
    default:
      return 'secondary';
  }
}
