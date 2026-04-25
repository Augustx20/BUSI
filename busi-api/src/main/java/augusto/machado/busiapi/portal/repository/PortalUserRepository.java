package augusto.machado.busiapi.portal.repository;

import augusto.machado.busiapi.portal.model.PortalUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PortalUserRepository extends JpaRepository<PortalUser, UUID> {
    Optional<PortalUser> findByEmail(String email);
}
