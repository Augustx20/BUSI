import { useEffect, useRef, useState } from 'react'
import './App.css'
import ContactSection from './features/contact/components/ContactSection'
import Navbar from './components/layout/Navbar'

const journeySections = [
  { id: 'presentacion', label: 'Inicio', stop: '01' },
  { id: 'problema', label: 'Diagnostico', stop: '02' },
  { id: 'solucion', label: 'Ruta', stop: '03' },
  { id: 'como-funciona', label: 'Actores', stop: '04' },
  { id: 'beneficios', label: 'Impacto', stop: '05' },
  { id: 'acciones', label: 'Accion', stop: '06' },
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
    image: "/images/Amy's flight home.jpeg",
    imagePosition: 'center 40%',
  },
  {
    stop: 'Parada 02',
    title: 'Seguimiento de unidades en tiempo real',
    description:
      'Muestra el avance del recorrido para que los clientes sepan donde viene la unidad y la coordinacion pueda supervisar.',
    image:
      '/images/Great work makes a great office. Creative multi ethnic business group at lunch break.jpeg',
    imagePosition: 'center 35%',
  },
  {
    stop: 'Parada 03',
    title: 'Comunicacion conectada',
    description:
      'Reune a coordinacion, operadores y clientes en un mismo flujo para evitar informacion fragmentada y mensajes cruzados.',
    image: '/images/Two women analyzing document.jpeg',
    imagePosition: 'center 36%',
  },
  {
    stop: 'Parada 04',
    title: 'Notificaciones automaticas',
    description:
      'Informa novedades, demoras y puntos de llegada para mantener a todos actualizados sin esfuerzo manual.',
    image: '/images/Family sitting on the floor together, using a tablet .jpeg',
    imagePosition: 'center 42%',
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

const tripStatusByCode = {
  'BUS-1024': {
    status: 'En camino',
    detail: 'La unidad avanza en horario y llegara en aproximadamente 14 minutos.',
    tone: 'ontime',
  },
  'BUS-2048': {
    status: 'Demorado',
    detail: 'Hay trafico en la ruta. Nuevo arribo estimado en 28 minutos.',
    tone: 'delayed',
  },
  'BUS-3096': {
    status: 'Finalizado',
    detail: 'El viaje ya llego a destino y fue cerrado correctamente.',
    tone: 'done',
  },
}

const getPublicImageUrl = (imagePath) => {
  const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  return `${import.meta.env.BASE_URL}${encodeURI(normalizedPath)}`
}

function App() {
  const [activeSection, setActiveSection] = useState(journeySections[0].id)
  const [routeProgress, setRouteProgress] = useState(0)
  const [tripCode, setTripCode] = useState('')
  const [tripLookup, setTripLookup] = useState(null)
  const [tripLookupError, setTripLookupError] = useState('')
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)

  const handleTripSearch = (event) => {
    event.preventDefault()

    const normalizedCode = tripCode.trim().toUpperCase()

    if (!normalizedCode) {
      setTripLookup(null)
      setTripLookupError('Ingresa un codigo de viaje para consultar el estado.')
      return
    }

    const foundTrip = tripStatusByCode[normalizedCode]

    if (!foundTrip) {
      setTripLookup(null)
      setTripLookupError('No encontramos ese codigo. Proba con BUS-1024, BUS-2048 o BUS-3096.')
      return
    }

    setTripLookup({
      code: normalizedCode,
      ...foundTrip,
    })
    setTripLookupError('')
  }

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

  // ── Reveal on scroll ──────────────────────────────────────────
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            return
          }

          entry.target.classList.remove('is-visible')
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Ajuste fino: permite que el bus sobrepase levemente la ultima parada visual.
  const BUS_START = 14
  const BUS_TRAVEL = 75
  const LINE_START = 12
  const BUS_LINE_GAP = 2.8

  const busTopValue = BUS_START + routeProgress * BUS_TRAVEL
  const lineProgressValue = Math.max(LINE_START, busTopValue - BUS_LINE_GAP)

  const busTop = `${busTopValue}%`
  const lineProgress = `${lineProgressValue}%`

  return (
    <div className="landing-page">
      <header className="hero" id="inicio">
        <div className="hero__shell">
          <Navbar />

          <div className="hero__content">
            <div className="hero__copy">
              <span className="eyebrow eyebrow--hero">Plataforma web y movil para transportes privados</span>
              <h1>Todo tu transporte, <em className="kw kw--light">en un solo lugar.</em></h1>
              <p className="hero__lead">Optimización, trazabilidad y control para tu operación de transporte.</p>

            </div>

            <form className="hero__trip-search" onSubmit={handleTripSearch} aria-label="Consultar estado de viaje">
              <label className="hero__trip-search-title" htmlFor="trip-code-input">
                Estado de tu viaje
              </label>

              <div className="hero__trip-search-controls">
                <input
                  id="trip-code-input"
                  type="text"
                  placeholder="Ingresa tu codigo. Ej: BUS-1024"
                  value={tripCode}
                  onChange={(event) => {
                    setTripCode(event.target.value)
                    setTripLookupError('')
                  }}
                />
                <button className="button button--primary hero__trip-search-button" type="submit">
                  Buscar
                </button>
              </div>

              {tripLookupError && (
                <p className="hero__trip-search-feedback hero__trip-search-feedback--error">{tripLookupError}</p>
              )}

              {!tripLookupError && tripLookup && (
                <p className={`hero__trip-search-feedback hero__trip-search-feedback--${tripLookup.tone}`}>
                  <strong>{tripLookup.status}:</strong> {tripLookup.detail}
                </p>
              )}
            </form>
          </div>

          <div className="hero__summary">
            <div className="hero__vision-copy">
              <span className="section-tag">Visión general</span>
              <p className="hero__vision-title">Una operación <em className="kw">más clara</em>, conectada y predecible — con control y visibilidad en cada recorrido.</p>
              <p className="hero__vision-lead">
                Busi unifica <em className="kw">planificación</em>, seguimiento y comunicación en una sola plataforma, permitiendo que cada actor del servicio tome mejores decisiones con información en tiempo real.
              </p>
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
              <img src={getPublicImageUrl('bus_top_view_icon.svg')} alt="" aria-hidden="true" />
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
          <section className="content-section content-section--intro" id="presentacion" data-reveal>
            <span className="section-tag" data-reveal>Presentación del sistema</span>
            <div className="section-layout">
              <div>
                <h2 data-reveal>Busi organiza transportes privados en una plataforma <em className="kw">simple, visible y conectada.</em></h2>
                <p data-reveal>
                  Busi es un sistema pensado para organizaciones que necesitan planificar rutas
                  de servicio, supervisar el recorrido de cada unidad en <em className="kw">tiempo real</em> y mantener
                  a los clientes informados durante todo el trayecto.
                </p>
                <p data-reveal>
                  Al reunir operacion, seguimiento y comunicacion en un solo lugar, la
                  plataforma reduce la desorganizacion diaria y mejora la experiencia de
                  clientes, operadores y equipos de coordinacion.
                </p>
              </div>

              <aside className="section-note" data-reveal>
                <span className="section-note__eyebrow">Objetivo de Busi</span>
                <strong>Hacer que cada recorrido de servicio sea más <em className="kw">ordenado, visible y fácil de coordinar.</em></strong>
                <ul className="section-note__list">
                  <li>Explica que es Busi y como funciona el sistema.</li>
                  <li>Muestra beneficios reales para coordinacion, operadores y clientes.</li>
                  <li>Invita al usuario a comenzar a usar la plataforma.</li>
                </ul>
              </aside>
            </div>
          </section>

          <section className="content-section content-section--highlight" id="problema" data-reveal>
            <span className="section-tag" data-reveal>Problema actual</span>
            <h2 data-reveal>Hoy los transportes privados dependen de información <em className="kw">fragmentada</em> y poca visibilidad.</h2>
            <p data-reveal>
              Cuando la coordinacion ocurre por distintos canales, la operacion pierde <em className="kw">control</em>,
              los clientes reciben menos certeza y el recorrido se vuelve mas dificil de
              supervisar en tiempo real.
            </p>

            <div className="problem-list">
              {problems.map((problem, i) => (
                <article key={problem} className="problem-card" data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}>
                  <span className="problem-card__marker"></span>
                  <p>{problem}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section" id="solucion" data-reveal>
            <span className="section-tag" data-reveal>La solución</span>
            <h2 data-reveal>Busi resuelve recorridos con una plataforma <em className="kw">clara, conectada y preparada para crecer.</em></h2>
            <p data-reveal>
              Cada parada del recorrido representa una funcionalidad del sistema. En lugar de
              depender de mensajes aislados, Busi <em className="kw">centraliza</em> la operacion diaria y facilita
              decisiones con mejor informacion.
            </p>
            <p data-reveal>
              La experiencia visual acompana esa idea: la unidad avanza mientras el usuario
              hace scroll y cada parada explica una capacidad concreta de la plataforma.
            </p>

            <div className="feature-grid">
              {features.map((feature, i) => {
                const featureImageUrl = getPublicImageUrl(feature.image)

                return (
                  <article
                    key={feature.title}
                    className="info-card info-card--media"
                    data-reveal
                    style={{
                      '--reveal-delay': `${i * 80}ms`,
                      backgroundImage: `linear-gradient(180deg, rgba(5, 16, 36, 0.16) 18%, rgba(3, 10, 24, 0.84) 100%), url("${featureImageUrl}")`,
                      backgroundPosition: feature.imagePosition,
                    }}
                  >
                    <span className="info-card__eyebrow info-card__eyebrow--media">{feature.stop}</span>
                    <div className="info-card__body">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                      <a className="info-card__cta" href="#acciones">
                        <span className="info-card__cta-icon" aria-hidden="true">
                          {'>'}
                        </span>
                        Ver mas
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="content-section" id="como-funciona" data-reveal>
            <span className="section-tag" data-reveal>Cómo funciona</span>
            <h2 data-reveal>Un mismo sistema conecta coordinacion, operadores y clientes — <em className="kw">un solo flujo, tres perspectivas.</em></h2>
            <p data-reveal>
              La plataforma adapta la experiencia a cada actor, pero mantiene una base <em className="kw">común</em>
              de informacion para que el servicio completo se entienda y se gestione mejor.
            </p>

            <div className="role-grid">
              {roles.map((role, i) => (
                <article key={role.title} className="role-card" data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}>
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

          <section className="content-section content-section--soft" id="beneficios" data-reveal>
            <span className="section-tag" data-reveal>Beneficios del sistema</span>
            <h2 data-reveal>Más <em className="kw">control</em> para la coordinacion, más <em className="kw">confianza</em> para los clientes y menos fricción en cada recorrido.</h2>
            <div className="benefit-grid">
              {benefits.map((benefit, i) => (
                <article key={benefit.title} className="benefit-card" data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section cta-section" id="acciones" data-reveal>
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
