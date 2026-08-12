package com.sunrise.dentalclinic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents an authorized staff member who can log in to the system.
 * Satisfies brief section 1: "User Authentication (Login)".
 *
 * @Entity tells Hibernate/JPA "this class maps to a database table".
 * By default the table is named after the class: `user`.
 */
@Entity
@Table(name = "app_user")   // named app_user because "user" is a reserved word in some SQL dialects
@Data                       // Lombok: generates getters, setters, toString, equals/hashCode
@NoArgsConstructor          // Lombok: generates an empty constructor (JPA requires one)
@AllArgsConstructor         // Lombok: generates a constructor with all fields
@Builder                    // Lombok: lets us do User.builder().username("x").build()
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password; // stored as a BCrypt hash, never plain text

    @Column(nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        RECEPTIONIST,
        ADMIN
    }
}
