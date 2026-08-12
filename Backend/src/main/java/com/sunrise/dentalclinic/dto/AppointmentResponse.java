package com.sunrise.dentalclinic.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * The shape of data we SEND BACK to the frontend. Notice it's flattened and simplified
 * compared to the Appointment entity (e.g. dentistName instead of a whole Dentist object) -
 * this keeps the frontend simple and avoids exposing internal database IDs unnecessarily.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentResponse {
    private Long id;
    private String appointmentNumber;
    private String patientName;
    private String address;
    private String contactNumber;
    private String dentistName;
    private String treatmentName;
    private BigDecimal treatmentFee;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String status;
}
