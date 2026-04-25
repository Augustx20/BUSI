package augusto.machado.busiapi.portal.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "trip_passengers")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class TripPassenger {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "passenger_id", nullable = false)
    private Passenger passenger;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stop_pickup_id")
    private Stop stopPickup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stop_drop_id")
    private Stop stopDrop;
}
