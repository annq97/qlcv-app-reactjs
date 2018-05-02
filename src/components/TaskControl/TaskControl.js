import React, { Component } from 'react';
import TaskSearchControl from '../TaskSearchControl/TaskSearchControl';
import TaskSortControl from '../TaskSortControl/TaskSortControl';

class TaskControl extends Component {


    onSearchTask = (searchName) => {
        this.props.onSearchTask(searchName);
    }

    onSortTask = (sortBy, sortValue) => {
        this.props.onSortTask(sortBy, sortValue);
    }

    render() {
        return (
            <div className="row">
                <TaskSearchControl
                    onSearchTask = {this.onSearchTask}
                />
                <TaskSortControl onSortTask = {this.onSortTask}/>
            </div>
        );
    }
}

export default TaskControl;