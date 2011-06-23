/**
* ExpandCollapse Class is used to expand and collapse areas of content. v0.5
* @returns true
*/
function ExpandCollapse() {
	var self = this;
	this.root;
	this.scope;
	this.triggerSingle;
	this.triggerAll;
	this.container;
	this.defaultState;
	this.altText;
    
    /**
     * @constructor construct
     * @argument {string} object.root is a reference to all wrappers
     * @argument {string} object.triggerSingle is a reference to an array of single elements used to trigger the expand/collapse
     * @argument {string} object.triggerAll is a reference to a signle element used to expand/collapse all containers
     * @argument {string} object.container is a reference to all elements to be expanded/collapsed
     * @argument {string} object.defaultState sets the default state to expanded or collapsed
     * @returns true
     */         
    this.construct = function(options) {
    	//Set up public members
    	self.root = (options.root != undefined) ? options.root : '.box';
    	self.scope = (options.scope != undefined && $(options.scope).length) ? options.scope : false;
    	self.triggerSingle = (options.triggerSingle != undefined) ? options.triggerSingle : '.trigger';
    	self.triggerAll = (options.triggerAll != undefined) ? options.triggerAll : false;
    	self.container = (options.container != undefined) ? options.container : '.container';
    	self.defaultState = (options.defaultState != undefined || options.defaultState == 'expanded') ? options.defaultState : 'collapsed';
    	self.altText = (options.altText != undefined) ? options.altText : false;
    	
    	if (self.scope) {
    	
	    	//Set up default state
	    	if (self.defaultState == 'collapsed') {
	    		$(self.root + ' ' + self.container, self.scope).hide();
	    		$(self.root + ' ' + self.triggerSingle, self.scope).addClass('collapsed');
	    		$(self.triggerAll, self.scope).addClass('collapsed');
	    		if (self.altText) {
	    			$(self.root + ' ' + self.triggerSingle, self.scope).text(self.altText.collapsed);
	    		}
	    	} else {
	    		$(self.root + ' ' + self.triggerSingle, self.scope).addClass('expanded');
	    		$(self.triggerAll, self.scope).addClass('expanded');
	    		if (self.altText) {
	    			$(self.root + ' ' + self.triggerSingle, self.scope).text(self.altText.expanded);
	    		}
	    	}
	    	
	    	if (self.triggerSingle) {
				self.bindSingle();
    		}
    		
    		if (self.triggerAll) {
	    		self.bindAll();
    		}
	    	
    	} else {
    		self.deconstruct();
    	}
    }
    
    //Bind single trigger event
    this.bindSingle = function() {
    	$(self.root + ' ' + self.triggerSingle, self.scope).bind('click', function() {
    		var trigger = $(this);
    		if (trigger.hasClass('collapsed')) {
				self.open(trigger);
				trigger.removeClass('collapsed').addClass('expanded');
				if (self.altText) {
					trigger.text(self.altText.expanded);
				}
			} else {
				self.close(trigger);
				trigger.removeClass('expanded').addClass('collapsed');
				if (self.altText) {
					trigger.text(self.altText.collapsed);
				}
			}
			return false;
    	});
    }
    
    //Bind all trigger event
    this.bindAll = function() {
    	$(self.triggerAll).bind('click', function() {
    		var trigger = $(this);
    		if (trigger.hasClass('collapsed')) {
				self.open();
				trigger.removeClass('collapsed').addClass('expanded');
				$(self.root + ' ' + self.triggerSingle, self.scope).removeClass('collapsed').addClass('expanded');
				if (self.altText) {
					$(self.root + ' ' + self.triggerSingle, self.scope).text(self.altText.expanded);
				}
			} else {
				self.close();
				trigger.removeClass('expanded').addClass('collapsed');
				$(self.root + ' ' + self.triggerSingle, self.scope).removeClass('expanded').addClass('collapsed');
				if (self.altText) {
					$(self.root + ' ' + self.triggerSingle, self.scope).text(self.altText.collapsed);
				}
			}
			return false;
    	});
    }
    
    //Close
    this.close = function(element) {
    	if (element) {
    		$(element).parents(self.root).find(self.container).slideUp('fast');
    	} else {
    		
    		$(self.container, self.scope).slideUp('fast');
    	}
    }
    
    //Open
    this.open = function(element) {
    	if (element) {
    		$(element).parents(self.root).find(self.container).slideDown('fast');
    	} else {
    		$(self.container, self.scope).slideDown('fast');
    	}
    }
    
    this.deconstruct = function() {
    	return false;
    }
}