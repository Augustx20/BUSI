package augusto.machado.busiapi.portal.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "passengers")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;

    @Column(nullable = false)
    private String fullName;

    private String documentNumber;
    private LocalDate birthDate;
    private String phone;
    private String emergencyContact;

    @Column(name = "group_name")
    private String group;

    private String defaultStop;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;
}
