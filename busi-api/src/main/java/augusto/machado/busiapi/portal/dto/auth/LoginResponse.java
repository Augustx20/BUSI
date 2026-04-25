package augusto.machado.busiapi.portal.dto.auth;

import java.util.UUID;

public record LoginResponse(
        String token,
        String email,
        String role,
        UUID institutionId,
        String institutionName
) {}
