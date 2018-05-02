import React, { Component } from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';

class TaskList extends Component {


    constructor(props){
        super(props);
        this.state ={
            filterName: '',
            filterStatus: -1 //all: -1, active: 1 hidden: 0
        };
    }

    onUpdateStatus = (id) => {
        this.props.onUpdateStatus(id);
    }

    onDeleteTask = (id) => {
        this.props.onDeleteTask(id);
    }

    onEditTask = (task) => {
        this.props.onEditTask(task);
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        let tasks;
        if(localStorage && localStorage.getItem("tasks")){
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        if(name === 'filterStatus'){
            value = parseInt(value, 10);
        }
        this.props.onFilterTask(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
            tasks
        );
        this.setState({
            [name] : value
        });


    }

    render() {
        let {tasks} = this.props;
        let elmTasks = tasks.map((task, index) => {
            return <TaskListItem 
                key = {task.id} 
                index = {index} 
                task = {task} 
                onUpdateStatus = {this.onUpdateStatus}
                onDeleteTask = {this.onDeleteTask}
                onEditTask = {this.onEditTask}
                />
        });

        let {filterName, filterStatus} = this.state;

        return (
            <div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="text-center">
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Trạng Thái</th>
                        <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td/>
                            <td><div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nhập vào tên công việc"
                                    name = 'filterName'
                                    value = {filterName}
                                    onChange = {this.onChange}
                                    />
                                </div></td>
                            <td className="text-center"><div className="form-group">
                                <select 
                                    className="form-control"
                                    name = 'filterStatus'
                                    value = {filterStatus}
                                    onChange = {this.onChange}
                                    >
                                    <option value = {-1}>Tất cả</option>
                                    <option value = {1}>Kích hoạt</option>
                                    <option value = {0}>Ẩn</option>
                                </select>
                                </div></td>
                            <td />
                        </tr>
                        {elmTasks}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TaskList;