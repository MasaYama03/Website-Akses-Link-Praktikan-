import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { router } from '@inertiajs/react';
import '../css/app.css';

// Page transition loading state
let loadingTimeout: ReturnType<typeof setTimeout>;

router.on('start', () => {
    loadingTimeout = setTimeout(() => {
        document.getElementById('page-loading')?.classList.remove('opacity-0', 'pointer-events-none');
        document.getElementById('page-loading')?.classList.add('opacity-100');
        document.getElementById('loading-bar')?.classList.remove('scale-x-0');
        document.getElementById('loading-bar')?.classList.add('scale-x-100');
    }, 150);
});

router.on('finish', () => {
    clearTimeout(loadingTimeout);
    document.getElementById('page-loading')?.classList.add('opacity-0', 'pointer-events-none');
    document.getElementById('page-loading')?.classList.remove('opacity-100');
    document.getElementById('loading-bar')?.classList.add('scale-x-0');
    document.getElementById('loading-bar')?.classList.remove('scale-x-100');
});

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
