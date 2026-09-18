// VideosFiltrados.jsx — React Island con filtro de categorías
import { useState } from 'react';
import { videos } from '../../data/videos.js';

function FacadeVideo({ id, titulo }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div style={{ aspectRatio: '16/9', width: '100%' }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setLoaded(true)}
      style={{
        aspectRatio: '16/9',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: 'var(--radius) var(--radius) 0 0',
      }}
    >
      <img
        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
        alt={titulo}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(2,6,35,0.35)',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1880c9" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

const CATS = ['Todos', ...Array.from(new Set(videos.map(v => v.categoria)))];

const catColor = {
  'Casos Clínicos': { bg: '#DBEAFE', text: '#1E40AF' },
  'Educativo':      { bg: '#D1FAE5', text: '#065F46' },
  'Conferencias':   { bg: '#EDE9FE', text: '#5B21B6' },
};

export default function VideosFiltrados() {
  const [cat, setCat] = useState('Todos');

  const filtered = cat === 'Todos' ? videos : videos.filter(v => v.categoria === cat);

  return (
    <div>
      {/* Botones de filtro */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
        {CATS.map(c => {
          const isActive = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: '7px 16px',
                borderRadius: '20px',
                border: isActive ? 'none' : '1.5px solid #D1D5DB',
                background: isActive ? 'var(--color-accent)' : 'transparent',
                color: isActive ? '#fff' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Grid de videos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {filtered.map((video, i) => {
          const badge = catColor[video.categoria] || { bg: '#F3F4F6', text: '#374151' };
          return (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
            >
              {/* Facade YouTube */}
              <FacadeVideo id={video.id} titulo={video.titulo} />

              {/* Texto */}
              <div style={{ padding: '16px 20px 20px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    background: badge.bg,
                    color: badge.text,
                    fontSize: '11px',
                    fontWeight: 700,
                    marginBottom: '8px',
                  }}
                >
                  {video.categoria}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    margin: '0 0 6px',
                    lineHeight: 1.3,
                  }}
                >
                  {video.titulo}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {video.descripcion}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '40px 0' }}>
          No hay videos en esta categoría.
        </p>
      )}
    </div>
  );
}
