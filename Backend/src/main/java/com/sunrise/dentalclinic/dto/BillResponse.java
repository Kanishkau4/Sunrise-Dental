package com.sunrise.dentalclinic.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Satisfies brief section 4: "Calculate and Print Bill".
 * This is what the React "Bill/Receipt" screen will render and let the user print.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillResponse {
    private String appointmentNumber;
    private String patientName;
    private String dentistName;
    private String treatmentName;
    private BigDecimal consultationFee;
    private BigDecimal tax;
    private BigDecimal totalAmount;
    private LocalDate appointmentDate;
    private LocalDateTime billGeneratedAt;
}
