package com.sunrise.dentalclinic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A dentist who can be assigned to an appointment.
 * Kept as its own entity (rather than a plain text field) so the system can later support
 * things like "list all appointments for Dr. X" - this is a design decision worth
 * mentioning in your report's "assumptions" section, since the brief only asked for a
 * "dentist name" field, but modelling it as a related entity is better OO design.
 */
@Entity
@Table(name = "dentist")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dentist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    private String specialization;
}
