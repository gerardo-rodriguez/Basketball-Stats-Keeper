/**
 * This is a collection of seperate view objects. This collection was created so as not to have to include tons of different views
 * in the <head> of the XHTML markup. Each view is it's own seperate class object.
 */



/**
 * @class StaticSelectOptionsView This will serve as our view for our static select options view.
 * 
 * @author Gerardo Rodriguez - grodriguez@cmdagency.com
 * @created 06/22/2010
 */
function StaticSelectOptionsView( appSettings )
{
	//-------------------------------------------------
	// Properties
	//-------------------------------------------------
	var self = this;
	var root;
	// var viewData;
	var appSettings;
	
	//-------------------------------------------------
	// Faux Constructor
	//-------------------------------------------------
	/**
	 * @private Will server as our faux constructor.
	 * @param {Object} appSettings The data that will be parsed to create the view.
	 */
	this.init = function( appSettings )
	{
		// self.viewData = viewData;
		self.appSettings = appSettings;
	}
	//-------------------------------------------------
	// Public Methods
	//-------------------------------------------------
	/**
	 * @public Public method that prints out the html.
	 * @return The HTML markup.
	 * @type String
	 */
	this.printMarkup = function()
	{
		var markup = "";
		var selectMenuData = self.appSettings.typeDrawerSettingsSelectMenus;
		// var totalPriceTiers;
		var priceLevelMenuData;
		// var usageLevelMenuData;
		
		/* let's grab the data from the select menu data set in the appSettings */
		$(selectMenuData).each(function(o,menu){
			switch( menu.selectNameValue)
			{
				case 'priceLevel':
					// totalPriceTiers = menu.optionData.length;
					priceLevelMenuData = menu;
					break;
				case 'usageLevel':
					// usageLevelMenuData = menu;
					break;
				default:
					break;
			}
		});

		/* let's take the usage level data and figure out what GB value we will used based on the usage level */
		$(priceLevelMenuData.optionData).each(function(k,option){
			markup += "<option value='" + option.value + "'>" + option.displayValue + "</option>";
		});
		
		return markup;
	}
	//-------------------------------------------------
	// Private Methods
	//-------------------------------------------------

	//-------------------------------------------------
	// Faux Constructor Init
	//-------------------------------------------------
	/**
	 * We need to call our faux constructor, since it won't actually run by itself.
	 * @param {Object} appSettings The data that will be parsed to create the view.
	 */
	this.init( appSettings )
}

/**
 * @class SelectOptionsView This will serve as our view for our select options view.
 * 
 * @author Gerardo Rodriguez - grodriguez@cmdagency.com
 * @created 06/08/2010
 */
function SelectOptionsView( viewData )
{
	//-------------------------------------------------
	// Properties
	//-------------------------------------------------
	var self = this;
	var root;
	var viewData;
	var appSettings;
	
	//-------------------------------------------------
	// Faux Constructor
	//-------------------------------------------------
	/**
	 * @private Will server as our faux constructor.
	 * @param {Object} viewData The data that will be parsed to create the view.
	 */
	this.init = function( viewData )
	{
		self.viewData = viewData;
		self.appSettings = appSettings;
	}
	//-------------------------------------------------
	// Public Methods
	//-------------------------------------------------
	/**
	 * @public Public method that prints out the html.
	 * @return The HTML markup.
	 * @type String
	 */
	this.printMarkup = function()
	{
		var markup = "";
		var rootNode  = $(self.viewData).find('values');
		
		$.each( rootNode.children('value'), function(){
			markup += "<option value='" + $(this).text() + "'>" + $(this).text() + "</option>";
		});
		
		return markup;
	}
	//-------------------------------------------------
	// Private Methods
	//-------------------------------------------------

	//-------------------------------------------------
	// Faux Constructor Init
	//-------------------------------------------------
	/**
	 * We need to call our faux constructor, since it won't actually run by itself.
	 * @param {Object} viewData The data that will be parsed to create the view.
	 */
	this.init( viewData )
}

/**
 * @class FontListingView This will serve as our view for our font listing in the playground.
 * 
 * @author Gerardo Rodriguez - grodriguez@cmdagency.com
 * @created 06/08/2010
 */
