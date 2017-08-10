/**
 ┌──────────────────────────────────────────────────────────────┐
 │               ___ ___ ___ ___ ___ _  _ ___ ___               │
 │              |_ _/ _ \_ _/ _ \_ _| \| | __/ _ \              │
 │               | | (_) | | (_) | || .` | _| (_) |             │
 │              |___\___/___\___/___|_|\_|_| \___/              │
 │                                                              │
 │                                                              │
 │                       set up in 2015.2                       │
 │                                                              │
 │   committed to the intelligent transformation of the world   │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
*/

var _ = require('lodash');
var r = require('request');
var moment = require('moment');
var eventproxy = require('eventproxy');
const uuidV1 = require('uuid/v1');
var moduel_prefix = 'ioio_education_class_data';

var do_get_method = function(url,cb){
	uu_request.get(url, function(err, response, body){
		if (!err && response.statusCode === 200) {
			var content = JSON.parse(body);
			do_result(false, content, cb);
		} else {
			cb(true, null);
		}
	});
};

//所有post调用接口方法
var do_post_method = function(url,data,cb){
	uu_request.request(url, data, function(err, response, body) {
		console.log(body);
		if (!err && response.statusCode === 200) {
			do_result(false, body, cb);
		} else {
			cb(true,{"success":false,"message":"network error"});
		}
	});
};

//处理结果
var do_result = function(err,result,cb){
	if (!err) {
		if (result.success) {
			cb(false,result);
		}else {
			cb(true,result);
		}
	}else {
		cb(true,null);
	}
};

