import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAppointment } from '../api/appointmentApi';
import { getDentists, getTreatments } from '../api/referenceDataApi';

const initialForm = {
  patientName: '',
  address: '',
  contactNumber: '',
  dentistId: '',
  treatmentId: '',
  appointmentDate: '',
  appointmentTime: '',
};

export default function RegisterAppointmentPage() {
  const [form, setForm] = useState(initialForm);
  const [dentists, setDentists] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  // Load dropdown data once, when the page mounts.
  useEffect(() => {
    getDentists().then(setDentists).catch(() => {});
    getTreatments().then(setTreatments).catch(() => {});
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  /**
   * Client-side validation mirrors the @NotBlank/@Pattern rules we wrote in the
   * backend's AppointmentRequest DTO. This isn't duplicated effort by accident -
   * it's deliberate defense in depth: client-side validation gives the user instant
   * feedback (better UX), while server-side validation is what actually protects data
   * integrity (since a malicious or buggy client could skip the frontend entirely and
   * call the API directly). Mention this as a design decision in your report.
   */
  const validate = () => {
    const newErrors = {};
    if (!form.patientName.trim()) newErrors.patientName = 'Patient name is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!/^[0-9+\-\s]{7,15}$/.test(form.contactNumber)) {
      newErrors.contactNumber = 'Enter a valid contact number';
    }
    if (!form.dentistId) newErrors.dentistId = 'Please select a dentist';
    if (!form.treatmentId) newErrors.treatmentId = 'Please select a treatment type';
    if (!form.appointmentDate) newErrors.appointmentDate = 'Appointment date is required';
    else if (form.appointmentDate < new Date().toISOString().split('T')[0]) {
      newErrors.appointmentDate = 'Date cannot be in the past';
    }
    if (!form.appointmentTime) newErrors.appointmentTime = 'Appointment time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await registerAppointment({
        ...form,
        dentistId: Number(form.dentistId),
        treatmentId: Number(form.treatmentId),
      });
      setSuccess(result);
      setForm(initialForm);
    } catch (err) {
      // Surfaces backend validation errors (e.g. from GlobalExceptionHandler) if the
      // client-side check somehow missed something the server still rejects.
      const backendMessage =
        err.response?.data?.details?.join(', ') || err.response?.data?.message;
      setErrors({ submit: backendMessage || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold mb-2">Appointment Registered</h2>
        <p className="text-gray-500 mb-8">
          Appointment number <span className="font-mono font-semibold">{success.appointmentNumber}</span> has
          been created for {success.patientName}.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setSuccess(null)}
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
          >
            Register Another
          </button>
          <button
            onClick={() => navigate(`/search?number=${success.appointmentNumber}`)}
            className="bg-gray-100 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
          >
            View / Print Bill
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-1">Register New Appointment</h1>
      <p className="text-gray-500 text-sm mb-8">
        Enter patient and appointment details below.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-gray-100 p-8 space-y-5">
        {errors.submit && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{errors.submit}</div>
        )}

        <Field label="Patient Name" error={errors.patientName}>
          <input
            type="text"
            value={form.patientName}
            onChange={handleChange('patientName')}
            className={inputClass(errors.patientName)}
            placeholder="e.g. Kasun Silva"
          />
        </Field>

        <Field label="Address" error={errors.address}>
          <input
            type="text"
            value={form.address}
            onChange={handleChange('address')}
            className={inputClass(errors.address)}
            placeholder="e.g. 123 Galle Road, Colombo"
          />
        </Field>

        <Field label="Contact Number" error={errors.contactNumber}>
          <input
            type="text"
            value={form.contactNumber}
            onChange={handleChange('contactNumber')}
            className={inputClass(errors.contactNumber)}
            placeholder="e.g. 0771234567"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Dentist" error={errors.dentistId}>
            <select
              value={form.dentistId}
              onChange={handleChange('dentistId')}
              className={inputClass(errors.dentistId)}
            >
              <option value="">Select dentist</option>
              {dentists.map((d) => (
                <option key={d.id} value={d.id}>{d.fullName}</option>
              ))}
            </select>
          </Field>

          <Field label="Treatment Type" error={errors.treatmentId}>
            <select
              value={form.treatmentId}
              onChange={handleChange('treatmentId')}
              className={inputClass(errors.treatmentId)}
            >
              <option value="">Select treatment</option>
              {treatments.map((t) => (
                <option key={t.id} value={t.id}>{t.name} (Rs. {t.fee})</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Appointment Date" error={errors.appointmentDate}>
            <input
              type="date"
              value={form.appointmentDate}
              onChange={handleChange('appointmentDate')}
              className={inputClass(errors.appointmentDate)}
            />
          </Field>

          <Field label="Appointment Time" error={errors.appointmentTime}>
            <input
              type="time"
              value={form.appointmentTime}
              onChange={handleChange('appointmentTime')}
              className={inputClass(errors.appointmentTime)}
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition disabled:opacity-50"
        >
          {submitting ? 'Registering...' : 'Register Appointment'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full px-4 py-3 rounded-xl border ${
    error ? 'border-red-300' : 'border-gray-200'
  } focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition`;
}
