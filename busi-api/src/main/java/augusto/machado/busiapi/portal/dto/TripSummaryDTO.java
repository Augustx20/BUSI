package augusto.machado.busiapi.portal.dto;

import augusto.machado.busiapi.portal.model.Trip;

import java.time.LocalDateTime;
import java.util.UUID;

public record TripSummaryDTO(
        UUID id,
        String name,
        LocalDateTime scheduledAt,
        String origin,
        String destination,
        String driverName,
        int passengerCount,
        String status
) {
    public static TripSummaryDTO from(Trip t) {
        return new TripSummaryDTO(
                t.getId(),
                t.getName(),
                t.getScheduledAt(),
                t.getOrigin(),
                t.getDestination(),
                t.getDriver() != null ? t.getDriver().getFullName() : null,
                t.getTripPassengers().size(),
                t.getStatus().name()
        );
    }
}
