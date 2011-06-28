/**
 * @class FontFaceAppController Will control the UI, AJAX Ambassador and Process Data controllers.
 *
 * @author Gerardo Rodriguez - grodriguez@cmdagency.com
 * @author Jessica Tsuji - jtsuji@cmdagency.com
 * @author Kellan Craddock - kcraddock@cmdagency.com
 * @created 03/12/2010
 */
function FontFaceAppController()
{
	//-------------------------------------------------
	// Properties
	//-------------------------------------------------
	var self = this;
	var uiController;
	var playgroundController;
	var playgroundViewController;
	var myTypeDrawersUIController;
	var myTypeDrawersViewController;
	var ajaxAmbassadorModel;
	var appSettings;
	var isInitialLoad;
	var drawerSaveAPICount;
	
	//-------------------------------------------------
	// Faux Constructor
	//-------------------------------------------------
	/**
	 * @private Will serve as our faux constructor.
	 */
	this.init = function()
	{
		self.isInitialLoad = true;
	}
	//-------------------------------------------------
	// Public Methods
	//-------------------------------------------------
	/**
	 * @public Public method to set up the application settings.
	 * @param {Object} dataObj The application data to setup.
	 */
	this.setAppSettings = function( dataObj )
	{
		self.appSettings = dataObj;
	}
	/**
	 * @public Pulic method that allows the app to begin setup.
	 */
	this.setup = function()
	{
		/* Create our controllers */
		self.uiController = new UIController();
		self.ajaxAmbassadorModel = new AjaxAmbassadorModel( self.appSettings );

		switch( $('body').attr('id') )
		{
			case 'playground':
				self.setupPlayground( self.uiController.getIsUserBrowserCompatible() );
				break;
			case 'myTypeDrawers':
				self.setupMyTypeDrawers();
				break;
			default:
				break;
		}
		
		/* Bind to the dataReturned event to be dispatched from the AjaxAmbassadorModel */
		$(self.ajaxAmbassadorModel).bind( 'dataReturned', function(e,dataObj){
			self.onDataReturned( dataObj );
		});

		/* Set up controllers */
		/* This step seems unecessary, but seems to be only way to allowing binding before execution? */
		self.uiController.setup( self.limitAmountToLoad );
	}
	//-------------------------------------------------
	// Private Methods
	//-------------------------------------------------
	/**
	 * @private Private method that sets up our playground
	 * @param {Boolean} isBrowserCompatible A boolean to let the playground know if to initiate AJAX calls or not.
	 */
	this.setupPlayground = function( isBrowserCompatible )
	{
		/* Create our playground controllers */
		self.playgroundController = new PlaygroundUIController( self.appSettings, isBrowserCompatible );
		self.playgroundViewController = new PlaygroundViewController( self.appSettings );
	
		/* Bind to events to be dispatched from the PlaygroundController */
		$(self.playgroundController).bind( 'ajaxRequest', function(e,dataObj){ 
			self.onAjaxRequest( dataObj );
		});
		$(self.playgroundController).bind( 'errorMessage', function(e,dataObj){ 
			self.displayNoResultsMessage( self.appSettings.invalidSearchTermMessage );
		});
		
		/* Bind to events to be dispatched from the playgroundViewController */
		 $(self.playgroundViewController).bind( 'priceLevelReady', function(e,dataObj){
		 	$(self.playgroundController).trigger('changePriceLevelSelect');
		 	//self.playgroundController.loadFontSet();
		 });
		$(self.playgroundViewController).bind( 'fontQueueQueryReady', function(e,dataObj){
			self.playgroundController.captureFontQuery();
		});
		$(self.playgroundViewController).bind( 'fontQueueEmptyReady', function(e,dataObj){
			self.playgroundController.captureFontNames();
		});
		$(self.playgroundViewController).bind( 'loadInitialFontsReady', function(e,dataObj){
			self.playgroundController.captureFontNames();
			self.playgroundController.addInitialFontsToTypeDrawer();
		});
		$(self.playgroundViewController).bind( 'searchDataReady', function(e,dataObj){
			self.onSearchDataReady();
			self.playgroundController.createFilters();
			self.playgroundController.loadFontSet();
		});
		$(self.playgroundViewController).bind( 'fontListingReady', function(e,dataObj){
			self.playgroundController.addFontActions();
			if( self.isInitialLoad ) 
			{
				self.playgroundController.loadFontPreviewFromBrowser();
				self.isInitialLoad = false;
			}
		});
		
		$(self.playgroundController).bind( 'drawerFontSaveInit', function(){
			self.drawerSaveAPICount = 0;
		});
		$(self.playgroundController).bind( 'drawerFontSave', function(){
			self.updateCount();
			// console.log(self.drawerSaveAPICount);
		});
		$(self.playgroundController).bind( 'drawerFontSaveNone', function(){
			self.playgroundViewController.redirectToDrawers();
		});
		$(self.playgroundController).bind( 'changePriceLevelSelect', function(){
			self.playgroundController.onInitialPriceLevelChange();
		});
		
		/* Now let's set it all up. */
		self.playgroundController.setup();
	}
	/**
	 * @private Private method that sets up our myTypeDrawersUIController
	 */
	this.setupMyTypeDrawers = function()
	{
		/* Let's create our controller */
		self.myTypeDrawersUIController = new MyTypeDrawersUIController( self.appSettings );
		self.myTypeDrawersViewController = new MyTypeDrawersViewController( self.appSettings );

		/* Bind to events to be dispatched from the myTypeDrawersUIController */
		$(self.myTypeDrawersUIController).bind( 'ajaxRequest', function(e,dataObj){ 
			self.onAjaxRequest( dataObj );
		});
		$(self.myTypeDrawersUIController).bind( 'errorMessage', function(e,dataObj){ 
			self.displayNoResultsMessage( self.appSettings.invalidSearchTermMessage );
		});
		$(self.myTypeDrawersUIController).bind( 'skipToCreateTypeDrawers', function(e,dataObj){ 
			self.onDataReturned( dataObj );
		});
		$(self.myTypeDrawersUIController).bind( 'skipToCreateReceivableDrawers', function(e,dataObj){ 
			self.onDataReturned( dataObj );
		});
		
		/* Bind to events to be dispatched from the myTypeDrawersViewController */
		$(self.myTypeDrawersViewController).bind( 'typeDrawerListingReady', function(e,dataObj){
			self.myTypeDrawersUIController.addDrawerActions();
/*
			if( self.isInitialLoad ) 
			{
				self.playgroundController.loadFontPreviewFromBrowser();
				self.isInitialLoad = false;
			}
*/
		});
		$(self.myTypeDrawersViewController).bind( 'fontUUIDStringReady', function(e,dataObj){
			self.myTypeDrawersUIController.setupFontQueryCall( dataObj );
		});
		$(self.myTypeDrawersViewController).bind( 'receivableFontUUIDStringReady', function(e,dataObj){
			self.myTypeDrawersUIController.setupReceivableTransferFontQueryCall( dataObj );
		});
		$(self.myTypeDrawersViewController).bind( 'domainAdded', function(e,drawer){
			self.myTypeDrawersUIController.domainAdded( drawer );
		});
		$(self.myTypeDrawersViewController).bind( 'changeToDisabled', function(e,drawer){
			// $('.toggleSwitch .disableBtn:visible a', drawer).trigger('click');
			self.myTypeDrawersUIController.makeToggleSwitch( drawer );
		});
		$(self.myTypeDrawersViewController).bind( 'updatedDrawerData', function(e,drawer){
			self.myTypeDrawersUIController.updateTotalMonthlyCharge();
		});

		/* Finally, let's set it all up */
		self.myTypeDrawersUIController.setup();
	}
	/**
	 * @private Private method that displays no results message.
	 */
	this.displayNoResultsMessage = function( message )
	{
		if( $('body').attr('id') == 'myTypeDrawers' )
		{
			$("#noAPIResponseError").css('opacity',1).slideDown();
		}
		else
		{
			$("#fontLibrary .scrollTable table.tbody").html( '<tbody><tr class="noResults"><td>' + message + '</td></tr></tbody>' ).css('border','red');
			self.playgroundViewController.createPaginationNav();
		}
	}
	//-------------------------------------------------
	// Event Handlers
	//-------------------------------------------------
	/**
	 * @private Private event handler method that passes the dataObj and calls to our ajaxAmbassadorModel.
	 */
	this.onAjaxRequest = function( dataObj )
	{
		self.ajaxAmbassadorModel.makeRequest( dataObj );
	}
	/**
	 * @private Private event handler method which begins our data parsing process.
	 */
	this.onDataReturned = function( dataObj )
	{
		
		// alert( dataObj.ajaxResponseData.length );
		// console.log( "$(dataObj.ajaxResponseData).length: " + $(dataObj.ajaxResponseData).length );
		// console.log( "$('type-drawer-list', dataObj.ajaxResponseData).size: " + $('type-drawer-list', dataObj.ajaxResponseData).size() );
		// console.log( "$('type-drawer-list', dataObj.ajaxResponseData).length: " + $('type-drawer-list', dataObj.ajaxResponseData).length );
		
		// if( dataObj.ajaxResponseData.length ) /* temp solution for 'text/html' content-type, also change in the AjaxAmbassadorModel */
		if( $('query-results', dataObj.ajaxResponseData).length || $('type-drawer-list', dataObj.ajaxResponseData).length || $('customer', dataObj.ajaxResponseData).length || $('success', dataObj.ajaxResponseData).length || $('status-results', dataObj.ajaxResponseData).length || $('type-drawer', dataObj.ajaxResponseData).length || dataObj.uiData.bypassAjaxCall == true  )
		// if( $(dataObj.ajaxResponseData).length || dataObj.uiData.bypassAjaxCall == true )
		{
			switch( dataObj.uiData.action )
			{
				/* 
					PLAYGROUND EVENTS 
				*/
				case "getClassifications":
					self.playgroundViewController.createClassificationFilter( dataObj.ajaxResponseData );
					/* let's sneak in the price tiers creation here, since it's now static and not coming from the API */
					self.playgroundViewController.createPriceLevelsFilter( self.appSettings );
					break;
				// case "getPriceLevels":
				// 	self.playgroundViewController.createPriceLevelsFilter( dataObj.ajaxResponseData );
				// 	break;
				case "getFoundries":
					self.playgroundViewController.createFoundriesFilter( dataObj.ajaxResponseData );
					break;
				case "getStyles":
					self.playgroundViewController.createStylesFilter( dataObj.ajaxResponseData );
					break;
				case "fontSetLoad":
					self.playgroundViewController.loadFontSet( dataObj.ajaxResponseData );
					break;
				case "fontSetInitialLoad":
					//$(self.playgroundController).trigger('changePriceLevelSelect');
					break;
				case "searchSubmission":
					self.playgroundViewController.loadFontSet( dataObj.ajaxResponseData );
					break;
				case "captureFontQueue":
					self.playgroundViewController.captureAllFontQueue( dataObj.ajaxResponseData );
					if( $('#typeDrawerContainer .typeDrawerWrapper').css('opacity') < 1 ) self.playgroundController.showTypeDrawer();
					break;
				case "captureFontQuery":
					self.playgroundViewController.setupInitialFonts( dataObj.ajaxResponseData );
					break;
				case "captureFontNames":
					self.playgroundViewController.captureAllFonts( dataObj.ajaxResponseData );
					break;
				case "saveAddedFonts":
					break;
				case "saveDeletedFonts":
					break;
				case "saveGroupFonts":
					self.drawerSaveAPICount--;
					if( !self.drawerSaveAPICount )
					{
						// console.log('redirect');
						$('.typeDrawer .col1, .typeDrawer .col2').css('opacity', 1);
						self.playgroundViewController.redirectToDrawers();
					}
					// console.log(self.drawerSaveAPICount);
					break;
				/* 
					TYPE DRAWER MANAGEMENT EVENTS 
				*/ 
				case "getTypeDrawers":
					// self.myTypeDrawersViewController.createTypeDrawers( dataObj.ajaxResponseData );
					self.myTypeDrawersViewController.parseDrawerFontData( dataObj.ajaxResponseData );
					break;
				case "copyTypeDrawer":
				case "createTypeDrawer":
					self.myTypeDrawersUIController.loadTypeDrawers();
					break;
				case "deleteTypeDrawer":
					self.myTypeDrawersViewController.updateTypeDrawerCount();
					// console.log( 'deleted drawer' );
					break;
				case "updateTypeDrawer":
					self.myTypeDrawersViewController.updateDrawer( dataObj );
					// console.log( 'updated drawer' );
					break;
				case "addNewDomain":
					self.myTypeDrawersViewController.addNewDomain( dataObj );
					break;
				case "removeSelectedFonts":
					self.myTypeDrawersViewController.removeSelectedFonts( dataObj );
					break;
				case "removeSelectedDomains":
					self.myTypeDrawersViewController.removeSelectedDomains( dataObj );
					break;
				case "updateTypeDrawerName":
					break;
				case "getReceivableTypeDrawers":
					// self.myTypeDrawersViewController.loadReceivableDrawers( dataObj );
					self.myTypeDrawersViewController.parseReceivableDrawerFontData( dataObj );
					break;
				case "acceptTypeDrawerTransfers":
					self.myTypeDrawersUIController.loadTypeDrawers();
				case "rejectTypeDrawerTransfers":
					self.myTypeDrawersUIController.closeAlert( dataObj.uiData.alertMsg );
					break;
				case "cancelTypeDrawerTransfer":
				case "initiateTypeDrawerTransfer":
					self.myTypeDrawersUIController.updateTransferPending();
					break;
				case "getFontsForTypeDrawers":
					self.myTypeDrawersViewController.createTypeDrawers( dataObj.ajaxResponseData );
					break;
				case "getFontsForReceivableTransfer":
					self.myTypeDrawersViewController.loadReceivableDrawers( dataObj );
					break;
				case "checkRecipientEmail":
					self.myTypeDrawersUIController.makeRecipientEmailDecision( dataObj );
					break;
				case "initGetUserStats":
					self.myTypeDrawersViewController.parseUserStats( dataObj );
					break;
				case "getCustomerDetails":
					self.myTypeDrawersUIController.makeEnableDrawerDecision( dataObj );
					break;
				/* 
					UNKOWN EVENTS 
				*/
				default:
					alert( 'Unknown action in onDataReturned(): ' + dataObj.uiData.action );
					break;
			}
		}
		else
		{
			self.displayNoResultsMessage( self.appSettings.noResultsMessage );
		}
	}
	/**
	 * @private Private event handler method that handles the 'searchDataReady' event.
	 */
	this.onSearchDataReady = function()
	{
		self.playgroundController.setupAutoComplete();
	}
	/**
	 * @private Private method that handles the updating of drawerSaveAPICount
	 */
	this.updateCount = function()
	{
		self.drawerSaveAPICount++;
	}
	//-------------------------------------------------
	// Getters/Setters
	//-------------------------------------------------

	//-------------------------------------------------
	// Faux Constructor Init
	//-------------------------------------------------
	/**
	 * We need to call our faux constructor, since it won't actually run by itself.
	 * @param domElement The DOM element to store as our root.
	 */
	this.init();
}