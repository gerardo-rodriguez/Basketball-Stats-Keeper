/**
* ExternalLinks is a class open links in a new browser window
* @argument {object} a jquery object used to constrain the area effected
* @constructor this.construct()
* @returns false
*/

function ExternalLinks(element) {
	var self = this;
	this.root = element;
	
	this.construct = function() {
		$('a.external', self.root).bind('click', function() {
			var location = $(this).attr('href');
			window.open(location);
			return false;
		});
	}
}