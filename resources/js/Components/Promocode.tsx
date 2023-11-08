import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/Components/ui/card"
export default function Promocode({ className = '' }: { status?: string, className?: string }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        promocode: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('promocode'));
    };

    return (
        <div className="py-">
        <div className="max-w-7xl mx-auto px-2 sm:px-5">
            <Card className="bg-theme-800/50 bg-gradient-to-bl from-theme-700/50 via-transparent rounded-lg mb-4">
            <CardHeader>
            </CardHeader>
            <CardContent className="space-y-2">
            <form onSubmit={submit} className="mt-0 space-y-6">
                <div>
                    <TextInput
                        id="promocode"
                        className="mt-1 block w-full"
                        value={data.promocode}
                        placeholder="Enter promo code"
                        onChange={(e) => setData('promocode', e.target.value)}
                        required
                        isFocused
                        autoComplete="promocode"
                    />

                    <InputError className="mt-2" message={errors.promocode} />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing} variant="outline">Redeem Code</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-theme-300">Saved.</p>
                    </Transition>
                </div>
            </form>
                </CardContent>
                </Card>
            </div>
            </div>
    );
}
