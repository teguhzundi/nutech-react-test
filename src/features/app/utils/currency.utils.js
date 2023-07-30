export function formatRupiah(angka, withPrefix = false) {
  const val = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
  return withPrefix
    ? val
    : val
        .replace('Rp', '')
        .substring(0, val.length - 5)
        .trim();
}
