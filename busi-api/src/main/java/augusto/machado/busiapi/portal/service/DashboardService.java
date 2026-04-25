package augusto.machado.busiapi.portal.service;

import augusto.machado.busiapi.portal.dto.DashboardStatsDTO;
import augusto.machado.busiapi.portal.dto.TripSummaryDTO;
import augusto.machado.busiapi.portal.model.enums.DriverStatus;
import augusto.machado.busiapi.portal.model.enums.TripStatus;
import augusto.machado.busiapi.portal.repository.DriverRepository;
import augusto.machado.busiapi.portal.repository.TripPassengerRepository;
import augusto.machado.busiapi.portal.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TripRepository tripRepository;
    private final DriverRepository driverRepository;
    private final TripPassengerRepository tripPassengerRepository;

    public DashboardStatsDTO getStats(UUID institutionId) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay   = LocalDate.now().atTime(LocalTime.MAX);

        long tripsToday = tripRepository
                .findAllByInstitutionIdAndScheduledAtBetween(institutionId, startOfDay, endOfDay)
                .size();

        long tripsInProgress = tripRepository
                .countByInstitutionIdAndScheduledAtBetweenAndStatus(
                        institutionId, startOfDay, endOfDay, TripStatus.IN_PROGRESS);

        long activeDrivers = driverRepository
                .countByInstitutionIdAndStatusIn(institutionId,
                        List.of(DriverStatus.AVAILABLE, DriverStatus.ON_TRIP));

        long passengersInRoute = tripPassengerRepository.countPassengersInProgress(institutionId);

        return new DashboardStatsDTO(tripsToday, tripsInProgress, activeDrivers, passengersInRoute);
    }

    public List<TripSummaryDTO> getTripsToday(UUID institutionId) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay   = LocalDate.now().atTime(LocalTime.MAX);

        return tripRepository
                .findAllByInstitutionIdAndScheduledAtBetween(institutionId, startOfDay, endOfDay)
                .stream()
                .map(TripSummaryDTO::from)
                .toList();
    }
}
