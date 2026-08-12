package com.sunrise.dentalclinic.repository;

import com.sunrise.dentalclinic.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * REPOSITORY PATTERN in action - cite this in your Design Patterns task.
 *
 * By extending JpaRepository<Appointment, Long>, this single interface gives us,
 * for free, without writing any SQL:
 *   save(), findById(), findAll(), deleteById(), count(), etc.
 *
 * Spring Data JPA generates the actual implementation at runtime. This is the
 * Repository pattern: it hides all persistence/database detail behind a simple
 * collection-like interface, so the Service layer never needs to know it's talking
 * to H2 vs PostgreSQL vs anything else.
 *
 * We also add one custom method. Spring Data JPA is clever enough to generate the
 * SQL just from the method name: "findByAppointmentNumber" becomes
 * "SELECT * FROM appointment WHERE appointment_number = ?"
 */
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findByAppointmentNumber(String appointmentNumber);
}
