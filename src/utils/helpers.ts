const ERROR_MESSAGES: Record<string, string> = {
  '23505': 'Email sudah terdaftar.',
  '23503': 'Data terkait masih digunakan.',
  '23502': 'Field wajib tidak boleh kosong.',
};

export const parseError = (error: any) => {
  return ERROR_MESSAGES[error.code] || error.message;
};

export const IMAGE_URL =
  'https://lgdimdqopholrfpibips.supabase.co/storage/v1/object/public/batumbuah_mangrove/';
