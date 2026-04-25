package augusto.machado.busiapi.portal.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record TripCreateDTO(
        @NotBlank String name,
        @NotNull @Future LocalDateTime scheduledAt,
        @NotBlank String origin,
        @NotBlank String destination,
        UUID driverId,
        @Valid List<StopDTO> stops,
        @Valid List<TripPassengerAssignment> passengers
) {}
