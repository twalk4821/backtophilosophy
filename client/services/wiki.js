angular.module('saferize')
.service('wiki', function ($http) {
	this.getPage = function(title, callback) {
		url = this.formatURLFromTitle(title);
		$http.get(url)
		.then(function(data) {
			if (data.data.error) {
				callback(true, null)
			} else {
				callback(null, true);
			}
			
		})
	}

	this.getPathForPage = function(title, callback, path) {
		this.getNextLinkInPath(title, callback, path);
	}	

	this.getNextLinkInPath = function(title, callback, path) {
		url = this.formatURLFromTitle(title);
		$http.get(url)
		.then(function(data) {
			let html = data.data.parse.text["*"];
			return $http.post('/wiki', {html:html});
		}.bind(this))
		.then(function(data) {
			let response = data.data;
			let link = response.link;
			let status = response.status;

			if (status === 200) {
				
				if (link === "/wiki/Philosophy") {
					path.push(link);
					response.path = path;
					response.message = "PATH FOUND"
					callback(null, response);
				} else if (this.isALoop(link, path)) {
					path.push(link);
					response.path = path;
					response.status = 201;
					response.message = "INFINITE LOOP"
					callback(null, response);
				} else {
					path.push(link);
					let title = this.linkToTitle(link);
					this.getNextLinkInPath(title, callback, path);
				}
			} else {
				response.path = path;
				callback(response, null);

			}
		}.bind(this))
		.catch(function(err) {
			console.log(err);
		})
	}.bind(this);

	this.formatURLFromTitle = function(title) {
		let words = title.split(" ");
		let page = ""
		for (var i = 0; i<words.length; i++) {
			let word = words[i];
			page+=word;
			if (i!==words.length-1) {
				page+="%20"
			}
		}
		if (page.indexOf('#')>-1) {
			page = page.slice(0, page.indexOf('#'))
		}

		let url = `https://en.wikipedia.org/w/api.php?action=parse&page=${page}&prop=text&origin=*&format=json`
		return url
	}

	this.linkToTitle = function(link) {
		return title = link.slice(6, link.length).split("_").join(" ")
	}

	this.isALoop = function(link, path) {
		return path.indexOf(link)>-1
	}
	
})