exports.register = function(server, options, next) {
    var service_info = "ioio estate";
    var person = server.plugins.services.person;
    var task = server.plugins.services.task;
    var hr = server.plugins.services.hr;
    var notify = server.plugins.services.notify;
    var education_api = server.plugins.services.education_api;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_borrow_cookie";
	//登入，合并设置cookie
	var login_set_cookie = function(request,token_id){
		var state;
		if (request.state && request.state.cookie) {
			state = request.state.cookie;
			state.token_id = token_id;
		}else {
			state = {token_id:token_id};
		}
		return state;
	};
	//获取当前cookie cookie_id
	var get_cookie_id = function(request){
		var cookie_id;
		if (request.state && request.state.cookie) {
			var cookie = request.state.cookie;
			if (cookie.cookie_id) {
				cookie_id = cookie.cookie_id;
			}
		}
		return cookie_id;
	};
	//获取当前cookie user_id
	var get_cookie_user_id = function(request){
		var user_id;
		if (request.state && request.state.cookie) {
			var cookie = request.state.cookie;
			if (cookie.user_id) {
				user_id = cookie.user_id;
			}
		}
		return user_id;
	};
    //获取验证图片
    var get_captcha = function(cookie_id,cb){
    	var url = "http://139.196.148.40:11111/api/captcha.png?cookie_id="+cookie_id;
    	do_get_method(url,cb);
    };
	//验证码验证
	var check_captcha = function(vertify,cookie_id,cb){
		var url = "http://139.196.148.40:11111/api/verify?cookie_id=" +cookie_id + "&text=" + vertify;
		do_get_method(url,cb);
	};
    server.route([
        //筹号获取用户信息
        {
            method: "GET",
            path: '/search_user_byNum',
            handler: function(request, reply) {
                var number = request.query.number;
                if (!number) {
                    return reply({"success":false,"message":"number null","service_info":service_info});
                }
                education_api.search_user_byNum2(number,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"row":rows.phone});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //楼盘号获取大楼信息
        {
            method: "GET",
            path: '/get_buildings_byArea',
            handler: function(request, reply) {
                var area_id = request.query.area_id;
                if (!area_id) {
                    return reply({"success":false,"message":"area_id null","service_info":service_info});
                }
                education_api.get_buildings_byArea(area_id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //大楼获取房屋信息
        {
            method: "GET",
            path: '/get_houses_byBuilding',
            handler: function(request, reply) {
                var building_id = request.query.building_id;
                if (!building_id) {
                    return reply({"success":false,"message":"building_id null","service_info":service_info});
                }
                education_api.get_houses_byBuilding(building_id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //添加收藏
        {
            method: "POST",
            path: '/save_collection',
            handler: function(request, reply) {
                var house_id = request.payload.house_id;
                var user_id = get_cookie_user_id(request);
                if (!house_id || !user_id) {
                    return reply({"success":false,"message":"house_id or user_id null","service_info":service_info});
                }
                var data = {
                    "house_id":house_id,
                    "user_id":user_id
                }
                education_api.save_collection(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //获取个人收藏信息
        {
            method: "GET",
            path: '/get_collections_byUser',
            handler: function(request, reply) {
                var user_id = get_cookie_user_id(request);
                if (!user_id) {
                    return reply({"success":false,"message":"user_id null","service_info":service_info});
                }
                education_api.get_collections_byUser(user_id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //删除收藏
        {
            method: "POST",
            path: '/delete_collection',
            handler: function(request, reply) {
                var id = request.payload.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id":id
                }
                education_api.delete_collection(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //添加订购
        {
            method: "POST",
            path: '/save_purchase',
            handler: function(request, reply) {
                var house_id = request.payload.house_id;
                var user_id = get_cookie_user_id(request);
                if (!house_id || !user_id) {
                    return reply({"success":false,"message":"house_id or user_id null","service_info":service_info});
                }

                var data = {
                    "house_id":house_id,
                    "user_id":user_id
                }
                education_api.save_purchase(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //获取个人订购信息
        {
            method: "GET",
            path: '/get_purchase_byUser',
            handler: function(request, reply) {
                var user_id = get_cookie_user_id(request);
                if (!user_id) {
                    return reply({"success":false,"message":"user_id null","service_info":service_info});
                }
                education_api.get_purchase_byUser(user_id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //获取个人订购信息
        {
            method: "GET",
            path: '/search_house_byId',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                education_api.search_house_byId(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //找房产项目信息
        {
            method: "GET",
            path: '/get_estate_by_id',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id  null","service_info":service_info});
                }
                education_api.get_estate_by_id(id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //找房产项目信息
        {
            method: "GET",
            path: '/search_collection',
            handler: function(request, reply) {
                var house_id = request.query.house_id;
				var user_id = get_cookie_user_id(request);
				if (!house_id || !user_id) {
					return reply({"success":false,"message":"house_id or user_id null","service_info":service_info});
				}

                education_api.search_collection(house_id,user_id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //取消收藏
        {
            method: "POST",
            path: '/cancel_collection',
            handler: function(request, reply) {
                var house_id = request.payload.house_id;
                var user_id = get_cookie_user_id(request);
                if (!house_id || !user_id) {
                    return reply({"success":false,"message":"house_id or user_id null","service_info":service_info});
                }

                var data = {
                    "house_id":house_id,
                    "user_id":user_id
                }
                education_api.cancel_collection(data,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
        //验证码获取
        {
            method: 'GET',
            path: '/captcha',
            handler: function(request, reply){
                var cookie_id = get_cookie_id(request);
                if (!cookie_id) {
                    return reply({"success":false});
                }
                get_captcha(cookie_id,function(err, content){
                    if (!err) {
                        return reply({"success":true,"image":content.image,"service_info":service_info});
                    }else {
                        return reply({"success":false,"message":content.message,"service_info":service_info});
                    }
                });
            }
        },
		//获取所有信息
        {
            method: 'GET',
            path: '/get_all_infos',
            handler: function(request, reply){
				var area_id = request.query.area_id;
                if (!area_id) {
                    return reply({"success":false,"message":"area_id null","service_info":service_info});
                }
				education_api.get_all_infos(area_id,function(err,rows){
                    if (!err) {
                        return reply(rows);
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            }
        },
		//登入验证
		{
			method: 'POST',
			path: '/do_login',
			handler: function(request, reply){
				var vertify = request.payload.vertify;
				var number = request.payload.number;

				education_api.search_user_byNum(number,function(err,rows){
					if (!err) {
						var token_id = uuidV1();
						var user_id = rows.rows[0].id;
						var data = {
							"token_id":token_id,
							"user_id":user_id
						}
						education_api.save_login(data,function(err,rows){
		                    if (!err) {

								var state = login_set_cookie(request,token_id);

		                        return reply({"success":true,"service_info":service_info}).state('cookie', state, {ttl:10*365*24*60*60*1000});
		                    }else {
		                        return reply({"success":false,"message":rows.message});
		                    }
		                });
					}else {
						return reply({"success":false,"message":rows.message});
					}
				});
			}
		},




    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
