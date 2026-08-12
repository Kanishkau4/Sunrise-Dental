package com.sunrise.dentalclinic.controller;

import com.sunrise.dentalclinic.entity.Dentist;
import com.sunrise.dentalclinic.service.DentistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Small "reference data" controller - the React dropdown for "choose a dentist" calls this.
@RestController
@RequestMapping("/api/dentists")
@RequiredArgsConstructor
public class DentistController {

    private final DentistService dentistService;

    @GetMapping
    public List<Dentist> getAll() {
        return dentistService.getAllDentists();
    }

    @PostMapping
    public Dentist create(@RequestBody Dentist dentist) {
        return dentistService.createDentist(dentist);
    }
}
