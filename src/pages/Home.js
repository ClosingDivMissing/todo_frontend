import { useState, useEffect } from "react";
import api from "../api";
import "./Home.css";
import img1 from "../images/26.png";

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");
  const [activate26, setActivate26] = useState(false);
  const [screenLoading, setScreenLoading] = useState(true);

  const [editingTodoId, setEditingTodoId] = useState(null);

  const [editedValue, setEditedValue] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    await api
      .get("/todos")
      .then((res) => setTodos(res.data.todos))
      .catch(() => setTodos([]));
    setScreenLoading(false);
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    if (newTodo === "26") {
      setActivate26(true);
    }

    api
      .post("/todos", { text: newTodo })
      .then((res) => {
        setTodos([res.data, ...todos]);
        setNewTodo("");
        setError("");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "لطفاً ابتدا وارد شوید");
      });
  };

  // PUT برای toggle completed
  const toggleTodo = (id) => {
    api.put(`/todos/${id}`).then((res) => {
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    });
  };

  const deleteTodo = (id) => {
    api.delete(`/todos/${id}`).then(() => {
      setTodos(todos.filter((t) => t._id !== id));
    });
  };

  // 🔹 تغییر 3: PATCH فقط هنگام ذخیره
  const saveEdit = async (id) => {
    if (!editedValue.trim()) return;

    const res = await api.patch(`/todos/${id}`, {
      text: editedValue,
    });

    setTodos(todos.map((t) => (t._id === id ? res.data : t)));

    setEditingTodoId(null);
    setEditedValue("");
  };
  if (screenLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="todo-page">
      {activate26 && (
        <div className="img-box">
          <img src={img1} alt="Surprise 26" />
        </div>
      )}
      <h1 className="todo-title">لیست کارهای من</h1>
      {error && <div className="todo-error">{error}</div>}
      <div className="todo-input-box">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="کار جدید..."
          className="todo-input"
        />
        <button onClick={addTodo} className="todo-add-btn">
          اضافه کن
        </button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo._id} className="todo-item">
            <div className="todo-left">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id)}
                className="todo-checkbox"
              />

              {/* 🔹 تغییر 4: رندر شرطی بر اساس id */}
              {editingTodoId === todo._id ? (
                <input
                  type="text"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(todo._id)}
                  className="todo-edit-input"
                />
              ) : (
                <span
                  className={
                    todo.completed ? "todo-text completed" : "todo-text"
                  }
                >
                  {todo.text}
                </span>
              )}
            </div>

            <div className="action-buttons">
              {editingTodoId == todo._id ? (
                <></>
              ) : (
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="todo-delete-btn"
                >
                  حذف
                </button>
              )}

              {editingTodoId === todo._id ? (
                <button
                  onClick={() => saveEdit(todo._id)}
                  className="todo-edit-btn"
                >
                  ثبت تغییرات
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingTodoId(todo._id);
                    setEditedValue(todo.text);
                  }}
                  className="todo-edit-btn"
                >
                  ویرایش
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
