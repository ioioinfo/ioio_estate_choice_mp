var React = require('react');
var ReactDOM = require('react-dom');


class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.handlePurchase=this.handlePurchase.bind(this);
        this.handleback=this.handleback.bind(this);
        this.state={item:{},titleItem:{},userItem:{},buildings:[],"types":{},"purchases":[],num:0};
    }

    componentDidMount() {
        if(from=='1'){
            $('#house_img_wrap').show();
        }else {
            $('#house_img_wrap').hide();
        }
        $("[name='checkbox']").attr("checked",'true');


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

        //用户信息
        $.ajax({
            url: "/get_user",
            dataType: 'json',
            type: 'GET',
            data:{},
            success: function(data) {
                if(data.success){
                    this.setState({userItem:data.rows[0]});
                }
            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });

        //本地缓存
        if (window.localStorage && localStorage.getItem("data")) {
            var data = JSON.parse(localStorage.getItem("data"));
            var rows = data.rows;
            var types = data.types;
            var buildings = data.buildings;

            for (var i = 0; i < rows.length; i++) {
                if (rows[i].id == id) {
                    this.setState({"item":rows[i],"buildings":buildings,"types":types});
                }
            }
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
                        var types = data.types;
                        var buildings = data.buildings;

                        for (var i = 0; i < rows.length; i++) {
                            if (rows[i].id == id) {
                                this.setState({"item":rows[i],"buildings":buildings,"types":types});
                            }
                        }
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
            this.setState({purchases:data.rows});
          }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
        });

        // 查询当前房子收藏
        $.ajax({
          url: "/search_collection",
          dataType: 'json',
          type: 'GET',
          data:{'house_id':id},
          success: function(data) {
           if(data.success){
             var num = data.num;
             if(num!=0){
               $('.estate_index_head_icon1').removeClass('fa-heart-o');
               $('.estate_index_head_icon1').addClass('fa-heart');
               $('.estate_index_head_icon1').css('color','red');
             }
             this.setState({num:num})

           }
          }.bind(this),
          error: function(xhr, status, err) {
          }.bind(this)
         });
    }

    handleClick(e){
      var house_id = this.state.item.id;
      var num = this.state.num;
      if (num==0) {
        $.ajax({
            url: "/save_collection",
            dataType: 'json',
            type: 'POST',
            data: {'house_id':house_id},
            success: function(data) {
                if (data.success) {
                  $('.estate_index_head_icon1').removeClass('fa-heart-o');
                  $('.estate_index_head_icon1').addClass('fa-heart');
                  $('.estate_index_head_icon1').css('color','red');
                  this.setState({num:1});
                  if ($('#isok').css('display') != 'none') return;
                      $('#isok').fadeIn(100);
                      setTimeout(function () {
                          $('#isok').fadeOut(100);
                      }, 2000);
                }else {
                  if ($('#warn').css('display') != 'none') return;
                      $('#warn').fadeIn(100);
                      setTimeout(function () {
                          $('#warn').fadeOut(100);
                      }, 2000);
                }
            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });
      }else{
          $.ajax({
              url: "/cancel_collection",
              dataType: 'json',
              type: 'POST',
              data: {'house_id':house_id},
              success: function(data) {
                  if (data.success) {
                      $('.estate_index_head_icon1').removeClass('fa-heart');
                      $('.estate_index_head_icon1').addClass('fa-heart-o');
                      $('.estate_index_head_icon1').css('color','#fff');
                      this.setState({num:0});
                      if ($('#isno').css('display') != 'none') return;
                          $('#isno').fadeIn(100);
                          setTimeout(function () {
                              $('#isno').fadeOut(100);
                          }, 2000);
                  }else {
                    if ($('#warn').css('display') != 'none') return;
                        $('#warn').fadeIn(100);
                        setTimeout(function () {
                            $('#warn').fadeOut(100);
                        }, 2000);
                  }
              }.bind(this),
              error: function(xhr, status, err) {
              }.bind(this)
          });
      }

    }

    //订购
    handlePurchase(e) {
        var house_id = this.state.item.id;

        $.ajax({
            url: "/save_purchase",
            dataType: 'json',
            type: 'POST',
            data: {'house_id':house_id},
            success: function(data) {
                if (data.success) {
                  if ($('#buyok').css('display') != 'none') return;
                      $('#buyok').fadeIn(100);
                      setTimeout(function () {
                          $('#buyok').fadeOut(100);
                      }, 2000);
                }else {
                  if ($('#buyno').css('display') != 'none') return;
                      $('#buyno').fadeIn(100);
                      setTimeout(function () {
                          $('#buyno').fadeOut(100);
                      }, 2000);
                }
            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });
    }

    //确认购买
    handleBuy(e) {
        $("#buy_infor").fadeIn(10);
          $(".weui-mask").on('click', function(){
            $("#buy_infor").fadeOut(10);
          })

          $(".weui-form-preview__btn_default").on('click', function(){
            $("#buy_infor").fadeOut(10);
        });
    }

    handleback(e){
      if(from){
        location.href='/index';
      }else {
        location.href='/my_collection';
      }
    }

    // 小区分布图
    render() {
        var style = {display:"none"};
        var img = "";
        var house_type_id = this.state.item.house_type_id;
        var house_type_name = "";

        if (house_type_id && this.state.types[house_type_id]) {
            img = 'images/'+this.state.types[house_type_id].picture;
            house_type_name = this.state.types[house_type_id].name;
        }

        var building_name;
        var buildings = this.state.buildings;
        for (var i = 0; i < buildings.length; i++) {
          if (buildings[i].id == this.state.item.building_id) {
            building_name = buildings[i].name;
          }
        }

        var house_id = this.state.item.id;

        //房子成交信息
        var house_state = (<div className="weui-cell__bd">
            <span className="weui-navbar__item_span weui-navbar__item_span-back"></span>
            <span className="estate_house_infor">未售</span>
        </div>);

        var button = (<div className="weui-tabbar" onClick={this.handleBuy}>
                  <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on">
                      <i className="fa fa-shopping-bag weui-tabbar__icon"></i>
                      <p className="weui-tabbar__label">我要认购</p>
                  </a>
                  </div>);

        if ("未推" == this.state.item.is_push) {
            house_state = (<div className="weui-cell__bd">
            <span className="weui-navbar__item_span weui-navbar__item_span-back3"></span>
            <span className="estate_house_infor">未推</span>
            </div>);

            button = (<div className="weui-tabbar">
              <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on">
                  <i className="fa fa-times-circle weui-tabbar__icon norengou"></i>
                  <p className="weui-tabbar__label norengou">未推不能认购</p>
              </a>
            </div>);
        }

        var purchase = (<div className="weui-cell house_background_color1">
                    <div className="weui-cell__bd">
                        <p className="weui-textarea">暂无售房记录</p>
                    </div>
                    </div>);

        var purchases = this.state.purchases;
        for (var i = 0; i < purchases.length; i++) {
            if (purchases[i].house_id == house_id) {
                house_state = (<div className="weui-cell__bd">
                    <span className="weui-navbar__item_span weui-navbar__item_span-back2"></span>
                    <span className="estate_house_infor">已售</span>
                </div>);

                button = (<div className="weui-tabbar">
                  <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on">
                      <i className="fa fa-gavel weui-tabbar__icon yirengou"></i>
                      <p className="weui-tabbar__label yirengou">已认购</p>
                  </a>
                </div>);

                purchase = (<div className="weui-cell house_background_color1">
                    <div className="weui-cell__bd">
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label estate_house_name">姓名</label></div>
                          <div className="weui-cell__bd">
                              <span className="estate_house_infor">{purchases[i].name}</span>
                          </div>
                      </div>
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label estate_house_name">筹号</label></div>
                          <div className="weui-cell__bd">
                              <span className="estate_house_infor">{purchases[i].number}</span>
                          </div>
                      </div>
                    </div>
                    </div>);
            }
        }

        return (
            <div className="wrap">
              <div className="estate_index_head">
                <div className="estate_index_title">{building_name}-{this.state.item.door_num}</div>
                <i className="fa fa-chevron-circle-left estate_index_head_icon" onClick={this.handleback}></i>
                <i className="fa fa-heart-o estate_index_head_icon1" onClick={this.handleClick}></i>
              </div>

              <div className="estate_index_time"></div>

              <div className="weui-cells weui-form-preview house_background_color">
                <div className="weui-cell weui-cell_access">
                    <div className="weui-cell__bd">房屋信息</div>
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
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">状态</label></div>
                    {house_state}
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
                        <span className="estate_house_infor">{this.state.item.total_price}元 </span>
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
                        <span className="estate_house_infor">{this.state.item.garden_area}m <sup>2</sup></span>
                    </div>
                </div>
              </div>
              <div className="weui-cells house_background_color">
                  <div className="weui-cell weui-cell_access">
                      <div className="weui-cell__bd">成交信息</div>
                  </div>
                  {purchase}
              </div>

              {button}

              <div className="weui-skin_android" id="buy_infor" style={style}>
                <div className="weui-mask"></div>
                <div className="weui-actionsheet">
                    <div className="weui-actionsheet__menu">
                        <div className="house_alert_title">是否确认认购此单位?</div>
                        <div className="weui-cell house_alert_infor_padding">
                            <div className="weui-cell__hd"><label className="weui-label estate_house_alert_name">客户名称</label></div>
                            <div className="weui-cell__bd ">
                                <span className="estate_house_infor">{this.state.userItem.name}</span>
                            </div>
                        </div>
                        <div className="weui-cell house_alert_infor_padding">
                            <div className="weui-cell__hd"><label className="weui-label estate_house_alert_name">认筹编号</label></div>
                            <div className="weui-cell__bd ">
                                <span className="estate_house_infor">{this.state.userItem.number}</span>
                            </div>
                        </div>
                        <div className="weui-cell house_alert_infor_padding">
                            <div className="weui-cell__hd"><label className="weui-label estate_house_alert_name">联系电话</label></div>
                            <div className="weui-cell__bd ">
                                <span className="estate_house_infor">{this.state.userItem.phone}</span>
                            </div>
                        </div>
                        <div className="weui-cell house_alert_infor_padding">
                            <div className="weui-cell__hd"><label className="weui-label estate_house_alert_name">合同路址</label></div>
                            <div className="weui-cell__bd ">
                                <span className="estate_house_infor">{this.state.item.address}</span>
                            </div>
                        </div>

                        <div className="weui-cell weui-cell_vcode house_alert_infor_padding">
                            <div className="weui-cell__bd house_alert_weui-input">
                                <input className="weui-input" type="number" placeholder="请输入验证码" />
                            </div>

                            <div className="weui-cell__ft">
                                <button className="weui-vcode-btn">1234</button>
                            </div>
                        </div>

                        <label className="weui-agree">
                          <input id="weuiAgree" name="checkbox" type="checkbox" className="weui-agree__checkbox" />
                          <span className="weui-agree__text">
                              阅读并同意<a href="#">《本人已阅读并同意相关条款》</a>
                          </span>
                      </label>

                      <div className="weui-form-preview__ft">
                          <span className="weui-form-preview__btn weui-form-preview__btn_default">否</span>
                          <button type="submit" className="weui-form-preview__btn weui-form-preview__btn_primary" onClick={this.handlePurchase}>是</button>
                      </div>

                    </div>
                </div>
              </div>

              <div className="weui-skin_android" id="house_img_wrap">
                <div className="weui-mask"></div>
                <div className="weui-actionsheet">
                    <div className="weui-actionsheet__menu">
                      <img src={img} className="house_img" />
                      <p className="weui-tabbar__label house_img_sure">关 闭</p>
                    </div>
                </div>
              </div>

              <div id="isok" style={style}>
                  <div className="weui-mask_transparent"></div>
                  <div className="weui-toast">
                      <i className="weui-icon-success weui-icon_msg"></i>
                      <p className="weui-toast__content">收藏成功</p>
                  </div>
              </div>

              <div id="isno" style={style}>
                  <div className="weui-mask_transparent"></div>
                  <div className="weui-toast">
                      <i className="weui-icon-info weui-icon_msg"></i>
                      <p className="weui-toast__content">取消收藏成功</p>
                  </div>
              </div>

              <div id="warn" style={style}>
                  <div className="weui-mask_transparent"></div>
                  <div className="weui-toast">
                      <i className="weui-icon-warn weui-icon_msg"></i>
                      <p className="weui-toast__content">操作失败</p>
                  </div>
              </div>

              <div id="buyok" style={style}>
                  <div className="weui-mask_transparent"></div>
                  <div className="weui-toast">
                      <i className="weui-icon-success weui-icon_msg"></i>
                      <p className="weui-toast__content">购买成功</p>
                  </div>
              </div>

              <div id="buyno" style={style}>
                  <div className="weui-mask_transparent"></div>
                  <div className="weui-toast">
                      <i className="weui-icon-warn weui-icon_msg"></i>
                      <p className="weui-toast__content">购买失败</p>
                  </div>
              </div>

              <div className="weui-cells weui-form-preview house_background_color">
                <div className="weui-cell weui-cell_access">
                    <div className="weui-cell__bd">小区规划图(可缩放)</div>
                </div>
              </div>
              <div id='slider'>
                  <div className="pinch-zoom">
                      <img src="images/cad.jpg"/>
                  </div>
              </div>

              <div className="bottom_background"></div>

          </div>
        );
    }
};


// 返回到页面
ReactDOM.render(
<Wrap/>,
document.getElementById("login")
);
