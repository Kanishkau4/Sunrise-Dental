import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchAppointments, getAppointmentByNumber, getBill } from '../api/appointmentApi';

export default function SearchAppointmentPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('number') || '');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [selected, setSelected] = useState(null);
  const [bill, setBill] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setSearching(true);
    setSearchError('');
    const timer = setTimeout(() => {
      searchAppointments(query.trim())
        .then(setResults)
        .catch(() => setSearchError('Could not search right now. Please try again.'))
        .finally(() => setSearching(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = async (appointmentNumber) => {
    setDetailLoading(true);
    setDetailError('');
    setSelected(null);
    setBill(null);
    try {
      const [appointmentData, billData] = await Promise.all([
        getAppointmentByNumber(appointmentNumber),
        getBill(appointmentNumber),
      ]);
      setSelected(appointmentData);
      setBill(billData);
    } catch (err) {
      setDetailError(err.response?.data?.message || 'Could not load appointment details.');
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    const num = searchParams.get('number');
    if (num) handleSelect(num);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrint = () => window.print();

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-1">Search Appointment</h1>
      <p className="text-gray-500 text-sm mb-8">
        Type a patient's name or appointment number to find a match.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="print:hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Kasun, or APT-2026"
            autoFocus
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition mb-4"
          />

          {searching && <p className="text-sm text-gray-400">Searching...</p>}
          {searchError && <p className="text-sm text-red-500">{searchError}</p>}

          {!searching && query.trim() && results.length === 0 && !searchError && (
            <p className="text-sm text-gray-400">No matching appointments found.</p>
          )}

          <div className="space-y-2">
            {results.map((r) => (
              <button
                key={r.id}
                onClick={() => handleSelect(r.appointmentNumber)}
                className={`w-full text-left bg-white border rounded-2xl p-4 hover:border-black transition ${selected?.appointmentNumber === r.appointmentNumber
                    ? 'border-black ring-1 ring-black'
                    : 'border-gray-100'
                  }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{r.patientName}</span>
                  <span className="font-mono text-xs text-gray-400">{r.appointmentNumber}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {r.dentistName} · {r.treatmentName} · {r.appointmentDate}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          {detailLoading && <p className="text-sm text-gray-400">Loading details...</p>}
          {detailError && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{detailError}</div>
          )}

          {selected && bill && (
            <div id="print-receipt">
              <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden">

                {/* Clinic Header — visible on screen and in print */}
                <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                    <i className="ph-fill ph-tooth text-white text-xl -rotate-12"></i>
                  </div>
                  <div>
                    <p className="font-bold text-base leading-tight">Sunrise Dental</p>
                    <p className="text-xs text-gray-400">Official Receipt</p>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Appointment</p>
                      <p className="font-mono font-semibold">{selected.appointmentNumber}</p>
                    </div>
                    <span className="bg-brand-green px-3 py-1 rounded-full text-xs font-medium">
                      {selected.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <DetailRow label="Patient Name" value={selected.patientName} />
                    <DetailRow label="Contact Number" value={selected.contactNumber} />
                    <DetailRow label="Address" value={selected.address} />
                    <DetailRow label="Dentist" value={selected.dentistName} />
                    <DetailRow label="Treatment" value={selected.treatmentName} />
                    <DetailRow label="Date & Time" value={`${selected.appointmentDate} at ${selected.appointmentTime}`} />
                  </div>
                </div>

                <div className="p-6 bg-gray-50">
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

                  <button
                    onClick={handlePrint}
                    className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition print:hidden"
                  >
                    <i className="ph ph-printer mr-2"></i> Print Bill
                  </button>
                </div>
              </div>
            </div>
          )}

          {!selected && !detailLoading && (
            <div className="h-full flex items-center justify-center text-center text-gray-400 text-sm py-16">
              Select an appointment from the search results to view its details and bill.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}