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
var moduel_prefix = 'ioio_estate_choice_main';

exports.register = function(server, options, next) {
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_estate_choice_cookie";

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
    
    var get_token_id = function(request){
        var token_id;
        if (request.state && request.state.cookie) {
            var cookie = request.state.cookie;
            if (cookie.token_id) {
                token_id = cookie.token_id;
            }
        }
        return token_id;
    };
    
    server.route([        
        //认证号
        {
            method: 'GET',
            path: '/login',
            handler: function(request, reply) {
                // 判断是否已经登录
                if (get_token_id(request)) {
                    return reply.redirect("/index");
                }
                
                return reply.view("login");
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
                // 判断是否已经登录
                if (!get_token_id(request)) {
                    return reply.redirect("/login");
                }
                return reply.view("index");
            },
        },

        //房屋详情
        {
            method: 'GET',
            path: '/house',
            handler: function(request, reply) {
                // 判断是否已经登录
                if (!get_token_id(request)) {
                    return reply.redirect("/login");
                }
                
                var id = request.query.id;
                var from = request.query.from;
                return reply.view("house",{"id":id,"from":from});
            },
        },

        //我的收藏
        {
            method: 'GET',
            path: '/my_collection',
            handler: function(request, reply) {
                // 判断是否已经登录
                if (!get_token_id(request)) {
                    return reply.redirect("/login");
                }
                
                return reply.view("my_collection");
            },
        },

        //我的房子
        {
            method: 'GET',
            path: '/my_home',
            handler: function(request, reply) {
                // 判断是否已经登录
                if (!get_token_id(request)) {
                    return reply.redirect("/login");
                }
                
                return reply.view("my_home");
            },
        },

        //立即购买
        {
            method: 'GET',
            path: '/buy_now',
            handler: function(request, reply) {
                // 判断是否已经登录
                if (!get_token_id(request)) {
                    return reply.redirect("/login");
                }
                
                return reply.view("buy_now");
            },
        },


    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
