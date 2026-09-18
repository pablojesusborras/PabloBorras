// src/pages/sitemap.xml.ts
const SITE_URL = 'https://demo-pablo-borras.vercel.app';

const pages = [
  { url: '/',                            priority: '1.0', changefreq: 'weekly'  },
  { url: '/tutores',                     priority: '0.8', changefreq: 'monthly' },
  { url: '/veterinarios',                priority: '0.9', changefreq: 'monthly' },
  { url: '/veterinarios/interconsultas', priority: '0.8', changefreq: 'monthly' },
  { url: '/veterinarios/capacitaciones', priority: '0.8', changefreq: 'monthly' },
  { url: '/veterinarios/libro',          priority: '0.7', changefreq: 'monthly' },
  { url: '/empresas',                    priority: '0.7', changefreq: 'monthly' },
  { url: '/eventos',                     priority: '0.8', changefreq: 'weekly'  },
  { url: '/videos',                      priority: '0.6', changefreq: 'weekly'  },
  { url: '/contacto',                    priority: '0.6', changefreq: 'monthly' },
];

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
