package com.core;

import com.common.model.Computer;
import com.common.model.Office;
import com.common.model.Storage;
import com.common.model.User;

import com.jfinal.core.Controller;

public class DeviceController extends Controller{
	public void index(){
		setAttr("computer",User.dao.viewComputer(getPara()));
		setAttr("office",User.dao.viewOffice(getPara()));
		setAttr("storage",User.dao.viewStorage(getPara()));
		setAttr("userId",getPara());		
		render("device.html");
	}
	public void deleteComputer(){
		Computer.dao.deleteById(getParaToInt(0));
		redirect("/device/"+getPara(1));		
	}
	public void deleteOffice(){
		Office.dao.deleteById(getParaToInt(0));
		redirect("/device/"+getPara(1));
		
	}
	public void deleteStorage(){
		Storage.dao.deleteById(getParaToInt(0));
		redirect("/device/"+getPara(1));
		
	}
	
	public void editComputer(){
		setAttr("computer",Computer.dao.findById(getParaToInt()));
		setAttr("user",Computer.dao.findUserId(getParaToInt()));
				
	}
	public void editOffice(){
		setAttr("office",Office.dao.findById(getParaToInt()));
		setAttr("user",Office.dao.findUserId(getParaToInt()));
		
	}
	public void editStorage(){
		setAttr("storage",Storage.dao.findById(getParaToInt()));
		setAttr("user",Storage.dao.findUserId(getParaToInt()));
		
	}
	
	public void updateComputer(){
		getModel(Computer.class).update();
		redirect("/device/"+getPara("userId"));
		
	}
	public void updateOffice(){
		getModel(Office.class).update();
		redirect("/device/"+getPara("userId"));
		
	}
	public void updateStorage(){
		getModel(Storage.class).update();
		redirect("/device/"+getPara("userId"));
	}
	
	
	
	
}

