package com.sunrise.dentalclinic.service;

import com.sunrise.dentalclinic.entity.Dentist;
import com.sunrise.dentalclinic.repository.DentistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DentistService {

    private final DentistRepository dentistRepository;

    public List<Dentist> getAllDentists() {
        return dentistRepository.findAll();
    }

    public Dentist getDentistById(Long id) {
        return dentistRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Dentist not found with id: " + id));
    }

    public Dentist createDentist(Dentist dentist) {
        return dentistRepository.save(dentist);
    }
}
