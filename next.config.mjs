// GitHub Pages serves static files; Supabase handles data at runtime.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export default { output: 'export', trailingSlash: true, basePath };
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
