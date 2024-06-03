import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { StyledWrap, StyledAddTodo } from "./style";
import TodoCard from "./todo-card";
import TodoModal from "./modal";
import { PlusCircle } from "react-feather";
import SearchBar from "./search-bar";
import { alertSuccess } from "src/utils/toast";
import { ITodoItem } from "src/@types/Todo";
import { TodoContext } from "src/context/TodoContext";
import { deleteTodo, updateTodo } from "src/reducer/todo/action";
import apiUrl from "src/config";

const TodoContainer: FC = () => {
  const { state, dispatch } = useContext(TodoContext);

  const [show, setShow] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [todoList, setTodoList] = useState<ITodoItem[] | []>([]);
  const [todoSelected, setTodoSelected] = useState<ITodoItem | null>(null);

  const handleCloseModal = (isChange: boolean) => setShow(false);

  useEffect(() => {
    setTodoList(state.todos);
  }, [state.todos]);

  useEffect(() => {
    if (state.todos && state.todos.length > 0) {
      if (selectedFilter) {
        const filteredTodoList = state.todos.filter(
          (x: ITodoItem) => x.status === selectedFilter
        );

        setTodoList(filteredTodoList);
      } else setTodoList(state.todos);
    }
  }, [selectedFilter]);

  const handleOpenModal = () => setShow(true);

  const handleDelete = async (e: ChangeEvent, id: string) => {
    e.stopPropagation();
    console.log(id);

    const response = await fetch(`${apiUrl}/todos/delete/${id}`, {
      method: "Delete",
    })
      .then((response) => response.json())
      .catch((error) => console.error(error))
      .finally(() => dispatch(deleteTodo(id)));

    alertSuccess({
      message: response.message,
    });
  };

  const handleComplete = async (e: ChangeEvent, id: string) => {
    e.stopPropagation();
    const result = await fetch(`${apiUrl}/todos/updateStatus/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "completed",
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    dispatch(updateTodo(result.todo));

    alertSuccess({
      message: "Completed",
    });
  };

  const handleSearch = (val: string) => {
    if (state.todos && state.todos.length > 0) {
      const filteredTodoList =
        val !== "" && selectedFilter !== ""
          ? state.todos.filter(
              (x: ITodoItem) =>
                x.title.toLowerCase().includes(val.toLowerCase()) &&
                x.status === selectedFilter
            )
          : val === "" && selectedFilter !== ""
            ? state.todos.filter((x: ITodoItem) => x.status === selectedFilter)
            : state.todos;

      setTodoList(filteredTodoList);
    }
  };

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        selectedFilter={selectedFilter}
        setSelectedFilter={(
          e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >
        ) => setSelectedFilter(e.target.value)}
      />
      <StyledWrap>
        {todoList.map((todo) => (
          <TodoCard
            key={todo._id}
            status={todo.status}
            descrtiption={todo.desc}
            title={todo.title}
            color={todo.color}
            onClick={() => {
              handleOpenModal();
              setTodoSelected(todo);
            }}
            onDelete={(e: ChangeEvent) => handleDelete(e, todo._id || "")}
            onComplete={(e: ChangeEvent) => handleComplete(e, todo._id || "")}
          />
        ))}
        <StyledAddTodo className="add-todo" onClick={handleOpenModal}>
          <PlusCircle size={40} />
        </StyledAddTodo>
      </StyledWrap>
      <TodoModal show={show} onClose={handleCloseModal} todo={todoSelected} />
    </>
  );
};

export default TodoContainer;
