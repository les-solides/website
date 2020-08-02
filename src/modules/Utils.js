export default { // TODO: rename to Utils
	
	/**
	 * Calls a function, whenever the element with the given
	 * selector appears in the viewport.
	 *
	 * @param {string} selector
	 * @param {function} callback
	 *
	 * @throws TypeError
	 */
	callbackOnAppear(selector, callback) {
		if (typeof callback !== "function") {
			throw new TypeError('Callback must be a function');
		}
		
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].intersectionRatio <= 0) { // If not in view
				return;
			}
			callback();
		});
		
		observer.observe(document.getElementById(selector));
	},
	
	/** Converts date to input[type=date] format */
	convertDate(date) {
		date = new Date(date);
		if ( ! isNaN(date.getTime())) {
			// Months use 0 index.
			return `${ date.getFullYear() }-${
				(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)
			}-${
				date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
			}`;
		}
	},
	
	elementIsInView(element) {
		let bounding = element.getBoundingClientRect();
		return (
			bounding.top >= 0 &&
			bounding.left >= 0 &&
			bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	},
	
	getNested(obj, ...args) {
		return args.reduce((obj, level) => obj && obj[level], obj)
	},
	
	groupBy(array, key) {
		return array.reduce((rv, x) => {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
	},
	
	isAnyPartOfElementInViewport(element) {
		
		const rect = element.getBoundingClientRect();
		// DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
		const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
		const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
		
		// http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
		const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
		const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
		
		return (vertInView && horInView);
	},
	
	/**
	 * Checks if given object is iterable
	 *
	 * @param object
	 * @param withString
	 * @return boolean
	 * */
	iterable(object, withString = true) {
		if (object == null) {
			return false;
		}
		if ( ! withString && typeof object === "string") {
			return false;
		}
		return typeof object[Symbol.iterator] === "function";
	},
	
	roundToHalf(value) {
		
		let converted = parseFloat(value); // Make sure we have a number
		let decimal = (converted - parseInt(converted, 10));
		
		decimal = Math.round(decimal * 10);
		
		if (decimal === 5) {
			return (parseInt(converted, 10) + 0.5);
		}
		
		if ((decimal < 3) || (decimal > 7)) {
			return Math.round(converted);
		}
		
		return (parseInt(converted, 10) + 0.5);
		
	}
	
}
