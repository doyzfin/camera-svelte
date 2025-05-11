import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
	// Check if HTTPS is needed, for example based on the mode
	const isHttps = mode === 'https';

	return {
		plugins: [sveltekit(), isHttps && mkcert()].filter(Boolean),
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		},
		server: {
			https: isHttps, // Enable HTTPS if mode is 'https'
			proxy: {}
		}
	};
});
