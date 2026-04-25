package augusto.machado.busiapi.portal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DriverCreateDTO(
        @NotBlank String fullName,
        @NotBlank String documentNumber,
        String phone,
        String licenseNumber,
        @NotNull LocalDate licenseExpiry,
        // Vehicle fields (optional at creation)
        String vehiclePlate,
        String vehicleModel,
        Integer vehicleCapacity
) {}
