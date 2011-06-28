<?php
	class ErrorController extends Zend_Controller_Action
	{
		private $is_ajax;
		
		public function init() {
			//Set Default layout
			//$this->_helper->layout->setLayout('error');		
		}
		
		public function errorAction()
		{
			$error = $this->_getParam('error_handler');
//			echo ($error->exception->getMessage());
		    switch($error->type) {
		      case 'EXCEPTION_OTHER':
		        switch($error->exception->getMessage()) {
		        	case 'NOT_AUTHORIZED':
		        	$this->_forward('not-authorized');
		        	break;
		        }
		        break;
		        		 
		      default:
		        break;
		    }
		}
	 
		public function notAuthorizedAction() {
		
		}
	}
?>