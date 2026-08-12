package com.sunrise.dentalclinic.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * The shape of data the FRONTEND sends us when registering a new appointment.
 * Bean Validation annotations (@NotBlank, @Pattern etc.) satisfy the brief's requirement:
 * "implement proper validation mechanisms in order to restrict invalid entries".
 * Spring automatically rejects the request with a 400 error and a helpful message
 * if any of these fail - we never have to write manual "if (name == null)" checks.
 */
@Data
public class AppointmentRequest {

    @NotBlank(message = "Patient name is required")
    @Size(max = 100)
    private String patientName;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "^[0-9+\\-\\s]{7,15}$", message = "Enter a valid contact number")
    private String contactNumber;

    @NotNull(message = "Please select a dentist")
    private Long dentistId;

    @NotNull(message = "Please select a treatment type")
    private Long treatmentId;

    @NotNull(message = "Appointment date is required")
    @FutureOrPresent(message = "Appointment date cannot be in the past")
    private LocalDate appointmentDate;

    @NotNull(message = "Appointment time is required")
    private LocalTime appointmentTime;
}
