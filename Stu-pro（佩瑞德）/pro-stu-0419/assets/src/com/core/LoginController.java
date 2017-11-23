package com.core;

import com.common.model.User;
import com.jfinal.aop.Before;
import com.jfinal.core.Controller;

import com.core.LoginValidator;


public class LoginController extends Controller{
	
	public void index(){
		render("index.html");
	}
	 @Before(LoginValidator.class)
	 public void login(){
	        if(User.dao.userValidate(getPara("name"))){
	        	setAttr("nameMsg", "用户名不存在!");
	        	render("index.html");
	        }else if(User.dao.passwordValidate(getPara("name"),getPara("password"))){
	        	loginSuccess();
	        }	        	
	        else{
	        	setAttr("passwordMsg", "密码错误，请检查密码！");
	        	render("index.html");
	        } 	        
	    }
	 	 	 
	 public void loginSuccess(){		 	 
		 setAttr("viewUser", User.dao.viewUser(getPara("name")));
		 view();

	 }
	 public void selectCollege(){
		 setAttr("viewUser",User.dao.viewUserByCollege(getPara("college")));
		 view();
		 
	 }
	 public void selectLaboratory(){
		 setAttr("viewUser",User.dao.viewUserByLaboratory(getPara("laboratory")));
		 view();
	 }
	 public void view(){
		 setAttr("user", User.dao.getUserMsg(getPara("name")).get(0));
		 setAttr("organization",User.dao.getListOfUserAttr(getPara("name"),"college,laboratory"));
		 setAttr("laboratory",User.dao.viewLaboratoryByCollege(User.dao.getUserMsg(getPara("name")).get(0).getCollege()));
		 render("loginSuccess.html");
	 }
}
	 
	 	 



