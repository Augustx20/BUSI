package augusto.machado.busiapi.portal.dto;

public record DashboardStatsDTO(
        long tripsToday,
        long tripsInProgress,
        long activeDrivers,
        long passengersInRoute
) {}
