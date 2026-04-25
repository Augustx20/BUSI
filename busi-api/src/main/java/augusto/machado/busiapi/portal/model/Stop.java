package augusto.machado.busiapi.portal.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "stops")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Stop {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(nullable = false)
    private String name;

    private Integer orderIndex;
    private Double latitude;
    private Double longitude;
    private LocalTime estimatedTime;
}
