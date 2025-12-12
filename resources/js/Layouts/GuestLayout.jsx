import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white">
            {/* --- LOGO --- */}
            <div className="mb-6">
                <Link href="/">
                    {/* Tulisan Logo ala Navbar */}
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        Dark <span className="text-yellow-500">Pattern</span>
                    </h1>
                </Link>
            </div>

            {/* --- KOTAK FORM --- */}
            <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white shadow-xl overflow-hidden sm:rounded-2xl border-2 border-gray-100 relative">
                {/* Hiasan kecil (optional): Garis kuning di atas */}
                <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
                
                {children}
            </div>
        </div>
    );
}