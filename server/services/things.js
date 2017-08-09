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
var eventproxy = require('eventproxy');
const util = require('util');
const uu_request = require('../utils/uu_request');

var host = "http://211.149.248.241:16004/";

var nav = function(server) {
    return {
        //图书分类
        list_categories: function(org_code,cb) {
            var url = host + "book/list_categories?org_code=" + org_code;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);

                    var rows = [];
                    if (info.success) {
                        rows = info.rows;
                    }
                    cb(err,rows);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        list_books: function(org_code,params,cb) {
            if (!params) {
                params = "";
            }
            var url = host + "book/list_books?org_code=" + org_code + "&params=" + params;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);

                    var rows = [];
                    if (info.success) {
                        rows = info.rows;
                    }
                    cb(err,rows);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        //图书列表
        list_main_images_by_books: function(isbns,cb) {
            var url = host + "book/list_main_images_by_books?isbns=" + isbns;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var info = JSON.parse(body);

                    var rows = [];
                    if (info.success) {
                        rows = info.rows;
                    }
                    cb(err,rows);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
    };
};

module.exports = nav;