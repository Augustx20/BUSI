package augusto.machado.busiapi.portal.repository;

import augusto.machado.busiapi.portal.model.Passenger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface PassengerRepository extends JpaRepository<Passenger, UUID> {

    Optional<Passenger> findByIdAndInstitutionId(UUID id, UUID institutionId);

    @Query("""
        SELECT p FROM Passenger p
        WHERE p.institution.id = :institutionId
          AND (:search IS NULL OR LOWER(p.fullName) LIKE LOWER(CONCAT('%',:search,'%'))
               OR p.documentNumber LIKE CONCAT('%',:search,'%'))
          AND (:groupName IS NULL OR p.group = :groupName)
          AND (:active IS NULL OR p.active = :active)
    """)
    Page<Passenger> search(UUID institutionId, String search, String groupName, Boolean active, Pageable pageable);
}
