var React = require('react');
var ReactDOM = require('react-dom');


class Wrap extends React.Component {
    constructor(props) {
        super(props);
        // 初始化一个空对象
    }
    componentDidMount() {
      $("[name='checkbox']").attr("checked",'true');
    }
    render() {
        var style = {display:"none"};
        return (
            <div className="wrap">
              <div className="estate_index_head">
                <div className="estate_index_title">中建溪岸澜庭</div>
                <i className="fa fa-chevron-circle-left estate_index_head_icon"></i>
              </div>

              <div className="estate_index_time" id="estate_index_time"></div>

              <div className="weui-cells house_background_color">
                  <div className="weui-cell weui-cell_access">
                      <div className="weui-cell__bd">基本信息</div>
                  </div>
              </div>
              <div className="weui-cells">
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">合同路址</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">南翔嘉祥路198号</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">状态</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_state"></span>
                        <span className="estate_house_infor">未售</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">建筑面积</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">999 <sup>2</sup></span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">总价</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">999 万</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">单价</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">1 万</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">产品类型</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">别墅</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">户型</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">5 室5厅</span>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__hd"><label className="weui-label estate_house_name">花园面积</label></div>
                    <div className="weui-cell__bd">
                        <span className="estate_house_infor">100 <sup>2</sup></span>
                    </div>
                </div>
              </div>
              <div className="weui-cells house_background_color">
                  <div className="weui-cell weui-cell_access">
                      <div className="weui-cell__bd">成交信息</div>
                  </div>
                  <div className="weui-cell house_background_color1">
                    <div className="weui-cell__bd">
                        <textarea className="weui-textarea" placeholder="暂无售房记录" rows="3" readOnly="readOnly"></textarea>
                    </div>
                  </div>
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
                            <div className="weui-cell__hd"><label className="weui-label estate_house_alert_name">合同地址</label></div>
                            <div className="weui-cell__bd ">
                                <span className="estate_house_infor">宝山区呼兰路911弄11号博济智慧园3号楼101A</span>
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
                          <button type="submit" className="weui-form-preview__btn weui-form-preview__btn_primary" href="#">是</button>
                      </div>

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
