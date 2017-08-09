var React = require('react');

// 表格
class Table extends React.Component {
    render() {
        return (
            <div id="table">
            <div className="">
            <table className="table table-striped table-hover table-bordered">
            <thead>
            <tr>
            {this.props.tabthitems.map((item,index) => (
                <Th key={index} item={item} sort={this.props.sort} onSort={this.props.onSort} />))
            }
            </tr>
            </thead>
            <tbody>
            {this.props.tabtritems.map((item,index)  => (
                <Tr key={index} item={item} tabthitems={this.props.tabthitems} refresh={this.props.refresh} checkTd={this.props.checkTd} />))
            }
            </tbody>
            </table>
            </div>
            </div>
        );
    }
};
class Tr extends React.Component {
    constructor(props) {
        super(props);

        // 初始化一个空对象
        this.state = {};
    }

    render() {
        return (
            <tr>
            {this.props.tabthitems.map((item,index) => (
                <Td key={index} item={this.props.item} thitem={item} refresh={this.props.refresh} checkTd={this.props.checkTd} />))
            }
            </tr>
        );
    }
};
class Th extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(e){
        var sort = this.props.sort;
        if (!sort) {
            sort = {name:"",dir:""};
        }

        if (sort.name != this.props.item.name) {
            sort.dir = "";
        }
        sort.name = this.props.item.name;
        //排序顺序
        if (sort.dir == "asc") {
            sort.dir = "desc";
        } else {
            sort.dir = "asc";
        }

        this.props.onSort(sort);
    }
    render() {
        var img= <span></span>;
        if (this.props.item.sort) {
            var sort = this.props.sort;
            if (sort && sort.name == this.props.item.name) {
                if (sort.dir == "desc") {
                    img = <span><img className="sort_img" src="images/htpaixu.png" alt="" onClick={this.handleClick}/></span>;
                } else {
                    img = <span><img className="sort_img" src="images/htpaixu1.png" alt="" onClick={this.handleClick}/></span>;
                }
            } else {
                img = <span><img className="sort_img" src="images/htpaixu2.png" alt="" onClick={this.handleClick}/></span>;
            }
        }
        var thStyle = {
            width:this.props.item.width
        };

        if (this.props.item.type=="check"){
          return (
              <th style={thStyle}><input type="checkbox" />{this.props.item.title} {img}</th>
          );
        }else{
          return (
              <th style={thStyle}>{this.props.item.title} {img}</th>
          );
        }

    }
};

class Td extends React.Component {
    render() {
        var defaultTd = (<td>{this.props.item[this.props.thitem.name]}</td>);
        var checkTd = this.props.checkTd;

        if (checkTd) {
            checkTd = checkTd.bind(this);
            return checkTd(defaultTd);
        } else {
            return defaultTd;
        }
    }
};

module.exports = Table;
