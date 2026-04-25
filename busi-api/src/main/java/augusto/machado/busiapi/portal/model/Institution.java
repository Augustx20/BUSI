package augusto.machado.busiapi.portal.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "institutions")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    private String cuit;
    private String address;
    private String contactEmail;
    private String planType;
}