function FontListingView( viewData, appSettings, totalPriceTiers )
{
	//-------------------------------------------------
	// Properties
	//-------------------------------------------------
	var self = this;
	var root;
	var viewData;
	var appSettings;
	var totalPriceTiers;
	
	//-------------------------------------------------
	// Faux Constructor
	//-------------------------------------------------
	/**
	 * @private Will server as our faux constructor.
	 * @param {Object} viewData The data that will be parsed to create the view.
	 * @param {Object} appSettings The applications settings.
	 * @param {Number} totalPriceTiers The total amount of price tiers.
	 */
	this.init = function( viewData, appSettings, totalPriceTiers )
	{
		self.viewData = viewData;
		self.appSettings = appSettings;
		// self.totalPriceTiers = totalPriceTiers;
		// self.totalPriceTiers = appSettings.totalPriceTiers;
	}
	//-------------------------------------------------
	// Public Methods
	//-------------------------------------------------
	/**
	 * @public Public method that prints out the html.
	 * @return The HTML markup.
	 * @type String
	 */
	this.printMarkup = function()
	{
		var fontXMLData = $(self.viewData).find('font');
		
		var selectMenuData = self.appSettings.typeDrawerSettingsSelectMenus;
		var totalPriceTiers;
		// var usageLevelMenuData;
		
		/* let's grab the data from the select menu data set in the appSettings */
		$(selectMenuData).each(function(o,menu){
			switch( menu.selectNameValue)
			{
				case 'priceLevel':
					totalPriceTiers = menu.optionData.length;
					break;
				case 'usageLevel':
					// usageLevelMenuData = menu;
					break;
				default:
					break;
			}
		});


		var markup = "<tbody>";
		
		/* Let's create the markup for the font listing table */
		$(fontXMLData).each(function(i, font){
			var fontID = $(font).attr('uuid');
			var fontName = $(font).find("value[key='fontName']").text();
			var fontClass = fontName.replace(/\s/g,"_");
			var priceLevel = $(font).find("value[key='priceLevel']").text();
			
			markup += (i%2) ? "<tr class='odd'>" : "<tr>";
			markup += "<td class='previewCell'><span class='" + fontClass + " fontPreview'>Abg123</span><span class='fontTitle'>" + fontName + "</span></td>";
			markup += "<td class='priceTier'><ol class='priceDiscWidget'>";
			var activeCount = 0;
			for( var i=0; i < totalPriceTiers; i++ )
			{
				var classData = (activeCount < priceLevel) ? " class='active'" : '';
				markup += "<li" + classData  + ">price tier " + (i+1) + "</li>";
				activeCount++;
			}
			markup += "</ol></td>";
			markup += "<td><a href='#' class='addLink'>add font</a></td>";
			markup += "</tr>"; 
		});
		markup += "</tbody>";
		
		return markup;
	}
	//-------------------------------------------------
	// Private Methods
	//-------------------------------------------------

	//-------------------------------------------------
	// Faux Constructor Init
	//-------------------------------------------------
	/**
	 * We need to call our faux constructor, since it won't actually run by itself.
	 * @param {Object} viewData The data that will be parsed to create the view.
	 * @param {Object} appSettings The applications settings.
	 * @param {Number} totalPriceTiers The total amount of price tiers.
	 */
	this.init( viewData, appSettings, totalPriceTiers )
}

/**
 * @class FontFaceDeclarationView This will serve as our view for our @font-face declarations.
 * 
 * @author Gerardo Rodriguez - grodriguez@cmdagency.com
 * @created 06/08/2010
 */
