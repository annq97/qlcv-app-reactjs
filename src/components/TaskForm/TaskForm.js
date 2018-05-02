import React, { Component } from 'react';

class TaskForm extends Component {


    constructor(props){
        super(props);
        this.state = {
            name: "", //trung voi name cua input
            status: false,
            id: ""
        }

    }

    componentWillMount(){
        if(this.props.taskEditing){
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.taskEditing){
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status
            });
        }else{
            if(nextProps && nextProps.taskEditing === null){
                this.setState({
                    id: '',
                    name: '',
                    status: false
                }); 
            }
        }
    }

    com

    onCloseForm = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        });
        this.props.onCloseForm();
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name; //phan biet giua cac input = name
        let value = target.value;//lay gia tri cua tung o input
        
        if(name === 'status'){
            value = (target.value === 'true') ? true : false
        }
        
        this.setState({
            [name] : value //set cac array theo thu tu vao state
        });
    }

    onSubmit = (event) => {
        event.preventDefault(); //bo qua submit mac dinh
        if(this.state.name !== ''){
            this.props.onSubmit(this.state);
            this.onClearForm();
            this.onCloseForm();
        }else{
            alert('Vui lòng nhập vào tên công việc!');
        }
    }

    onClearForm = () => {
        this.setState({
            id: '',
            name: '',
            status: ''
        });
        return;
    }

    render() {
        let {id} = this.state
        return (
               <div className="card">
                    <div className="card-header bg-warning">
                        {id !== ''? 'Cập Nhật Công Việc' : 'Thêm Công Việc' }
                        <span className="close" onClick = {this.onCloseForm}><b>x</b></span>
                    </div>
                    <div className="card-body">
                        <form onSubmit = {this.onSubmit}>
                            <div className="form-group">
                                <label>
                                    <b>Tên :</b>
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Tên công việc"
                                    name = "name"
                                    value = {this.state.name}
                                    onChange = {this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label><b>Trạng thái :</b></label>
                                <select 
                                    className="form-control"
                                    name = "status"
                                    value = {this.state.status}
                                    onChange={this.onChange}        
                                >
                                    <option value = {true}>Kích hoạt</option>
                                    <option value = {false}>Ẩn</option>
                                </select>
                            </div>
                            <button type="submit" className="mr-1 btn btn-warning text-light">Lưu Lại</button>
                            <button type = "reset" className="btn btn-danger" onClick = {this.onClearForm}>Hủy Bỏ</button>
                        </form>
                    </div>
                </div>                
        );
    }
}

export default TaskForm;