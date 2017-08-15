var React = require('react');
var ReactDOM = require('react-dom');


class Wrap extends React.Component {
    constructor(props) {
        super(props);

        this.state={item:{},user:{},"buildings":[],"types":{}};
    }

    componentDidMount() {
      $("[name='checkbox']").attr("checked",'true');

        //本地缓存
        if (window.localStorage && localStorage.getItem("data")) {
            var data = JSON.parse(localStorage.getItem("data"));

            var types = data.types;
            var buildings = data.buildings;
            this.setState({"buildings":buildings,"types":types});
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
                        var types = data.types;
                        var buildings = data.buildings;
                        this.setState({"buildings":buildings,"types":types});
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                }.bind(this)
            });
        }

      $.ajax({
        url: "/get_purchase_byUser",
        dataType: 'json',
        type: 'GET',
        data:{},
        success: function(data) {
         if(data.success){
           this.setState({item:data.rows[0].house,titleItem:{},user:data.user});
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
    }
    render() {
        var style = {display:"none"};

        var house_type_id = this.state.item.house_type_id;
        var house_type_name = "";

        if (house_type_id && this.state.types[house_type_id]) {
            house_type_name = this.state.types[house_type_id].name;
        }

        var building_name;
        var buildings = this.state.buildings;
        for (var i = 0; i < buildings.length; i++) {
          if (buildings[i].id == this.state.item.building_id) {
            building_name = buildings[i].name;
          }
        }

        var wordalert = (<div className="weui-skin_android" id="house_img_wrap">
          <div className="weui-mask"></div>
          <div className="weui-actionsheet">
              <div className="weui-actionsheet__menu">
                <p className="my_home_word">恭喜认购成功，请在<span className="red">X年X月X日</span>到售楼中心签署认购协议，若超出时间未签字视为放弃。</p>
                <p className="weui-tabbar__label house_img_sure">知道了</p>
              </div>
          </div>
        </div>);
        if(this.state.item==""){
          wordalert = "";
        }
        return (
            <div className="wrap">
              <div className="estate_index_head">
                <div className="estate_index_title">{building_name}-{this.state.item.door_num}</div>
                <a href="index"><i className="fa fa-chevron-circle-left estate_index_head_icon"></i></a>
              </div>

              <div className="estate_index_time">本次购房已结束</div>

              <div className="weui-cells house_background_color">
                  <div className="weui-cell weui-cell_access">
                      <div className="weui-cell__bd">基本信息</div>
                  </div>
              </div>
              <div className="weui-cells">
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">合同路址</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">{this.state.item.address}</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">建筑面积</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">{this.state.item.structure_area} m<sup>2</sup></span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">总价</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">{this.state.item.total_price}元</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">单价</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">{this.state.item.per_price}元</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">产品类型</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">{this.state.item.product_type}</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">户型</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">{house_type_name}</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">花园面积</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">{this.state.item.garden_area} m<sup>2</sup></span>
                    </div>
                </div>
              </div>
              <div className="weui-cells house_background_color">
                  <div className="weui-cell weui-cell_access">
                      <div className="weui-cell__bd">成交信息</div>
                  </div>
                  <div className="weui-cell house_background_color1">
                    <div className="weui-cell__bd">
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label estate_house_name">姓名</label></div>
                          <div className="weui-cell__bd">
                              <span className="estate_house_infor">{this.state.user.name}</span>
                          </div>
                      </div>
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label estate_house_name">筹号</label></div>
                          <div className="weui-cell__bd">
                              <span className="estate_house_infor">{this.state.user.number}</span>
                          </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="estate_index_background1"></div>

              <div className="weui-tabbar" id="buy">
                  <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on">
                      <i className="fa fa-gavel weui-tabbar__icon yirengou"></i>
                      <p className="weui-tabbar__label yirengou">认购成功</p>
                  </a>
              </div>

              {wordalert}

          </div>
        );
    }
};


// 返回到页面
ReactDOM.render(
<Wrap/>,
document.getElementById("login")
);
