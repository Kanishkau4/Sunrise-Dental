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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * TEST RATIONALE (put an expanded version of this in your report's Testing section):
 *
 * We test the SERVICE layer in isolation from the database and web layer, using Mockito
 * to create fake ("mock") versions of the repositories. This lets us test business logic
 * (appointment number generation, bill calculation) fast and reliably, without needing a
 * real database - a core principle of unit testing.
 *
 * TDD APPROACH: for each piece of business logic (e.g. bill calculation), the test for
 * the expected behaviour was written first, defining what "correct" looks like, before
 * the corresponding method in AppointmentService was implemented to satisfy it. You should
 * literally do this in your own build: write a test like
 * "generateBill_shouldAddTaxCorrectly" BEFORE writing generateBill()'s logic, run it (it
 * fails, since the method doesn't exist / returns nothing), then write the minimum code
 * to make it pass, then refactor. Screenshot each red -> green cycle for your documentation.
 *
 * @ExtendWith(MockitoExtension.class) hooks Mockito into JUnit 5 so @Mock and @InjectMocks
 * work.
 */
@ExtendWith(MockitoExtension.class)
class AppointmentServiceTest {

    @Mock
    private AppointmentRepository appointmentRepository;

    @Mock
    private DentistRepository dentistRepository;

    @Mock
    private TreatmentRepository treatmentRepository;

    @InjectMocks
    private AppointmentService appointmentService;

    private Dentist dentist;
    private Treatment treatment;
    private AppointmentRequest request;

    @BeforeEach
    void setUp() {
        dentist = Dentist.builder().id(1L).fullName("Dr. Nimal Perera").specialization("General").build();
        treatment = Treatment.builder().id(1L).name("Scaling").fee(new BigDecimal("3500.00")).build();

        request = new AppointmentRequest();
        request.setPatientName("Kasun Silva");
        request.setAddress("123 Galle Road, Colombo");
        request.setContactNumber("0771234567");
        request.setDentistId(1L);
        request.setTreatmentId(1L);
        request.setAppointmentDate(LocalDate.now().plusDays(1));
        request.setAppointmentTime(LocalTime.of(10, 30));
    }

    @Test
    @DisplayName("Registering an appointment generates a correctly formatted appointment number")
    void registerAppointment_shouldGenerateFormattedAppointmentNumber() {
        when(dentistRepository.findById(1L)).thenReturn(Optional.of(dentist));
        when(treatmentRepository.findById(1L)).thenReturn(Optional.of(treatment));
        when(appointmentRepository.count()).thenReturn(0L); // no appointments yet

        // save() normally returns whatever was persisted (with a generated id) -
        // we simulate that by just returning the same object passed in.
        when(appointmentRepository.save(any(Appointment.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        AppointmentResponse response = appointmentService.registerAppointment(request);

        int currentYear = LocalDate.now().getYear();
        assertThat(response.getAppointmentNumber()).isEqualTo("APT-" + currentYear + "-0001");
        assertThat(response.getPatientName()).isEqualTo("Kasun Silva");
        assertThat(response.getDentistName()).isEqualTo("Dr. Nimal Perera");
    }

    @Test
    @DisplayName("Registering an appointment with an unknown dentist throws ResourceNotFoundException")
    void registerAppointment_shouldThrow_whenDentistNotFound() {
        when(dentistRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> appointmentService.registerAppointment(request))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Dentist not found");
    }

    @Test
    @DisplayName("Searching by a non-existent appointment number throws ResourceNotFoundException")
    void findByAppointmentNumber_shouldThrow_whenNotFound() {
        when(appointmentRepository.findByAppointmentNumber("APT-9999-0001"))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> appointmentService.findByAppointmentNumber("APT-9999-0001"))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("Bill calculation correctly applies 2% tax and rounds to 2 decimal places")
    void generateBill_shouldCalculateTaxAndTotalCorrectly() {
        Appointment appointment = Appointment.builder()
                .appointmentNumber("APT-2026-0001")
                .patientName("Kasun Silva")
                .dentist(dentist)
                .treatment(treatment) // fee = 3500.00
                .appointmentDate(LocalDate.now())
                .build();

        when(appointmentRepository.findByAppointmentNumber("APT-2026-0001"))
                .thenReturn(Optional.of(appointment));

        BillResponse bill = appointmentService.generateBill("APT-2026-0001");

        // 3500.00 * 2% = 70.00 tax; total = 3570.00
        assertThat(bill.getConsultationFee()).isEqualByComparingTo("3500.00");
        assertThat(bill.getTax()).isEqualByComparingTo("70.00");
        assertThat(bill.getTotalAmount()).isEqualByComparingTo("3570.00");
    }
}
