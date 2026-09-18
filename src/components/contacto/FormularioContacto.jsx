// FormularioContacto.jsx — React Island con 4 tabs, estados y envío a web3forms
import { useState, useEffect } from 'react';

// ─── Constantes ───────────────────────────────────────────────────────────────
const TABS = [
  { id: 'interconsultas', label: 'Interconsultas' },
  { id: 'capacitaciones', label: 'Capacitaciones' },
  { id: 'eventos',        label: 'Eventos'         },
  { id: 'empresas',       label: 'Empresas'         },
];

// TODO: reemplazar con la API Key real de Web3Forms
const ACCESS_KEY = 'REEMPLAZAR_CON_API_KEY_WEB3FORMS';

// ─── Estilos comunes ──────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1.5px solid #E5E7EB',
  fontFamily: 'var(--font-body)',
  color: 'var(--color-text)',
  background: '#fff',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--color-text)',
  fontFamily: 'var(--font-body)',
};

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: '#EF4444', marginLeft: '3px' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ type = 'text', name, required, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      style={inputStyle}
      onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
      onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
    />
  );
}

function Select({ name, required, options }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        name={name}
        required={required}
        style={{
          ...inputStyle,
          cursor: 'pointer',
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          paddingRight: '40px',
          backgroundImage: 'none',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
        onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
      >
        <option value="" style={{ color: '#9CA3AF' }}>Seleccioná una opción</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {/* Ícono de flecha personalizado */}
      <svg
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '16px',
          height: '16px',
          pointerEvents: 'none',
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

function Textarea({ name, required, placeholder, rows = 4 }) {
  return (
    <textarea
      name={name}
      required={required}
      placeholder={placeholder}
      rows={rows}
      style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
      onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
      onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
    />
  );
}

// ─── Formularios por tab ──────────────────────────────────────────────────────
function FormInterconsultas() {
  return (
    <>
      {/* Aviso legal */}
      <div className="form-notice">
        <span style={{ fontSize: '18px', flexShrink: 0, lineHeight: 1.3 }}>⚠️</span>
        <p style={{ fontSize: '13px', color: '#78350F', margin: 0, fontFamily: 'var(--font-body)' }}>
          <strong>Aviso:</strong> Esta interconsulta no reemplaza al veterinario tratante. Es un apoyo clínico exclusivo para profesionales.
        </p>
      </div>

      <div className="form-grid-2">
        <Field label="Nombre completo" required>
          <Input name="nombre" required placeholder="Dra. María González" />
        </Field>
        <Field label="Email profesional" required>
          <Input type="email" name="email" required placeholder="hola@clinica.com" />
        </Field>
      </div>

      <div className="form-grid-2">
        <Field label="Teléfono">
          <Input type="tel" name="telefono" placeholder="+54 11 0000-0000" />
        </Field>
        <Field label="Especie del paciente">
          <Select name="especie" options={['Perro', 'Gato', 'Ave', 'Exótico', 'Otro']} />
        </Field>
      </div>

      <div className="form-grid-2">
        <Field label="Área clínica">
          <Select name="tipo_caso" options={['Enfermedades vectoriales','Infectología canina','Infectología felina','Zoonosis','Parasitología con diagnóstico molecular','Casos complejos sin diagnóstico','Otro']} />
        </Field>
        <Field label="Urgencia">
          <Select name="urgencia" options={['Rutina','Moderada','Alta']} />
        </Field>
      </div>

      <Field label="Descripción del caso" required>
        <Textarea name="motivo" required placeholder="Describirme el caso clínico con el mayor detalle posible: signos, evolución, estudios previos..." rows={5} />
      </Field>
    </>
  );
}

function FormCapacitaciones() {
  return (
    <>
      <div className="form-grid-2">
        <Field label="Nombre completo" required>
          <Input name="nombre" required placeholder="Dr. Juan Pérez" />
        </Field>
        <Field label="Email" required>
          <Input type="email" name="email" required placeholder="juan@clinica.com" />
        </Field>
      </div>

      <Field label="Institución u organización">
        <Input name="institucion" placeholder="Clínica / Universidad / Empresa" />
      </Field>

      <div className="form-grid-2">
        <Field label="Tipo de capacitación">
          <Select name="tipo_capacitacion" options={['Charla','Workshop','Jornada','Congreso','Online','A definir']} />
        </Field>
        <Field label="Cantidad de personas">
          <Select name="cantidad_personas" options={['1-10','10-30','30-100','+100']} />
        </Field>
      </div>

      <Field label="Mensaje adicional">
        <Textarea name="mensaje" placeholder="Contame más sobre lo que necesitás, fechas tentativas, temática..." />
      </Field>
    </>
  );
}

function FormEventos() {
  return (
    <>
      <div className="form-grid-2">
        <Field label="Nombre completo" required>
          <Input name="nombre" required placeholder="Lic. Ana Torres" />
        </Field>
        <Field label="Email" required>
          <Input type="email" name="email" required placeholder="ana@congreso.com" />
        </Field>
      </div>

      <Field label="Institución u organizador" required>
        <Input name="institucion" required placeholder="Asociación / Congreso / Empresa" />
      </Field>

      <div className="form-grid-2">
        <Field label="Tipo de evento">
          <Select name="tipo_evento" options={['Congreso','Simposio','Jornada','Charla corporativa','Otro']} />
        </Field>
        <Field label="Fecha tentativa">
          <Input type="date" name="fecha_tentativa" />
        </Field>
      </div>

      <Field label="Ciudad">
        <Input name="ciudad" placeholder="Buenos Aires, Córdoba, Rosario..." />
      </Field>

      <Field label="Mensaje o detalles del evento">
        <Textarea name="mensaje" placeholder="Contame sobre el evento, número de asistentes, temática..." />
      </Field>
    </>
  );
}

function FormEmpresas() {
  return (
    <>
      <div className="form-grid-2">
        <Field label="Nombre completo" required>
          <Input name="nombre" required placeholder="Martín García" />
        </Field>
        <Field label="Email" required>
          <Input type="email" name="email" required placeholder="martin@empresa.com" />
        </Field>
      </div>

      <div className="form-grid-2">
        <Field label="Empresa" required>
          <Input name="empresa" required placeholder="Nombre de la empresa" />
        </Field>
        <Field label="Cargo / Rol">
          <Input name="cargo" placeholder="Gerente de Marketing, Director..." />
        </Field>
      </div>

      <Field label="Tipo de proyecto">
        <Select name="tipo_proyecto" options={['Capacitación','Contenido','Consultoría','Colaboración','Otro']} />
      </Field>

      <Field label="Mensaje" required>
        <Textarea name="mensaje" required placeholder="Describime brevemente tu proyecto y cómo podría colaborar Pablo..." rows={5} />
      </Field>
    </>
  );
}

const FORM_COMPONENTS = {
  interconsultas: FormInterconsultas,
  capacitaciones: FormCapacitaciones,
  eventos:        FormEventos,
  empresas:       FormEmpresas,
};

const SUBMIT_LABELS = {
  interconsultas: 'Enviar interconsulta',
  capacitaciones: 'Consultar capacitación',
  eventos:        'Enviar invitación',
  empresas:       'Iniciar conversación',
};

// ─── Componente principal ─────────────────────────────────────────────────────
/** @param {{ initialTab?: string }} props */
export default function FormularioContacto({ initialTab = 'interconsultas' } = {}) {
  // La pestaña inicial llega como prop desde Astro: idéntica en server y cliente
  const startTab = TABS.find(t => t.id === initialTab) ? initialTab : 'interconsultas';
  const [activeTab, setActiveTab] = useState(startTab);

  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  // Enlaces directos: recién después de hidratar, para no romper el primer render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && TABS.find(t => t.id === tab) && tab !== activeTab) {
      setActiveTab(tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.target);
    formData.append('access_key', ACCESS_KEY);
    formData.append('subject', `[PabloBorras.com] Consulta: ${activeTab}`);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const ActiveForm = FORM_COMPONENTS[activeTab];

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>

      {/* Tabs de navegación */}
      <div
        className="form-tabs"
        role="tablist"
        aria-label="Tipo de consulta"
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              className="form-tab"
              onClick={() => {
                setActiveTab(tab.id);
                setStatus('idle');
              }}
              style={{
                borderRadius: '8px',
                border: isActive ? 'none' : '1.5px solid #D1D5DB',
                background: isActive ? 'var(--color-accent)' : 'transparent',
                color: isActive ? '#fff' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* El formulario */}
      <div className="form-card">
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: '24px',
            marginTop: 0,
          }}
        >
          {TABS.find(t => t.id === activeTab)?.label}
        </h3>

        {/* Mensajes de estado */}
        {status === 'success' && (
          <div style={{
            padding: '14px 16px', borderRadius: '8px',
            background: '#D1FAE5', color: '#065F46',
            marginBottom: '20px', fontSize: '14px', fontWeight: 500,
          }}>
            ✅ ¡Mensaje enviado! Te contactaremos pronto.
          </div>
        )}
        {status === 'error' && (
          <div style={{
            padding: '14px 16px', borderRadius: '8px',
            background: '#FEE2E2', color: '#991B1B',
            marginBottom: '20px', fontSize: '14px', fontWeight: 500,
          }}>
            ❌ Hubo un error. Intentá nuevamente.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Campos ocultos */}
          <input type="hidden" name="tab" value={activeTab} />
          <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

          {/* Formulario dinámico por tab */}
          <ActiveForm />

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="form-submit"
            style={{
              width: '100%',
              borderRadius: '8px',
              border: 'none',
              background: status === 'loading' ? '#9CA3AF' : 'var(--color-accent)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 700,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s, opacity 0.2s',
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {status === 'loading' ? (
              <>
                <span
                  style={{
                    width: '16px', height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                Enviando...
              </>
            ) : (
              SUBMIT_LABELS[activeTab]
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .form-tabs {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 24px;
        }
        .form-tab {
          width: 100%;
          min-height: 42px;
          padding: 8px 12px;
          font-size: 14px;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 16px;
        }
        .form-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px;
          box-shadow: var(--shadow);
        }
        .form-notice {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 8px;
          background: #FEF3C7;
          border-left: 4px solid #D97706;
          margin-bottom: 20px;
        }
        .form-card input,
        .form-card select,
        .form-card textarea {
          font-size: 14px;
        }
        .form-submit {
          padding: 13px;
        }
        @media (max-width: 767px) {
          .form-tabs {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 18px;
          }
          .form-tab {
            min-height: 44px;
            padding: 10px 8px;
            font-size: 13px;
          }
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
          .form-card {
            padding: 16px;
            box-shadow: none;
            border-radius: 12px;
          }
          .form-notice {
            width: 100%;
            gap: 8px;
            padding: 10px 12px;
            margin-bottom: 14px;
          }
          .form-card input,
          .form-card select,
          .form-card textarea {
            min-height: 44px;
            font-size: 16px;
          }
          .form-submit {
            padding: 14px;
            min-height: 48px;
          }
        }
      `}</style>
    </div>
  );
}
