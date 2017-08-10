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
                <i className="fa fa-heart-o estate_index_head_icon1"></i>
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
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label estate_house_name">姓名</label></div>
                          <div className="weui-cell__bd">
                              <span className="estate_house_infor">周润华</span>
                          </div>
                      </div>
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label estate_house_name">筹号</label></div>
                          <div className="weui-cell__bd">
                              <span className="estate_house_infor">123456789</span>
                          </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="estate_index_background1"></div>

              <div className="weui-tabbar" id="buy">
                  <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on">
                      <i className="fa fa-gavel weui-tabbar__icon"></i>
                      <p className="weui-tabbar__label">认购成功</p>
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
