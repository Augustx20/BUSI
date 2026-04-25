package augusto.machado.busiapi.portal.repository;

import augusto.machado.busiapi.portal.model.Driver;
import augusto.machado.busiapi.portal.model.enums.DriverStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DriverRepository extends JpaRepository<Driver, UUID> {

    List<Driver> findAllByInstitutionId(UUID institutionId);

    List<Driver> findAllByInstitutionIdAndStatus(UUID institutionId, DriverStatus status);

    Optional<Driver> findByIdAndInstitutionId(UUID id, UUID institutionId);

    long countByInstitutionIdAndStatusIn(UUID institutionId, List<DriverStatus> statuses);

    // Drivers NOT assigned to any trip that overlaps the given time window (±2h)
    @Query("""
        SELECT d FROM Driver d
        WHERE d.institution.id = :institutionId
          AND d.status = 'AVAILABLE'
          AND d.id NOT IN (
              SELECT t.driver.id FROM Trip t
              WHERE t.driver IS NOT NULL
                AND t.status IN ('SCHEDULED','IN_PROGRESS')
                AND t.scheduledAt BETWEEN :from AND :to
          )
    """)
    List<Driver> findAvailableAt(UUID institutionId, LocalDateTime from, LocalDateTime to);
}
