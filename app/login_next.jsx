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
                <input type="text" id="password" className="form-control" required onKeyPress={this.onKeyPress} />
                <div className="checkbox">
                </div>
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
