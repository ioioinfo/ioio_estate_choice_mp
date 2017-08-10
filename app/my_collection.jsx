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
        return (
            <div className="wrap">
                <div className="estate_index_head">
                  <div className="estate_index_title">中建溪岸澜庭</div>
                  <i className="fa fa-chevron-circle-left estate_index_head_icon"></i>
                </div>

                <div className="estate_index_time">距离选房开始: 01 天02小时30分9秒</div>

                <div className="weui-flex my_collection_weui-flex my_collection_weui-flex-shadow">
                    <div className="weui-flex__item my_collection_wrap_line">
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">房号:</p>
                        <p className="my_collection_title">1-0101</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">状态:</p>
                        <p className="my_collection_title"><span className="estate_house_state"></span>未售</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">面积:</p>
                        <p className="my_collection_title">999<sup>2</sup></p>
                      </div>
                    </div>
                    <div className="weui-flex__item">
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">户型:</p>
                        <p className="my_collection_title">两室一厅</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">总价:</p>
                        <p className="my_collection_title">1234567</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">单价:</p>
                        <p className="my_collection_title">123456.7</p>
                      </div>
                    </div>
                    <div className="my_collection_address">
                      <p><i className="fa fa-arrow-circle-up my_collection_address_fontsize"></i></p>
                      <p><i className="fa fa-arrow-circle-down my_collection_address_fontsize"></i></p>
                    </div>
                </div>
                <div className="weui-flex my_collection_weui-flex my_collection_weui-flex-shadow">
                    <div className="weui-flex__item my_collection_wrap_line">
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">房号:</p>
                        <p className="my_collection_title">1-0101</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">状态:</p>
                        <p className="my_collection_title"><span className="estate_house_state"></span>未售</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">面积:</p>
                        <p className="my_collection_title">999<sup>2</sup></p>
                      </div>
                    </div>
                    <div className="weui-flex__item">
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">户型:</p>
                        <p className="my_collection_title">两室一厅</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">总价:</p>
                        <p className="my_collection_title">1234567</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">单价:</p>
                        <p className="my_collection_title">123456.7</p>
                      </div>
                    </div>
                    <div className="my_collection_address">
                      <p><i className="fa fa-arrow-circle-up my_collection_address_fontsize"></i></p>
                      <p><i className="fa fa-arrow-circle-down my_collection_address_fontsize"></i></p>
                    </div>
                </div>
                <div className="weui-tabbar">
                  <a href="javascript:;" className="weui-tabbar__item ">
                      <i className="fa fa-home weui-tabbar__icon"></i>
                      <p className="weui-tabbar__label">全部房源</p>
                  </a>
                  <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on">
                      <i className="fa fa-heart weui-tabbar__icon"></i>
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
