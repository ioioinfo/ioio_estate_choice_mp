var React = require('react');

// 左边 导航
class AdminLeft extends React.Component {
  render() {
    return (
      <div className="admin_left col-xs-6 col-sm-4 col-md-2">
        <div className="admin_logo">
          <span className="admin_index_logo">{platform_name}</span><br/>
          <span className="admin_index_name">{company_name}</span>
        </div>
        <AdminLeftNav/>
      </div>
    );
  }
};


// 左边 导航
class AdminLeftNav extends React.Component {
  constructor(props) {
      super(props);
      this.state={items:[]};
      this.handleClick=this.handleClick.bind(this);
  }
  handleClick(e){
    var index= $(e.target).data("role");
    var second_nav = "nav_second"+index;
    $("#"+second_nav).slideToggle(400);
  }
  componentDidMount() {
    $.ajax({
         url: "/menu_list",
         dataType: 'json',
         type: 'GET',
         data:{},
         success: function(data) {
            this.setState({items:data.rows});
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
    });
  }
  render() {
    return (
      <div className="admin_index_nav">
        {this.state.items.map((item,index) => (
            <div className="nav_public  font_color" key={index} >
                <a href={item.a}>
                  <div className="nav_public_first" data-role={index} onClick={this.handleClick}>
                    <i className={item.icon} id="nav_public_first_style"></i>&nbsp; {item.navname}
                  </div>
                </a>
                <SecondNav item={item} index={index} />

            </div>))
        }

      </div>
    );
  }
};


// 二级 导航
class SecondNav extends React.Component {
  render() {
    var secondNav = (  <p className="nav_second" id={"nav_second"+this.props.index}>
        {this.props.item.snav.map((item,index) => (
          <a href={item.a} key={index} className="nav_public_in nav_public_second font_color">
            <i className={item.icon}></i>&nbsp; {item.navname}
          </a>))
        }
      </p>)
      if(this.props.item.snav.length==0){
        secondNav = "";
      }
    return (
      <div>
        {secondNav}
      </div>
    );
  }
};

module.exports = AdminLeft;
