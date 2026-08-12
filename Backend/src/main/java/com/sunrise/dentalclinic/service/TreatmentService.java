package com.sunrise.dentalclinic.service;

import com.sunrise.dentalclinic.entity.Treatment;
import com.sunrise.dentalclinic.repository.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Service marks this as a Spring-managed "business logic" bean.
 * Spring creates exactly ONE instance of this class for the whole application
 * (this is the Singleton pattern in action - another pattern you can cite in Task B).
 *
 * @RequiredArgsConstructor (Lombok) auto-generates a constructor that takes every
 * `final` field below. Spring sees this constructor and automatically supplies a
 * TreatmentRepository instance into it - this is Dependency Injection: we never
 * write "new TreatmentRepository()" ourselves, Spring does it for us and hands it in.
 */
@Service
@RequiredArgsConstructor
public class TreatmentService {

    private final TreatmentRepository treatmentRepository;

    public List<Treatment> getAllTreatments() {
        return treatmentRepository.findAll();
    }

    public Treatment getTreatmentById(Long id) {
        return treatmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Treatment not found with id: " + id));
    }

    public Treatment createTreatment(Treatment treatment) {
        return treatmentRepository.save(treatment);
    }
}
