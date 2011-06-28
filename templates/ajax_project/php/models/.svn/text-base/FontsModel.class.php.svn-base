<?php
/**
 * FontsModel class
 * Queries the database for all of our font infomration.
 */
class FontsModel
{
	private $db;
	private static $table = "tbl_fonts";
	
	public function __construct()
	{
		/* Connect to the database */
		$this->db = DBConnect::getInstance();
	}
	/**
	 * Returns a set of fonts based on the current request.
	 * @param $data The data coming in from the client side.
	 * @return array The response data after querying the database.
	 */
	public function accessFontSet( $data )
	{
		return $this->getFontSet( $data );
	}
	/**
	 * Returns a set of fonts based on the current request.
	 * @param $data The data coming in from the client side.
	 * @return array The response data after querying the database.
	 */
	public function getFontSet( $data )
	{
		// $currClick = $data['currClick'];
		// $fontAmount = $data['fontAmount'];
		$style = $data['filterData']['style'];
		$classification = $data['filterData']['classification'];
		$foundry = $data['filterData']['foundry'];
		$planLevel = $data['filterData']['planLevel'];
		$fontFamilyName = $data['fontFamilyName'];
		

		$queryString = "SELECT FontName, Style, Foundry, Designer, PlanLevel, CssClass, Classifications, FontFamily, FontFile FROM %s WHERE FontFamily = '%s'";
		$arguments = array(self::$table, $fontFamilyName);

		/* Call query method of DBConnect class */
		$result = $this->db->query( $queryString, $arguments );
		// $countResult = $this->db->query( $countQueryString, $countArguments );


		$dataArray = array();
		
		if( mysql_num_rows($result) )
		{
			while( $row = mysql_fetch_array($result, MYSQL_ASSOC) )
			{
				array_push($dataArray, $row);
			}
		}

		return $dataArray;
	}
	/**
	 * Returns a set of font family data.
	 * @param $data The data coming in from the client side.
	 * @return array The response data after querying the database.
	 */
	public function getFontFamilySet( $data )
	{
		$currClick = $data['currClick'];
		$limit = $data['loadLimit'];
		// $style = $data['filterData']['style'];
		// $classification = $data['filterData']['classification'];
		// $foundry = $data['filterData']['foundry'];
		// $planLevel = $data['filterData']['planLevel'];
		
		$startIndex = $fontAmount * ($currClick-1);

		/* Select Query */
		$queryString = "SELECT DISTINCT %s FROM %s ORDER BY %s LIMIT %s,%s";
		
		$arguments = array('FontFamily', self::$table, 'FontFamily', $startIndex, $limit);

		/* Call query method of DBConnect class */
		$result = $this->db->query( $queryString, $arguments );
		
		$dataArray = array();
		
		if( mysql_num_rows($result) )
		{
			while( $row = mysql_fetch_array($result, MYSQL_ASSOC) )
			{
				array_push($dataArray, $row);
			}
		}
		
		return $dataArray;
	}
	/**
	 * Returns the fonts for the families requested.
	 * @param $data The data coming in from the client side.
	 * @return array The response data after querying the database.
	 */
	public function getFontsForFamilies( $data )
	{
		$currClick = $data['currClick'];
		$fontAmount = $data['fontAmount'];
		$fontFamilyArr = $data['filterData']['familyArr'];
		// $style = $data['filterData']['style'];
		
		$startIndex = $fontAmount * ($currClick-1);
		
		$filterString = "";
		foreach( $fontFamilyArr as $key => $fontFamily )
		{
			$filterString .= "FontFamily REGEXP '^%s'";
			if( $key < count($fontFamily)-1 )
			{
				$filterString .= " OR";
			}
		}
	
		/* Select Query */
		$queryString = "SELECT FontName, Style, Foundry, Designer, PlanLevel, CssClass, Classifications, FontFamily, FontFile FROM %s WHERE " . $filterString;
		
		$arguments = array(self::$table);
	
		/* Call query method of DBConnect class */
		$result = $this->db->query( $queryString, $arguments );
		
		$dataArray = array($queryString);
		
		if( mysql_num_rows($result) )
		{
			while( $row = mysql_fetch_array($result, MYSQL_ASSOC) )
			{
				array_push($dataArray, $row);
			}
		}
		
		return $dataArray;
	}
	/**
	 * Returns the classifications from the database.
	 * @return array The response data after querying the database.
	 */
	public function getClassifications()
	{
		/* Select Query */
		$queryString = "SELECT DISTINCT %s FROM %s ORDER BY %s";
		
		$arguments = array('Classifications', self::$table, 'Classifications');

		/* Call query method of DBConnect class */
		$result = $this->db->query( $queryString, $arguments );
		
		$dataArray = array();
		
		if( mysql_num_rows($result) )
		{
			while( $row = mysql_fetch_array($result, MYSQL_ASSOC) )
			{
				array_push($dataArray, $row);
			}
		}
		
		return $dataArray;
	}
	/**
	 * Returns the price level plans from the database.
	 * @return array The response data after querying the database.
	 */
	public function getPlanLevels()
	{
		/* Select Query */
		$queryString = "SELECT DISTINCT %s FROM %s ORDER BY %s";
		
		$arguments = array('PlanLevel', self::$table, 'PlanLevel');

		/* Call query method of DBConnect class */
		$result = $this->db->query( $queryString, $arguments );
		
		$dataArray = array();
		
		if( mysql_num_rows($result) )
		{
			while( $row = mysql_fetch_array($result, MYSQL_ASSOC) )
			{
				array_push($dataArray, $row);
			}
		}
		
		return $dataArray;
	}
	/**
	 * Returns the font styles from the database.
	 * @return array The response data after querying the database.
	 */
	public function getStyles()
	{
		/* Select Query */
		$queryString = "SELECT DISTINCT %s FROM %s ORDER BY %s";
		
		$arguments = array('Style', self::$table, 'Style');

		/* Call query method of DBConnect class */
		$result = $this->db->query( $queryString, $arguments );
		
		$dataArray = array();
		
		if( mysql_num_rows($result) )
		{
			while( $row = mysql_fetch_array($result, MYSQL_ASSOC) )
			{
				array_push($dataArray, $row);
			}
		}
		
		return $dataArray;
	}
	/**
	 * Returns the font foundries from the database.
	 * @return array The response data after querying the database.
	 */
	public function getFoundries()
	{
		/* Select Query */
		$queryString = "SELECT DISTINCT %s FROM %s ORDER BY %s";
		
		$arguments = array('Foundry', self::$table, 'Foundry');

		/* Call query method of DBConnect class */
		$result = $this->db->query( $queryString, $arguments );
		
		$dataArray = array();
		
		if( mysql_num_rows($result) )
		{
			while( $row = mysql_fetch_array($result, MYSQL_ASSOC) )
			{
				array_push($dataArray, $row);
			}
		}
		
		return $dataArray;
	}
}
?>