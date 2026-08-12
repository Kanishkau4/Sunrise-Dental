import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAppointmentByNumber, getBill } from '../api/appointmentApi';

/**
 * Combines two brief requirements on one screen:
 *  - Section 3: "Display Appointment Details - Search using the appointment number"
 *  - Section 4: "Calculate and Print Bill"
 * because in practice a receptionist would look up an appointment and then, in the
 * same flow, generate its bill - splitting them into separate screens would just add
 * unnecessary clicks.
 */
export default function SearchAppointmentPage() {
  const [searchParams] = useSearchParams();
  const [appointmentNumber, setAppointmentNumber] = useState(searchParams.get('number') || '');
  const [appointment, setAppointment] = useState(null);
  const [bill, setBill] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!appointmentNumber.trim()) return;

    setLoading(true);
    setError('');
    setAppointment(null);
    setBill(null);

    try {
      const [appointmentData, billData] = await Promise.all([
        getAppointmentByNumber(appointmentNumber.trim()),
        getBill(appointmentNumber.trim()),
      ]);
      setAppointment(appointmentData);
      setBill(billData);
    } catch (err) {
      setError(err.response?.data?.message || 'Appointment not found.');
    } finally {
      setLoading(false);
    }
  };

  // If we arrived here via a link like /search?number=APT-2026-0001, search automatically.
  useEffect(() => {
    if (searchParams.get('number')) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrint = () => window.print();

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-1">Search Appointment</h1>
      <p className="text-gray-500 text-sm mb-8">
        Look up a patient's appointment and generate their bill.
      </p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8 print:hidden">
        <input
          type="text"
          value={appointmentNumber}
          onChange={(e) => setAppointmentNumber(e.target.value)}
          placeholder="e.g. APT-2026-0001"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6 print:hidden">
          {error}
        </div>
      )}

      {appointment && bill && (
        <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden">
          {/* Appointment details */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Appointment</p>
                <p className="font-mono font-semibold text-lg">{appointment.appointmentNumber}</p>
              </div>
              <span className="bg-brand-green px-4 py-1.5 rounded-full text-xs font-medium">
                {appointment.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <DetailRow label="Patient Name" value={appointment.patientName} />
              <DetailRow label="Contact Number" value={appointment.contactNumber} />
              <DetailRow label="Address" value={appointment.address} />
              <DetailRow label="Dentist" value={appointment.dentistName} />
              <DetailRow label="Treatment" value={appointment.treatmentName} />
              <DetailRow label="Date & Time" value={`${appointment.appointmentDate} at ${appointment.appointmentTime}`} />
            </div>
          </div>

          {/* Bill / receipt */}
          <div className="p-8 bg-gray-50">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-4">Bill / Receipt</p>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Consultation Fee</span>
                <span className="font-medium">Rs. {bill.consultationFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax (2%)</span>
                <span className="font-medium">Rs. {bill.tax}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>Rs. {bill.totalAmount}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Bill generated: {new Date(bill.billGeneratedAt).toLocaleString()}
            </p>

            <button
              onClick={handlePrint}
              className="mt-6 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition print:hidden"
            >
              🖨️ Print Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
