package com.sunrise.dentalclinic.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sunrise.dentalclinic.dto.LoginRequest;
import com.sunrise.dentalclinic.entity.User;
import com.sunrise.dentalclinic.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * INTEGRATION TEST: unlike AppointmentServiceTest (which mocks everything), this test
 * starts the FULL Spring application context, including a real (in-memory) database and
 * the actual web/security layer. This verifies that login genuinely works end-to-end -
 * HTTP request in, JSON response with a real JWT out.
 *
 * @SpringBootTest starts the whole app. @AutoConfigureMockMvc gives us MockMvc, a tool
 * that lets us "send" HTTP requests to our controllers without needing a real running
 * server or a browser.
 */
@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        // Ensure a known test user exists, independent of DataSeeder's data.
        if (userRepository.findByUsername("testuser").isEmpty()) {
            userRepository.save(User.builder()
                    .username("testuser")
                    .password(passwordEncoder.encode("TestPass123"))
                    .fullName("Test User")
                    .role(User.Role.RECEPTIONIST)
                    .build());
        }
    }

    @Test
    void login_withCorrectCredentials_returnsTokenAndUserInfo() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setUsername("testuser");
        request.setPassword("TestPass123");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.role").value("RECEPTIONIST"));
    }

    @Test
    void login_withWrongPassword_returnsUnauthorized() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setUsername("testuser");
        request.setPassword("WrongPassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void appointmentsEndpoint_withoutToken_isRejected() throws Exception {
        mockMvc.perform(post("/api/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isUnauthorized());
    }
}
