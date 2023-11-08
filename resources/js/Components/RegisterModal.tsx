import { useRef, useEffect, useState, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";

export default function RegisterModal({ className = '' }: { className?: string }) {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const passwordInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        delete: destroy,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };
    const openRegisterModal = () => {
        setShowRegisterModal(true);
    };

    const closeModal = () => {
        setShowRegisterModal(false);
        reset();
    };
    
    return (
        <>
        <Button disabled={processing} onClick={openRegisterModal} variant="outline">Register</Button>
            <Modal show={showRegisterModal} onClose={closeModal}>
            <form onSubmit={submit}>
                <div>
                    <button id="disable-enter-keydown-register" type="submit" disabled className="hidden" aria-hidden="true"></button>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button onClick={closeModal} className="mr-1" variant="destructive">Close</Button>
                    <Button disabled={processing} className="ml-1" variant="outline">Register</Button>
                </div>
            </form>
            </Modal>
            </>
    );
}
