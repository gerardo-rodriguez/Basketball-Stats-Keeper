/**
 * Initiates our app.
 * Creates a new instance of our FontFaceAppController.
 */

 $(function(){
	var fontFaceAppController = new FontFaceAppController();
	/* Edit some settings */
	fontFaceAppController.setAppSettings({
		'libraryFontDisplayPerPage':10,
		'fontLibraryRequestURLPublic':'http://atgdev.extensis.com/en/serviceapi/webink/fonts/',
		'fontLibraryRequestURLPrivate':'https://atgdev.extensis.com/en/serviceapi/webink/fontsec/',
		'typeDrawerRequestURL':'https://atgdev.extensis.com/en/serviceapi/webink/typedrawer/',
		'userInfoRequestURL':'https://atgdev.extensis.com/en/WebINK/my_account/user-info.jsp',
		'fontURLPublic':'http://fnts.webink.com/wfs/',
		'fontURLPrivate':'https://fnts.webink.com/wfs/',
		'fontDrawerID':'E14F384F-AC3E-4D36-AA07-04BA1E5932CA',
		'fontApiVersion':'1',
		'noResultsMessage':'No results found.',
		'playgroundTypeDrawerFontNameDisplayCharLimit':10,
		'maxFontDisplay':999,
		'maxDomains':4,
		'domainRegExp': /((^localhost$)|((^\*\.[0-9a-zA-Z\-]+)|(^[0-9a-zA-Z\-]+))(\.[0-9a-zA-Z\-]+)*((\.[0-9a-zA-Z\-]+$)|(\.\*$)))/,
		/*
			BEGIN THE SELECT MENUS IN THE TYPE DRAWER SETTINGS TAB.
		*/
		'typeDrawerSettingsSelectMenus':[
			{
				'labelValue':'Price Tier',
				'selectNameValue':'priceLevel', // IMPORTANT: This matches the attribute name in the returned type drawer xml. DO NOT CHANGE.
				'optionData':[
					{
						'displayValue':'Free / Promotional',
						'value':'1'
					},
					{
						'displayValue':'Budget',
						'value':'2'
					},
					{
						'displayValue':'Standard',
						'value':'3'
					},
					{
						'displayValue':'Premium',
						'value':'4'
					},
					{
						'displayValue':'Elite',
						'value':'5'
					}
				]
			},
			{
				'labelValue':'Usage Level',
				'selectNameValue':'usageLevel', // IMPORTANT: This matches the attribute name in the returned type drawer xml. DO NOT CHANGE.
				'optionData':[
					{
						'displayValue':'Personal (3 GB/month)',
						'value':'1',
						'GBValue':'3'
					},
					{
						'displayValue':'Basic (8 GB/month)',
						'value':'2',
						'GBValue':'8'
					},
					{
						'displayValue':'Professional (12 GB/month)',
						'value':'3',
						'GBValue':'12'
					},
					{
						'displayValue':'Business (30 GB/month)',
						'value':'4',
						'GBValue':'30'
					},
					{
						'displayValue':'Enterprise (80 GB/month)',
						'value':'5',
						'GBValue':'80'
					}
				]
			},
			{
				'labelValue':'Subsetting',
				'selectNameValue':'defaultSubset', // IMPORTANT: This matches the attribute name in the returned type drawer xml. DO NOT CHANGE.
				'optionData':[
					{
						'displayValue':'Full font (no subsetting)',
						'value':'0'
					},
					{
						'displayValue':'Western Europe',
						'value':'1'
					},
					{
						'displayValue':'English',
						'value':'2'
					}
				]
			}
		],
		/*
			END THE SELECT MENUS IN THE TYPE DRAWER SETTINGS TAB.
		*/
		/*
			BEGIN PRICING DATA
			Broken down like so: 
			"1,1" stands for a "Promotional(1) Personal(1)" price.
			"2,5" stands for a "Budget(2) Enterprise(5)" price.
			The first number is the Price Tier/Level value, the second is the Usage Level value.
		*/
		'pricingTableData':{
			'1,1':'$0.99',
			'1,2':'$2.99',
			'1,3':'$9.99',
			'1,4':'$19.99',
			'1,5':'$59.99',
			'2,1':'$1.49',
			'2,2':'$4.49',
			'2,3':'$14.99',
			'2,4':'$29.99',
			'2,5':'$69.99',
			'3,1':'$1.99',
			'3,2':'$5.99',
			'3,3':'$19.99',
			'3,4':'$39.99',
			'3,5':'$89.99',
			'4,1':'$2.99',
			'4,2':'$8.99',
			'4,3':'$29.99',
			'4,4':'$59.99',
			'4,5':'$129.99',
			'5,1':'$3.99',
			'5,2':'$11.99',
			'5,3':'$39.99',
			'5,4':'$79.99',
			'5,5':'$169.99'
		}
		/*
			END PRICING DATA
		*/
	});
	
	/* Set it all up! */
	fontFaceAppController.setup();
});

/*Used for elements that need to be manipulated after the entire page has rendered*/
 $(window).load(function() {
	 $("#secondaryNav, #primaryNav").lavaLamp({
    	fx: "easeOutQuad",
        speed: 500,
        click: function(event, menuItem) {
            return false;
        }
    });
})