var React = require('react');
var ReactDOM = require('react-dom');


class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.get_house = this.get_house.bind(this);
        // 初始化一个空对象
        this.state={areaItems:[],floors:[],m_house:{}};
    }
    get_house(building_id,cb){
      $.ajax({
         url: "/get_houses_byBuilding",
         dataType: 'json',
         type: 'GET',
         data:{'building_id':building_id},
         success: function(data) {
          if(data.success){
            var houseItems = data.rows;
            var floors = [];
            var m_house = {};

            for (var i = 0; i < houseItems.length; i++) {
              var houseItem = houseItems[i];
              var floor_num = houseItem.floor_num;
              if (!m_house[floor_num]) {
                floors.push(floor_num);
                m_house[floor_num] = [];
              }
              m_house[floor_num].push(houseItem);
            }
            cb({floors:floors,m_house:m_house});
          }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
       });
    }
    componentDidMount() {

      // 幢
      $.ajax({
         url: "/get_buildings_byArea",
         dataType: 'json',
         type: 'GET',
         data:{'area_id':'1'},
         success: function(data) {
          if(data.success){
            var areaItems = data.rows;
            var first = areaItems[0];
            var firstId = first.id;

            this.get_house(first.id,function(data) {
              this.setState({areaItems:areaItems,floors:data.floors,m_house:data.m_house});
              $('#weui-navbar__item-nav'+firstId).addClass('index_buile_style');
            }.bind(this));
          }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
       });
    }

    handleClick(building_id){
      this.get_house(building_id,function(data) {
        this.setState({floors:data.floors,m_house:data.m_house});
        $('#weui-navbar__item-nav'+building_id).removeClass('index_buile_style');
        $('#weui-navbar__item-nav'+building_id).addClass('index_buile_style').siblings().removeClass('index_buile_style');
      }.bind(this));
    }
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
                    {this.state.areaItems.map((item,index)  => (
                        <div className="weui-navbar__item-nav" id={'weui-navbar__item-nav'+item.id} key={index} onClick={this.handleClick.bind(this,item.id)}>{item.name}</div>))
                    }
                </div>

                <div className="estate_index_table-wrap">
                  {this.state.floors.map((floor,index)  => (
                    <ul className="estate_index_table_ul" key={index}>
                      <li>
                        <span>{floor}</span>
                      </li>
                      {this.state.m_house[floor].map((item,index)  => (
                        <li key={item.id}>
                          <a href={"house?from=1&id="+item.id}>
                            <p>房号： {item.door_num}</p>
                            <p>价格： {item.total_price}</p>
                          </a>
                        </li>))
                      }
                    </ul>))
                  }
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
