package com.sunrise.dentalclinic.repository;

import com.sunrise.dentalclinic.entity.Dentist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DentistRepository extends JpaRepository<Dentist, Long> {
}
