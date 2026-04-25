package augusto.machado.busiapi.portal.repository;

import augusto.machado.busiapi.portal.model.TripPassenger;
import augusto.machado.busiapi.portal.model.enums.TripStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface TripPassengerRepository extends JpaRepository<TripPassenger, UUID> {

    long countByTripInstitutionIdAndTripStatus(UUID institutionId, TripStatus status);

    @Query("""
        SELECT COUNT(tp) FROM TripPassenger tp
        WHERE tp.trip.institution.id = :institutionId
          AND tp.trip.status = 'IN_PROGRESS'
    """)
    long countPassengersInProgress(UUID institutionId);
}
