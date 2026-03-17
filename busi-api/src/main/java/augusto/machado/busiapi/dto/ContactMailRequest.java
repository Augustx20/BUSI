package augusto.machado.busiapi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactMailRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 120, message = "El nombre no puede superar 120 caracteres")
    private String name;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email no tiene un formato valido")
    @Size(max = 180, message = "El email no puede superar 180 caracteres")
    private String email;

    @Size(max = 40, message = "El telefono no puede superar 40 caracteres")
    private String phone;

    @NotBlank(message = "El asunto es obligatorio")
    @Size(max = 160, message = "El asunto no puede superar 160 caracteres")
    private String subject;

    @NotBlank(message = "El mensaje es obligatorio")
    @Size(max = 5000, message = "El mensaje no puede superar 5000 caracteres")
    private String message;
}

