import { Head, Link } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Head title="Profile" />

            {/* HEADER */}
            <header className="bg-yellow-400 py-6 px-8 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h2 className="font-bold text-2xl text-black tracking-tight">Profile Settings</h2>
                    </div>
                    <Link href="/" className="text-black font-bold hover:underline flex items-center gap-2 text-sm">
                        <span>&larr;</span> Back to Home
                    </Link>
                </div>
            </header>

            {/* KONTEN */}
            <div className="py-12 max-w-7xl mx-auto px-8 space-y-10">
                {/* 1. Profile Info */}
                <div className="p-8 bg-white shadow-xl border-2 border-gray-50 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
                </div>

                {/* 2. Update Password */}
                <div className="p-8 bg-white shadow-xl border-2 border-gray-50 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                {/* 3. Delete Account */}
                <div className="p-8 bg-red-50 shadow-inner border border-red-100 rounded-3xl">
                    <DeleteUserForm className="max-w-xl" />
                </div>

                {/* 4. LOGOUT SECTION (Baru) */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button" 
                        className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
                    >
                        Log Out Session
                    </Link>
                </div>
            </div>
        </div>
    );
}