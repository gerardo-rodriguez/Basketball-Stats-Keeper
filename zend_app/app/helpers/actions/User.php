<?php
	
	/**
	* Helper_User is an action helper used to encrypt account information,
	*/
	class Helper_User extends Zend_Controller_Action_Helper_Abstract
	{
		/*
		 **	encryptLogin method
		 * @param {array} $arguments an array of the string to be commited and the string to use as the salt
		 * @returns {string} an encrypted string
 		 */
		public function encryptLogin( $arguments ) {
			return crypt($arguments[0], md5($arguments[1]));
		}
	}
?>