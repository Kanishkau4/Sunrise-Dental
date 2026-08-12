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

/**
 * REST controller = the "web services" layer required by the brief
 * ("Your program must be a distributed application with web services").
 *
 * @RestController = @Controller + @ResponseBody: every method's return value is
 * automatically converted to JSON and written to the HTTP response body.
 *
 * @RequestMapping("/api/appointments") means every endpoint below is prefixed with
 * that path, e.g. POST http://localhost:8080/api/appointments
 */
@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    // POST /api/appointments  - Register New Appointment (brief section 2)
    @PostMapping
    public ResponseEntity<AppointmentResponse> register(@Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse response = appointmentService.registerAppointment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET /api/appointments/{appointmentNumber} - Display Appointment Details (brief section 3)
    @GetMapping("/{appointmentNumber}")
    public ResponseEntity<AppointmentResponse> getByNumber(@PathVariable String appointmentNumber) {
        return ResponseEntity.ok(appointmentService.findByAppointmentNumber(appointmentNumber));
    }

    // GET /api/appointments - list all (useful for a "recent appointments" report/dashboard)
    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAll() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    // GET /api/appointments/{appointmentNumber}/bill - Calculate and Print Bill (brief section 4)
    @GetMapping("/{appointmentNumber}/bill")
    public ResponseEntity<BillResponse> getBill(@PathVariable String appointmentNumber) {
        return ResponseEntity.ok(appointmentService.generateBill(appointmentNumber));
    }
}
