package augusto.machado.busiapi.portal.dto;

import augusto.machado.busiapi.portal.model.Driver;
import augusto.machado.busiapi.portal.model.Vehicle;

import java.time.LocalDate;
import java.util.UUID;

public record DriverDTO(
        UUID id,
        String fullName,
        String documentNumber,
        String phone,
        String licenseNumber,
        LocalDate licenseExpiry,
        String status,
        String vehiclePlate,
        String vehicleModel,
        Integer vehicleCapacity
) {
    public static DriverDTO from(Driver d, Vehicle v) {
        return new DriverDTO(
                d.getId(),
                d.getFullName(),
                d.getDocumentNumber(),
                d.getPhone(),
                d.getLicenseNumber(),
                d.getLicenseExpiry(),
                d.getStatus().name(),
                v != null ? v.getPlate() : null,
                v != null ? v.getModel() : null,
                v != null ? v.getCapacity() : null
        );
    }
}
