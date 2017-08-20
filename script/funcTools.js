var utilsFuncs = {
	//将unicode编码转换为中文
	tranUnicode2Chn : function(str){
		if(arguments.length>0){
//			return unescape(str.replace(/&#x/g, '%u').replace(/;/g, ''));
			return unescape(str.replace(/\\/g,"%"));
		}else{
			return null;
		}
	},

	REGX_HTML_ENCODE : /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g,
	REGX_HTML_DECODE : /&\w+;|&#(\d+);/g,
	REGX_TRIM : /(^\s*)|(\s*$)/g,
	HTML_DECODE : {
        "&lt;" : "<", 
        "&gt;" : ">", 
        "&amp;" : "&", 
        "&nbsp;": " ", 
        "&quot;": "\"", 
        "©": "",
        "&iexcl;":"?","&laquo;":"?","&not;":"?",
        "&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚",
        "&ldquo;":"“","&rdquo;":"”"
    },
	encodeHtml : function(s){
        s = (s != undefined) ? s : '';
        return (typeof s != "string") ? s :
            s.replace(this.REGX_HTML_ENCODE, 
                      function($0){
                          var c = $0.charCodeAt(0), r = ["&#"];
                          c = (c == 0x20) ? 0xA0 : c;
                          r.push(c); r.push(";");
                          return r.join("");
                      });
    },
	decodeHtml : function(s){
        var HTML_DECODE = this.HTML_DECODE;

        s = (s != undefined) ? s : '';
        return (typeof s != "string") ? s :
            s.replace(this.REGX_HTML_DECODE,
                      function($0, $1){
                          var c = HTML_DECODE[$0];
                          if(c == undefined){
                              // Maybe is Entity Number
                              if(!isNaN($1)){
                                  c = String.fromCharCode(($1 == 160) ? 32:$1);
                              }else{
                                  c = $0;
                              }
                          }
                          return c;
                      });
    },

    //替换所有的回车换行
	replaceRN : function(content){
		var string = content;
		try{
			string=string.replace(/\r\n/g, "<br />")
	    	string=string.replace(/\n/g, "<br />");
		}catch(e) {
			alert(e.message);
		}
		return string;
	},
	
	trimStr: function(str){
		if(str==null || str==''){
			return '';
		}else{
			return str;
		}
	},
	rand6: function(){ 
		var randStr="";
		for(var i=0;i<6;i++){ 
			randStr+= Math.floor( Math.random()* 10); 
		}

		return randStr;
	},
	toastNetErr: function(errCode){
		var errMsg= '网络连接异常，请稍后再试';
		
		if(errCode!=null && errCode!=""){
			errMsg+= '('+ errCode+ ')';
		}
		api.toast({
		    msg: errMsg,
		    duration: 2000,
		    location: 'middle'
		});
	},
	limitStrLength: function(str, len){
		if(null==str || ""==str || isNaN(parseInt(len))){
			return "";
		}
		var rsStr= str.substr(0, len-3)+ '...';
		return rsStr;
	},
	dateDiff: function(hisTime,nowTime){
        var now =nowTime?nowTime:new Date().getTime(),
            diffValue = now - hisTime,
            result='',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,

            _year = diffValue/year,
            _month =diffValue/month,
            _week =diffValue/(7*day),
            _day =diffValue/day,
            _hour =diffValue/hour,
            _min =diffValue/minute;

            if(_year>=1) result=parseInt(_year) + "年前";
            else if(_month>=1) result=parseInt(_month) + "个月前";
            else if(_week>=1) result=parseInt(_week) + "周前";
            else if(_day>=1) result=parseInt(_day) +"天前";
            else if(_hour>=1) result=parseInt(_hour) +"个小时前";
            else if(_min>=1) result=parseInt(_min) +"分钟前";
            else result="刚刚";
            return result;
    },
    openUrlInBrowser: function(url){
		if(url==null || url==""){
			return ;
		}
	
		if('ios'== api.systemType){
			api.openApp({
				iosUrl: url,
				appParam: {}
			});
		}else if('android'== api.systemType){
			api.openApp({
			    androidPkg: 'android.intent.action.VIEW',
			    mimeType: 'text/html',
			    uri: url
			},function(ret,err){});
		}
    },
    closeTag: 'false',
    closeAppMonitor: function(){
		api.addEventListener({
		    name:'keyback'
		},function(ret,err){
			if(utilsFuncs.closeTag=='false'){
				utilsFuncs.closeTag='true';

				setTimeout("utilsFuncs.closeTag='false'", 2000);
				api.toast({
				    msg: '再次点击退出',
				    duration:2000,
				    location: 'middle'
				});
			}else if(utilsFuncs.closeTag=='true'){
				api.closeWidget({silent:true});
			}
		});
    },
    setNightTime: function(linkTagId, tag){
    	var linkObj= document.getElementById(linkTagId);
    	if(null!= linkObj && ""!=linkObj){
    		if(tag==1){
    			linkObj.setAttribute('href', '../css/nightStyle.css');
    		}else{
	    		linkObj.setAttribute('href', '');
    		}
    	}
    }
};
//返回到上一页
function goBack() {
	api.closeWin();
}

var ajaxAgent = {
	//用户个人中心
	//serverAction : 'http://192.168.11.205:8080',
	serverAction : 'http://www.chinadatatrading.com',
	androidAppDownloadUrl: 'http://www.baidu.com'

};

var validFuncs = {
	checkCellPhone: function(arg){
		var Pattern=/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
		if(Pattern.test(arg)==false){
			api.toast({
			    msg: '请输入正确的手机号码',
			    duration: 1000,
			    location: 'middle'
			});
			return false;
		}else{
			return true;
		}
	},

	checkNull: function(arg){
		if(arg!=null && arg!=""){
			return true;
		}else{
			api.toast({
			    msg: '请填写完整信息',
			    duration: 1000,
			    location: 'middle'
			});
			return false;
		}
	},

	checkRepwd: function(){
		var pwd1 = $("#password").val();
		var pwd2 = $("#repassword").val();
		if(pwd1==pwd2){
			return true;
		}else{
			api.toast({
			    msg: '请确保两次密码一致',
			    duration: 1000,
			    location: 'middle'
			});
			return false;
		}
	},
	
	checkYQM: function(arg){
		var yqmStr = $("#inviCode").attr("yqm");
		if(yqmStr!="" && yqmStr==arg){
			return true;
		}

		api.toast({
		    msg: '邀请码不正确',
		    duration: 1000,
		    location: 'middle'
		});
		
		return false;
	},
	
	checkYZM: function(arg){
		var yqmStr = $("#applyCode").attr("yzm");
		if(yqmStr!="" && yqmStr==arg){
			return true;
		}

		api.toast({
		    msg: '邀请码不正确',
		    duration: 1000,
		    location: 'middle'
		});
		
		return false;
	}	
};
var dataMap= {
	crowdType: {//众筹类型
		jyzx: '教育助学',
		qncx: '青年创新',
		axhb: '爱心环保'
	}
}


