/**
 * @class AjaxAmbassadorModel This will serve as our model for our application, making the AJAX calls.
 * 
 * @author Gerardo Rodriguez - grodriguez@cmdagency.com
 * @author Jessica Tsuji - jtsuji@cmdagency.com
 * @author Kellan Craddock - kcraddock@cmdagency.com
 * @created 03/12/2010
 */
function AjaxAmbassadorModel( appSettings )
{
	//-------------------------------------------------
	// Properties
	//-------------------------------------------------
	var self = this;
	var fontLibraryRequestURLPublic;
	var fontLibraryRequestURLPrivate;
	var typeDrawerRequestURL;
	var drawerManagerRequestURL;
	var userInfoRequestURL;
	var data;
	var appSettings;
	var animateContentHolderBack;
	//-------------------------------------------------
	// Faux Constructor
	//-------------------------------------------------
	/**
	 * @private Serves as our faux constructor.
	 * @param {Object} appSettings The applications settings.
	 */
	this.init = function( appSettings ){
		self.appSettings = appSettings;
		
		self.fontLibraryRequestURLPublic = appSettings.fontLibraryRequestURLPublic;
		self.fontLibraryRequestURLPrivate = appSettings.fontLibraryRequestURLPrivate;
		self.typeDrawerRequestURL = appSettings.typeDrawerRequestURL;
		self.drawerManagerRequestURL = appSettings.drawerManagerRequestURL;
		self.userInfoRequestURL = appSettings.userInfoRequestURL;
	}
	//-------------------------------------------------
	// Public Methods
	//-------------------------------------------------
	/**
	 * @public Public method that allows us to make our AJAX requests.
	 * @param {Object} data The data that will be sent via the AJAX request.
	 */
	this.makeRequest = function( dataObj )
	{
		( dataObj.uiData.animateContentHolderBack == undefined ) ? self.animateContentHolderBack = true : self.animateContentHolderBack = dataObj.uiData.animateContentHolderBack;
		
		/* This will animate out the content holder that we will populated with ajax response. */
		if( dataObj.uiData.contentHolder != undefined ) 
		{
			if ( dataObj.uiData.contentHolderAnimationObj )
			{
				$(dataObj.uiData.contentHolder).animate( dataObj.uiData.contentHolderAnimationObj, 'fast');
			}
			else 
			{
				$(dataObj.uiData.contentHolder).animate({
					opacity:0,
					queue:false
				}, 'normal');
			}
		}
		/* If we have a loading spinner, animate it!! */
		if( dataObj.uiData.loadingAnimationID != undefined )
		{
			/* Let's fade in our spinner first, then make the ajax call. */
			$(dataObj.uiData.loadingAnimationID).css('display', 'block').animate({
				opacity:1,
				queue:false
			}, 'fast', function(){ self.sendAjaxRequest(dataObj) });
		}
		else
		{
			self.sendAjaxRequest(dataObj);
		}
	}
	//-------------------------------------------------
	// Private Methods
	//-------------------------------------------------
	/**
	 * @private Private method to make the ajax call to the API.
	 * @param {Object} dataObj The data object contains the data for both the API Ajax call and the UI.
	 */
	this.sendAjaxRequest = function( dataObj )
	{
		// console.log( 'ABOUT TO MAKE API CALL => ACTION: ' + dataObj.uiData.action );
		
		/* Let's use an ajax queue manager */
		// $.manageAjax.create('requestQueue',{
			// queue: true, 
			// cacheResponse: false
		// });
		
		// $.manageAjax.add('requestQueue',{
		$.ajax({
			async: true, // Default: true
			/*beforeSend: function(XMLHttpRequest) { 
							console.log( 'beforeSend() ');
							console.dir( XMLHttpRequest ); 
							},*/
			cache: false, // Default: true, false for dataType 'script' and 'jsonp'
			complete: function(XMLHttpRequest, textStatus) { 
				self.hidePreloader(dataObj); 
				// console.log( 'complete: ' ); 
				// console.dir( XMLHttpRequest ); 
				// console.log( XMLHttpRequest.status );
				// console.log( XMLHttpRequest.getResponseHeader('Location') ); 
				},
			contentType: 'application/x-www-form-urlencoded', // Default: 'application/x-www-form-urlencoded'
			data: dataObj.apiData, 
			dataFilter: null, //default null
			dataType: "text/xml",//"text/xml", // Default: Intelligent Guess (XML, JSON, SCRIPT, or HTML)
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				self.hidePreloader(dataObj); 
				self.handleError( XMLHttpRequest, textStatus, errorThrown );
				// console.dir(XMLHttpRequest); 
				// alert(XMLHttpRequest); 
				// alert(textStatus); 
				// alert(errorThrown); 
				},
			global: true, // Default: true
			ifModified: false, // Default: false,
			processData: true, // Default: true
			timeout: 30000, // milliseconds
			type:'GET', // Default: 'GET'
			success: function(ajaxResponseData, textStatus, XMLHttpRequest) { self.hidePreloader(dataObj); self.processData(ajaxResponseData, dataObj.uiData, dataObj.apiData, XMLHttpRequest); },
			url: self.getApiURL(dataObj)
		});
	}
	/**
	 * @private Private method that returns the correct api url for the current call.
	 * @param {Object} dataObj The data object.
	 * @return The api URL.
	 * @type String
	*/
	this.getApiURL = function( dataObj )
	{
		var apiURL;
		var isPagePublic = $('body').hasClass('public');
		switch( dataObj.uiData.apiRequestType )
		{
			case 'typeDrawerRequest':
				apiURL = self.typeDrawerRequestURL;
				break;
			case 'fontLibraryRequest':
				if( isPagePublic )
					apiURL = self.fontLibraryRequestURLPublic;
				else
					apiURL = self.fontLibraryRequestURLPrivate;
				break;
			case 'drawerManagerRequest':
				apiURL = self.drawerManagerRequestURL;
				break;
			case 'userInfoRequest':
				apiURL = self.userInfoRequestURL;
				break;
			default:
				alert( "Uknown API Request Type: " + dataObj.uiData.apiRequestType );
				break;
		}
		
		return apiURL;
	}
	/**
	 * @private Private method to handle showing the preloader.
	 */
	this.showPreloader = function(data)
	{
		$(data.uiData.loadingAnimationID).css('display','block');
	}
	
	this.hidePreloader = function(data)
	{
		if( data.uiData.loadingAnimationID != undefined ) $(data.uiData.loadingAnimationID).animate({ opacity:0, queue:false }, 'fast', function(){$(data.uiData.loadingAnimationID).css('display','none');/*console.log('animation out complete')*/});
		if( data.uiData.contentHolder != undefined && self.animateContentHolderBack ) $(data.uiData.contentHolder).animate({ opacity:1, queue:false }, 'fast');
		// $(data.loadingAnimationID).css('display','none');
	}
	
	//-------------------------------------------------
	// Event Handlers
	//-------------------------------------------------
	/**
	 * @private Private event handler method to handle errors.
	 * @param {Object} xhr The XMLHttpRequest object which contains data about the request.
	 */
	this.handleError = function( xhr, textStatus, errorThrown )
	{
		var errorStr = "There was an error.";
	
		try{
			var statusNum = xhr.status;
				
			switch( statusNum )
			{
				case 400:
					errorStr += "\nBad Request Error: " + statusNum;
					errorStr += "\n" + xhr.statusText;
					errorStr += "\nA required parameter was not found or contained an illegal value.";
					break;
				case 403:
					errorStr += "\nHTTPS required: " + statusNum;
					errorStr += "\n" + xhr.statusText;
					errorStr += "\nIssued if the request is not made securely.";
					break;
				case 414:
					errorStr += "\nRequest-URI Too Large: " + statusNum;
					errorStr += "\n" + xhr.statusText;
					errorStr += "\nIssued if the request is not made securely.";
					break;
				case 500:
					errorStr += "\nInternal Server Error: " + statusNum;
					errorStr += "\n" + xhr.statusText;
					errorStr += "\nType Drawers have too many fonts.  Please contact Extensis.";
					break;
				default:
					errorStr += "\nError: " + statusNum;
					break;
			}
		
			errorStr += "\nText Status: " + textStatus;
			errorStr += "\nError Thrown: " + errorThrown;
		}
		catch(err){
			errorStr += "\nA request error was found: " + err.message;
		}
		
		alert( errorStr );
	}
	/**
	 * @private Private event handler method that will handle the response from API, passing ajaxResponseData to our processDataController.
	 * @param {Object} ajaxResponseData The data returned from the AJAX request.
	 * @param {Object} uiData The data coming in for the UI the FontFaceAppController.
	 * @param {Object} xhr The XMLHttpRequest object which contains data about the request.
	 */
	this.processData = function( ajaxResponseData, uiData, apiData, xhr )
	{
		// console.dir( xhr );
		// console.log( "xhr.status: " + xhr.status );
		// alert( xhr.responseXML );
		// console.log( xhr.responseXML.documentElement.tagName );
		// alert( xhr.getResponseHeader("Content-Type") );
		// console.log( xhr.getResponseHeader('Location') );
		
		/* final content-type: 'text/xml' */
		$(self).trigger( 'dataReturned', {ajaxResponseData:xhr.responseXML, uiData:uiData, apiData:apiData, xhr:xhr} );
		/* temp solution where content-type is 'text/html' also change in the FontFaceAppController */
		// $(self).trigger( 'dataReturned', {ajaxResponseData:ajaxResponseData, uiData:uiData, apiData:apiData, xhr:xhr} );
	}
	//-------------------------------------------------
	// Getters/Setters
	//-------------------------------------------------
	
	//-------------------------------------------------
	// Properties
	//-------------------------------------------------

	//-------------------------------------------------
	// Faux Constructor
	//-------------------------------------------------
	/**
	 * We need to call our faux constructor, since it won't actually run by itself.
	 */
	this.init( appSettings );
}