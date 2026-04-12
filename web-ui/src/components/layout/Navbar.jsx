import './Navbar.css'

const logoSrc = '/Logo dinámico de BUSI en azul.png'

const defaultLinks = [
  { href: '#presentacion', label: 'Presentacion' },
  { href: '#problema', label: 'Problema' },
  { href: '#solucion', label: 'Solucion' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#acciones', label: 'Acciones' },
  { href: '#acciones', label: 'Contacto' },
]

function Navbar({ links = defaultLinks }) {
  return (
    <nav className="topbar" aria-label="Principal">
      <a className="brand" href="#inicio">
        <img className="brand__logo" src={logoSrc} alt="Logo Busi" />
      </a>

      <div className="topbar__nav">
        <div className="topbar__links">
          {links.map((link) => (
            <a key={`${link.href}-${link.label}`} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <a className="button button--dark topbar__cta" href="#acciones">
          Portal
        </a>
      </div>
    </nav>
  )
}

export default Navbar
