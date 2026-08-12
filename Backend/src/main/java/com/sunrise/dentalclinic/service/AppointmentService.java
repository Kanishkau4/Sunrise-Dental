package com.sunrise.dentalclinic.service;

import com.sunrise.dentalclinic.dto.AppointmentRequest;
import com.sunrise.dentalclinic.dto.AppointmentResponse;
import com.sunrise.dentalclinic.dto.BillResponse;
import com.sunrise.dentalclinic.entity.Appointment;
import com.sunrise.dentalclinic.entity.Dentist;
import com.sunrise.dentalclinic.entity.Treatment;
import com.sunrise.dentalclinic.exception.ResourceNotFoundException;
import com.sunrise.dentalclinic.repository.AppointmentRepository;
import com.sunrise.dentalclinic.repository.DentistRepository;
import com.sunrise.dentalclinic.repository.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;

/**
 * Core business logic for appointments: registration, lookup, and billing.
 * This is the heart of Tasks B (system functionality) and demonstrates the
 * Service Layer pattern - all business rules live here, not in the controller.
 */
@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DentistRepository dentistRepository;
    private final TreatmentRepository treatmentRepository;

    // A simple flat tax rate applied to every bill. In a real system this might come
    // from configuration rather than being hard-coded - worth mentioning as a limitation
    // in your report's evaluation section.
    private static final BigDecimal TAX_RATE = new BigDecimal("0.02"); // 2%

    /**
     * Registers a new appointment (brief section 2).
     * Generates a unique, human-readable appointment number such as APT-2026-0001.
     */
    public AppointmentResponse registerAppointment(AppointmentRequest request) {
        Dentist dentist = dentistRepository.findById(request.getDentistId())
                .orElseThrow(() -> new ResourceNotFoundException("Dentist not found"));

        Treatment treatment = treatmentRepository.findById(request.getTreatmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found"));

        Appointment appointment = Appointment.builder()
                .appointmentNumber(generateAppointmentNumber())
                .patientName(request.getPatientName())
                .address(request.getAddress())
                .contactNumber(request.getContactNumber())
                .dentist(dentist)
                .treatment(treatment)
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .build();

        Appointment saved = appointmentRepository.save(appointment);
        return toResponse(saved);
    }

    /**
     * Brief section 3: "Display Appointment Details - Search using the appointment number."
     */
    public AppointmentResponse findByAppointmentNumber(String appointmentNumber) {
        Appointment appointment = appointmentRepository.findByAppointmentNumber(appointmentNumber)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No appointment found with number: " + appointmentNumber));
        return toResponse(appointment);
    }

    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Brief section 4: "Calculate and Print Bill".
     * total = consultation fee + tax, rounded to 2 decimal places (currency-safe rounding).
     */
    public BillResponse generateBill(String appointmentNumber) {
        Appointment appointment = appointmentRepository.findByAppointmentNumber(appointmentNumber)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No appointment found with number: " + appointmentNumber));

        BigDecimal fee = appointment.getTreatment().getFee();
        BigDecimal tax = fee.multiply(TAX_RATE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = fee.add(tax).setScale(2, RoundingMode.HALF_UP);

        return BillResponse.builder()
                .appointmentNumber(appointment.getAppointmentNumber())
                .patientName(appointment.getPatientName())
                .dentistName(appointment.getDentist().getFullName())
                .treatmentName(appointment.getTreatment().getName())
                .consultationFee(fee)
                .tax(tax)
                .totalAmount(total)
                .appointmentDate(appointment.getAppointmentDate())
                .billGeneratedAt(LocalDateTime.now())
                .build();
    }

    /**
     * Generates appointment numbers like APT-2026-0001, APT-2026-0002, ...
     * Uses the current count of appointments as a simple sequence. Documented assumption:
     * in a high-concurrency real-world system you'd want a database sequence to avoid
     * race conditions; for this coursework's scale, counting rows is sufficient and simple.
     */
    private String generateAppointmentNumber() {
        long count = appointmentRepository.count() + 1;
        int year = Year.now().getValue();
        return String.format("APT-%d-%04d", year, count);
    }

    private AppointmentResponse toResponse(Appointment a) {
        return AppointmentResponse.builder()
                .id(a.getId())
                .appointmentNumber(a.getAppointmentNumber())
                .patientName(a.getPatientName())
                .address(a.getAddress())
                .contactNumber(a.getContactNumber())
                .dentistName(a.getDentist().getFullName())
                .treatmentName(a.getTreatment().getName())
                .treatmentFee(a.getTreatment().getFee())
                .appointmentDate(a.getAppointmentDate())
                .appointmentTime(a.getAppointmentTime())
                .status(a.getStatus().name())
                .build();
    }
}
