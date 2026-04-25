package augusto.machado.busiapi.portal.service;

import augusto.machado.busiapi.portal.dto.auth.LoginRequest;
import augusto.machado.busiapi.portal.dto.auth.LoginResponse;
import augusto.machado.busiapi.portal.model.PortalUser;
import augusto.machado.busiapi.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public LoginResponse login(LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        PortalUser user = (PortalUser) auth.getPrincipal();
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                user.getInstitution().getId(),
                user.getEmail(),
                user.getRole()
        );

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getRole(),
                user.getInstitution().getId(),
                user.getInstitution().getName()
        );
    }
}
