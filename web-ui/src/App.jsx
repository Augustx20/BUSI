import { useEffect, useRef, useState } from 'react'
import './App.css'
import ContactSection from './features/contact/components/ContactSection'

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
  const [routeProgress, setRouteProgress] = useState(0)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)

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

  useEffect(() => {
    let frameId = null
    let resizeTimeoutId = null

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

    const computeTargetProgress = () => {
      const journeyElement = document.querySelector('.journey')
      const contactSection = document.getElementById('acciones')

      if (!journeyElement || !contactSection) {
        return
      }

      const viewportAnchor = window.scrollY + window.innerHeight * 0.42
      const journeyStartY = journeyElement.getBoundingClientRect().top + window.scrollY

      // El bus se fija en el ultimo punto cuando el ancla visual alcanza Contacto.
      const contactLockY =
        contactSection.getBoundingClientRect().top +
        window.scrollY +
        contactSection.getBoundingClientRect().height * 0.18

      const rawProgress = (viewportAnchor - journeyStartY) / Math.max(contactLockY - journeyStartY, 1)
      targetProgressRef.current = clamp(rawProgress, 0, 1)
    }

    const animate = () => {
      const target = targetProgressRef.current
      const current = currentProgressRef.current
      const next = current + (target - current) * 0.18

      if (Math.abs(next - target) < 0.0012) {
        currentProgressRef.current = target
        setRouteProgress(target)
        frameId = null
        return
      }

      currentProgressRef.current = next
      setRouteProgress(next)
      frameId = window.requestAnimationFrame(animate)
    }

    const syncProgress = () => {
      computeTargetProgress()

      if (frameId === null) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    const handleResize = () => {
      // Debounce simple para evitar recalculos excesivos durante resize continuo.
      window.clearTimeout(resizeTimeoutId)
      resizeTimeoutId = window.setTimeout(syncProgress, 80)
    }

    syncProgress()
    window.addEventListener('scroll', syncProgress, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', syncProgress)
      window.removeEventListener('resize', handleResize)

      if (resizeTimeoutId) {
        window.clearTimeout(resizeTimeoutId)
      }

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  // Ajuste fino: permite que el bus sobrepase levemente la ultima parada visual.
  const BUS_START = 14
  const BUS_TRAVEL = 75
  const LINE_START = 16
  const LINE_TRAVEL = 70

  const busTop = `${BUS_START + routeProgress * BUS_TRAVEL}%`
  const lineProgress = `${LINE_START + routeProgress * LINE_TRAVEL}%`

  return (
    <div className="landing-page">
      <header className="hero" id="inicio">
        <div className="hero__shell">
          <nav className="topbar" aria-label="Principal">
            <a className="brand" href="#inicio">
              <span>Busi</span>
            </a>

            <div className="topbar__links">
              <a href="#presentacion">Presentacion</a>
              <a href="#problema">Problema</a>
              <a href="#solucion">Solucion</a>
              <a href="#como-funciona">Como funciona</a>
              <a href="#acciones">Acciones</a>
            </div>

            <a className="button button--dark topbar__cta" href="#acciones">
              Contacto
            </a>
          </nav>

          <div className="hero__content">
            <div className="hero__copy">
              <span className="eyebrow eyebrow--hero">Plataforma web y movil para transportes privados</span>
              <h1>Busi convierte cada recorrido de servicio en una experiencia mas clara y segura.</h1>
              <p className="hero__lead">
                Busi ayuda a coordinacion, operadores y clientes a organizar rutas de servicio,
                seguir cada unidad en tiempo real y mantener la comunicacion conectada en un
                solo sistema.
              </p>

              <div className="hero__actions">
                <a className="button button--primary" href="#acciones">
                  Contactanos
                </a>
                <a className="button button--secondary" href="#solucion">
                  Ver la solucion
                </a>
              </div>
            </div>
          </div>

          <div className="hero__summary">
            <div className="hero__note-card">
              <span className="section-tag">Vision general</span>
              <p className="hero__route-note">
                Al bajar por la pagina, la unidad avanza sobre la ruta y cada parada presenta
                una parte clave del sistema.
              </p>

              <ul className="hero__highlights" aria-label="Puntos clave de Busi">
                {heroHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <ul className="hero__stats" aria-label="Resumen del sistema">
              {heroStats.map((stat) => (
                <li key={stat.value}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
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
            <ContactSection />
          </section>
        </div>
      </main>

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
  )
}

export default App
