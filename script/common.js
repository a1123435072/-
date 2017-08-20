function openWin(winName,winUrl){
	api.openWin({
        name: winName,
        url: winUrl,
        opaque: true,
        vScrollBarEnabled:false
    });
}
function delWord(el){
	var input = $api.prev(el,'.txt');
	input.value = '';
}
function edit(el){
	var del = $api.next(el,'.del');
	if(el.value){
		$api.addCls(del,'show');
	}
	$api.addCls(el,'light');
}
function cancel(el){
	var del = $api.next(el,'.del');
	$api.removeCls(del,'show');
	$api.removeCls(el,'light');
}

function addData(data, str){
	if(!data){
		data = str;
	}else{
		if(data.indexOf(str) > -1){
			return;
		}else{
			data = data +','+ str;
		}
	}
	
	return data;
}

//favorite
function collect(el){
	var uid = $api.getStorage('uid'); 
	//login
	if(!uid){
		api.openWin({
			name: 'login',
			url: './login.html',
			opaque: true,
			vScrollBarEnabled:false
		});
		return;
	}
	
	//news id, activity id, merchant id
	var thisId = $api.attr(el, 'news-id') || $api.attr(el, 'act-id') || $api.attr(el, 'mer-id');
	var model = api.require('model');
	
	//save previous favorites
	var actFav, merFav, newsFav;
	
	model.findById({
		class: 'user',
		id: uid
	},function(ret, err){
		if(ret){
//			alert(JSON.stringify(ret));
			
			actFav = ret.act_fav || '';
			merFav = ret.mer_fav || '';
			newsFav = ret.news_fav || '';
			
			//update data
			var jsonData = {};
			
			//news
			if($api.attr(el, 'news-id')){
				jsonData.news_fav = addData(newsFav, thisId);
			}
			//activity
			if($api.attr(el, 'act-id')){
				jsonData.act_fav = addData(actFav, thisId);
			}
			//merchant
			if($api.attr(el, 'mer-id')){
				jsonData.mer_fav = addData(merFav, thisId);
			}
			
			model.updateById({
				class: 'user',
				id: uid,
				value: jsonData
			}, function(ret, err){
				if(ret){
					api.execScript({
						name: 'root',
						frameName: 'user',
						script: 'updateInfo();'
					});
					setTimeout(function(){
						api.alert({
							msg: '收藏成功'
						});
					},200);
					
				}
				
			});
			
		}
	});
	
}
