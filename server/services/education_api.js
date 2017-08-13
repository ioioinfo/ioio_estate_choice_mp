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

var host = "http://211.149.248.241:18031/";

var nav = function(server) {
    return {
        get_num_by_house: function(house_id,cb) {
            var url = host + "get_num_by_house?house_id="+house_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        get_user: function(user_id,cb) {
            var url = host + "get_user?user_id="+user_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        get_infos: function(cb) {
            var url = host + "get_infos";
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        get_purchases: function(cb) {
            var url = host + "get_purchases";
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        get_user_id: function(token_id,cb) {
            var url = host + "get_user_id?token_id=" + token_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        save_login: function(data,cb) {
            var url = host + "save_login";
            uu_request.request(url, data, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,body);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        search_user_byNum2: function(number,cb) {
            var url = host + "search_user_byNum?number=" + number;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var body = JSON.parse(body);
                    if (body.success) {
                        cb(err,body.rows[0]);
                    }else {
                        cb(true,{message:body.message});
                    }
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        get_all_infos: function(area_id,cb) {
            var url = host + "get_all_infos?area_id=" + area_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        cancel_collection: function(data,cb) {
            var url = host + "cancel_collection";
            uu_request.request(url, data, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,body);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        search_collection: function(house_id,user_id,cb) {
            var url = host + "search_collection?house_id=" + house_id+"&user_id="+user_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        get_estate_by_id: function(id,cb) {
            var url = host + "get_estate_by_id?id=" + id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        search_house_byId: function(id,cb) {
            var url = host + "search_house_byId?id=" + id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        get_purchase_byUser: function(user_id,cb) {
            var url = host + "get_purchase_byUser?user_id=" + user_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        save_purchase: function(data,cb) {
            var url = host + "save_purchase";
            uu_request.request(url, data, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,body);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        delete_collection: function(data,cb) {
            var url = host + "delete_collection";
            uu_request.request(url, data, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,body);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        get_collections_byUser: function(user_id,cb) {
            var url = host + "get_collections_byUser?user_id=" + user_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        save_collection: function(data,cb) {
            var url = host + "save_collection";
            uu_request.request(url, data, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,body);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        get_houses_byBuilding: function(building_id,cb) {
            var url = host + "get_houses_byBuilding?building_id=" + building_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        get_buildings_byArea: function(area_id,cb) {
            var url = host + "get_buildings_byArea?area_id=" + area_id;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        search_user_byNum: function(number,cb) {
            var url = host + "search_user_byNum?number=" + number;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },

    };
};

module.exports = nav;
