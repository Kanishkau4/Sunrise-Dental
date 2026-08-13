package com.sunrise.dentalclinic.repository;

import com.sunrise.dentalclinic.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findByAppointmentNumber(String appointmentNumber);

    @Query("SELECT a FROM Appointment a WHERE " +
            "LOWER(a.patientName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(a.appointmentNumber) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "ORDER BY a.appointmentDate DESC, a.appointmentTime DESC")
    List<Appointment> searchByNameOrNumber(@Param("query") String query);
}