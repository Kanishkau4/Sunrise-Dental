package com.sunrise.dentalclinic.repository;

import com.sunrise.dentalclinic.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentRepository extends JpaRepository<Treatment, Long> {
}
