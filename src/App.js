import React from 'react';
// import logo from './logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import 'tachyons';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
function Todo({ todo, index, completeTodo, removeTodo, editTodo }) {
  const [Str,setStr] = React.useState("")
  const editStr = (index,e) => {
    e.preventDefault();
    setStr(e.target.value)
    editTodo(index)
  }
   
  const del = (index) => {
    removeTodo(index)
  }
  return (
    <div className="todo pointer"
    style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
    <div >
    <FormControlLabel
        control={<GreenCheckbox 
         onChange={()=>completeTodo(index)} 
        name="checkedG" />}
      />
        <TextField id="standard-basic"  
        value={todo.text}  
        className="dib v-btm"
        onChange={e => editStr(index,e)} />
      </div>

      <div>
        <IconButton aria-label="delete" onClick={()=>del(index)}>
        <DeleteIcon />
      </IconButton>
      </div>
    </div>
  );
}
function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} 
    className={classes.root} noValidate autoComplete="off">
      
  <TextField id="outlined-basic" label="Add New Task" 
             variant="outlined"  value={value}
             onChange={e => setValue(e.target.value)} />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
      isCompleted: false,
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false,
    },
    {
      text: "Build really cool todo app",
      isCompleted: false,
    }
  ]);
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const editTodo = (index,ss) => {
    const newTodos = [...todos];
    newTodos[index].isEditable = !newTodos[index].isEditable;
    newTodos[index].text = ss;
    setTodos(newTodos)
  }
  return (
    <div className="app">
      <div className="todo-list">
      <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo = {removeTodo}
            editTodo = {editTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;