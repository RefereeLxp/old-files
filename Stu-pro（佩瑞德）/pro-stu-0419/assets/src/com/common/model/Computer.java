package com.common.model;


import java.util.List;

import com.jfinal.plugin.activerecord.Model;


@SuppressWarnings("serial")
public class Computer extends Model<Computer> {
	public static final Computer dao = new Computer();
	public List<Computer> viewComputer(String userId){
		return find("SELECT * FROM user_computer WHERE id="+userId);		
	}
	public List<Computer> findUserId(int para) {		
		return find("SELECT id FROM user_computer WHERE number IN(SELECT number FROM computer WHERE id="+para+")");
	}
}
