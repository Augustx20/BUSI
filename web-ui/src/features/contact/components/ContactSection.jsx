import { useContactForm } from '../hooks/useContactForm'
import { CONTACT_FORM_MAX_LENGTH } from '../model/contactForm.model'

function ContactSection() {
  const { formData, formStatus, isSubmitting, handleInputChange, handleSubmit } = useContactForm()

  return (
    <>
      <span className="section-tag">Contactanos</span>
      <h2>Contactanos para implementar Busi en tu organizacion.</h2>
      <p>
        Completa tus datos y te contactamos para evaluar tu operacion,
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
            maxLength={CONTACT_FORM_MAX_LENGTH.name}
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
            maxLength={CONTACT_FORM_MAX_LENGTH.email}
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
            maxLength={CONTACT_FORM_MAX_LENGTH.phone}
            placeholder="+54 9 11 2345-6789"
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
    </>
  )
}

export default ContactSection

