package augusto.machado.busiapi.portal.controller;

import augusto.machado.busiapi.portal.dto.DriverCreateDTO;
import augusto.machado.busiapi.portal.dto.DriverDTO;
import augusto.machado.busiapi.portal.dto.TripSummaryDTO;
import augusto.machado.busiapi.portal.model.PortalUser;
import augusto.machado.busiapi.portal.model.enums.DriverStatus;
import augusto.machado.busiapi.portal.service.DriverService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/portal/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    @GetMapping
    public ResponseEntity<List<DriverDTO>> getDrivers(
            @AuthenticationPrincipal PortalUser user,
            @RequestParam(required = false) DriverStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime availableAt) {

        return ResponseEntity.ok(driverService.getDrivers(
                user.getInstitution().getId(), status, availableAt));
    }

    @PostMapping
    public ResponseEntity<DriverDTO> createDriver(
            @AuthenticationPrincipal PortalUser user,
            @Valid @RequestBody DriverCreateDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(driverService.createDriver(user.getInstitution().getId(), dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DriverDTO> getDriver(
            @AuthenticationPrincipal PortalUser user,
            @PathVariable UUID id) {

        return ResponseEntity.ok(driverService.getDriver(user.getInstitution().getId(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DriverDTO> updateDriver(
            @AuthenticationPrincipal PortalUser user,
            @PathVariable UUID id,
            @Valid @RequestBody DriverCreateDTO dto) {

        return ResponseEntity.ok(driverService.updateDriver(user.getInstitution().getId(), id, dto));
    }

    @GetMapping("/{id}/trips")
    public ResponseEntity<Page<TripSummaryDTO>> getDriverTrips(
            @AuthenticationPrincipal PortalUser user,
            @PathVariable UUID id,
            @PageableDefault(size = 20) Pageable pageable) {

        return ResponseEntity.ok(driverService.getDriverTrips(
                user.getInstitution().getId(), id, pageable));
    }
}
