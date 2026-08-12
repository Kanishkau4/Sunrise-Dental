package com.sunrise.dentalclinic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * A treatment type with its consultation fee - used by the billing calculation
 * (brief section 4: "Calculate the total treatment cost based on treatment type and
 * consultation fee").
 *
 * BigDecimal (not double/float) is used for money. This is a deliberate design choice
 * worth citing in your report: floating point numbers cannot represent decimal currency
 * exactly and can introduce rounding errors in financial calculations.
 */
@Entity
@Table(name = "treatment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Treatment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // e.g. "Scaling & Polishing", "Root Canal", "Extraction"

    @Column(nullable = false)
    private BigDecimal fee;

    private String description;
}
