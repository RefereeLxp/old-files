package com.common.model.base;
import com.jfinal.plugin.activerecord.IBean;
import com.jfinal.plugin.activerecord.Model;

@SuppressWarnings({"serial", "unchecked"})

public abstract class BaseUser<M extends BaseUser<M>> extends Model<M> implements IBean {
	public M setId(java.lang.Integer id) {
		set("id", id);
		return (M)this;
	}

	public java.lang.Integer getId() {
		return get("id");
	}


	public M setUsername(java.lang.String username) {
		set("username", username);
		return (M)this;
	}

	public java.lang.String getUsername() {
		return get("username");
	}
	public java.lang.String getCollege() {
		return get("college");
	}
	public java.lang.String getLaboratory() {
		return get("laboratory");
	}
	public java.lang.String getAuthority() {
		return get("authority");
	}

}
