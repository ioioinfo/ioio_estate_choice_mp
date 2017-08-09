var React = require('react');
var ReactDOM = require('react-dom');


class Wrap extends React.Component {
    render() {
        return (
            <div className="container">
                <Login/>
            </div>
        );
    }
};
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }
    handleClick(e) {

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
                <input type="text" id="password" className="form-control" placeholder="请输入认证号" required onKeyPress={this.onKeyPress} />
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
