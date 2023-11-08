import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { WebsocketProvider } from "@/lib/websocket-provider";
import { Websocket } from "@/Components/Websocket"
import { JackpotProvider } from "@/lib/jackpot-provider";

const appName = import.meta.env.VITE_APP_NAME || 'Casino';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<WebsocketProvider><JackpotProvider><Websocket /><App {...props} /></JackpotProvider></WebsocketProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});
