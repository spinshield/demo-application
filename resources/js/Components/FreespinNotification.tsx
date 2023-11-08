import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/Components/ui/card"
export default function FreespinNotification({ freespins }: { freespins?: number }) {
    return (
        <div className="py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-5">
            <Card className="bg-theme-800/50 bg-gradient-to-bl from-theme-700/50 via-transparent rounded-lg mb-4">
            <CardHeader>
            </CardHeader>
            <CardContent className="space-y-2 text-theme-50">
                You have <b>{freespins}</b> free spins available. You can use these on most Mascot Games, Platipus or Bgaming games.
            </CardContent>
            <CardFooter>
            <Link
                href={"/landing?filter=freeSpins&r=" + ((Math.random() * 100000)).toFixed(0)}
            >
            <Button variant="outline">Show Eligible Games</Button>
            </Link>
            </CardFooter>
            </Card>
        </div>
        </div>
    );
}
