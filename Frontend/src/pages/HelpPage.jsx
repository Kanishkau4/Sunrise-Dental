const steps = [
  {
    title: 'Registering a New Appointment',
    body: 'Go to "Register Appointment" in the sidebar. Fill in the patient\'s name, address, and contact number, then select the dentist and treatment type from the dropdowns. Choose an appointment date (today or later) and time, then click "Register Appointment". You\'ll receive a unique appointment number - write this down or share it with the patient, as it\'s needed to look up their details later.',
  },
  {
    title: 'Searching for an Appointment',
    body: 'Go to "Search Appointment" and enter the appointment number exactly as given (e.g. APT-2026-0001). Click "Search" to see the full patient and appointment details, along with the calculated bill.',
  },
  {
    title: 'Generating and Printing a Bill',
    body: 'After searching for an appointment, the bill (consultation fee, tax, and total) appears automatically below the appointment details. Click "Print Bill" to open your browser\'s print dialog and print or save the receipt as a PDF.',
  },
  {
    title: 'Viewing the Dashboard',
    body: 'The Dashboard shows a summary of total, today\'s, and scheduled appointments, plus a full list of every appointment registered in the system - useful for a quick daily overview.',
  },
  {
    title: 'Exiting the System',
    body: 'Click "Exit System" at the bottom of the sidebar to safely log out and return to the clinic\'s public homepage. Always exit before leaving your workstation unattended, to protect patient data.',
  },
];

export default function HelpPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-1">Help & Instructions</h1>
      <p className="text-gray-500 text-sm mb-8">
        A quick guide for new staff members using the Sunrise Dental Clinic system.
      </p>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="bg-white rounded-[2rem] border border-gray-100 p-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
