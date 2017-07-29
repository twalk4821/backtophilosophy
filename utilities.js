var jsdom = require('jsdom');
const JSDOM = jsdom.JSDOM

const getFirstValidLink = function(html) {
	const dom = new JSDOM(html);

	//handle different format for redirect wiki pages
	if (isRedirect(dom)) {
		return getLinkFromRedirect(dom)
	} else {
		let links = dom.window.document.querySelectorAll("p > a");
		
		for (link of links) { 
			if (isValid(link)) {
				return link.href
			}
		}
	}
}



const isValid = function(link) {
	return isNotRed(link) && isNotParenthesized(link);
}

const isNotRed = function (link) {
	let href = link.href;
	let ending = href.slice(href.length - 9, href.length);
	return ending !== "redlink=1"
}
const isNotParenthesized = function(link) {
	let parentText = link.parentNode.innerHTML;
	let indexOfLink = parentText.indexOf(`<a href="${link.href}"`);

	for (var i = indexOfLink; i>0; i--) {
		if (parentText[i] === "(") {
			return false
		} else if (parentText[i] ===">" || parentText[i] ===")") {
			return true
		}
	}

	return true
}

const isRedirect = function(dom) {
	return dom.window.document.querySelector("p").textContent === "Redirect to:"
}

const getLinkFromRedirect = function(dom) {
	return dom.window.document.querySelector("ul > li > a").href
}

const formatResponse = function(link) {
	if (link) {
		return {
			link: link,
			status: 200,
			message: 'valid link found',
			path: []

		}
	} else {
		return {
			link: link,
			status: 404,
			message: 'valid link not found on page', 
			path: []
		}
	}
}

module.exports = {
	getFirstValidLink: getFirstValidLink,
	formatResponse: formatResponse
}