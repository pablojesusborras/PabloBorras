// MobileMenu.jsx — React Island: menú hamburguesa animado
import { useState, useEffect } from 'react';

/** @param {{ links: Array<{label: string, href: string}> }} props */
export default function MobileMenu({ links = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev);
  const close  = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={toggle}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
        className="mobile-menu-btn"
      >
        <span className={isOpen ? 'is-open' : ''} />
        <span className={isOpen ? 'is-open' : ''} />
        <span className={isOpen ? 'is-open' : ''} />
      </button>

      {isOpen && (
        <>
          <div
            className="mobile-menu-backdrop"
            onClick={close}
            aria-hidden="true"
          />
          <div className="mobile-menu-panel animate-slide-down">
            <nav aria-label="Menú móvil">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="mobile-menu-link"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
