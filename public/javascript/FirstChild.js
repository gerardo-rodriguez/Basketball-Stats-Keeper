/**
* FirstChild is a class used to emulate :first-child css3 selector functionality in IE 6 & 7
* @argument {array} element is an array of jquery objects
* @constructor this.construct()
* @returns true
*/

function FirstChild(element) {
	//Array of parent elements
	this.root = element;
	var self = this;
	
	this.construct = function() {
		$(self.root).each(function() {
			$(this).children(':first-child').addClass('first-child');
		});
	}
	self.construct();
}