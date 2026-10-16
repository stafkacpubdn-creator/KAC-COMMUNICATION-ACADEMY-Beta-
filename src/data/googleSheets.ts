
export interface BackendStatus {
  success: boolean;
  app?: string;
  message?: string;
  version?: string;
  timestamp?: string;
}

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx1HgSqNGZT_JUmKp4Lf0dbMR18_P1FLeTC0WQb50tAS0d3trbg65PAjrqhx7hBJBN3DQ/exec';

export async function checkBackend(): Promise<BackendStatus> {
  if (!SCRIPT_URL) {
    throw new Error(
      'URL Google Apps Script belum dikonfigurasi.'
    );
  }

  const response = await fetch(SCRIPT_URL, {
    method: 'GET',
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(
      `Backend mengembalikan HTTP ${response.status}.`
    );
  }

  const data = (await response.json()) as BackendStatus;

  if (data.success !== true) {
    throw new Error(
      data.message || 'Backend belum siap.'
    );
  }

  return data;
}
