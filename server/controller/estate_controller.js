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

var moduel_prefix = 'ioio_education_class_data';

exports.register = function(server, options, next) {
    var service_info = "ioio estate";
    var person = server.plugins.services.person;
    var task = server.plugins.services.task;
    var hr = server.plugins.services.hr;
    var notify = server.plugins.services.notify;
    var education_api = server.plugins.services.education_api;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_borrow_cookie";

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
                education_api.search_user_byNum(number,function(err,rows){
                    if (!err) {
                        return reply(rows);
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
                var user_id = request.payload.user_id;
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
                var user_id = request.query.user_id;
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
                var user_id = request.payload.user_id;
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
                var user_id = request.query.user_id;
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
                var state = request.query.state;
                if (!id||!state) {
                    return reply({"success":false,"message":"id or state null","service_info":service_info});
                }
                education_api.search_house_byId(id,state,function(err,rows){
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
				var user_id = request.query.user_id;
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
                var user_id = request.payload.user_id;
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



    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
