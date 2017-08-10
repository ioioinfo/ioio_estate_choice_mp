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
var moment = require('moment');
var eventproxy = require('eventproxy');
const uu_request = require('../utils/uu_request');

var moduel_prefix = 'ioio_estate_choice_data';

exports.register = function(server, options, next) {
    var service_info = "ioio estate choice";
    
    var person = server.plugins.services.person;
    var task = server.plugins.services.task;
    var hr = server.plugins.services.hr;
    var notify = server.plugins.services.notify;
    var things = server.plugins.services.things;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_estate_choice_cookie";
    
    server.route([
        //数据版本
        {
            method: "GET",
            path: '/data_version',
            handler: function(request, reply) {
                var url = "http://211.149.248.241:16017/cache_state/get_data_version?platform_code=estate_choice";
                
                uu_request.do_get_method(url,function(err,content) {
                    if (err) {
                        return reply({"success":true,"message":"ok","data_version":-1});
                    }
                    
                    return reply({"success":true,"message":"ok","data_version":content.data_version});
                });
            }
        },
        
    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
