package com.common.model;

import java.util.HashSet;
import java.util.List;

import com.common.model.base.BaseUser;

@SuppressWarnings("serial")
public class User extends BaseUser<User>{
	
	public static final User dao=new User();
	//��֤�û����Ƿ����
	public boolean userValidate(String username){  
		String sql="SELECT * FROM user WHERE username='"+username+"'";
		if(dao.find(sql).isEmpty()){;
		    return true;
		}
		else { 
			return false;
		}
	}
	//��֤�����Ƿ���ȷ
	public boolean passwordValidate(String username,String password){
		String sql="SELECT * FROM user WHERE username ='"+username+"' AND password ='"+password+"'";
		if(dao.find(sql).isEmpty()){
		    return false;
		}
		else 
			return true;			
	}
	//��ȡ�û�Ȩ��
	public String getUserAuthority(String username){
		User user=find("SELECT authority FROM user_authority WHERE id ='"+dao.findUserId(username)+"'").get(0);
		return user.getAuthority();
	}

	//��ȡ�û�Id
	public String findUserId(String username){
		String sql="SELECT id FROM user WHERE username ='"+username+"'";
		User user=find(sql).get(0);
		return String.valueOf(user.getId());
		
	}
	//�����ǰȨ���û�������û�������
	public List<User> getListOfUserAttr(String username,String attr){
		String userId=dao.findUserId(username);
		User auth=find("SELECT authority FROM user_authority WHERE id='"+userId+"'").get(0);
		User col=find("SELECT college FROM user_organization WHERE id='"+userId+"'").get(0);
		User lab=find("SELECT laboratory FROM user_organization WHERE id='"+userId+"'").get(0);
		String authority=auth.getAuthority();
		String college=col.getCollege();
		String laboratory=lab.getLaboratory();
		if(authority.equals("У������Ա")){
			return find("SELECT "+attr+" FROM user_organization");
		}else if(authority.equals("Ժ������Ա")){
			return find("SELECT "+attr+" FROM user_organization WHERE college='"+college+"'");
		}else if(authority.equals("��������Ա")){
			return find("SELECT "+attr+" FROM user_organization WHERE laboratory='"+laboratory+"'");
		}else {
			return find("SELECT "+attr+" FROM user_organization WHERE id='"+userId+"'");	
		}
		
	}
	//ͨ��SQL���õ��û���ȫ����Ϣ
	public List<User> viewAllBySql(String sql){
		return find("SELECT user.id,user.username,user_organization.college,user_organization.laboratory,user_authority.authority "
			      +"FROM user,user_authority,user_organization WHERE("+sql+")AND user.id=user_authority.id AND "
			      +"user.id=user_organization.id ORDER BY user.id");
	}
	
	
	//ͨ��viewAllBySql�����鿴��¼�û��ɹ�����û���ȫ����Ϣ(���֡�ѧԺ���о�����Ȩ��)
	public List<User> viewUser(String username){
		List<User> userId=getListOfUserAttr(username,"id");
		String sql="";
		for(User x:userId){
			sql=sql+" user.id="+x.getId()+" or";
		}
		sql=sql.substring(0, sql.lastIndexOf(" or"));
		
		return viewAllBySql(sql);	
	}
	//ͨ��viewAllBySql������ȡ��ǰ��¼�û���Ϣ(���֡�ѧԺ���о�����Ȩ��)
	public List<User> getUserMsg(String username){
		String sql="user.id="+dao.findUserId(username);
		return viewAllBySql(sql);					
	}
	//ͨ��viewAllBySql�����鿴��ǰѧԺ���û���Ϣ
	public List<User> viewUserByCollege(String college){
		String sql="user_organization.college='"+college+"'";
		return viewAllBySql(sql);
	}
	//ͨ��viewAllBySql�����鿴��ǰ�о������û���Ϣ
	public List<User> viewUserByLaboratory(String laboratory){
		String sql="user_organization.laboratory='"+laboratory+"'";
		return viewAllBySql(sql);
	}
	//�鿴��ǰѧԺ�µ������о���
	public List<User> viewLaboratoryByCollege(String college){
		List<User> list=find("SELECT laboratory FROM user_organization WHERE college='"+college+"'");
		HashSet<User> h=new HashSet<User>(list);   //ͨ��HashSet�޳��ظ�����
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
