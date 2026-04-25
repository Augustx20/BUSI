package augusto.machado.busiapi.portal.dto;

import augusto.machado.busiapi.portal.model.Stop;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;
import java.util.UUID;

public record StopDTO(
        UUID id,
        @NotBlank String name,
        @NotNull Integer orderIndex,
        Double latitude,
        Double longitude,
        LocalTime estimatedTime
) {
    public static StopDTO from(Stop s) {
        return new StopDTO(s.getId(), s.getName(), s.getOrderIndex(),
                s.getLatitude(), s.getLongitude(), s.getEstimatedTime());
    }
}
