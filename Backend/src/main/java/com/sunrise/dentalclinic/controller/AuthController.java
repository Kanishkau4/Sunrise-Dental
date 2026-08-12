package com.sunrise.dentalclinic.controller;

import com.sunrise.dentalclinic.dto.LoginRequest;
import com.sunrise.dentalclinic.dto.LoginResponse;
import com.sunrise.dentalclinic.entity.User;
import com.sunrise.dentalclinic.repository.UserRepository;
import com.sunrise.dentalclinic.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * Brief section 1: "User Authentication (Login) - The system must require a username
 * and password for secure access. Only authorized staff can use the system."
 *
 * This endpoint is deliberately NOT protected (see SecurityConfig: "/api/auth/**"
 * is permitAll) - you obviously can't require a token to get a token in the first place.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {

        // This line does the actual password check. If the username/password combo is
        // wrong, Spring Security throws an exception automatically (which we could catch
        // with a custom handler for a nicer error message - left as an extension point).
        UsernamePasswordAuthenticationToken authRequest =
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        UserDetails userDetails = (UserDetails) authenticationManager.authenticate(authRequest).getPrincipal();

        String token = jwtService.generateToken(userDetails);

        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();

        LoginResponse response = LoginResponse.builder()
                .token(token)
                .username(user.getUsername())
                .fullName(user.getFullName())
                .role(user.getRole().name())
                .build();

        return ResponseEntity.ok(response);
    }
}
