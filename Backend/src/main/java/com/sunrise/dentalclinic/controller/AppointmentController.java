package com.sunrise.dentalclinic.controller;

import com.sunrise.dentalclinic.dto.AppointmentRequest;
import com.sunrise.dentalclinic.dto.AppointmentResponse;
import com.sunrise.dentalclinic.dto.BillResponse;
import com.sunrise.dentalclinic.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponse> register(@Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse response = appointmentService.registerAppointment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAll() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/search")
    public ResponseEntity<List<AppointmentResponse>> search(@RequestParam("q") String query) {
        return ResponseEntity.ok(appointmentService.searchAppointments(query));
    }

    @GetMapping("/{appointmentNumber}")
    public ResponseEntity<AppointmentResponse> getByNumber(@PathVariable String appointmentNumber) {
        return ResponseEntity.ok(appointmentService.findByAppointmentNumber(appointmentNumber));
    }

    @GetMapping("/{appointmentNumber}/bill")
    public ResponseEntity<BillResponse> getBill(@PathVariable String appointmentNumber) {
        return ResponseEntity.ok(appointmentService.generateBill(appointmentNumber));
    }
}