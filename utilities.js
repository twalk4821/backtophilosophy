var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM

var getFirstValidLink = function(html) {
	var dom = new JSDOM(html);

	//handle different format for redirect wiki pages
	if (isRedirect(dom)) {
		return getLinkFromRedirect(dom)
	} else {
		var links = dom.window.document.querySelectorAll("p > a");
		
		for (var i = 0; i<links.length; i++) { 
			var link = links[i];
			if (isValid(link)) {
				return link.href
			}
		}
	}
}



var isValid = function(link) {
	return isNotRed(link) && isNotParenthesized(link);
}

var isNotRed = function (link) {
	var href = link.href;
	var ending = href.slice(href.length - 9, href.length);
	return ending !== "redlink=1"
}
var isNotParenthesized = function(link) {
	var parentText = link.parentNode.innerHTML;
	var indexOfLink = parentText.indexOf(`<a href="${link.href}"`);

	for (var i = indexOfLink; i>0; i--) {
		if (parentText[i] === "(") {
			return false
		} else if (parentText[i] ===">" || parentText[i] ===")") {
			return true
		}
	}

	return true
}

var isRedirect = function(dom) {
	return dom.window.document.querySelector("p").textContent === "Redirect to:"
}

var getLinkFromRedirect = function(dom) {
	return dom.window.document.querySelector("ul > li > a").href
}

var formatResponse = function(link) {
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