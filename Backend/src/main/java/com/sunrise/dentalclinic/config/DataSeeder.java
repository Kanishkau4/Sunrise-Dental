package com.sunrise.dentalclinic.config;

import com.sunrise.dentalclinic.entity.Dentist;
import com.sunrise.dentalclinic.entity.Treatment;
import com.sunrise.dentalclinic.entity.User;
import com.sunrise.dentalclinic.repository.DentistRepository;
import com.sunrise.dentalclinic.repository.TreatmentRepository;
import com.sunrise.dentalclinic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * A CommandLineRunner's run() method executes automatically once, right after the
 * application finishes starting up. We use it here to insert some starter data so the
 * app isn't empty on first run - a login account to test with, plus dentists/treatments
 * for the appointment form's dropdowns.
 *
 * NOTE for your report: seeding is fine for development/demo purposes, but you'd remove
 * or guard this (e.g. with a Spring "profile") before any real production deployment,
 * since it always tries to recreate the same login credentials.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DentistRepository dentistRepository;
    private final TreatmentRepository treatmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("Admin@123"))
                    .fullName("Clinic Administrator")
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println(">>> Seeded login user - username: admin / password: Admin@123");
        }

        if (dentistRepository.count() == 0) {
            dentistRepository.save(Dentist.builder()
                    .fullName("Dr. Nimal Perera")
                    .specialization("General Dentistry")
                    .build());
            dentistRepository.save(Dentist.builder()
                    .fullName("Dr. Anusha Fernando")
                    .specialization("Orthodontics")
                    .build());
            dentistRepository.save(Dentist.builder()
                    .fullName("Dr. Suresh Kumar")
                    .specialization("Oral Surgery")
                    .build());
        }

        if (treatmentRepository.count() == 0) {
            treatmentRepository.save(Treatment.builder()
                    .name("General Checkup")
                    .fee(new BigDecimal("1500.00"))
                    .description("Routine dental examination")
                    .build());
            treatmentRepository.save(Treatment.builder()
                    .name("Scaling & Polishing")
                    .fee(new BigDecimal("3500.00"))
                    .description("Professional teeth cleaning")
                    .build());
            treatmentRepository.save(Treatment.builder()
                    .name("Tooth Extraction")
                    .fee(new BigDecimal("5000.00"))
                    .description("Removal of a tooth")
                    .build());
            treatmentRepository.save(Treatment.builder()
                    .name("Root Canal Treatment")
                    .fee(new BigDecimal("15000.00"))
                    .description("Treatment for infected tooth pulp")
                    .build());
            treatmentRepository.save(Treatment.builder()
                    .name("Dental Filling")
                    .fee(new BigDecimal("4000.00"))
                    .description("Cavity filling")
                    .build());
        }
    }
}
