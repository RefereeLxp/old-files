package com.common.model;

import java.util.HashSet;
import java.util.List;

import com.common.model.base.BaseUser;

@SuppressWarnings("serial")
public class User extends BaseUser<User>{
	
	public static final User dao=new User();
	//验证用户名是否存在
	public boolean userValidate(String username){  
		String sql="SELECT * FROM user WHERE username='"+username+"'";
		if(dao.find(sql).isEmpty()){;
		    return true;
		}
		else { 
			return false;
		}
	}
	//验证密码是否正确
	public boolean passwordValidate(String username,String password){
		String sql="SELECT * FROM user WHERE username ='"+username+"' AND password ='"+password+"'";
		if(dao.find(sql).isEmpty()){
		    return false;
		}
		else 
			return true;			
	}
	//获取用户权限
	public String getUserAuthority(String username){
		User user=find("SELECT authority FROM user_authority WHERE id ='"+dao.findUserId(username)+"'").get(0);
		return user.getAuthority();
	}

	//获取用户Id
	public String findUserId(String username){
		String sql="SELECT id FROM user WHERE username ='"+username+"'";
		User user=find(sql).get(0);
		return String.valueOf(user.getId());
		
	}
	//输出当前权限用户管理的用户的属性
	public List<User> getListOfUserAttr(String username,String attr){
		String userId=dao.findUserId(username);
		User auth=find("SELECT authority FROM user_authority WHERE id='"+userId+"'").get(0);
		User col=find("SELECT college FROM user_organization WHERE id='"+userId+"'").get(0);
		User lab=find("SELECT laboratory FROM user_organization WHERE id='"+userId+"'").get(0);
		String authority=auth.getAuthority();
		String college=col.getCollege();
		String laboratory=lab.getLaboratory();
		if(authority.equals("校级管理员")){
			return find("SELECT "+attr+" FROM user_organization");
		}else if(authority.equals("院级管理员")){
			return find("SELECT "+attr+" FROM user_organization WHERE college='"+college+"'");
		}else if(authority.equals("所级管理员")){
			return find("SELECT "+attr+" FROM user_organization WHERE laboratory='"+laboratory+"'");
		}else {
			return find("SELECT "+attr+" FROM user_organization WHERE id='"+userId+"'");	
		}
		
	}
	//通过SQL语句得到用户的全部信息
	public List<User> viewAllBySql(String sql){
		return find("SELECT user.id,user.username,user_organization.college,user_organization.laboratory,user_authority.authority "
			      +"FROM user,user_authority,user_organization WHERE("+sql+")AND user.id=user_authority.id AND "
			      +"user.id=user_organization.id ORDER BY user.id");
	}
	
	
	//通过viewAllBySql方法查看登录用户可管理的用户的全部信息(名字、学院、研究所、权限)
	public List<User> viewUser(String username){
		List<User> userId=getListOfUserAttr(username,"id");
		String sql="";
		for(User x:userId){
			sql=sql+" user.id="+x.getId()+" or";
		}
		sql=sql.substring(0, sql.lastIndexOf(" or"));
		
		return viewAllBySql(sql);	
	}
	//通过viewAllBySql方法获取当前登录用户信息(名字、学院、研究所、权限)
	public List<User> getUserMsg(String username){
		String sql="user.id="+dao.findUserId(username);
		return viewAllBySql(sql);					
	}
	//通过viewAllBySql方法查看当前学院的用户信息
	public List<User> viewUserByCollege(String college){
		String sql="user_organization.college='"+college+"'";
		return viewAllBySql(sql);
	}
	//通过viewAllBySql方法查看当前研究所的用户信息
	public List<User> viewUserByLaboratory(String laboratory){
		String sql="user_organization.laboratory='"+laboratory+"'";
		return viewAllBySql(sql);
	}
	//查看当前学院下的所有研究所
	public List<User> viewLaboratoryByCollege(String college){
		List<User> list=find("SELECT laboratory FROM user_organization WHERE college='"+college+"'");
		HashSet<User> h=new HashSet<User>(list);   //通过HashSet剔除重复数据
		list.clear(); 
		list.addAll(h); 
		return list; 
	}
	public List<User> viewComputer(String userId){
		return find("SELECT * FROM computer WHERE number IN(SELECT number FROM user_computer WHERE id='"+userId+"')");		
	}
	public List<User> viewOffice(String userId){
		return find("SELECT * FROM office WHERE number IN(SELECT number FROM user_office WHERE id='"+userId+"')");		
	}
	public List<User> viewStorage(String userId){
		return find("SELECT * FROM storage WHERE number IN(SELECT number FROM user_storage WHERE id='"+userId+"')");		
	}

}
