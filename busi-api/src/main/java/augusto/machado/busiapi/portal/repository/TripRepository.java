package augusto.machado.busiapi.portal.repository;

import augusto.machado.busiapi.portal.model.Trip;
import augusto.machado.busiapi.portal.model.enums.TripStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TripRepository extends JpaRepository<Trip, UUID> {

    Optional<Trip> findByIdAndInstitutionId(UUID id, UUID institutionId);

    List<Trip> findAllByInstitutionIdAndScheduledAtBetween(UUID institutionId, LocalDateTime from, LocalDateTime to);

    long countByInstitutionIdAndScheduledAtBetweenAndStatus(
            UUID institutionId, LocalDateTime from, LocalDateTime to, TripStatus status);

    @Query("""
        SELECT t FROM Trip t
        WHERE t.institution.id = :institutionId
          AND (:status IS NULL OR t.status = :status)
          AND (:driverId IS NULL OR t.driver.id = :driverId)
          AND (:date IS NULL OR CAST(t.scheduledAt AS date) = CAST(:date AS date))
    """)
    Page<Trip> search(UUID institutionId, TripStatus status, UUID driverId,
                      LocalDateTime date, Pageable pageable);
}
