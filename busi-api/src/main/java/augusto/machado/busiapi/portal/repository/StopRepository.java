package augusto.machado.busiapi.portal.repository;

import augusto.machado.busiapi.portal.model.Stop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StopRepository extends JpaRepository<Stop, UUID> {
    List<Stop> findAllByTripIdOrderByOrderIndex(UUID tripId);
}
