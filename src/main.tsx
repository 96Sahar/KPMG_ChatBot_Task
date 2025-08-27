import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './components/Router';
import { Toaster } from 'sonner';
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Router />
		<Toaster position="top-right" />
	</StrictMode>
);
