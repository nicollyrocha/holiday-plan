/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				slide: {
					'0%': {
						transform: 'translateX(calc(100vw - var(--x,0px)))',
					},

					'100%': {
						transform: 'translateX(0vw)',
					},
				},
				slideY: {
					'0%': {
						transform: 'translateY(calc(100vw - var(--x,0px)))',
					},

					'100%': {
						transform: 'translateY(0vw)',
					},
				},
				'fade-in': {
					from: {
						opacity: '0',
					},
					to: {
						opacity: '1',
					},
				},
			},
			animation: {
				slide: 'slide 2s ease',
				slideY: 'slideY 2s ease',
				'fade-in': 'fade-in 10s ease-out',
			},
		},
	},
	plugins: [],
};
