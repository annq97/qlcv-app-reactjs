import React, { Component } from 'react';

class TaskSearchControl extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchName: ''
        }
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSearchTask(this.state.searchName);
    }

    render() {
        let {searchName} = this.state;
        return (
            <form onSubmit = {this.onSubmit} className = 'search-control'>
                <div className="input-group mb-3 col-sm-12">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Nhập từ khóa" 
                            name = 'searchName'
                            value = {searchName}
                            onChange = {this.onChange}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">Tìm kiếm</button>
                        </div>
                </div>
            </form>
        );
    }
}

export default TaskSearchControl;