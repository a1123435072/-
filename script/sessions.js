var sessionAgent = {
	
	keyMap:{
		collectNews : 'collectNewsMap', //新闻收藏列表
		userAuthInfo: 'userAuth', //用户权限信息
		userReadHistory: 'readHisIds', //用户阅读历史
		bookedUserIds: 'bookedUserIds',  //当前订阅用户列表
		usrCollCates: 'usrCollCates', //用户收藏的频道栏目
		goodInfoIdList: 'goodInfoIdList', //用户点赞的文章列表
		ifSendTheDeviceInfo: 'ifSendTheDeviceInfo', //是否发送过设备信息
		statServToken: 'statServToken', //统计平台的token
		cloudPushId: 'cloudPushId', //云推送的注册id
		indexFramePageName: 'indexFramePageName', //首页列表样式
		systemSetKey: 'systemSetKey'
	},
	
	setLoginInfo : function(userEntity){
		sessionAgent.setStorage(sessionAgent.keyMap.userAuthInfo, userEntity);

		api.setPrefs({ key: 'userId', value: userEntity.userId });
		api.setPrefs({ key: 'userCellPhone', value: userEntity.cellPhone });
		api.setPrefs({ key: 'userNickName', value: userEntity.nickName });
	},

	getLoginInfo : function(){
		var userEntity = sessionAgent.getStorage(sessionAgent.keyMap.userAuthInfo);
		if(null==userEntity || ""==userEntity){
			userEntity= {};
		}
		return userEntity;
	},

	clearLoginInfo: function(){
		$api.rmStorage( sessionAgent.keyMap.userAuthInfo);	
		api.removePrefs({ key: 'userId'});
		api.removePrefs({ key: 'userCellPhone'});
		api.removePrefs({ key: 'userNickName'});
	},
	
	setPrefInfo : function(infoKey, val){
		api.setPrefs({ key: infoKey, value: val });
	},
	
	getPrefInfo: function(infoKey){
		
		var returnStr;
		
		api.getPrefs({
	        key: infoKey
        },function(ret,err){
        	returnStr = ret.value;
        });
		
		return returnStr;
	},
	
	setStorage: function(key, obj){
		if(!!$api){
			$api.rmStorage( key)
			$api.setStorage(key, obj);
		}
	},

	getStorage: function(key){
		if(!!$api){
			return $api.getStorage(key);
		}else{
			return null;
		}
	},
  
  	isLogin: function(){
    	var userEntity = sessionAgent.getLoginInfo();
		var userId = userEntity.userId;
		if(userId != null && userId != "" && userId>0){
			api.pageParam.userId = userId;
			return true;
        }else{ 
			 api.openWin({
				name : 'commonUserlogin',
				url : 'win_commonHomeTitle.html',
				pageParam : {
					bannerName :'userLogin',
					bannerTitle :'登录',
					bannerTag : 'userLogin',
					bannerUrl : 'frm_userLogin.html'
				},
				bounces : false,
				vScrollBarEnabled : false,
				hScrollBarEnabled : false,
				reload : true 
			});	  	

         return false ; 
        }
    }  
 

    
}


