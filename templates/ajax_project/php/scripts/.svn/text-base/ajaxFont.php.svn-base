<?php
	/**
	 * Let's include some classes we'll need.
	 */
	require_once("../controllers/AjaxFont_Controller.class.php");
	require_once("../models/FontsModel.class.php");
	require_once("../helpers/DBConnect.class.php");
	/**
	 * Here, we capture the name of the method we will call.
	 */
	$methodName = $_POST['method'];
	/**
	 * Let's create a new instance of the FontsModel.
	 */
	$fontsModel = new FontsModel();
	/**
	 * If the POST contains extra data, let's send that along to the method we are calling, since it will be expecting it.
	 */
	if( $_POST['extraData'] )
	{
		$data = json_encode( $fontsModel->$methodName($_POST['extraData']) );
	} else {
		$data = json_encode( $fontsModel->$methodName() );
	}
	/**
	 * Finally, let's throw the API response back to the javascript.
	 */
	echo $data;
?>