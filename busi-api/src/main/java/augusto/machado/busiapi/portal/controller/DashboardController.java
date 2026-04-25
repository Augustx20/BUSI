package augusto.machado.busiapi.portal.controller;

import augusto.machado.busiapi.portal.dto.DashboardStatsDTO;
import augusto.machado.busiapi.portal.dto.TripSummaryDTO;
import augusto.machado.busiapi.portal.model.PortalUser;
import augusto.machado.busiapi.portal.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portal/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats(@AuthenticationPrincipal PortalUser user) {
        return ResponseEntity.ok(dashboardService.getStats(user.getInstitution().getId()));
    }

    @GetMapping("/trips-today")
    public ResponseEntity<List<TripSummaryDTO>> getTripsToday(@AuthenticationPrincipal PortalUser user) {
        return ResponseEntity.ok(dashboardService.getTripsToday(user.getInstitution().getId()));
    }
}
