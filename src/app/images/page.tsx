'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const filePath = `participants/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('batumbuah_mangrove')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      alert(error.message);
      return;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('participants')
      .getPublicUrl(filePath);
    setUrl(data.publicUrl);
  };

  return (
    <div>
      <input
        type='file'
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleUpload}>Upload</button>
      {url && <img src={url} alt='Uploaded' width={200} />}
    </div>
  );
}
