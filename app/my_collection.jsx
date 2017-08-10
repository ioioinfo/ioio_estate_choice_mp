var React = require('react');
var ReactDOM = require('react-dom');


class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        // 初始化一个空对象
        this.state={houseItems:[]};
    }
    componentDidMount() {
      $.ajax({
         url: "/get_collections_byUser",
         dataType: 'json',
         type: 'GET',
         data:{'user_id':'1'},
         success: function(data) {
          if(data.success){
            this.setState({houseItems:data.rows});
          }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
       });
    }

    handleClick(e){

    }
    render() {
        return (
            <div className="wrap">
                <div className="estate_index_head">
                  <div className="estate_index_title">中建溪岸澜庭</div>
                  <i className="fa fa-chevron-circle-left estate_index_head_icon"></i>
                </div>

                <div className="estate_index_time">距离选房开始: 01 天02小时30分9秒</div>

                {this.state.houseItems.map((item,index)  => (
                  <House key={index} item={item} index={index} onClick={this.handleClick.bind(this,item.id)}/>
                  ))
                }
                <div className="weui-tabbar">
                  <a href="index" className="weui-tabbar__item ">
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

class House extends React.Component {
    render() {
        return (
          <a href={"house?id="+this.props.item.id} className="my_collection_a" >
              <div className="weui-flex my_collection_weui-flex my_collection_weui-flex-shadow">
                    <div className="weui-flex__item my_collection_wrap_line">
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">房号:</p>
                        <p className="my_collection_title">{this.props.item.house.door_num}</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">状态:</p>
                        <p className="my_collection_title"><span className="estate_house_state"></span>{this.props.item.house.is_push}</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">面积:</p>
                        <p className="my_collection_title">{this.props.item.house.structure_area}m<sup>2</sup></p>
                      </div>
                    </div>
                    <div className="weui-flex__item my_collection__item">
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">户型:</p>
                        <p className="my_collection_title">{this.props.item.house.type_name}</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">总价:</p>
                        <p className="my_collection_title">{this.props.item.house.total_price}</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">单价:</p>
                        <p className="my_collection_title">{this.props.item.house.per_price}</p>
                      </div>
                    </div>

                  <div className="my_collection_address">
                    <p><i className="fa fa-arrow-circle-up my_collection_address_fontsize"></i></p>
                    <p><i className="fa fa-arrow-circle-down my_collection_address_fontsize"></i></p>
                  </div>
              </div>
            </a>
        );
    }
};

// 返回到页面
ReactDOM.render(
<Wrap/>,
document.getElementById("login")
);
