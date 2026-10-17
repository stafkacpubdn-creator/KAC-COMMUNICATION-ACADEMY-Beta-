
import React, { useState } from 'react';
import {
  checkBackend,
  testBackendPost,
  type BackendStatus,
} from '../data/googleSheets';

export const BackendTest: React.FC = () => {
  const [loading, setLoading] = useState<'get' | 'post' | null>(null);
  const [status, setStatus] = useState<BackendStatus | null>(null);
  const [error, setError] = useState('');

  const handleTest = async (method: 'get' | 'post') => {
    setLoading(method);
    setStatus(null);
    setError('');

    try {
      const result =
        method === 'get'
          ? await checkBackend()
          : await testBackendPost();

      setStatus(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan yang tidak diketahui.'
      );
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Uji Koneksi Database
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Menguji respons GET dan POST Google Apps Script.
          Tes ini tidak membaca atau mengubah data peserta.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleTest('get')}
          disabled={loading !== null}
          className="rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-4 py-2"
        >
          {loading === 'get' ? 'Menguji GET...' : 'Uji GET'}
        </button>

        <button
          type="button"
          onClick={() => handleTest('post')}
          disabled={loading !== null}
          className="rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium px-4 py-2"
        >
          {loading === 'post' ? 'Menguji POST...' : 'Uji POST'}
        </button>
      </div>

      {status && (
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm space-y-1">
          <p className="font-semibold text-emerald-700 dark:text-emerald-300">
            Backend merespons dengan sukses
          </p>
          <p>Nama aplikasi: {status.app ?? '-'}</p>
          <p>Pesan: {status.message ?? '-'}</p>
          <p>Versi: {status.version ?? '-'}</p>
          <p>Waktu: {status.timestamp ?? '-'}</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-950/40 p-4 text-sm text-red-700 dark:text-red-300">
          <p className="font-semibold">Pengujian belum berhasil</p>
          <p className="mt-1 break-words">{error}</p>
          <p className="mt-2">
            Jika muncul Failed to fetch, kemungkinan ada
            kendala jaringan, pengalihan, atau CORS.
          </p>
        </div>
      )}
    </section>
  );
};