function FontFaceDeclarationView( viewData, appSettings )
{
	//-------------------------------------------------
	// Properties
	//-------------------------------------------------
	var self = this;
	var root;
	var viewData;
	var appSettings;
	
	//-------------------------------------------------
	// Faux Constructor
	//-------------------------------------------------
	/**
	 * @private Will server as our faux constructor.
	 * @param {Object} viewData The data that will be parsed to create the view.
	 * @param {Object} appSettings The applications settings.
	 */
	this.init = function( viewData, appSettings )
	{
		self.viewData = viewData;
		self.appSettings = appSettings;
	}
	//-------------------------------------------------
	// Public Methods
	//-------------------------------------------------
	/**
	 * @public Public method that prints out the html.
	 * @return The HTML markup.
	 * @type String
	 */
	this.printMarkup = function()
	{
		var fontXMLData = $( 'font', self.viewData );

		var markup = "<style type='text/css'>";
		$(fontXMLData).each(function(i, font){
			var fontID = $(font).attr('uuid');
			var fontName = $(font).find("value[key='fontName']").text();
			var fontClass = fontName.replace(/\s/g,"_");
			var fontURL = ( $('body').hasClass('public') ) ? self.appSettings.fontURLPublic : self.appSettings.fontURLPrivate;

			markup += "@font-face{";
			markup += "font-family: '" + fontName + "';";
			markup += "src: url( '" + fontURL + "?font=" + fontID + "&drawer=" + self.appSettings.fontDrawerID + "&version=" + self.appSettings.fontApiVersion + "' );";
			markup += "}";
			markup += "." + fontClass + " { font-family: '" + fontName + "';";
			//ie smoothing but it makes the preview chiclets gray
			//markup += " filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=hIEfix.png,sizingMethod=crop); filter: alpha(opacity=100); zoom:1;";
			markup += "}";
		});
		markup += "</style>";
		
		return markup;
	}
	/**
	 * @public Public method that gets the font code
	 * @return The HTML markup.
	 * @type String
	 */
	this.getMarkup = function()
	{
		var fonts = $('.fonts .scrollTable input:checked', self.viewData );

		var markup = "<style type='text/css'>\n";
		$(fonts).each(function(i, input){
			var row = $(input).parent().parent();
			var font = $(row).data('fontData');
			var fontID = font.uuid;
			var fontName = $('.fontTitle', row).text();
			var fontClass = fontName.replace(/\s/g,"_");
			var fontURL = ( $('body').hasClass('public') ) ? self.appSettings.fontURLPublic : self.appSettings.fontURLPrivate;

			markup += "  @font-face{\n";
			markup += "    font-family: '" + fontName + "';\n";
			markup += "    src: url( '" + fontURL + "?font=" + fontID + "&drawer=" + self.appSettings.fontDrawerID + "&version=" + self.appSettings.fontApiVersion + "' );\n";
			markup += "  }\n";
			markup += "  ." + fontClass + " { font-family: '" + fontName + "'; }";
			if( i < (fonts.length-1) ) markup += "\n\n";
		});
		markup += "</style>";
		
		return markup;
	}

	//-------------------------------------------------
	// Private Methods
	//-------------------------------------------------

	//-------------------------------------------------
	// Faux Constructor Init
	//-------------------------------------------------
	/**
	 * We need to call our faux constructor, since it won't actually run by itself.
	 * @param {Object} viewData The data that will be parsed to create the view.
	 * @param {Object} appSettings The applications settings.
	 */
	this.init( viewData, appSettings );
}

/**
 * @class TypeDrawerView This will serve as our view for a single Type Drawer.
 * 
 * @author Gerardo Rodriguez - grodriguez@cmdagency.com
 * @created 06/08/2010
 */
