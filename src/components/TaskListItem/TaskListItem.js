import React, { Component } from 'react';

class TaskListItem extends Component {


    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id);
    }

    onEditTask = () => {
        this.props.onEditTask(this.props.task);
    }


    render() {
        let {task} = this.props;
        let {index} = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <button 
                        className={(task.status) ? " btn btn-success btn-sm" : " btn btn-danger btn-sm" } 
                        onClick = {this.onUpdateStatus}
                    >
                        {(task.status) ? "Kích hoạt" : "Ẩn" }
                    </button>  
                </td>
                <td className="text-center">
                    <button 
                        className="mr-1 btn btn-warning"
                        onClick = {this.onEditTask}
                    >Sửa
                    </button>
                    <button 
                        className="btn btn-danger"
                        onClick = {this.onDeleteTask}
                    >Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskListItem;