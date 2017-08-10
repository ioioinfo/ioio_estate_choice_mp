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

var moduel_prefix = 'ioio_borrow_main';

exports.register = function(server, options, next) {
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_borrow_cookie";

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
    server.route([        
        //认证号
        {
            method: 'GET',
            path: '/login',
            handler: function(request, reply) {
                var cookie_id = get_cookie_id(request);
				if (!cookie_id) {
					cookie_id = uuidV1();
				}
                var cookie = request.state.cookie;
				if (!cookie) {
					cookie = {};
				}
				cookie.cookie_id = cookie_id;
                return reply.view("login").state('cookie', cookie, {ttl:10*365*24*60*60*1000});
            },
        },
        //手机验证
        {
            method: 'GET',
            path: '/login_next',
            handler: function(request, reply) {
                return reply.view("login_next");
            },
        },

        //首页
        {
            method: 'GET',
            path: '/index',
            handler: function(request, reply) {
                return reply.view("index");
            },
        },

        //房屋详情
        {
            method: 'GET',
            path: '/house',
            handler: function(request, reply) {
                return reply.view("house");
            },
        },

        //我的收藏
        {
            method: 'GET',
            path: '/my_collection',
            handler: function(request, reply) {
                return reply.view("my_collection");
            },
        },

        //我的房子
        {
            method: 'GET',
            path: '/my_home',
            handler: function(request, reply) {
                return reply.view("my_home");
            },
        },


    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
