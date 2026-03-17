import { useEffect, useState } from 'react'
import './App.css'

const journeySections = [
  { id: 'presentacion', label: 'Inicio', stop: '01' },
  { id: 'problema', label: 'Diagnostico', stop: '02' },
  { id: 'solucion', label: 'Ruta', stop: '03' },
  { id: 'como-funciona', label: 'Actores', stop: '04' },
  { id: 'beneficios', label: 'Impacto', stop: '05' },
  { id: 'acciones', label: 'Accion', stop: '06' },
]

const heroHighlights = [
  'Organiza rutas, paradas y recorridos de transportes privados desde una sola vista.',
  'Comparte seguimiento en tiempo real para reducir la incertidumbre operativa diaria.',
  'Mejora la comunicacion entre coordinacion, operadores y clientes en un mismo entorno.',
]

const heroStats = [
  {
    value: '3 perfiles',
    label: 'coordinacion, operacion y clientes dentro del mismo flujo',
  },
  {
    value: 'Tiempo real',
    label: 'para seguir cada unidad y anticipar cambios durante el trayecto',
  },
  {
    value: 'Mas control',
    label: 'sobre rutas, paradas y avisos importantes en cada recorrido',
  },
]

const problems = [
  'Muchas organizaciones coordinan transportes privados con mensajes sueltos, planillas y llamadas.',
  'Los clientes no siempre saben si la unidad esta en camino, demorada o cerca de la parada.',
  'Los operadores reciben consultas por varios canales y pierden tiempo resolviendo lo mismo varias veces.',
]

const features = [
  {
    stop: 'Parada 01',
    title: 'Gestion de rutas de servicio',
    description:
      'Configura recorridos, paradas y horarios desde una interfaz clara para que la operacion tenga control centralizado.',
  },
  {
    stop: 'Parada 02',
    title: 'Seguimiento de unidades en tiempo real',
    description:
      'Muestra el avance del recorrido para que los clientes sepan donde viene la unidad y la coordinacion pueda supervisar.',
  },
  {
    stop: 'Parada 03',
    title: 'Comunicacion conectada',
    description:
      'Reune a coordinacion, operadores y clientes en un mismo flujo para evitar informacion fragmentada y mensajes cruzados.',
  },
  {
    stop: 'Parada 04',
    title: 'Notificaciones automaticas',
    description:
      'Informa novedades, demoras y puntos de llegada para mantener a todos actualizados sin esfuerzo manual.',
  },
]

const roles = [
  {
    title: 'Coordinacion',
    description:
      'Visualiza el servicio completo y coordina transportes privados con informacion mas ordenada.',
    points: [
      'Administran rutas, paradas y recorridos.',
      'Monitorean el estado general de la operacion.',
      'Mejoran la organizacion diaria del servicio.',
    ],
  },
  {
    title: 'Operadores',
    description:
      'Trabajan con recorridos mas claros y comparten el avance del viaje sin depender de llamadas constantes.',
    points: [
      'Reciben indicaciones mas ordenadas.',
      'Informan el progreso del recorrido.',
      'Reducen consultas repetidas durante el trayecto.',
    ],
  },
  {
    title: 'Clientes',
    description:
      'Obtienen visibilidad del recorrido y reciben avisos utiles cuando realmente los necesitan.',
    points: [
      'Saben donde viene la unidad.',
      'Reciben informacion actualizada del viaje.',
      'Ganan tranquilidad en cada traslado.',
    ],
  },
]

const benefits = [
  {
    title: 'Mayor seguridad',
    description:
      'Mas visibilidad del recorrido y mejor control sobre el traslado diario de los alumnos.',
  },
  {
    title: 'Informacion oportuna',
    description:
      'Los clientes cuentan con datos claros sobre el estado de la unidad y posibles cambios.',
  },
  {
    title: 'Operacion mas ordenada',
    description:
      'La escuela puede planificar y supervisar el servicio con menos improvisacion.',
  },
  {
    title: 'Menos errores de comunicacion',
    description:
      'Al centralizar avisos y seguimiento, se reducen dudas, mensajes repetidos y descoordinacion.',
  },
]

