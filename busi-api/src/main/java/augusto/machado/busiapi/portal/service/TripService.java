package augusto.machado.busiapi.portal.service;

import augusto.machado.busiapi.portal.dto.TripCreateDTO;
import augusto.machado.busiapi.portal.dto.TripDetailDTO;
import augusto.machado.busiapi.portal.dto.TripPassengerAssignment;
import augusto.machado.busiapi.portal.dto.TripSummaryDTO;
import augusto.machado.busiapi.portal.model.*;
import augusto.machado.busiapi.portal.model.enums.TripStatus;
import augusto.machado.busiapi.portal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static augusto.machado.busiapi.portal.dto.PassengerDTO.from;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final DriverRepository driverRepository;
    private final PassengerRepository passengerRepository;
    private final StopRepository stopRepository;
    private final InstitutionRepository institutionRepository;

    public Page<TripSummaryDTO> getTrips(UUID institutionId, TripStatus status,
                                          UUID driverId, LocalDateTime date, Pageable pageable) {
        return tripRepository.search(institutionId, status, driverId, date, pageable)
                .map(TripSummaryDTO::from);
    }

    @Transactional
    public TripSummaryDTO createTrip(UUID institutionId, TripCreateDTO dto) {
        Institution institution = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Institución no encontrada"));

        Trip trip = Trip.builder()
                .institution(institution)
                .name(dto.name())
                .scheduledAt(dto.scheduledAt())
                .origin(dto.origin())
                .destination(dto.destination())
                .status(TripStatus.SCHEDULED)
                .build();

        if (dto.driverId() != null) {
            Driver driver = driverRepository.findByIdAndInstitutionId(dto.driverId(), institutionId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conductor no encontrado"));
            trip.setDriver(driver);
        }

        trip = tripRepository.save(trip);

        // Stops
        List<Stop> stops = new ArrayList<>();
        if (dto.stops() != null) {
            for (var stopDto : dto.stops()) {
                Stop stop = Stop.builder()
                        .trip(trip)
                        .name(stopDto.name())
                        .orderIndex(stopDto.orderIndex())
                        .latitude(stopDto.latitude())
                        .longitude(stopDto.longitude())
                        .estimatedTime(stopDto.estimatedTime())
                        .build();
                stops.add(stopRepository.save(stop));
            }
        }
        trip.setStops(stops);

        // Passengers
        if (dto.passengers() != null) {
            for (TripPassengerAssignment assignment : dto.passengers()) {
                Passenger passenger = passengerRepository
                        .findByIdAndInstitutionId(assignment.passengerId(), institutionId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pasajero no encontrado"));

                Stop pickup = findStopById(stops, assignment.stopPickupId());
                Stop drop   = findStopById(stops, assignment.stopDropId());

                TripPassenger tp = TripPassenger.builder()
                        .trip(trip)
                        .passenger(passenger)
                        .stopPickup(pickup)
                        .stopDrop(drop)
                        .build();
                trip.getTripPassengers().add(tp);
            }
            tripRepository.save(trip);
        }

        return TripSummaryDTO.from(trip);
    }

    public TripDetailDTO getTrip(UUID institutionId, UUID tripId) {
        Trip trip = findTrip(institutionId, tripId);
        List<augusto.machado.busiapi.portal.dto.PassengerDTO> passengers = trip.getTripPassengers()
                .stream()
                .map(tp -> from(tp.getPassenger()))
                .toList();
        return TripDetailDTO.from(trip, passengers);
    }

    @Transactional
    public TripSummaryDTO updateTrip(UUID institutionId, UUID tripId, TripCreateDTO dto) {
        Trip trip = findTrip(institutionId, tripId);
        if (trip.getStatus() == TripStatus.IN_PROGRESS
                || trip.getStatus() == TripStatus.COMPLETED
                || trip.getStatus() == TripStatus.CANCELLED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Solo se pueden editar viajes en estado DRAFT o SCHEDULED");
        }

        trip.setName(dto.name());
        trip.setScheduledAt(dto.scheduledAt());
        trip.setOrigin(dto.origin());
        trip.setDestination(dto.destination());

        if (dto.driverId() != null) {
            Driver driver = driverRepository.findByIdAndInstitutionId(dto.driverId(), institutionId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conductor no encontrado"));
            trip.setDriver(driver);
        } else {
            trip.setDriver(null);
        }

        return TripSummaryDTO.from(tripRepository.save(trip));
    }

    @Transactional
    public void cancelTrip(UUID institutionId, UUID tripId) {
        Trip trip = findTrip(institutionId, tripId);
        if (trip.getStatus() == TripStatus.IN_PROGRESS) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "No se puede cancelar un viaje en curso desde el portal");
        }
        trip.setStatus(TripStatus.CANCELLED);
        tripRepository.save(trip);
    }

    @Transactional
    public TripSummaryDTO duplicateTrip(UUID institutionId, UUID tripId) {
        Trip original = findTrip(institutionId, tripId);
        Trip copy = Trip.builder()
                .institution(original.getInstitution())
                .name(original.getName() + " (copia)")
                .scheduledAt(original.getScheduledAt())
                .origin(original.getOrigin())
                .destination(original.getDestination())
                .status(TripStatus.DRAFT)
                .build();
        return TripSummaryDTO.from(tripRepository.save(copy));
    }

    private Trip findTrip(UUID institutionId, UUID tripId) {
        return tripRepository.findByIdAndInstitutionId(tripId, institutionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Viaje no encontrado"));
    }

    private Stop findStopById(List<Stop> stops, UUID id) {
        if (id == null) return null;
        return stops.stream().filter(s -> id.equals(s.getId())).findFirst().orElse(null);
    }
}
