<?php
	/* Let's include the required Models */
	require_once( '../app/models/UsersModel.php' );

	/**
	 * CreateAccountController
	 * The controller for our createaccount view.
	 * 
	 * @author Gerardo Rodriguez <ger.rod34@gmail.com>
	 * @var Zend_Session_Namespace $userSession Stores our Session Namespace.
	 * @var Helper $validate Stores our Validate helper.
	 * @var Model $usersModel Stores our User Model.
	 */
	class CreateAccountController extends Zend_Controller_Action
	{
		private $userSession;
		private $validate;
		private $usersModel;
		
		public function init() {
			/* Create our session namespace */
			$this->userSession = new Zend_Session_Namespace('userSession');

			/* Instantiate our Models */
			$this->usersModel = new UsersModel();
			
			/* Sets alternative layout */
			$this->_helper->layout->setLayout('public');
			
			/* Action Helpers */
			$this->validate = $this->_helper->Validate; // Validate helper
			$this->userHelper = $this->_helper->User; // User helper
		}
		
		public function indexAction()
		{
			if( !empty($_POST) && isset($_POST['submit']) )
			{
				/* Grab our POST variables */
				$firstName = $_POST['first_name'];
				$lastName = $_POST['last_name'];
				$email = $_POST['email'];
				$username = $_POST['username'];
				$password = $_POST['password'];
				$passwordVerify = $_POST['password_verify'];
				
				/* Validate */
				$this->validate->notEmpty('First name', $firstName);
				$this->validate->notEmpty('Last name', $lastName);
				$this->validate->notEmpty('Email', $email);
				// $this->validate->email('Email', $email);
				$this->validate->notEmpty('Username', $username);
				$this->validate->notEmpty('Password', $password);
				$this->validate->notEmpty('Password verification', $passwordVerify);
				$this->validate->pass($password, $passwordVerify);
				
				/* Check for validation errors */
				if (count($this->validate->errors)) {
					$this->view->validationErrors = $this->validate->errors;
				} else {
					/* Let's encrypt the password */
					$encry = array($password, $username);
					$encryptedPassword = $this->userHelper->encryptLogin( $encry );

					/* Package our arguments */
					$arguments = array(
						'first_name' => $firstName,
						'last_name' => $lastName,
						'email' => $email,
						'username' => $username,
						'password' => $encryptedPassword
					);
					/* Create the new user, dump it into our DB */
					$this->usersModel->insert($arguments);
					/* Let's go ahead and grab the ID from our newly created user */
					$this->userSession->userID = $this->usersModel->getAdapter()->lastInsertID();

					//Redirect
					header("Location: /");
				}
			}
		}
	}
	
?>