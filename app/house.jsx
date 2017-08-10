var React = require('react');
var ReactDOM = require('react-dom');


class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.handlePurchase=this.handlePurchase.bind(this);
        
        this.state={item:{},"purchases":[]};
    }
    
    componentDidMount() {
      if(from=='1'){
        $('#house_img_wrap').show();
      }else {
        $('#house_img_wrap').hide();
      }
      $("[name='checkbox']").attr("checked",'true');
      
      $.ajax({
         url: "/search_house_byId",
         dataType: 'json',
         type: 'GET',
         data:{'id':id},
         success: function(data) {
          if(data.success){
            this.setState({item:data.rows[0]});
          }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
       });
       
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
    }
    
    handleClick(e){
      var house_id = this.state.item.id;
    
      $.ajax({
          url: "/save_collection",
          dataType: 'json',
          type: 'POST',
          data: {'house_id':house_id},
          success: function(data) {
              if (data.success) {
                  alert("收藏成功！");
                  $('.estate_index_head_icon1').removeClass('fa-heart-o');
                  $('.estate_index_head_icon1').addClass('fa-heart');
                  $('.estate_index_head_icon1').css('color','red');
              }else {
                  alert("收藏失败！");
              }
          }.bind(this),
          error: function(xhr, status, err) {
          }.bind(this)
      });
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
                    alert("订购成功！");
                }else {
                    alert("订购失败！");
                }
            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });
    }
    
    render() {
        var style = {display:"none"};
        var img = "";
        if (this.state.item.type_picture) {
          img = 'images/'+this.state.item.type_picture;
        }
        
        var house_id = this.state.item.id;
        
        //房子成交信息
        var house_state = (<div className="weui-cell__bd">
            <span className="weui-navbar__item_span weui-navbar__item_span-back1"></span>
            <span className="estate_house_infor">未售</span>
        </div>);
        
        if ("未推" == this.state.item.is_push) {
            house_state = (<div className="weui-cell__bd">
            <span className="weui-navbar__item_span weui-navbar__item_span-back3"></span>
            <span className="estate_house_infor">未推</span>
            </div>);
        }
        
        var purchase = (<div className="weui-cell house_background_color1">
                    <div className="weui-cell__bd">
                        <textarea className="weui-textarea" placeholder="暂无售房记录" rows="3" readOnly="readOnly"></textarea>
                    </div>
                    </div>);
        
        var purchases = this.state.purchases;
        for (var i = 0; i < purchases.length; i++) {
            if (purchases[i].house_id == house_id) {
                house_state = (<div className="weui-cell__bd">
                    <span className="weui-navbar__item_span weui-navbar__item_span-back2"></span>
                    <span className="estate_house_infor">已售</span>
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
                <div className="estate_index_title">中建溪岸澜庭</div>
                <i className="fa fa-chevron-circle-left estate_index_head_icon"></i>
                <i className="fa fa-heart-o estate_index_head_icon1" onClick={this.handleClick}></i>
              </div>

              <div className="estate_index_time">距离选房开始: 01 天02小时30分9秒</div>

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
                        <span className="estate_house_infor">{this.state.item.type_name}</span>
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
              <div className="estate_index_background1"></div>

              <div className="weui-tabbar" id="buy">
                  <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on">
                      <i className="fa fa-shopping-bag weui-tabbar__icon"></i>
                      <p className="weui-tabbar__label">我要认购</p>
                  </a>
              </div>

              <div className="weui-skin_android" id="buy_infor" style={style}>
                <div className="weui-mask"></div>
                <div className="weui-actionsheet">
                    <div className="weui-actionsheet__menu">
                        <div className="house_alert_title">是否确认认购此单位?</div>
                        <div className="weui-cell house_alert_infor_padding">
                            <div className="weui-cell__hd"><label className="weui-label estate_house_alert_name">客户名称</label></div>
                            <div className="weui-cell__bd ">
                                <span className="estate_house_infor">周润华</span>
                            </div>
                        </div>
                        <div className="weui-cell house_alert_infor_padding">
                            <div className="weui-cell__hd"><label className="weui-label estate_house_alert_name">认筹编号</label></div>
                            <div className="weui-cell__bd ">
                                <span className="estate_house_infor">123456789</span>
                            </div>
                        </div>
                        <div className="weui-cell house_alert_infor_padding">
                            <div className="weui-cell__hd"><label className="weui-label estate_house_alert_name">联系电话</label></div>
                            <div className="weui-cell__bd ">
                                <span className="estate_house_infor">987654321</span>
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
          </div>
        );
    }
};


// 返回到页面
ReactDOM.render(
<Wrap/>,
document.getElementById("login")
);
