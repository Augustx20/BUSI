package augusto.machado.busiapi.portal.dto;

import augusto.machado.busiapi.portal.model.Passenger;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.UUID;

public record PassengerDTO(
        UUID id,
        @NotBlank String fullName,
        String documentNumber,
        LocalDate birthDate,
        String phone,
        String emergencyContact,
        String group,
        String defaultStop,
        Boolean active
) {
    public static PassengerDTO from(Passenger p) {
        return new PassengerDTO(
                p.getId(),
                p.getFullName(),
                p.getDocumentNumber(),
                p.getBirthDate(),
                p.getPhone(),
                p.getEmergencyContact(),
                p.getGroup(),
                p.getDefaultStop(),
                p.getActive()
        );
    }
}
