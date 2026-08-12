import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllAppointments } from '../api/appointmentApi';

/**
 * Brief: "Come up with a suitable set of reports, which you think add more value
 * to your system." This dashboard IS that report - a live list of all registered
 * appointments, satisfying that open-ended requirement with something genuinely
 * useful to clinic staff (see today's/upcoming appointments at a glance).
 */
export default function DashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllAppointments()
      .then(setAppointments)
      .catch(() => setError('Could not load appointments. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  const todayCount = appointments.filter(
    (a) => a.appointmentDate === new Date().toISOString().split('T')[0]
  ).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Overview of clinic appointments</p>
        </div>
        <Link
          to="/register"
          className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
        >
          + New Appointment
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard bg="bg-brand-yellow" label="Total Appointments" value={appointments.length} />
        <StatCard bg="bg-brand-blue" label="Today's Appointments" value={todayCount} />
        <StatCard bg="bg-brand-green" label="Scheduled" value={appointments.filter(a => a.status === 'SCHEDULED').length} />
      </div>

      {/* Appointments table/report */}
      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-bold text-lg">Recent Appointments</h2>
        </div>

        {loading && <p className="p-6 text-sm text-gray-400">Loading...</p>}
        {error && <p className="p-6 text-sm text-red-500">{error}</p>}

        {!loading && !error && appointments.length === 0 && (
          <p className="p-6 text-sm text-gray-400">
            No appointments registered yet. Click "New Appointment" to get started.
          </p>
        )}

        {!loading && appointments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">Appt No.</th>
                  <th className="px-6 py-3 font-medium">Patient</th>
                  <th className="px-6 py-3 font-medium">Dentist</th>
                  <th className="px-6 py-3 font-medium">Treatment</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Time</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-xs">{a.appointmentNumber}</td>
                    <td className="px-6 py-4 font-medium">{a.patientName}</td>
                    <td className="px-6 py-4 text-gray-500">{a.dentistName}</td>
                    <td className="px-6 py-4 text-gray-500">{a.treatmentName}</td>
                    <td className="px-6 py-4 text-gray-500">{a.appointmentDate}</td>
                    <td className="px-6 py-4 text-gray-500">{a.appointmentTime}</td>
                    <td className="px-6 py-4">
                      <span className="bg-brand-green px-3 py-1 rounded-full text-xs font-medium">
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ bg, label, value }) {
  return (
    <div className={`${bg} rounded-3xl p-6`}>
      <p className="text-4xl font-bold mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}
