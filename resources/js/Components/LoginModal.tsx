import { useRef, useEffect, useState, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";

export default function LoginModal({ className = '' }: { className?: string }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
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
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };
    const openLoginModal = () => {
        setShowLoginModal(true);
    };

    const closeModal = () => {
        setShowLoginModal(false);
        reset();
    };

    return (
        <>
        <Button disabled={processing} onClick={openLoginModal} variant="outline">Login</Button>
            <Modal show={showLoginModal} onClose={closeModal}>
            <form onSubmit={submit}>
                <div>
                    <button id="disable-enter-keydown-login" type="submit" disabled className="hidden" aria-hidden="true"></button>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
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
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button onClick={closeModal} className="mr-1" variant="destructive">Close</Button>
                    <Button disabled={processing} className="ml-1" variant="outline">Log in</Button>
                </div>
            </form>
            </Modal>
            </>
    );
}
