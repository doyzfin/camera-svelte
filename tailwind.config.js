import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				'green-primary': '#20D489',
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans],
				poppins: ['Poppins']
			},
			keyframes: {
				animate: {
					'0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1', 'border-radius': '0' },
					'100%': {
						transform: 'translateY(-1000px) rotate(720deg)',
						opacity: '0',
						'border-radius': '50%'
					}
				}
			},
			animation: {
				'custom-animate': 'animate 37s linear infinite'
			},
			animationDelay: {
				'1s': '1s',
				'4s': '4s',
				'10s': '10s',
				'14s': '14s',
				'11s': '11s',
				'6s': '6s'
			}
		}
	},
	plugins: [
		function ({ addUtilities, theme, e }) {
			const delays = theme('animationDelay');
			const utilities = Object.entries(delays).reduce(
				(acc, [key, value]) => ({
					...acc,
					[`.${e(`delay-${key}`)}`]: { animationDelay: value }
				}),
				{}
			);

			addUtilities(utilities);
		}
	]
};

export default config;
