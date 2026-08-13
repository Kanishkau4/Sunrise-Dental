import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createUser, getAllUsers } from '../api/usersApi';

const initialForm = { username: '', password: '', fullName: '', role: 'RECEPTIONIST' };

/**
 * Admin-only screen for creating staff accounts. This replaces public "sign up" -
 * satisfies the brief's "Only authorized staff can use the system" by requiring an
 * existing ADMIN to grant access, rather than letting anyone register themselves.
 * The backend also enforces this via @PreAuthorize("hasRole('ADMIN')"), so even if
 * a non-admin somehow reached this page, the API would reject their request.
 */
export default function AddStaffPage() {
    const { user } = useAuth();
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState('');
    const [staffList, setStaffList] = useState([]);
    const [loadingList, setLoadingList] = useState(true);

    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        if (!isAdmin) return;
        getAllUsers()
            .then(setStaffList)
            .catch(() => { })
            .finally(() => setLoadingList(false));
    }, [isAdmin]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const validate = () => {
        const newErrors = {};
        if (form.username.trim().length < 3) newErrors.username = 'Username must be at least 3 characters';
        if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        if (!validate()) return;

        setSubmitting(true);
        try {
            const created = await createUser(form);
            setStaffList((prev) => [...prev, created]);
            setSuccess(`Account "${created.username}" created successfully.`);
            setForm(initialForm);
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || 'Could not create account.' });
        } finally {
            setSubmitting(false);
        }
    };

    // Non-admins never see this page's content, even if they navigate here directly -
    // the backend would reject the API calls anyway, but this gives a clean UX message
    // instead of a confusing failed-request error.
    if (!isAdmin) {
        return (
            <div className="max-w-md mx-auto text-center py-16">
                <h2 className="text-xl font-bold mb-2">Admins Only</h2>
                <p className="text-gray-500 text-sm">
                    Only administrator accounts can add new staff members.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight mb-1">Add Staff Member</h1>
            <p className="text-gray-500 text-sm mb-8">
                Create a login account for a new staff member.
            </p>

            <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-gray-100 p-8 space-y-5 mb-10">
                {errors.submit && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{errors.submit}</div>
                )}
                {success && (
                    <div className="bg-brand-green text-gray-800 text-sm px-4 py-3 rounded-xl">{success}</div>
                )}

                <Field label="Full Name" error={errors.fullName}>
                    <input
                        type="text"
                        value={form.fullName}
                        onChange={handleChange('fullName')}
                        className={inputClass(errors.fullName)}
                        placeholder="e.g. Priya Jayasuriya"
                    />
                </Field>

                <Field label="Username" error={errors.username}>
                    <input
                        type="text"
                        value={form.username}
                        onChange={handleChange('username')}
                        className={inputClass(errors.username)}
                        placeholder="e.g. priya.j"
                    />
                </Field>

                <Field label="Password" error={errors.password}>
                    <input
                        type="password"
                        value={form.password}
                        onChange={handleChange('password')}
                        className={inputClass(errors.password)}
                        placeholder="At least 8 characters"
                    />
                </Field>

                <Field label="Role">
                    <select
                        value={form.role}
                        onChange={handleChange('role')}
                        className={inputClass(false)}
                    >
                        <option value="RECEPTIONIST">Receptionist</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </Field>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black text-white py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition disabled:opacity-50"
                >
                    {submitting ? 'Creating...' : 'Create Account'}
                </button>
            </form>

            <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="font-bold text-lg">Existing Staff</h2>
                </div>
                {loadingList && <p className="p-6 text-sm text-gray-400">Loading...</p>}
                {!loadingList && (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-400 border-b border-gray-100">
                                <th className="px-6 py-3 font-medium">Full Name</th>
                                <th className="px-6 py-3 font-medium">Username</th>
                                <th className="px-6 py-3 font-medium">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.map((s) => (
                                <tr key={s.id} className="border-b border-gray-50">
                                    <td className="px-6 py-4 font-medium">{s.fullName}</td>
                                    <td className="px-6 py-4 text-gray-500">{s.username}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-brand-blue px-3 py-1 rounded-full text-xs font-medium">
                                            {s.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
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
    return `w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition`;
}