import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])

  useEffect(() => {
    if(todos.length > 0){
      localStorage.setItem("todos",JSON.stringify(todos))
    }
    
  }, [todos])

  const toggleFinished =  (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i =>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })

    setTodos(newTodos);
  }

  const handleDelete = (e, id) => {
    // let index = todos.findIndex(item => {
    //   return item.id === id;
    // })
    // console.log(id, index)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(newTodos, todos)

  }

  return (
    <>
      <Navbar />
      <div className=" md:container mx-auto my-5 rounded-xl p-5 bg-violet-400 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-2xl text-center'>iTask - Manage your todos at one place</h1>
        <div className="flex flex-col addTodo my-5 ">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onKeyDown={(e)=> {
            if(e.key === "Enter" && todo.length > 3){
              handleAdd();
            }
          }} onChange={handleChange} value={todo} type="text" className='bg-white border-2 rounded-xl w-full p-2' />
          <button onClick={handleAdd} disabled={todo.length<3} className='flex items-center gap-3 justify-center bg-violet-800 disabled:bg-violet-800 hover:bg-violet-950 px-5 cursor-pointer transition-all duration-300 ease-in-out font-bold text-white py-2 my-3 rounded-xl '><FaSave /> Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> <span className='font-bold  '>Show Finished</span>
        <h2 className='text-xl font-bold my-2'>Your Todos</h2>
        {todos.length === 0 && <div className='m-5 text-gray-600 font-bold '>There is no Todo List</div>}
        <div className="todos ">
          {todos.map(item => {

            return (showFinished ? item.isCompleted : !item.isCompleted) && (
            // return (showFinished || !item.isCompleted) &&  (
              <div key={item.id} className="todo flex justify-between  items-center my-5 w-full">
                <div className='flex gap-6 ' >
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <div key={item.id} className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                  </div>
                </div>

                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='flex items-center  gap-3 bg-violet-800 hover:bg-violet-950 px-5 cursor-pointer transition-all duration-300 ease-in-out font-bold  text-white py-2 rounded-xl mx-1'><FaEdit /> Edit</button>
                  <button onClick={(e) => handleDelete(e, item.id)} className=' flex items-center  gap-3 bg-violet-800 hover:bg-violet-950 px-5 cursor-pointer transition-all duration-300 ease-in-out font-bold text-white py-2 rounded-xl mx-1'><MdDelete /> Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
