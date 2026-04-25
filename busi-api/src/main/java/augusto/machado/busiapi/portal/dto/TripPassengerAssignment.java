package augusto.machado.busiapi.portal.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record TripPassengerAssignment(
        @NotNull UUID passengerId,
        UUID stopPickupId,
        UUID stopDropId
) {}
