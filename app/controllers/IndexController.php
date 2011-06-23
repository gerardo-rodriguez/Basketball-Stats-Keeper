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
			$db = $this->usersModel->getDefaultAdapter();
			$select = $db->select()->where('username = ?', 'test');
			var_dump( $select->__toString() );
			$data = $db->fetchAll($select);
			var_dump($data);
			
//			var_dump( $this->usersModel->validateUsername('test') );

			// if( isset($this->userSession->userID) )
			// {
			// 	echo "userID: " . $this->userSession->userID;
			// 	/* redirect to dashboard page */
			// }
			
			// if( !empty($this->userSession->validationErrors) ) $this->view->validationErrors = $this->userSession->validationErrors;
			// if( !empty($_POST) && isset($_POST['submit']) )
			// {
			// 	/* Grab our POST variables */
			// 	$username = $_POST['username'];
			// 	$password = $_POST['password'];
			// 	
			// 	/* Validate */
			// 	$this->validate->notEmpty('Username', $username);
			// 	$this->validate->notEmpty('Password', $password);
			// 	
			// 	/* Check for validation errors */
			// 	if (count($this->validate->errors)) {
			// 		$this->view->validationErrors = $this->validate->errors;
			// 		//header("Location: /");
			// 	} else {
			// 		/* Let's encrypt the password */
			// 		$encry = array($password, $username);
			// 		$encryptedPassword = $this->userHelper->encryptLogin( $encry );
			// 		
			// 		/* Package our arguments */
			// 		$arguments = array(
			// 			'username' => $username,
			// 			'password' => $encryptedPassword
			// 		);
			// 
			// 		if( $user )
			// 		{
			// 			echo 'found username';
			// 			if( $encryptedPassword == $user['password'] )
			// 			{
			// 				die('::match password');
			// 			}
			// 			else
			// 			{
			// 				die('::no match pwd');
			// 			}
			// 		}
			// 		else
			// 		{
			// 			die('username not found');
			// 		}
			// 	}
			// 	
			// }
		}
		
		public function loginAction()
		{
			// die( var_dump($_POST) );
		}
	}
	
?>