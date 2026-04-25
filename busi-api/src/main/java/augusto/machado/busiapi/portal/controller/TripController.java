package augusto.machado.busiapi.portal.controller;

import augusto.machado.busiapi.portal.dto.TripCreateDTO;
import augusto.machado.busiapi.portal.dto.TripDetailDTO;
import augusto.machado.busiapi.portal.dto.TripSummaryDTO;
import augusto.machado.busiapi.portal.model.PortalUser;
import augusto.machado.busiapi.portal.model.enums.TripStatus;
import augusto.machado.busiapi.portal.service.TripService;
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
import java.util.UUID;

@RestController
@RequestMapping("/api/portal/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @GetMapping
    public ResponseEntity<Page<TripSummaryDTO>> getTrips(
            @AuthenticationPrincipal PortalUser user,
            @RequestParam(required = false) TripStatus status,
            @RequestParam(required = false) UUID driverId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date,
            @PageableDefault(size = 20) Pageable pageable) {

        return ResponseEntity.ok(tripService.getTrips(
                user.getInstitution().getId(), status, driverId, date, pageable));
    }

    @PostMapping
    public ResponseEntity<TripSummaryDTO> createTrip(
            @AuthenticationPrincipal PortalUser user,
            @Valid @RequestBody TripCreateDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(tripService.createTrip(user.getInstitution().getId(), dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripDetailDTO> getTrip(
            @AuthenticationPrincipal PortalUser user,
            @PathVariable UUID id) {

        return ResponseEntity.ok(tripService.getTrip(user.getInstitution().getId(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripSummaryDTO> updateTrip(
            @AuthenticationPrincipal PortalUser user,
            @PathVariable UUID id,
            @Valid @RequestBody TripCreateDTO dto) {

        return ResponseEntity.ok(tripService.updateTrip(user.getInstitution().getId(), id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelTrip(
            @AuthenticationPrincipal PortalUser user,
            @PathVariable UUID id) {

        tripService.cancelTrip(user.getInstitution().getId(), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/duplicate")
    public ResponseEntity<TripSummaryDTO> duplicateTrip(
            @AuthenticationPrincipal PortalUser user,
            @PathVariable UUID id) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(tripService.duplicateTrip(user.getInstitution().getId(), id));
    }
}
