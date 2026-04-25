package augusto.machado.busiapi.portal.repository;

import augusto.machado.busiapi.portal.model.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InstitutionRepository extends JpaRepository<Institution, UUID> {
}