function TypeDrawerView( drawerData, fontData, appSettings )
{
	//-------------------------------------------------
	// Properties
	//-------------------------------------------------
	var self = this;
	var root;
	var drawerData;
	var fontData;
	var appSettings;
	var totalPriceTiers;
	
	//-------------------------------------------------
	// Faux Constructor
	//-------------------------------------------------
	/**
	 * @private Will server as our faux constructor.
	 * @param {Object} viewData The data that will be parsed to create the view.
	 * @param {Object} appSettings The applications settings.
	 */
	this.init = function( drawerData, fontData, appSettings )
	{
		self.drawerData = drawerData;
		self.fontData = fontData;
		self.appSettings = appSettings;
		// self.totalPriceTiers = appSettings.totalPriceTiers;
	}
	//-------------------------------------------------
	// Public Methods
	//-------------------------------------------------
	/**
	 * @public Public method that prints out the html.
	 * @return The HTML markup.
	 * @type String
	 */
	this.printMarkup = function()
	{
		// var typeDrawerList = $(self.viewData).find('type-drawer');

		var markup = "";
		var totalDrawers = $(self.drawerData).length;
		// console.log( "TOTAL DRAWERS: " + totalDrawers );
		var selectMenuData = self.appSettings.typeDrawerSettingsSelectMenus;
		var totalPriceTiers;
		var usageLevelMenuData;
		
		/* let's grab the data from the select menu data set in the appSettings */
		$(selectMenuData).each(function(o,menu){
			switch( menu.selectNameValue)
			{
				case 'priceLevel':
					totalPriceTiers = menu.optionData.length;
					break;
				case 'usageLevel':
					usageLevelMenuData = menu;
					break;
				default:
					break;
			}
		});

		/* let's create our drawers */
		$(self.drawerData).each( function(i,drawer){
			var secureURL = "https://atgdev.extensis.com/prototype/dev/webink_v2_kellan/";
			var fontCount = $(drawer).find('fonts').children('font').length;
			var fontCountDisplay = ( $(drawer).find('fonts').children('font').length <= self.appSettings.maxFontDisplay ) ? $(drawer).find('fonts').children('font').length : self.appSettings.maxFontDisplay + "+";
			var drawerId = $(drawer).attr('uuid');
			var domainArr = $(drawer).find('referrers').text().split(',');
			var domainCount = ( domainArr[0] != "" ) ? domainArr.length : 0;
			var usageLevel = $(drawer).attr('usageLevel');
			var isDrawerComplete = ( domainCount > 0 && fontCount > 0 && usageLevel > 0 ) ? true : false;
			var priceTierLevel = $(drawer).attr('priceLevel');
			// var usageLevel = $(drawer).attr('usageLevel');
			var defaultSubset = $(drawer).attr('defaultSubset');
			var isTransferPending = $(drawer).attr('transferPending');
			var pricePerMonth = self.appSettings.pricingTableData[priceTierLevel + ',' + usageLevel];
			var GBValue;

			/* let's take the usage level data and figure out what GB value we will used based on the usage level */
			$(usageLevelMenuData.optionData).each(function(k,option){
				if( option.value == usageLevel )
				{
					GBValue = option.GBValue;
					return false;
				}
			});
			
			markup += ( isDrawerComplete ) ? "<div class='drawer'>" : "<div class='drawer incomplete'>" ;
				markup += "<img id='spinner_" + drawerId + "' class='drawerSpinner' src='../img/ajax-loader_TDM_v3.gif' alt='ajax spinning loader' width='25' height='25' />";
				markup += "<div class='header'>";
					markup += '<h4><a class="name">' + /*decodeURIComponent*/( $(drawer).find('name').text() ) + '</a><a href="#" class="edit"> - edit</a></h4>';
					markup += "<ul class='statusDetails'>";
						markup += "<li class='fonts' title='Fonts'>";
							if( fontCount )
							{
								markup += "<a class='count' href='#'>" + fontCountDisplay + "</a>";
							}
							else
							{
								markup += "<a class='count add' href='#'>add+</a>";
							}
						markup += "</li>";
						markup += "<li class='domains' title='Domains'>";
							if( domainCount )
							{
								markup += "<a class='count' href='#'>" + domainCount + "</a>";
							}
							else 
							{
								markup += "<a class='count add' href='#'>add+</a>";
							}
						markup += "</li>";
						markup += "<li class='usage' title='GB/Month'>";
							if( usageLevel )
							{
								markup += "<a class='count' href='#'>" + GBValue + "</a>";
							}
							else
							{
								markup += "<a class='count add' href='#'>add+</a>";
							}
						markup += "</li>";
						markup += "<li>";
							markup += "<dl class='priceTierWidget'>";
								markup += "<dt><span class='priceAmount'>" + pricePerMonth + "</span>/Month</dt>";
								markup += "<dd>";
									markup += "<ol class='priceDiscWidget'>";

									for( var j=0; j < totalPriceTiers; j++ )
									{
										var classData = (j < priceTierLevel) ? " class='active'" : '';
										markup += "<li" + classData  + ">price tier " + (j+1) + "</li>";
									}
									markup += "</ol>";
								markup += "</dd>";
							markup += "</dl>";
						markup += "</li>";
					markup += "</ul>";
					markup += "<div class='toggleSwitchContainer'>";
						markup += "<img class='toggleSwitchSpinner' src='../img/ajax-loader_statusToggle.gif' alt='ajax spinning loader' width='25' height='25' />";
						markup += "<p>Status</p>";
						markup += "<div class='toggleSwitch'>";
							markup += "<ul>";
							
							if( $(drawer).attr('enabled').toLowerCase() === 'true' )
							{
								markup += "<li class='active disableBtn hidden' title='disabled'><a href='#'>Disabled</a></li>";
								markup += "<li class='inactive disableBtn' title='disable'><a href='#'>Disable</a></li>";
								markup += "<li class='active enableBtn' title='enabled'><a href='#'>Enabled</a></li>";
								markup += "<li class='inactive enableBtn hidden' title='enable'><a href='#'>Enable</a></li>";
							}
							else
							{
								markup += "<li class='active disableBtn' title='disabled'><a href='#'>Disabled</a></li>";
								markup += "<li class='inactive disableBtn hidden' title='disable'><a href='#'>Disable</a></li>";
								markup += "<li class='active enableBtn hidden' title='enabled'><a href='#'>Enabled</a></li>";
								markup += "<li class='inactive enableBtn' title='enable'><a href='#'>Enable</a></li>";
							}
							markup += "</ul>";
						markup += "</div>";
					markup += "</div>";
				markup += "</div>";
			
				markup += "<div class='body'>";
					markup += "<ul class='tabs'>";
						 markup += "<li><a href='#fonts'><span>Fonts (<em class='fontCount'>" + fontCount + "</em>)</span></a></li>";
						 markup += "<li><a href='#domains'><span>Domains (<em class='domainCount'>" + domainCount + "</em> of " + self.appSettings.maxDomains + ")</span></a></li>";
						 markup += "<li><a href='#settings'><span>Settings</span></a></li>";
					markup += "</ul>";
					markup += "<div class='panes'>";
						markup += "<div class='fonts'>";
							markup += "<div class='col1'>";
								markup += "<table class='thead' border='0' cellspacing='0' cellpadding='0'>";
									markup += "<thead>";
										markup += "<tr>";
											markup += "<th><form><fieldset><input type='checkbox' name='select_all_fonts' value='selectAllFonts' class='selectAll' /></fieldset></form></th>";
											markup += "<th class='fontsCol'><span>Fonts</span><a class='addLink' href='" + secureURL + "exploreFonts/drawer.html?id=" + drawerId + "'>add font</a></th>";
											markup += "<th class='priceTierCol'>Price Tier</th>";
											markup += "<th class='foundryCol'>Foundries</th>";
										markup += "</tr>";
									markup += "</thead>";
								markup += "</table>";
								markup += "<form class='selectForm'><fieldset>";
									markup += "<div class='scrollTable'>";
										markup += "<table class='tbody fontListingWidget' border='0' cellspacing='0' cellpadding='0'>";
											markup += "<!-- FPO TBODY -->";
											markup += "<tbody>";
	
											var fontList = $(drawer).find('font');
											$(fontList).each(function(i,font){
												
												var currFontXMLNode = $(self.fontData).find( "font[uuid='" + $(font).attr("uuid") + "']" );
												var fontName = $(currFontXMLNode).find("value[key='fontName']").text();
												var fontClass = fontName.replace(/\s/g,"_");
												var priceLevel = $(currFontXMLNode).find("value[key='priceLevel']").text();
												var foundry = $(currFontXMLNode).find("value[key='foundry']").text();
												
												markup += "<tr>";
													markup += "<td>";
														markup += "<input type='checkbox' name='select_font' value='select_font' />";
													markup += "</td>";
													markup += "<td class='previewCell'>";
														markup += "<span class='" + fontClass + " fontPreview'>Abg123</span>";
														markup += "<span class='fontTitle'>" + fontName + "</span>";
													markup += "</td>";
													markup += "<td class='priceTier'>";
														markup += "<ol class='priceDiscWidget'>";
															var activeCount = 0;
															for( var i=0; i < totalPriceTiers; i++ )
															{
																var classData = (activeCount < priceLevel) ? " class='active'" : '';
																markup += "<li" + classData  + ">price tier " + (i+1) + "</li>";
																activeCount++;
															}
														markup += "</ol>";
													markup += "</td>";
													markup += "<td class='foundryCell'>" + foundry + "</td>";
												markup += "</tr>";
											});
	
											markup += "</tbody>";
											markup += "<!-- FPO TBODY -->";
										markup += "</table>";
									markup += "</div>";
									markup += "<a class='actionBtn notable getCode' href='#'>Get Code</a>";
									markup += "<a class='actionBtn remove' href='#'>Delete</a>";
									markup += "<a class='actionBtn notable playground' href='" + secureURL + "exploreFonts/drawer.html?id=" + drawerId + "'>Add Fonts</a>";
								markup += "</fieldset></form>";
							markup += "</div>";
							markup += "<div class='col2'>";
								markup += "<h5>Lorem Ipsum</h5>";
								markup += "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod rhoncus laoreet. Quisque feugiat tempor rhoncus. Nulla urna nisi, faucibus et mollis at, lacinia et purus. In gravida elementum rutrum. Integer eu leo est.</p>";
								markup += "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod rhoncus laoreet. Quisque feugiat tempor rhoncus.</p>";
							markup += "</div>";
						markup += "</div>";
						markup += "<div class='domains'>";
							markup += "<div class='col1'>";
								markup += "<form class='addDomainForm' action='' method='get'>";
									markup += "<fieldset>";
										markup += "<input class='addDomain' type='text' name='addDomain' value='add a domain' /><button type='submit'" + ( ( domainCount < self.appSettings.maxDomains ) ? "" : " disabled='disabled'" ) + ">Add Domain</button>";
									markup += "</fieldset>";
								markup += "</form>";
								markup += "<table class='thead' border='0' cellspacing='0' cellpadding='0'>";
									markup += "<thead>";
										markup += "<tr>";
											markup += "<!-- These classes are matching the query criteria from the API -->";
											markup += "<th class='selectAllCell'><form><fieldset><input type='checkbox' name='select_all_fonts' value='selectAllFonts' class='selectAll' /></fieldset></form></th>";
											markup += "<th>Domains</th>";
										markup += "</tr>";
									markup += "</thead>";
								markup += "</table>";
								markup += "<form class='selectForm'><fielset>";
									markup += "<div class='scrollTable'>";
										markup += "<table class='tbody' border='0' cellspacing='0' cellpadding='0'>";
											markup += "<tbody>";
	
											if( domainCount )
											{
												$(domainArr).each(function(j,domain){
													markup += "<tr>";
														markup += "<td>";
															markup += "<input type='checkbox' name='select_font' value='select_font' />";
														markup += "</td>";
														markup += "<td class='domainName'>" + domain + "</td>";
													markup += "</tr>";
												});
											}
	
											markup += "</tbody>";
										markup += "</table>";
									markup += "</div>";
									markup += "<a class='actionBtn remove' href='#'>Delete</a>";
								markup += "</fieldset></form>";
							markup += "</div>";
							markup += "<div class='col2'>";
								markup += "<h5>Domain Format:</h5>";
								markup += "<p>Add up to four domains per Type Drawer (if you need more, contact us for a custom plan). To maximize font usage within a domain, you can use an * as a wildcard for multiple subdomains or multinational sites.</p>";
								markup += "<p>Examples:</p>";
								markup += '<ul><li>www.domainname.ext</li><li>*.domainname.ext</li><li>www.domainname.*</li><li>*.extensis.co.*</li></ul>';
							markup += "</div>";
						markup += "</div>";
						markup += "<div class='settings'>";
							markup += "<div class='col1'>";
								markup += "<form class='settingsForm' action='' method='post'>";
									markup += "<fieldset>";
										
										$.each( selectMenuData, function(i,menuData){
											markup += "<label for='" + menuData.selectNameValue + "'>" + menuData.labelValue + "</label>";
											markup += "<select class='" + menuData.selectNameValue + "' name='" + menuData.selectNameValue + "'>";
											var currMenuValue = $(drawer).attr( menuData.selectNameValue );
											$.each( menuData.optionData, function(j,option){
												var selectedData = ( currMenuValue == option.value ) ? " selected='selected'" : "";
												markup += "<option value='" + option.value + "'" + selectedData + ">" + option.displayValue + "</option>";
											});
											markup += "</select>";
										});
										
										markup += "<button type='submit' class='initHide'>submit</button>";
									markup += "</fieldset>";
								markup += "</form>";
							markup += "</div>";
							markup += "<div class='col2'>";
								markup += "<h5>Price Tier and Usage Level</h5>";
								markup += "<p>The amount your credit card is charged each month per Type Drawer is determined by the price tier and usage level.</p>";
								markup += "<p>The font with the highest price in a Type Drawer determines the overall price tier of that Type Drawer. To select a lower price tier for the Type Drawer, you must remove any font that is in a higher tier.</p>";
								markup += "<p>If you need a higher usage level, contact us to set up a custom plan.</p>";
							markup += "</div>";
						markup += "</div>";
					markup += "</div>";
				markup += "</div>";
			
				markup += "<div class='footer'>";
					markup += "<a href='#' class='copyDrawerLink'>Copy Drawer</a>";
					markup += "<a href='#' class='transferDrawerLink'>Transfer Drawer</a>";
					markup += "<a href='#' class='cancelTransferLink'>Cancel Transfer</a>";
					markup += "<p class='transferMessage'>Transfer In Progress</p>";
					markup += "<a href='#' class='drawerToggle'>Toggle</a>";
					markup += "<a href='#' class='deleteDrawerLink'>Delete Drawer</a>";
				markup += "</div>";
			markup += "</div>";
		});
		
		
		return markup;
	}
	//-------------------------------------------------
	// Private Methods
	//-------------------------------------------------

	//-------------------------------------------------
	// Faux Constructor Init
	//-------------------------------------------------
	/**
	 * We need to call our faux constructor, since it won't actually run by itself.
	 * @param {Object} drawerData The drawer data that will be parsed to create the view.
	 * @param {Object} fontData The font data that will be parsed to create the view.
	 * @param {Object} appSettings The applications settings.
	 */
	this.init( drawerData, fontData, appSettings )
}

