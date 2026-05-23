package com.abhinow.abhinow.security;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.abhinow.abhinow.entity.User;
import com.abhinow.abhinow.enums.Role;
import com.abhinow.abhinow.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name  = oAuth2User.getAttribute("name");

        // Find or create user
        Optional<User> existing = userRepository.findByEmail(email);
        User user;

        if (existing.isPresent()) {
            user = existing.get();
        } else {
            // Create new Google user
            user = User.builder()
                    .name(name)
                    .email(email)
                    .password("GOOGLE_AUTH") // no password for Google users
                    .role(Role.USER)
                    .isGoogleUser(true)
                    .isSuspended(false)
                    .trustScore(5.0)
                    .build();
            userRepository.save(user);
        }

        // Check if suspended
        if (user.isSuspended()) {
            response.sendRedirect(
                frontendUrl + "/login?error=suspended");
            return;
        }

        // Generate JWT token
        org.springframework.security.core.userdetails.UserDetails userDetails =
            org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(List.of(
                    new SimpleGrantedAuthority("ROLE_" + user.getRole())))
                .build();

        String token = jwtService.generateToken(userDetails);

        // Redirect to React with token
        response.sendRedirect(
            frontendUrl + "/oauth2/callback" +
            "?token=" + token +
            "&name=" + java.net.URLEncoder.encode(name, "UTF-8") +
            "&email=" + java.net.URLEncoder.encode(email, "UTF-8") +
            "&role=" + user.getRole().name()
        );
    }
}