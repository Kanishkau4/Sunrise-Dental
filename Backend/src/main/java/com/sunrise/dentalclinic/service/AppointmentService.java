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

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DentistRepository dentistRepository;
    private final TreatmentRepository treatmentRepository;

    private static final BigDecimal TAX_RATE = new BigDecimal("0.02");

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

    public List<AppointmentResponse> searchAppointments(String query) {
        if (query == null || query.isBlank()) {
            return List.of();
        }
        return appointmentRepository.searchByNameOrNumber(query.trim()).stream()
                .map(this::toResponse)
                .toList();
    }

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