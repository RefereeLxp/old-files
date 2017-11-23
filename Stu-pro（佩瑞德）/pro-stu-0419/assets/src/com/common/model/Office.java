package com.common.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

@SuppressWarnings("serial")
public class Office extends Model<Office> {
	public static final Office dao=new Office();
	public List<Office> viewOffice(String userId){
		return find("SELECT * FROM user_office WHERE id="+userId);
	}
	public List<Office> findUserId(int para) {		
		return find("SELECT id FROM user_office WHERE number IN(SELECT number FROM office WHERE id="+para+")");
	}

}
