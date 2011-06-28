<?php
	
	/**
	* Helper_Validate is an action helper validate user input
	*/
	class Helper_Validate extends Zend_Controller_Action_Helper_Abstract
	{
		private $errors;
		private $i = 0;
		
		public function direct( $view ) {
			$this->errors = array();
		}
		
		/*
		 **	validateEmail method
		 */
		public function email( $email, $current_email=false ) {
			$valid_email_chain = new Zend_Validate();
			
			$notEmpty = new Zend_Validate_NotEmpty();
			$emailAddress = new Zend_Validate_EmailAddress();
			$noRecordExists = new Zend_Validate_Db_NoRecordExists(array('table'=>'users', 'field'=>'email'));
			
			$notEmpty->setMessage("Email cannot be empty.", Zend_Validate_NotEmpty::IS_EMPTY);
			$emailAddress->setMessage("The email format for '%value%' is invalid.", Zend_Validate_EmailAddress::INVALID_FORMAT);
			$noRecordExists->setMessage("The email '%value%' is already taken.", Zend_Validate_Db_NoRecordExists::ERROR_RECORD_FOUND);
			
			$valid_email_chain->addValidator($notEmpty)
							  ->addValidator($emailAddress);
			
			if (!Zend_Validate::is($email, 'Identical', array($current_email))) {
				$valid_email_chain->addValidator($noRecordExists);
			}
			
			$valid_email_chain->isValid($email);
			
			$this->getMessages( $valid_email_chain );
		}
		
		/*
		 **	vadliatePass method
		 */
		public function pass( $pass, $verify_pass ) {
			$valid_pass_chain = new Zend_Validate();
			
			$notEmpty = new Zend_Validate_NotEmpty();
			$stringLength = new Zend_Validate_StringLength(array('min'=>4));
			$identical = new Zend_Validate_Identical($verify_pass);
			
			$notEmpty->setMessage("Password cannot be empty.", Zend_Validate_NotEmpty::IS_EMPTY);
			$stringLength->setMessage("The password must be a least 4 characters.", Zend_Validate_StringLength::TOO_SHORT);
			$identical->setMessage("Your passwords do not match.", Zend_Validate_Identical::NOT_SAME);
			
			$valid_pass_chain->addValidator($notEmpty)
							 ->addValidator($stringLength)
							 ->addValidator($identical);

			$valid_pass_chain->isValid($pass);
			
			$this->getMessages( $valid_pass_chain );
		}
		
		/*
		 **	notEmpty method
		 */
		public function notEmpty( $key, $value ) {
			$valid_chain = new Zend_Validate();
			
			$notEmpty = new Zend_Validate_NotEmpty();
			
			$notEmpty->setMessage("$key cannot be empty.", Zend_Validate_NotEmpty::IS_EMPTY);
			
			$valid_chain->addValidator($notEmpty);

			$valid_chain->isValid($value);
			
			$this->getMessages( $valid_chain );
		}
		
		/*
		 **	notDefault method
		 */
		public function notDefault( $key, $value, $token ) {
			
			if ( $value == $token) {
				$this->addError($key, "Please enter your $key.");
			}
		}
		
		/*
		 **	isLength method
		 */
		public function isLength( $key, $value, $len ) {
			$valid_chain = new Zend_Validate();
			
			$length = new Zend_Validate_StringLength(array('min' => $len, 'max' => $len));
			
			$length->setMessage("$key needs $len characters.", Zend_Validate_StringLength::TOO_SHORT);
			
			$valid_chain->addValidator($length);

			$valid_chain->isValid($value);
			
			$this->getMessages( $valid_chain );
		}
		
		/*
		 **	digit method
		 */
		public function digit( $key, $value ) {
			$valid_chain = new Zend_Validate();
			
			$digit = new Zend_Validate_Digits();
			
			$digit->setMessage("$key need to be numbers.", Zend_Validate_Digits::NOT_DIGITS);
			
			$valid_chain->addValidator($digit);

			$valid_chain->isValid($value);
			
			$this->getMessages( $valid_chain );
		}
		
		/*
		 **	isInt method
		 */
		public function isInt( $key, $value ) {
			$valid_chain = new Zend_Validate();
			
			$int = new Zend_Validate_Int();
			
			$int->setMessage("$key, '%value%' must be a number.", Zend_Validate_Int::NOT_INT);
			
			$valid_chain->addValidator($int);

			$valid_chain->isValid($value);
			
			$this->getMessages( $valid_chain );
		}
		/*
		 **	upload method
		 */
		public function upload( $upload ) {
			$upload->addValidator('Count', false, 1);

			$upload->isValid();
			
			$this->getMessages( $upload );
		}
		
		public function isDate($key, $value) {
			$validator = new Zend_Validate_Date('yyyy-mm-dd');
			
			$validator->setMessage("$key '%value%' is not a properly formatted date. Dates must be in yyyy-mm-dd format.", Zend_Validate_Date::FALSEFORMAT);
			$validator->setMessage("$key '%value%' is not an invalid date. Dates must be in yyyy-mm-dd format.", Zend_Validate_Date::INVALID_DATE);
			$validator->setMessage("$key '%value%' is not a date.", Zend_Validate_Date::INVALID);
			
			$validator->isValid($value);
			$this->getMessages( $validator );
		}
		
		public function isYear($key, $value) {
			$validator = new Zend_Validate_Date('yyyy');
			
			$validator->setMessage("$key '%value%' is not a properly formatted year. Years must be in yyyy format.", Zend_Validate_Date::FALSEFORMAT);
			$validator->setMessage("$key '%value%' is not an invalid year. Years must be in yyyy format.", Zend_Validate_Date::INVALID_DATE);
			$validator->setMessage("$key '%value%' is not a year.", Zend_Validate_Date::INVALID);
			
			$validator->isValid($value);
			$this->getMessages( $validator );
		}
		
		/*
		 **	getMessages method
		 */
		public function getMessages($validator) {
			if ($validator->getMessages()) {
				foreach($validator->getMessages() as $key => $value) {
					$this->errors[$key . $this->i] = $value;
				}
				$this->i++;
			}
		}
		
		public function addError($key, $value) {
			$this->errors[$key] = $value;
		}
		
		/**
		* __get
		* @param {string} $var private var to get
		*/
		public function __get($var)
		{
			return $this->$var;
		}
	}
?>