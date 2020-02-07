import React, {Component} from "react";

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item.status-filter";
import AddItem from '../add-item';

import './app.css';


export default class App extends Component {


    maxId = 100;

    state = {
      todoData: [
        this.createTodoItem('Drink coffee'),
        this.createTodoItem('Make awesom app'),
        this.createTodoItem('Have a lanch'),
      ],
      term: '',
      filter: 'all', // all, active, done
    };

    deleteItem = (id) => {
      this.setState(({todoData /* = state.todoData деструктизовано */})=>{
        
        const idx = todoData.findIndex((el) => el.id === id );
  
        const before = todoData.slice(0, idx);
        const after = todoData.slice(idx + 1);
  
        const newArray = [...before, ...after];
        return {
          todoData: newArray
        };
      });
    };

    AddNewItem = (text) => {

      const newItem = this.createTodoItem(text);

      this.setState(({todoData}) => {
        
        const newArr = [...todoData, newItem];

        return {
          todoData: newArr
        };
      });
    };

    createTodoItem(label){
      return{
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
    };

    toggleProperty(arr, id , propName){
    
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };

      const before = arr.slice(0, idx);
      const after = arr.slice(idx + 1);
      
      return [...before, newItem, ...after];
        
    };

    onToggleImportant = (id) => {
      this.setState(({todoData}) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        };
      });
    };
    
    onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        };
      });
    };

    onSearchChange = (term) => {
      this.setState({term});
    };


    filter(items, filter) {

      switch (filter) {
        case 'all':
          return items;
        case 'active':
          return items.filter( (item) => !item.done);
        case 'done':
          return items.filter((item) => item.done);
      
        default:
          return items;
      };
    };

    onFilterChange = (filter) => {
      this.setState({filter});
    };

    search = (sourceArr, term) => {

      if (term.length === 0) {
        return sourceArr;
      }

      return sourceArr.filter((el) => {
         return el.label.toLowerCase().includes(term.toLowerCase())
      });
    };
    


  render() {

    const {todoData, term, filter} = this.state;

    const visibleItems = this.filter(this.search(todoData, term),filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className = 'todo-app'>
        <AppHeader toDo={todoCount} 
                   done = {doneCount}/>
        <div className = 'top-panel d-flex'>
          <SearchPanel onSearchChange = {this.onSearchChange}/>
          <ItemStatusFilter filter={filter} 
                            onFilterChange = {this.onFilterChange} />
        </div>
        <TodoList todos = {visibleItems} 
                  onDeleted = {this.deleteItem}
                  onToggleImportant = {this.onToggleImportant}
                  onToggleDone = {this.onToggleDone}/>
        <AddItem  onAdded = {this.AddNewItem} />
      </div>
    );
  };

};
