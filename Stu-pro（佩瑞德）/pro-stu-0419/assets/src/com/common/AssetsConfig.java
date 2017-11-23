package com.common;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.template.Engine;
import com.common.model.Computer;
import com.common.model.Office;
import com.common.model.Storage;
import com.common.model.User;
import com.core.DeviceController;
import com.core.LoginController;



public class AssetsConfig extends JFinalConfig{
	public void configConstant(Constants me) {  
		PropKit.use("loginconfig.txt");
		me.setDevMode(PropKit.getBoolean("devMode", false));  
    }  
  
    public void configRoute(Routes me) { 
    	me.add("/", LoginController.class,"/main");
    	me.add("/device", DeviceController.class,"/main");
  
    }  
	public void configEngine(Engine me) {
		me.addSharedFunction("/common/_column.html");
		
	}
	public static DruidPlugin createDruidPlugin() {
		return new DruidPlugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim());
	}
  
    public void configPlugin(Plugins me) {  		
				DruidPlugin druidPlugin = createDruidPlugin();
				me.add(druidPlugin);				
				ActiveRecordPlugin arp = new ActiveRecordPlugin(druidPlugin);
				me.add(arp);
				arp.addMapping("user",User.class);
				arp.addMapping("computer",Computer.class);
				arp.addMapping("office",Office.class);
				arp.addMapping("storage",Storage.class);
    }  
  
    public void configInterceptor(Interceptors me) {  
    }  
  
    public void configHandler(Handlers me) {  
    }

}
