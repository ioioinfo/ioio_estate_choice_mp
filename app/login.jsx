var React = require('react');
var ReactDOM = require('react-dom');


class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.chang = this.chang.bind(this);
        this.state={statu:'1'};
    }
    chang(){
      this.setState({statu:'0'});
    }
    componentDidMount() {

    }
    render() {
        var style = {display:'none'}
        var p = (<Login chang={this.chang}/>);
        if(this.state.statu=='1'){
          p = (<Login chang={this.chang}/>);
        }else if (this.state.statu=='0') {
          p = (<Login1 chang={this.chang}/>);
        }
        return (
            <div className="container">
                {p}

                <div id="warn" style={style}>
                    <div className="weui-mask_transparent"></div>
                    <div className="weui-toast">
                        <i className="weui-icon-warn weui-icon_msg"></i>
                        <p className="weui-toast__content">认筹号错误</p>
                    </div>
                </div>

                <div id="loadingToast" style={style}>
                    <div className="weui-mask_transparent"></div>
                    <div className="weui-toast">
                        <i className="weui-loading weui-icon_toast"></i>
                        <p className="weui-toast__content">登录加载中</p>
                    </div>
                </div>
            </div>
        );
    }
};
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.state={item:{}};
    }
    handleClick(e) {
      number = $('#password').val();
      $.ajax({
          url: "/search_user_byNum",
          dataType: 'json',
          type: 'GET',
          data: {'number':number,},
          success: function(data) {
              if (data.success) {
                phone = data.rows[0];
                this.props.chang();

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

    // enter键
    onKeyPress(e){
        var key = e.which;
      if (key == 13) {
      }
    }
    render() {
        return (
            <div className="form-signin">
                <input type="number" id="password" className="form-control" placeholder="请输入认筹号" required onKeyPress={this.onKeyPress} />
                <div className="checkbox">
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleClick}>下一步</button>
            </div>

        );
    }
};

class Login1 extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
    }
    handleClick(e) {

    }

    render() {
        return (
            <div className="form-signin">
                <input type="text" className="form-control" required value={phone} readOnly="readOnly"/>
                <div className="checkbox"></div>
                <div className="weui-cell weui-cell_vcode login_next_background">
                    <div className="weui-cell__bd ">
                        <input className="weui-input" type="tel" placeholder="请输入验证码" />
                    </div>

                    <div className="weui-cell__ft">
                        <button className="weui-vcode-btn">获取验证码</button>
                    </div>
                </div>
                <div className="checkbox"></div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleClick}>登 录</button>
            </div>

        );
    }
};

// 返回到页面
ReactDOM.render(
<Wrap/>,
document.getElementById("login")
);
