import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { ProfilePageProps } from '@/types';

export default function Edit({ auth, mustVerifyEmail, status }: ProfilePageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h3 className="font-semibold text-xs text-theme-100 leading-tight">Profile</h3>}
        >
            <Head title="Profile" />

            <div className="py-4"> 
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-theme-800/50 bg-gradient-to-bl from-theme-700/50 ring-1 ring-inset ring-white/5 via-transparent shadow sm:rounded-lg ">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-theme-800/50 bg-gradient-to-bl from-theme-700/50 ring-1 ring-inset ring-white/5 via-transparent shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-theme-800/50 bg-gradient-to-bl from-theme-700/50 ring-1 ring-inset ring-white/5 via-transparent shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
