package augusto.machado.busiapi.service;

import augusto.machado.busiapi.dto.ContactMailRequest;
import augusto.machado.busiapi.exception.MailDeliveryException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;
    private final String contactRecipient;
    private final String fromAddress;

    public MailService(
            JavaMailSender javaMailSender,
            @Value("${app.mail.contact.recipient}") String contactRecipient,
            @Value("${app.mail.contact.from:${spring.mail.username}}") String fromAddress
    ) {
        this.javaMailSender = javaMailSender;
        this.contactRecipient = contactRecipient;
        this.fromAddress = fromAddress;
    }

    public void enviar(ContactMailRequest mail) {
        SimpleMailMessage mensaje =  new SimpleMailMessage();

        mensaje.setTo(contactRecipient);
        mensaje.setFrom(fromAddress);
        mensaje.setReplyTo(mail.getEmail());
        mensaje.setSubject("[Contacto Web] " + mail.getSubject());
        mensaje.setText(buildBody(mail));

        try {
            javaMailSender.send(mensaje);
        } catch (MailException ex) {
            throw new MailDeliveryException("No se pudo enviar el mensaje de contacto", ex);
        }
    }

    private String buildBody(ContactMailRequest mail) {
        String telefono = (mail.getPhone() == null || mail.getPhone().isBlank()) ? "No informado" : mail.getPhone().trim();

        return "Nombre: " + mail.getName() + System.lineSeparator()
                + "Email: " + mail.getEmail() + System.lineSeparator()
                + "Telefono: " + telefono + System.lineSeparator()
                + System.lineSeparator()
                + "Mensaje:" + System.lineSeparator()
                + mail.getMessage();
    }
}