/**
 * @class TransferRequestView This will serve as our view for a transfer request view.
 * 
 * @author Gerardo Rodriguez - grodriguez@cmdagency.com
 * @created 06/16/2010
 */
function TransferRequestView( drawerData, fontData, appSettings )
{
	//-------------------------------------------------
	// Properties
	//-------------------------------------------------
	var self = this;
	var root;
	var drawerData;
	var fontData;
	var appSettings;
	var totalPriceTiers;
	
	//-------------------------------------------------
	// Faux Constructor
	//-------------------------------------------------
	/**
	 * @private Will server as our faux constructor.
	 * @param {Object} drawerData The drawer data that will be parsed to create the view.
	 * @param {Object} fontData The font data that will be parsed to create the view.
	 * @param {Object} appSettings The applications settings.
	 */
	this.init = function( drawerData, fontData, appSettings )
	{
		self.drawerData = drawerData;
		self.fontData = fontData;
		self.appSettings = appSettings;
		// self.totalPriceTiers = appSettings.totalPriceTiers;
	}
	//-------------------------------------------------
	// Public Methods
	//-------------------------------------------------
	/**
	 * @public Public method that prints out the html.
	 * @return The HTML markup.
	 * @type String
	 */
	this.printMarkup = function()
	{
		// var typeDrawerList = $(self.drawerData).find('type-drawer');
		// var fontList = $(self.fontList).find('font-list');
		
		var markup = "";
		var totalDrawers = $(self.drawerData).length;
		// console.log( "TOTAL TRANSFER REQUESTS: " + totalDrawers );
		var selectMenuData = self.appSettings.typeDrawerSettingsSelectMenus;
		var totalPriceTiers;
		var usageLevelMenuData;
		
		/* let's grab the data from the select menu data set in the appSettings */
		$(selectMenuData).each(function(o,menu){
			switch( menu.selectNameValue)
			{
				case 'priceLevel':
					totalPriceTiers = menu.optionData.length;
					break;
				case 'usageLevel':
					usageLevelMenuData = menu;
					break;
				default:
					break;
			}
		});

		// $(typeDrawerList).each( function(i,drawer){
		$(self.drawerData).each( function(i,drawer){
			var fontCount = $(drawer).find('fonts').children('font').length;
			var fontList = $(drawer).find('fonts').children('font');
			var domainArr = $(drawer).find('referrers').text().split(',');
			var domainCount = ( domainArr[0] != "" ) ? domainArr.length : 0;
			var usageLevel = $(drawer).attr('usageLevel');
			var isDrawerComplete = ( domainCount > 0 && fontCount > 0 && usageLevel > 0 ) ? true : false;
			var priceTierLevel = $(drawer).attr('priceLevel');
			var defaultSubset = $(drawer).attr('defaultSubset');
			var isTransferPending = $(drawer).attr('transferPending');
			var senderAccount = $(drawer).attr('customerAccount');
			var enabledStatus = ( $(drawer).attr('enabled') == 'true' ) ? 'Enabled' : 'Disabled';
			var drawerName = $(drawer).find('name').text();
			var pricePerMonth = self.appSettings.pricingTableData[priceTierLevel + ',' + usageLevel];
			var GBValue;

			/* let's take the usage level data and figure out what GB value we will used based on the usage level */
			$(usageLevelMenuData.optionData).each(function(k,option){
				if( option.value == usageLevel )
				{
					GBValue = option.GBValue;
					return false;
				}
			});
			
			markup += "<div class='alertContainer'>";
				markup += "<img class='alertMsgSpinner' src='../img/ajax-loader_TDM_v3.gif' alt='ajax spinning loader' width='25' height='25' />";
				markup += "<div class='activeMsg'>";
					
					markup += "<div class='col2 alertBtnSet'>";
						markup += "<a href='#' class='alertBtn decline'><span>Decline</span></a>";
						markup += "<a href='#' class='alertBtn accept'><span>Accept Drawer</span></a>";
					markup += "</div>";

					markup += "<div class='col1'>";
						markup += "<h5>Drawer Transfer Request</h5>";
						markup += "<p>" + senderAccount + " would like to transfer type drawer \"" + drawerName + "\" to your account. Would you like to accept this type drawer?</p>";
					markup += "</div>";
					

					
					markup += "<div class='fontsContainer drawerInfo'>";
						markup += "<h5>Fonts (" + fontCount + ")</h5>";
						markup += "<ul>";
						$(fontList).each(function(i,font){
							markup += "<li>" + $(self.fontData).find("font[uuid='"+ $(font).attr('uuid') + "']'").find("value[key='fontName']").text() + "</li>";
						});
						markup += "</ul>";
					markup += "</div>";
					
					markup += "<div class='domainsContainer drawerInfo'>";
						markup += "<h5>Domains (" + domainCount + ")</h5>";
						markup += "<ul>";
						$(domainArr).each(function(i,domain){
							markup += "<li>" + domain + "</li>";
						});
						markup += "</ul>";
					markup += "</div>";
					
					markup += "<div class='priceTierContainer drawerInfo'>";
						markup += "<h5>Price/Month</h5>";
/*
						markup += "<ol class='priceDiscWidget'>";
							markup += "<li class='active'>price tier 1</li>";
							markup += "<li>price tier 2</li>";
							markup += "<li>price tier 3</li>";
							markup += "<li>price tier 4</li>";
							markup += "<li>price tier 5</li>";
						markup += "</ol>";
*/
						markup += "<p>" + pricePerMonth + "</p>";
					markup += "</div>";

					markup += "<div class='statusContainer drawerInfo'>";
						markup += "<h5>Status</h5>";
						markup += "<p>" + enabledStatus + "</p>";
					markup += "</div>";

					markup += "<div class='usageLevelContainer drawerInfo'>";
						markup += "<h5>Usage Level</h5>";
						markup += "<p>" + GBValue + " GB/Month</p>";
					markup += "</div>";

					markup += "<a href='#' class='closeBtn' title='Close Message'>Close Message</a>";
				markup += "</div>";
			markup += "</div>";
		});
		
		return markup;
	}
	//-------------------------------------------------
	// Private Methods
	//-------------------------------------------------

	//-------------------------------------------------
	// Faux Constructor Init
	//-------------------------------------------------
	/**
	 * We need to call our faux constructor, since it won't actually run by itself.
	 * @param {Object} drawerData The drawer data that will be parsed to create the view.
	 * @param {Object} fontData The font data that will be parsed to create the view.
	 * @param {Object} appSettings The applications settings.
	 */
	this.init( drawerData, fontData, appSettings )
}