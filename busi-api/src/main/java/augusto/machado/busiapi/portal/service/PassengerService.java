package augusto.machado.busiapi.portal.service;

import augusto.machado.busiapi.portal.dto.PassengerDTO;
import augusto.machado.busiapi.portal.model.Institution;
import augusto.machado.busiapi.portal.model.Passenger;
import augusto.machado.busiapi.portal.repository.InstitutionRepository;
import augusto.machado.busiapi.portal.repository.PassengerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PassengerService {

    private final PassengerRepository passengerRepository;
    private final InstitutionRepository institutionRepository;

    public Page<PassengerDTO> getPassengers(UUID institutionId, String search,
                                             String group, Boolean active, Pageable pageable) {
        return passengerRepository.search(institutionId, search, group, active, pageable)
                .map(PassengerDTO::from);
    }

    @Transactional
    public PassengerDTO createPassenger(UUID institutionId, PassengerDTO dto) {
        Institution institution = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Institución no encontrada"));

        Passenger passenger = Passenger.builder()
                .institution(institution)
                .fullName(dto.fullName())
                .documentNumber(dto.documentNumber())
                .birthDate(dto.birthDate())
                .phone(dto.phone())
                .emergencyContact(dto.emergencyContact())
                .group(dto.group())
                .defaultStop(dto.defaultStop())
                .active(dto.active() != null ? dto.active() : true)
                .build();

        return PassengerDTO.from(passengerRepository.save(passenger));
    }

    public PassengerDTO getPassenger(UUID institutionId, UUID passengerId) {
        return PassengerDTO.from(findPassenger(institutionId, passengerId));
    }

    @Transactional
    public PassengerDTO updatePassenger(UUID institutionId, UUID passengerId, PassengerDTO dto) {
        Passenger passenger = findPassenger(institutionId, passengerId);
        passenger.setFullName(dto.fullName());
        passenger.setDocumentNumber(dto.documentNumber());
        passenger.setBirthDate(dto.birthDate());
        passenger.setPhone(dto.phone());
        passenger.setEmergencyContact(dto.emergencyContact());
        passenger.setGroup(dto.group());
        passenger.setDefaultStop(dto.defaultStop());
        if (dto.active() != null) passenger.setActive(dto.active());
        return PassengerDTO.from(passengerRepository.save(passenger));
    }

    private Passenger findPassenger(UUID institutionId, UUID passengerId) {
        return passengerRepository.findByIdAndInstitutionId(passengerId, institutionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pasajero no encontrado"));
    }
}
