package com.core;

import com.common.model.User;
import com.jfinal.core.Controller;
import com.jfinal.validate.Validator;

public class LoginValidator extends Validator{
	
	protected void validate(Controller controller) {
		validateRequiredString("name", "nameMsg", "�������û���!");
		validateRequiredString("password", "passwordMsg", "����������!");
	}
	protected void handleError(Controller controller) {
		controller.keepModel(User.class);		
		String actionKey = getActionKey();
		if (actionKey.equals("/login"))
			controller.render("index.html");
	}
}


