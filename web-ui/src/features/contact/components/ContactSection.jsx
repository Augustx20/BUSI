import { useContactForm } from '../hooks/useContactForm'
import { CONTACT_FORM_MAX_LENGTH } from '../model/contactForm.model'

function ContactSection() {
  const { formData, formStatus, isSubmitting, handleInputChange, handleSubmit } = useContactForm()

  return (
    <div className="contact-layout">
      <div className="contact-intro">
        <span className="section-tag">Contactanos</span>
        <h2><em className="frase-it">Empezá con nosotros.</em> Implementá Busi en tu organización.</h2>
        <p>
          Completá tus datos y te contactamos para evaluar tu operación,
          <em className="kw"> configurar el servicio</em> y acompañarte en cada paso.
        </p>
        <ul className="contact-perks">
          <li>Sin costo inicial de evaluación</li>
          <li>Configuración personalizada</li>
          <li>Soporte durante la implementación</li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} id="demo">
        <div className="contact-form__row">
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={CONTACT_FORM_MAX_LENGTH.name}
              required
              placeholder="Tu nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              maxLength={CONTACT_FORM_MAX_LENGTH.phone}
              placeholder="+54 9 11 2345-6789"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            maxLength={CONTACT_FORM_MAX_LENGTH.email}
            required
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Asunto *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            maxLength={CONTACT_FORM_MAX_LENGTH.subject}
            required
            placeholder="Quiero conocer Busi"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            maxLength={CONTACT_FORM_MAX_LENGTH.message}
            required
            placeholder="Contanos sobre tu organización y qué te interesa de Busi"
            rows="3"
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
    </div>
  )
}

export default ContactSection
