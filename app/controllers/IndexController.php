<?php
	/* Let's include the required Models */
	require_once( '../app/models/UsersModel.php' );

	/**
	 * IndexController
	 * The controller for our index view.
	 * 
	 * @author Gerardo Rodriguez <ger.rod34@gmail.com>
	 * @var Zend_Session_Namespace $userSession Stores our Session Namespace.
	 * @var Helper $validate Stores our Validate helper.
	 * @var Model $usersModel Stores our User Model.
	 */
	class IndexController extends Zend_Controller_Action
	{
		// private $userSession;
		// private $validate;
		private $usersModel;
		
		public function init() {
			/* Instantiate our Models */
			$this->usersModel = new UsersModel();

			/* Create our session namespace */
			$this->userSession = new Zend_Session_Namespace('userSession');

			
			//Sets alternative layout
			$this->_helper->layout->setLayout('public');
			
			/* Action Helpers */
			$this->validate = $this->_helper->Validate; // Validate helper
			$this->userHelper = $this->_helper->User; // User helper
		}
		
		public function indexAction()
		{
			if( isset($this->userSession->userID) )
			{
				echo "userID: " . $this->userSession->userID;
				/* redirect to dashboard page */
				header("Location: dashboard/");
			}
			
			if( !empty($_POST) && isset($_POST['submit']) )
			{
				/* Grab our POST variables */
				$username = $_POST['username'];
				$password = $_POST['password'];
				
				/* Validate */
				$this->validate->notEmpty('Username', $username);
				$this->validate->notEmpty('Password', $password);
				
				/* Check for validation errors */
				if (count($this->validate->errors)) {
					$this->view->validationErrors = $this->validate->errors;
				} else {
					/* Let's encrypt the password */
					$encry = array($password, $username);
					$encryptedPassword = $this->userHelper->encryptLogin( $encry );
					
					/* Grab the user from our db */
					$user = $this->usersModel->fetchRow( $this->usersModel->select()->where('username = ?', $username) );
			
					if( $user )
					{
						if( $encryptedPassword == $user['password'] )
						{
							/* store the user id in session */
							$this->userSession->userID = $user['id'];
							/* redirect to dashboard page */
							header("Location: dashboard/");
						}
						else
						{
							$this->validate->addError('passwordMismatch','Your password is incorrect.');
						}
					}
					else
					{
						$this->validate->addError('userNotFound','Your username was not found. Please create a new account or try again.');
					}
					if (count($this->validate->errors)) {
						$this->view->validationErrors = $this->validate->errors;
					}
				}
				
			}
		}
		
		public function logoutAction()
		{
			die('logging out');
		}
	}
	
?>