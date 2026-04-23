import { useState } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="topbar" aria-label="Principal">
      <a className="brand" href="#inicio" onClick={closeMenu}>
        <img className="brand__logo" src={logoSrc} alt="Logo Busi" />
      </a>

      {/* Desktop nav */}
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

      {/* Mobile: hamburger */}
      <div className="topbar__mobile-actions">
        <button
          className={`topbar__burger${isOpen ? ' topbar__burger--open' : ''}`}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile: drawer */}
      <div className={`topbar__drawer${isOpen ? ' topbar__drawer--open' : ''}`} aria-hidden={!isOpen}>
        {links.map((link) => (
          <a key={`mob-${link.href}-${link.label}`} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a className="button button--dark topbar__drawer-cta" href="#acciones" onClick={closeMenu}>
          Portal
        </a>
      </div>

      {/* Overlay para cerrar al tocar afuera */}
      {isOpen && <div className="topbar__overlay" onClick={closeMenu} aria-hidden="true" />}
    </nav>
  )
}

export default Navbar
