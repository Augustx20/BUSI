package augusto.machado.busiapi.portal.dto;

import augusto.machado.busiapi.portal.model.Trip;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record TripDetailDTO(
        UUID id,
        String name,
        LocalDateTime scheduledAt,
        String origin,
        String destination,
        String status,
        DriverDTO driver,
        List<StopDTO> stops,
        List<PassengerDTO> passengers
) {
    public static TripDetailDTO from(Trip t, List<PassengerDTO> passengers) {
        return new TripDetailDTO(
                t.getId(),
                t.getName(),
                t.getScheduledAt(),
                t.getOrigin(),
                t.getDestination(),
                t.getStatus().name(),
                t.getDriver() != null ? DriverDTO.from(t.getDriver(), null) : null,
                t.getStops().stream().map(StopDTO::from).toList(),
                passengers
        );
    }
}
