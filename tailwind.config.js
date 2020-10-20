module.exports = {
	purge: [
		'./src/**/*.html',
		'./src/**/*.vue'
	],
	theme: {
		colors: {
			gray: {
				'100': '#f5f5f5',
				'200': '#eeeeee',
				'300': '#e0e0e0',
				'400': '#bdbdbd',
				'500': '#9e9e9e',
				'600': '#757575',
				'700': '#616161',
				'800': '#424242',
				'900': '#212121',
			},
			white: '#fff'
		},
		screens: {
			'sm': '640px',
			// => @media (min-width: 640px) { ... }
			
			'md': '1024px',
			// => @media (min-width: 768px) { ... }
			
			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }
			
			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }
		},
		extend: {}
	},
	variants: {
		display: ['responsive']
	},
	plugins: []
};
