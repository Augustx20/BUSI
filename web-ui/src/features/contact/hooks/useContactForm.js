import { useState } from 'react'
import { CONTACT_FORM_INITIAL_VALUES } from '../model/contactForm.model'
import { sendContactMail } from '../services/sendContactMail'

export function useContactForm() {
  const [formData, setFormData] = useState(CONTACT_FORM_INITIAL_VALUES)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    try {
      const result = await sendContactMail(formData)

      if (result.ok) {
        setFormStatus({ type: 'success', message: 'Consulta enviada. Te contactaremos pronto.' })
        setFormData(CONTACT_FORM_INITIAL_VALUES)
        return
      }

      if (result.status === 400 && result.body?.message) {
        setFormStatus({ type: 'error', message: result.body.message })
      } else if (result.status === 503 && result.body?.message) {
        setFormStatus({ type: 'error', message: result.body.message })
      } else {
        setFormStatus({ type: 'error', message: 'Error al enviar. Intenta de nuevo.' })
      }
    } catch {
      setFormStatus({ type: 'error', message: 'No se pudo conectar con el servidor.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    formStatus,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  }
}

