import React, { Component } from 'react';
import TaskControl from '../TaskControl/TaskControl';
import TaskList from '../TaskList/TaskList';
import TaskForm from '../TaskForm/TaskForm';
import _ from 'lodash'; //_ là lodash giong $ của jquery

class App extends Component {
    //Luu du lieu o LocalStorage vs SessionStorage cua trinh duyet
    constructor(props){
        super(props);
        this.state = {
            tasks: [], //id: duy nhất, name, status,
            isForm: false,
            taskItem: null,
            filter : {
                name: '',
                status: -1
            },
            searchName: '',
            sort: {
                by: 'name',
                value: 1
            }
        }
    }

    componentWillMount(){
        //Chi chay 1 lan, khi mount component
        if(localStorage && localStorage.getItem("tasks")){
            this.setState({
                tasks: JSON.parse(localStorage.getItem('tasks')) //chuyen sang array
            });
        }
    }


    onToggleForm = () => { //thêm Task
        if(this.state.isForm === true && this.state.taskEditing !== null){
            this.setState({
                taskItem: null, //xóa đi item đang có
                isForm: true
            });
        }else{
            this.setState({
                isForm: !this.state.isForm,
                taskItem: null //xóa đi item đang có
            });
        }
    }

    onCloseForm = () =>{
        this.setState({
            isForm: false,
            taskItem: null //xóa đi item đang có
        });        
    }

    onSubmit = (data) => {
        let randomstring = require("randomstring");
        let {tasks} = this.state;        
        if(data.id !== ''){
            let taskEditing = {
                id: data.id,
                name: data.name,
                status: data.status
            }

            tasks.forEach((task) => {
                if(task.id === taskEditing.id){
                    task.name = taskEditing.name;
                    task.status = taskEditing.status;
                }
            });
        }else{
            let task = {
                id: randomstring.generate(),
                name: data.name,
                status: data.status
            }
            tasks.push(task);
        }

        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        let {tasks} = this.state;

        tasks.forEach((task) => {
            if(task.id === id){
                task.status = !task.status;
            }
        });

        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

    onDeleteTask = (id) => {
        
        this.setState({
            isForm: false
        });
        
        let {tasks} = this.state;

        //cách 1 - es5
        // tasks.forEach((task,index) => {
        //     if(task.id === id){
        //         tasks.splice(index,1); //xoa 1 phan tu tu vi tri i
        //     }
        // });

        //cách 2 - es6
        tasks = tasks.filter((task, index) => {
            return task.id !== id;
        });

        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));


    }

    onEditTask = (task) => {
        this.setState({
            taskItem: task
        });

        this.setState({
            isForm : true
        });
    }

    onFilterTask = (filterName, filterStatus, data) => {
        // let tasks;

        // tasks = data.filter((task) => {
        //     return task.name.toLowerCase().search(filterName) === 0;
        // })

        // this.setState({
        //     tasks: tasks
        // });

        this.setState({
            filter : {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })

    }

    onSearchTask = (searchName) => {
        this.setState({
            searchName: searchName.toLowerCase()
        });
    }

    onSortTask = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        })
    }

    render() {
        let {tasks, isForm, filter, searchName, sort} = this.state; //let tasks = this.state.tasks
        if(filter){
            if(filter.status !== null){ //khong nên dùng if(filter.status) vì sẽ bỏ qua trường hợp status = 0
                tasks = tasks.filter((task) => {
                    if(filter.status !== -1){
                        let status = task.status === true ? 1 : 0;
                        
                        return status === filter.status;
                    }
                    return task;
                });
            }

            if(filter.name){
                
                tasks = tasks.filter((task) => {
                   return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
                });
            }

        }

        if(searchName !== ''){
            // tasks = tasks.filter((task) => {
            //     return task.name.toLowerCase().indexOf(searchName) !== -1;
            //  });

            tasks = _.filter(tasks,(task) => {
                return task.name.toLowerCase().indexOf(searchName) !== -1;
            })

        }

        if(sort){
            if(sort.by === 'name'){
                tasks.sort((task01, task02) => {
                    let nameA = task01.name.toLowerCase(),nameB = task02.name.toLowerCase();
                    if(nameA < nameB) return -sort.value; //giam dan
                    if(nameA > nameB) return sort.value; //tang dan
                    return 0;
                });
            }else{
                tasks.sort((task01, task02) => {
                    if(task01.status > task02.status) return -sort.value; //giam dan
                    if(task01.status < task02.status) return sort.value; //tang dan
                    return 0;
                });
            }
        }

        let isDisplayForm = isForm ? <TaskForm 
            onCloseForm = {this.onCloseForm}
            onSubmit = {this.onSubmit}
            taskEditing = {this.state.taskItem}
            /> : '';
        return (
            <div className="AppName">
                <div className="container">
                    <div className="header text-center mt-3">
                        <h2>Quản Lý Công Việc</h2>
                        <hr />
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-sm-4">
                                {isDisplayForm}
                            </div>
                            <div className={isForm ? "col-sm-8" : "col-sm-12"}>
                                <button className="btn btn-primary mb-3" onClick = { () => {this.onToggleForm()}}>Thêm Công Việc</button>
                                <TaskControl
                                    onSearchTask = {this.onSearchTask}
                                    onSortTask = {this.onSortTask}
                                />
                                <TaskList 
                                    tasks = {tasks} 
                                    onUpdateStatus = {this.onUpdateStatus}
                                    onDeleteTask = {this.onDeleteTask}
                                    onEditTask = {this.onEditTask}
                                    onFilterTask = {this.onFilterTask}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;