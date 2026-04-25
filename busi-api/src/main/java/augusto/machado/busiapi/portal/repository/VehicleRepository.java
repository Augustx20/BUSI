package augusto.machado.busiapi.portal.repository;

import augusto.machado.busiapi.portal.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VehicleRepository extends JpaRepository<Vehicle, UUID> {
    List<Vehicle> findAllByDriverId(UUID driverId);
    Optional<Vehicle> findFirstByDriverId(UUID driverId);
}
