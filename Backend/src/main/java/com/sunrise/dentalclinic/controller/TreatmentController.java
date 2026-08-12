package com.sunrise.dentalclinic.controller;

import com.sunrise.dentalclinic.entity.Treatment;
import com.sunrise.dentalclinic.service.TreatmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// The React dropdown for "choose a treatment type" calls this.
@RestController
@RequestMapping("/api/treatments")
@RequiredArgsConstructor
public class TreatmentController {

    private final TreatmentService treatmentService;

    @GetMapping
    public List<Treatment> getAll() {
        return treatmentService.getAllTreatments();
    }

    @PostMapping
    public Treatment create(@RequestBody Treatment treatment) {
        return treatmentService.createTreatment(treatment);
    }
}
