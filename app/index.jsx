var React = require('react');
var ReactDOM = require('react-dom');

class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.get_house = this.get_house.bind(this);
        this.state={building_id:0,rows:[],areaItems:[],floors:[],m_house:{},"m_purchase":{},titleItem:{},housenum:{}};
    }

    //根据幢查询房子信息
    get_house(building_id,rows,cb){
        var floors = [];
        var m_house = {};

        for (var i = 0; i < rows.length; i++) {
            if (building_id == rows[i].building_id) {
                var houseItem = rows[i];
                var floor_num = houseItem.floor_num;
                if (!m_house[floor_num]) {
                    floors.push(floor_num);
                    m_house[floor_num] = [];
                }
                m_house[floor_num].push(houseItem);
            }
        }

        cb({floors:floors,m_house:m_house});
    }



    componentDidMount() {
        //检查数据版本
        if (window.localStorage) {
            $.ajax({
                url: "/data_version",
                dataType: 'json',
                type: 'GET',
                data:{},
                success: function(data) {
                    if(data.success){
                        var data_version = data.data_version;
                        var old_data_version = localStorage.getItem("data_version");

                        if (old_data_version && old_data_version < data_version) {
                            //清除缓存
                            localStorage.removeItem("data");
                            location.reload();
                        }

                        localStorage.setItem("data_version",data_version);
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                }.bind(this)
            });
        }

        //查询成交信息
        $.ajax({
            url: "/get_purchases",
            dataType: 'json',
            type: 'GET',
            data:{},
            success: function(data) {
                if(data.success){
                    var rows = data.rows;
                    var m_purchase = {};

                    for (var i = 0; i < rows.length; i++) {
                        m_purchase[rows[i].house_id] = "1";
                    }
                    this.setState({m_purchase:m_purchase});
                }
            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });

        //title名称
        $.ajax({
            url: "/get_estate_by_id",
            dataType: 'json',
            type: 'GET',
            data:{'id':'1'},
            success: function(data) {
                if(data.success){
                  var time_distance = data.time;
                  this.setState({titleItem:data.rows[0]});
                  count_down(time_distance);
                }
            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });


        //收藏数量
        $.ajax({
            url: "/search_collection_nums",
            dataType: 'json',
            type: 'GET',
            data:{},
            success: function(data) {
                if(data.success){
                  this.setState({housenum:data.collect_map});
                }
            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });



        //本地缓存
        if (window.localStorage && localStorage.getItem("data")) {
            var data = JSON.parse(localStorage.getItem("data"));
            var rows = data.rows;

            var buildings = data.buildings;
            var building_id = localStorage.getItem("building_id");
            if (!building_id) {
                building_id = buildings[0].id;
            }

            this.get_house(building_id,rows,function(data) {
                this.setState({building_id:building_id,rows:rows,areaItems:buildings,floors:data.floors,m_house:data.m_house});
            }.bind(this));
        } else {
            //查询所有房屋信息
            $.ajax({
                url: "/get_all_infos",
                dataType: 'json',
                type: 'GET',
                data:{'area_id':'1'},
                success: function(data) {
                    if(data.success){
                        if (window.localStorage) {
                            localStorage.setItem("data",JSON.stringify(data));
                        }
                        var rows = data.rows;

                        var buildings = data.buildings;
                        var building_id = buildings[0].id;

                        this.get_house(building_id,rows,function(data) {
                            this.setState({building_id:building_id,rows:rows,areaItems:buildings,floors:data.floors,m_house:data.m_house});
                        }.bind(this));
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                }.bind(this)
            });
        }
    }

    handleClick(building_id){
        var rows = this.state.rows;

        this.get_house(building_id,rows,function(data) {
            localStorage.setItem("building_id",building_id);
            this.setState({building_id:building_id,floors:data.floors,m_house:data.m_house});
        }.bind(this));
    }

    render() {
        var all_floor = [];
        var areas = [];
        var state = this.state;

        state.floors.map(function(floor,index) {
            var houses = [];
            state.m_house[floor].map(function(item,index) {
                var cls = "weui-navbar__item_span-back1";
                if ("未推" == item.is_push) {
                    cls = "weui-navbar__item_span-back3";
                } else if (state.m_purchase[item.id]) {
                    cls = "weui-navbar__item_span-back2";
                }

                var collection_number = "";
                if (state.housenum[item.id]) {
                  collection_number = (<i className="collection_number">{state.housenum[item.id]}</i>);
                }

                var house = (<li key={item.id} className={cls}>
                  <a href={"house?from=1&id="+item.id}>
                    <p>房号： {item.door_num}</p>
                    <p>价格： {item.total_price}</p>
                  </a>
                  {collection_number}
                  </li>);

                houses.push(house);
            });

            var one_floor = (<ul className="estate_index_table_ul" key={index}>
              <li>
                <span>{floor}F</span>
              </li>
              {houses}
              </ul>);

            all_floor.push(one_floor);
        });

        state.areaItems.map(function(item,index) {
            var cls = "weui-navbar__item-nav";

            if (this.state.building_id == item.id) {
                cls = "weui-navbar__item-nav index_buile_style";
            }
            areas.push(<div className={cls} id={'weui-navbar__item-nav'+item.id} key={index} onClick={this.handleClick.bind(this,item.id)}>{item.name}</div>);
        }.bind(this));

        return (
            <div className="wrap">
                <div className="estate_index_head">
                  <div className="estate_index_title">{this.state.titleItem.name}</div>
                  <a href="my_home"><i className="fa fa-user-o estate_index_head_icon"></i></a>
                </div>

                <div className="estate_index_time"></div>

                <div className="estate_index_weui">
                    <div className="weui-navbar__item">
                        <span className="weui-navbar__item_span weui-navbar__item_span-back"></span>未售
                    </div>
                    <div className="weui-navbar__item">
                        <span className="weui-navbar__item_span weui-navbar__item_span-back2"></span>已售
                    </div>
                    <div className="weui-navbar__item">
                        <span className="weui-navbar__item_span weui-navbar__item_span-back3"></span>未推
                    </div>
                </div>
                <div className="estate_index_background"></div>
                <div className="estate_index_weui estate_index_weui-nav">
                    {areas}
                </div>

                <div className="estate_index_table-wrap">
                    {all_floor}
                </div>

                <div className="estate_index_background1"></div>

                <div className="weui-tabbar">
                  <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on">
                      <i className="fa fa-home weui-tabbar__icon"></i>
                      <p className="weui-tabbar__label">全部房源</p>
                  </a>
                  <a href="my_collection" className="weui-tabbar__item">
                      <i className="fa fa-heart-o weui-tabbar__icon"></i>
                      <p className="weui-tabbar__label">我的收藏</p>
                  </a>
              </div>


            </div>
        );
    }
};


// 返回到页面
ReactDOM.render(
<Wrap/>,
document.getElementById("login")
);
