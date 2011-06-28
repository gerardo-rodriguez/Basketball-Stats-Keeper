<?php
/**
* DBConnect class - Creates a new user and adds to the database
*
* @var string $host The host to use for the database access.
* @var string $user The username for the database access.
* @var string $pass The password for the database access.
* @var string $dbName The database name.
* @var object $instance To store an instance of this class. 
**/
class DBConnect 
{
	private $host = 'localhost';
	private $user = 'extensis';
	private $pass = 'Buster123';
	private $dbName = '3777_extensis';
	
	private static $instance;
	/*
	* Constructor - Creates our database connection
	*/
	private function __construct() 
	{
		//Connect 
		mysql_connect($this->host, $this->user, $this->pass) or die (mysql_error());
		//Select DB
		mysql_select_db($this->dbName) or die('could not select: ' . mysql_error());
		
	}
	/*
	* Creates a new instance of self and returns it.
	* @return object $instance New instance of the DBConnect class
	*/
	public static function getInstance() 
	{
		
		if(!isset(self::$instance)) {
			self::$instance = new DBConnect;
		}
		
		return self::$instance;
	}
	/*
	* Will run the database query and return results
	* @param string $string The query to run.
	* @param array $arguments The arguments to populate the query.
	*/
	public function query($string, $arguments) 
	{
		
		if( $arguments )
		{
			foreach($arguments as &$argument) 
			{
				$argument = mysql_real_escape_string($argument);
			}
		}
		
		$statement = vsprintf($string, $arguments);
		$result = mysql_query($statement) or die(mysql_error());
		
		return $result;
	}
}
?>