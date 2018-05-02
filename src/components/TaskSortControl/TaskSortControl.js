import React, { Component } from 'react';

class TaskSortControl extends Component {

    constructor(props){
        super(props);
        this.state = {
            sort : {
                by: 'name',
                value: 1
            }
        }
    }


    onClick = (sortBy, sortValue) => {
        this.props.onSortTask(sortBy, sortValue);
        this.setState({
            sort:
            {
                by: sortBy,
                value: sortValue
            }
        });
    }

    render() {
        let {sort} = this.state;
        return (
            <div className="dropdown col-sm-2">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sắp Xếp
                    </button>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                    <span className= { (sort.by === 'name'&& sort.value === 1) ? "dropdown-item active-sort" : "dropdown-item"} onClick = { () => this.onClick('name',1)}>Từ A - Z</span>
                    <span className= { (sort.by === 'name'&& sort.value === -1) ? "dropdown-item active-sort" : "dropdown-item"}  onClick = { () => this.onClick('name',-1)}>Từ Z - A</span>
                    <span className= { (sort.by === 'status'&& sort.value === 1) ? "dropdown-item active-sort" : "dropdown-item"} onClick = { () => this.onClick('status',1)}>Trạng thái kích hoạt</span>
                    <span className= { (sort.by === 'status'&& sort.value === -1) ? "dropdown-item active-sort" : "dropdown-item"} onClick = { () => this.onClick('status',-1)}>Trạng thái ẩn</span>
                    </div>
            </div>
        );
    }
}

export default TaskSortControl;