package augusto.machado.busiapi.portal.service;

import augusto.machado.busiapi.portal.dto.DriverCreateDTO;
import augusto.machado.busiapi.portal.dto.DriverDTO;
import augusto.machado.busiapi.portal.dto.TripSummaryDTO;
import augusto.machado.busiapi.portal.model.Driver;
import augusto.machado.busiapi.portal.model.Institution;
import augusto.machado.busiapi.portal.model.Vehicle;
import augusto.machado.busiapi.portal.model.enums.DriverStatus;
import augusto.machado.busiapi.portal.repository.DriverRepository;
import augusto.machado.busiapi.portal.repository.InstitutionRepository;
import augusto.machado.busiapi.portal.repository.TripRepository;
import augusto.machado.busiapi.portal.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;
    private final TripRepository tripRepository;
    private final InstitutionRepository institutionRepository;

    public List<DriverDTO> getDrivers(UUID institutionId, DriverStatus status, LocalDateTime availableAt) {
        List<Driver> drivers;

        if (availableAt != null) {
            LocalDateTime from = availableAt.minusHours(2);
            LocalDateTime to   = availableAt.plusHours(2);
            drivers = driverRepository.findAvailableAt(institutionId, from, to);
        } else if (status != null) {
            drivers = driverRepository.findAllByInstitutionIdAndStatus(institutionId, status);
        } else {
            drivers = driverRepository.findAllByInstitutionId(institutionId);
        }

        return drivers.stream().map(d -> {
            Vehicle v = vehicleRepository.findFirstByDriverId(d.getId()).orElse(null);
            return DriverDTO.from(d, v);
        }).toList();
    }

    @Transactional
    public DriverDTO createDriver(UUID institutionId, DriverCreateDTO dto) {
        Institution institution = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Institución no encontrada"));

        Driver driver = Driver.builder()
                .institution(institution)
                .fullName(dto.fullName())
                .documentNumber(dto.documentNumber())
                .phone(dto.phone())
                .licenseNumber(dto.licenseNumber())
                .licenseExpiry(dto.licenseExpiry())
                .status(DriverStatus.AVAILABLE)
                .build();
        driver = driverRepository.save(driver);

        Vehicle vehicle = null;
        if (dto.vehiclePlate() != null) {
            vehicle = Vehicle.builder()
                    .driver(driver)
                    .institution(institution)
                    .plate(dto.vehiclePlate())
                    .model(dto.vehicleModel())
                    .capacity(dto.vehicleCapacity())
                    .build();
            vehicle = vehicleRepository.save(vehicle);
        }

        return DriverDTO.from(driver, vehicle);
    }

    public DriverDTO getDriver(UUID institutionId, UUID driverId) {
        Driver driver = findDriver(institutionId, driverId);
        Vehicle vehicle = vehicleRepository.findFirstByDriverId(driverId).orElse(null);
        return DriverDTO.from(driver, vehicle);
    }

    @Transactional
    public DriverDTO updateDriver(UUID institutionId, UUID driverId, DriverCreateDTO dto) {
        Driver driver = findDriver(institutionId, driverId);
        driver.setFullName(dto.fullName());
        driver.setDocumentNumber(dto.documentNumber());
        driver.setPhone(dto.phone());
        driver.setLicenseNumber(dto.licenseNumber());
        driver.setLicenseExpiry(dto.licenseExpiry());
        driver = driverRepository.save(driver);

        Vehicle vehicle = vehicleRepository.findFirstByDriverId(driverId).orElse(null);
        if (dto.vehiclePlate() != null) {
            if (vehicle == null) {
                vehicle = Vehicle.builder()
                        .driver(driver)
                        .institution(driver.getInstitution())
                        .build();
            }
            vehicle.setPlate(dto.vehiclePlate());
            vehicle.setModel(dto.vehicleModel());
            vehicle.setCapacity(dto.vehicleCapacity());
            vehicle = vehicleRepository.save(vehicle);
        }

        return DriverDTO.from(driver, vehicle);
    }

    public Page<TripSummaryDTO> getDriverTrips(UUID institutionId, UUID driverId, Pageable pageable) {
        findDriver(institutionId, driverId);
        return tripRepository.search(institutionId, null, driverId, null, pageable)
                .map(TripSummaryDTO::from);
    }

    private Driver findDriver(UUID institutionId, UUID driverId) {
        return driverRepository.findByIdAndInstitutionId(driverId, institutionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conductor no encontrado"));
    }
}
