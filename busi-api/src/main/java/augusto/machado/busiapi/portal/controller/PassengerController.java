package augusto.machado.busiapi.portal.controller;

import augusto.machado.busiapi.portal.dto.PassengerDTO;
import augusto.machado.busiapi.portal.model.PortalUser;
import augusto.machado.busiapi.portal.service.PassengerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/portal/passengers")
@RequiredArgsConstructor
public class PassengerController {

    private final PassengerService passengerService;

    @GetMapping
    public ResponseEntity<Page<PassengerDTO>> getPassengers(
            @AuthenticationPrincipal PortalUser user,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String group,
            @RequestParam(required = false) Boolean active,
            @PageableDefault(size = 20) Pageable pageable) {

        return ResponseEntity.ok(passengerService.getPassengers(
                user.getInstitution().getId(), search, group, active, pageable));
    }

    @PostMapping
    public ResponseEntity<PassengerDTO> createPassenger(
            @AuthenticationPrincipal PortalUser user,
            @Valid @RequestBody PassengerDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(passengerService.createPassenger(user.getInstitution().getId(), dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PassengerDTO> getPassenger(
            @AuthenticationPrincipal PortalUser user,
            @PathVariable UUID id) {

        return ResponseEntity.ok(passengerService.getPassenger(user.getInstitution().getId(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PassengerDTO> updatePassenger(
            @AuthenticationPrincipal PortalUser user,
            @PathVariable UUID id,
            @Valid @RequestBody PassengerDTO dto) {

        return ResponseEntity.ok(passengerService.updatePassenger(user.getInstitution().getId(), id, dto));
    }
}