function App() {
  const [activeSection, setActiveSection] = useState(journeySections[0].id)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const sectionElements = journeySections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    if (!sectionElements.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        threshold: [0.3, 0.45, 0.6],
        rootMargin: '-18% 0px -42% 0px',
      },
    )

    sectionElements.forEach((sectionElement) => observer.observe(sectionElement))

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/landing/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Consulta enviada. Nos contactaremos pronto.' })
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setFormStatus({ type: 'error', message: 'Error al enviar. Intenta de nuevo.' })
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'No se pudo conectar con el servidor.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const activeSectionIndex = Math.max(
    journeySections.findIndex(({ id }) => id === activeSection),
    0,
  )
  const routeProgress =
    journeySections.length > 1 ? activeSectionIndex / (journeySections.length - 1) : 0

  // Arranca un poco más abajo para no chocar con los badges superiores.
  const busTop = `${14 + routeProgress * 70}%`
  const lineProgress = `${16 + routeProgress * 66}%`

  return (
    <div className="landing-page">
      <header className="hero" id="inicio">
        <nav className="topbar" aria-label="Principal">
          <a className="brand" href="#inicio">
            <span className="brand__icon">B</span>
            <span>Busi</span>
          </a>

          <div className="topbar__links">
            <a href="#presentacion">Presentacion</a>
            <a href="#problema">Problema</a>
            <a href="#solucion">Solucion</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#acciones">Acciones</a>
          </div>
        </nav>

        <div className="hero__content">
          <div className="hero__copy">
            <span className="eyebrow">Plataforma web y movil para transportes privados</span>
            <h1>Busi convierte cada recorrido de servicio en una experiencia mas clara y segura.</h1>
            <p className="hero__lead">
              Busi ayuda a coordinacion, operadores y clientes a organizar rutas de servicio,
              seguir cada unidad en tiempo real y mantener la comunicacion conectada en un
              solo sistema.
            </p>
            <p className="hero__route-note">
              Al bajar por la pagina, la unidad avanza sobre la ruta y cada parada presenta
              una parte clave del sistema.
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="#demo">
                Contactanos
              </a>
              <a className="button button--secondary" href="#solucion">
                Ver la solucion
              </a>
            </div>

            <ul className="hero__highlights" aria-label="Puntos clave de Busi">
              {heroHighlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <ul className="hero__stats" aria-label="Resumen del sistema">
              {heroStats.map((stat) => (
                <li key={stat.value}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="map-card">
              <div className="map-card__legend">
                <span>Recorrido de servicio</span>
                <strong>Ruta conectada</strong>
              </div>
              <div className="map-card__status">Scroll para avanzar por la ruta</div>
              <div className="map-card__block map-card__block--one"></div>
              <div className="map-card__block map-card__block--two"></div>
              <div className="map-card__block map-card__block--three"></div>
              <div className="map-card__bus" style={{ top: busTop }}>
                BUS
              </div>
              <div className="map-card__line"></div>
              <div className="map-card__line-active" style={{ height: lineProgress }}></div>
              <div className="map-card__stop map-card__stop--one">Base</div>
              <div className="map-card__stop map-card__stop--two">Seguimiento</div>
              <div className="map-card__stop map-card__stop--three">Clientes informados</div>
            </div>
          </div>
        </div>
      </header>

      <main className="journey">
        <aside className="journey__rail" aria-label="Recorrido de la landing">
          <div className="journey__track">
            <div className="journey__bus" style={{ top: busTop }}>
              BUS
            </div>
            <div className="journey__line"></div>
            <div className="journey__line-active" style={{ height: lineProgress }}></div>
            <div className="journey__stops">
              {journeySections.map((section) => {
                const isActive = section.id === activeSection

                return (
                  <a
                    key={section.id}
                    className={`journey__stop${isActive ? ' journey__stop--active' : ''}`}
                    href={`#${section.id}`}
                  >
                    <span className="journey__stop-number">{section.stop}</span>
                    {section.label}
                  </a>
                )
              })}
            </div>
          </div>
        </aside>

        <div className="journey__content">
          <section className="content-section content-section--intro" id="presentacion">
            <span className="section-tag">Presentacion del sistema</span>
            <div className="section-layout">
              <div>
                <h2>Busi organiza transportes privados en una plataforma simple, visible y conectada.</h2>
                <p>
                  Busi es un sistema pensado para organizaciones que necesitan planificar rutas
                  de servicio, supervisar el recorrido de cada unidad en tiempo real y mantener
                  a los clientes informados durante todo el trayecto.
                </p>
                <p>
                  Al reunir operacion, seguimiento y comunicacion en un solo lugar, la
                  plataforma reduce la desorganizacion diaria y mejora la experiencia de
                  clientes, operadores y equipos de coordinacion.
                </p>
              </div>

              <aside className="section-note">
                <span className="section-note__eyebrow">Objetivo de Busi</span>
                <strong>Hacer que cada recorrido de servicio sea mas ordenado, visible y facil de coordinar.</strong>
                <ul className="section-note__list">
                  <li>Explica que es Busi y como funciona el sistema.</li>
                  <li>Muestra beneficios reales para coordinacion, operadores y clientes.</li>
                  <li>Invita al usuario a comenzar a usar la plataforma.</li>
                </ul>
              </aside>
            </div>
          </section>

          <section className="content-section content-section--highlight" id="problema">
            <span className="section-tag">Problema actual</span>
            <h2>Hoy los transportes privados suelen depender de informacion fragmentada y poca visibilidad.</h2>
            <p>
              Cuando la coordinacion ocurre por distintos canales, la operacion pierde control,
              los clientes reciben menos certeza y el recorrido se vuelve mas dificil de
              supervisar en tiempo real.
            </p>

            <div className="problem-list">
              {problems.map((problem) => (
                <article key={problem} className="problem-card">
                  <span className="problem-card__marker"></span>
                  <p>{problem}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section" id="solucion">
            <span className="section-tag">La solucion</span>
            <h2>Busi resuelve recorridos de servicio con una plataforma clara, conectada y preparada para crecer.</h2>
            <p>
              Cada parada del recorrido representa una funcionalidad del sistema. En lugar de
              depender de mensajes aislados, Busi centraliza la operacion diaria y facilita
              decisiones con mejor informacion.
            </p>
            <p>
              La experiencia visual acompana esa idea: la unidad avanza mientras el usuario
              hace scroll y cada parada explica una capacidad concreta de la plataforma.
            </p>

            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.title} className="info-card">
                  <span className="info-card__eyebrow">{feature.stop}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section" id="como-funciona">
            <span className="section-tag">Como funciona</span>
            <h2>Un mismo sistema conecta a coordinacion, operadores y clientes con objetivos distintos y una operacion compartida.</h2>
            <p>
              La plataforma adapta la experiencia a cada actor, pero mantiene una base comun
              de informacion para que el servicio completo se entienda y se gestione mejor.
            </p>

            <div className="role-grid">
              {roles.map((role) => (
                <article key={role.title} className="role-card">
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                  <ul className="role-card__list">
                    {role.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section content-section--soft" id="beneficios">
            <span className="section-tag">Beneficios del sistema</span>
            <h2>Mas control para la coordinacion, mas confianza para los clientes y menos friccion en cada recorrido.</h2>
            <div className="benefit-grid">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="benefit-card">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section cta-section" id="acciones">
            <span className="section-tag">Contactanos</span>
            <h2>Contactanos para implementar Busi en tu organizacion.</h2>
            <p>
              Completá tus datos y te contactamos para evaluar tu operacion,
              configurar el servicio y acompanarte en la implementacion.
            </p>

            <form className="contact-form" onSubmit={handleSubmit} id="demo">
              <div className="form-group">
                <label htmlFor="name">Nombre completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electronico *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+54 9 11 2345-6789"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Contanos sobre tu organizacion y que te interesa de Busi"
                  rows="4"
                ></textarea>
              </div>

              {formStatus.message && (
                <div className={`form-status form-status--${formStatus.type}`}>
                  {formStatus.message}
                </div>
              )}

              <button type="submit" className="button button--primary" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
              </button>
            </form>
          </section>

          <footer className="footer">
            <div className="footer__content">
              <div className="footer__section">
                <h4>Busi</h4>
                <p>Plataforma de gestion integral de transportes privados en tiempo real.</p>
              </div>
              <div className="footer__section">
                <h4>Links</h4>
                <ul>
                  <li><a href="#inicio">Inicio</a></li>
                  <li><a href="#solucion">Solución</a></li>
                  <li><a href="#beneficios">Beneficios</a></li>
                  <li><a href="#acciones">Contacto</a></li>
                </ul>
              </div>
              <div className="footer__section">
                <h4>Contacto</h4>
                <p>info@busi.app</p>
                <p>+54 9 11 2345-6789</p>
              </div>
            </div>
            <div className="footer__bottom">
              <p>&copy; 2026 Busi. Todos los derechos reservados.</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
