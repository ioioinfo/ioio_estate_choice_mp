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

var moduel_prefix = 'ioio_borrow_data';

exports.register = function(server, options, next) {
    var service_info = "ioio borrow";
    
    var person = server.plugins.services.person;
    var task = server.plugins.services.task;
    var hr = server.plugins.services.hr;
    var notify = server.plugins.services.notify;
    var things = server.plugins.services.things;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_borrow_cookie";
    
    server.route([
        //查询数据测试
        {
            method: "GET",
            path: '/list_data',
            handler: function(request, reply) {
                return reply({"success":true,"rows":[],"num":0});
            }
        },
        
        //返回menu菜单列表
        {
            method: 'GET',
            path: '/menu_list',
            handler: function(request, reply){
                var rows = [
                    {icon:"fa fa-home fa-fw",navname:"首页",a:"index", snav:[]},
                    {icon:"fa fa-minus-square-o fa-fw",navname:"借阅记录",a:"borrow_books",snav:[]},
                    {icon:"fa fa-tags fa-fw",navname:"还书列表",a:"return_list",snav:[]},
                    {icon:"fa fa-user fa-fw",navname:"学员列表",a:"students_list",snav:[]},
                    {icon:"fa fa-vcard fa-fw",navname:"借书证",a:"borrow_card",snav:[]},
                    {icon:"fa fa-money fa-fw",navname:"办卡押金",a:"card_deposit",snav:[]},
                    {icon:"fa fa-cube fa-fw",navname:"图书库存",a:"book_inventory",snav:[]},
                    {icon:"fa fa-random fa-fw",navname:"图书调拨",snav:[
                        {icon:"fa fa-plus-square fa-fw",navname:"新增调拨",a:"book_transfers"},
                        {icon:"fa fa-history fa-fw",navname:"历史调拨",a:"book_transfers"},
                    ]},
                    {icon:"fa fa-retweet fa-fw",navname:"借书还书",a:"borrow_return",snav:[]},
                ];
                
                return reply({"success":true,"rows":rows,"message":"ok"});
            }
        },
        
        //图书列表数据
        {
            method: "GET",
            path: '/list_books',
            handler: function(request, reply) {
                var org_code = "ioio";
                var params = request.query.params;
                
                things.list_books(org_code,params,function(err,rows) {
                    if (err) {
                        return reply({"success":false,"message":rows.message});
                    }
                    
                    if (rows.length == 0) {
                        return reply({"success":true,"message":"ok","rows":[],"num":0});
                    }
                    
                    var isbns = [];
                    _.each(rows,function(row) {
                        isbns.push(row.isbn);
                    });
                    
                    things.list_main_images_by_books(JSON.stringify(isbns),function(err,images) {
                        if (err) {
                            return reply({"success":false,"message":images.message});
                        }
                        
                        var m_images = {};
                        _.each(images,function(image) {
                            m_images[image.isbn] = image.location;
                        });
                        
                        _.each(rows,function(row) {
                            row.book_img = m_images[row.isbn];
                        });
                        
                        return reply({"success":true,"message":"ok","rows":rows,"num":rows.length});
                    });
                });
            }
        },
        
        //图书分类列表
        {
            method: "GET",
            path: '/list_categories',
            handler: function(request, reply) {
                var org_code = "ioio";
                
                things.list_categories(org_code,function(err,rows) {
                    if (err) {
                        return reply({"success":false,"message":rows.message});
                    }
                    
                    return reply({"success":true,"message":"ok","rows":rows,"num":rows.length});
                });
            }
        },
        
    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
