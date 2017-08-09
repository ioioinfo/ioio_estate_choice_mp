var React = require('react');
var ReactDOM = require('react-dom');


class Wrap extends React.Component {
    render() {
        return (
            <div className="wrap">
                <div className="estate_index_head">
                  <div className="estate_index_title">中建溪岸澜庭</div>
                  <i className="fa fa-user-o estate_index_head_icon"></i>
                </div>

                <div className="estate_index_time">距离选房开始: 01 天02小时30分9秒</div>

                <div className="estate_index_weui">
                    <div className="weui-navbar__item">
                        <span className="weui-navbar__item_span weui-navbar__item_span-back1"></span>未售
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
                    <div className="weui-navbar__item-nav">
                        溪岸澜庭001幢
                    </div>
                    <div className="weui-navbar__item-nav">
                        溪岸澜庭002幢
                    </div>
                    <div className="weui-navbar__item-nav">
                        溪岸澜庭003幢
                    </div>
                    <div className="weui-navbar__item-nav">
                        溪岸澜庭003幢
                    </div>
                    <div className="weui-navbar__item-nav">
                        溪岸澜庭003幢
                    </div>
                </div>

                <div className="estate_index_table-wrap">
                  <ul className="estate_index_table_ul">
                    <li>
                      <p>房号： 1-0101</p>
                      <p>价格： 99 万</p>
                    </li>
                    <li>
                      <p>房号： 1-0101</p>
                      <p>价格： 99 万</p>
                    </li>
                    <li>
                      <p>房号： 1-0101</p>
                      <p>价格： 99 万</p>
                    </li>
                    <li>
                      <p>房号： 1-0101</p>
                      <p>价格： 99 万</p>
                    </li>
                    <li>
                      <p>房号： 1-0101</p>
                      <p>价格： 99 万</p>
                    </li>
                    <li>
                      <p>房号： 1-0101</p>
                      <p>价格： 99 万</p>
                    </li>
                    <li>
                      <p>房号： 1-0101</p>
                      <p>价格： 99 万</p>
                    </li>
                  </ul>
                </div>

                <div className="estate_index_background1"></div>

                <div className="weui-tabbar">
                  <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on">
                      <i className="fa fa-home weui-tabbar__icon"></i>
                      <p className="weui-tabbar__label">全部房源</p>
                  </a>
                  <a href="javascript:;" className="weui-tabbar__item">
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
