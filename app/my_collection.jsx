var React = require('react');
var ReactDOM = require('react-dom');


class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        // 初始化一个空对象
        this.state={houseItems:[],m_purchase:{}};
    }

    componentDidMount() {
        $.ajax({
         url: "/get_collections_byUser",
         dataType: 'json',
         type: 'GET',
         data:{},
         success: function(data) {
          if(data.success){
            this.setState({houseItems:data.rows});
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
    }

    handleClick(e){

    }
    render() {
        return (
            <div className="wrap">
                <div className="estate_index_head">
                  <div className="estate_index_title">中建溪岸澜庭</div>
                </div>

                <div className="estate_index_time"></div>

                {this.state.houseItems.map((item,index)  => (
                  <House key={index} item={item} m_purchase={this.state.m_purchase} index={index} onClick={this.handleClick.bind(this,item.id)}/>
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
        //房子成交信息
        var house_state = (<p className="my_collection_title">
            <span className="weui-navbar__item_span weui-navbar__item_span-back"></span>未售
            </p>);

        if ("未推" == this.props.item.is_push) {
            house_state = (<p className="my_collection_title">
            <span className="weui-navbar__item_span weui-navbar__item_span-back3"></span>未推
            </p>);
        } else if (this.props.m_purchase[this.props.item.house_id]) {
            house_state = (<p className="my_collection_title">
            <span className="weui-navbar__item_span weui-navbar__item_span-back2"></span>已售
            </p>);
        }

        return (
          <a href={"house?id="+this.props.item.house_id} className="my_collection_a" >
              <div className="weui-flex my_collection_weui-flex my_collection_weui-flex-shadow">
                    <div className="weui-flex__item my_collection_wrap_line">
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">房号:</p>
                        <p className="my_collection_title">{this.props.item.house.door_num}</p>
                      </div>
                      <div className="my_collection_wrap">
                        <p className="my_collection_title my_collection_title1">状态:</p>
                        {house_state}
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
