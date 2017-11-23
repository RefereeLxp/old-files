package com.common.model;



import java.util.List;

import com.jfinal.plugin.activerecord.Model;

@SuppressWarnings("serial")
public class Storage extends Model<Storage> {
	public static final Storage dao=new Storage();
	public List<Storage> findUserId(int para) {		
		return find("SELECT id FROM user_storage WHERE number IN(SELECT number FROM storage WHERE id="+para+")");
	}
	

}
