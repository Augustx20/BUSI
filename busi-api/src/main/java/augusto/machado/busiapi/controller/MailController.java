package augusto.machado.busiapi.controller;


import augusto.machado.busiapi.dto.ContactMailRequest;
import augusto.machado.busiapi.service.MailService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
public class MailController {

    private final MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/envio")
    public String envio(@Valid @RequestBody ContactMailRequest mail){

        mailService.enviar(mail);
        return "OK";
    }

}
