import {
  ChangeEvent,
  FC,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, Textarea, ModalTitle, Spinner, Input } from "@todo/ui";
import { X } from "react-feather";
import {
  StyledBody,
  StyledClose,
  StyledColor,
  StyledFooter,
  StyledModal,
  StyledModalHeader,
  StyledWrapColors,
} from "./style";
import { alertSuccess } from "src/utils/toast";
import classNames from "classnames";
import { ITodoItem } from "src/@types/Todo";
import { TodoContext } from "src/context/TodoContext";
import { addTodo, updateTodo } from "src/reducer/todo/action";
import apiUrl from "src/config";
import axios from "axios";

interface IProps {
  onClose: (isChange: boolean) => void;
  show: boolean;
  todo: ITodoItem | null;
}

interface ErrorProps {
  message: string;
}

const defaultColors: string[] = [
  "#00edf1",
  "#d7d7d7",
  "#ffc107",
  "#94b710",
  "rgb(202 147 147)",
  "rgb(215 137 185 / 48%)",
];
const defaultTodo: ITodoItem = {
  color: defaultColors[0],
  desc: "",
  title: "",
  status: "pending",
};
const TodoModal: FC<IProps> = memo(({ show, onClose, todo }) => {
  const { dispatch } = useContext(TodoContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<ITodoItem | null>(defaultTodo);
  const [nameError, setNameError] = useState<ErrorProps>({ message: "" });
  const [descError, setDescError] = useState<ErrorProps>({ message: "" });
  const handleError = (): boolean => {
    setDescError({
      message:
        newTodo?.desc === ""
          ? "Description cannot be empty"
          : newTodo && newTodo?.desc?.length > 1000
            ? "You have excceded maxium charater limit"
            : "",
    });
    setNameError({
      message:
        newTodo?.title === ""
          ? "Name cannot be empty"
          : newTodo && newTodo?.title?.length > 50
            ? "You have excceded maxium charater limit"
            : "",
    });

    if (
      newTodo &&
      (newTodo?.desc === "" ||
        newTodo?.title === "" ||
        newTodo?.title?.length > 50 ||
        newTodo?.desc?.length > 1000)
    ) {
      return false;
    }

    return true;
  };
  const handleConfirmNote = async () => {
    const authorId = localStorage.getItem("authorId");
    if (!authorId) return;

    setLoading(true);
    if (handleError()) {
      if (todo?._id) {
        const result = await axios
          .patch(`${apiUrl}/todos/update/${todo?._id}`, {
            title: newTodo?.title,
            desc: newTodo?.desc,
            color: newTodo?.color,
          })
          .then((response) => response.data)
          .catch((error) => console.error(error));

        dispatch(updateTodo(result.todo));
      } else {
        const result = await axios
          .post(`${apiUrl}/todos/create`, {
            ...{
              title: newTodo?.title || "",
              desc: newTodo?.desc || "",
              color: newTodo?.color || "",
              dueDate: newTodo?.dueDate || undefined,
              status: newTodo?.status || "pending",
            },
            author: authorId,
          })
          .then((response) => response.data)
          .catch((error) => console.error(error));

        dispatch(addTodo(result.todo));
      }

      setTimeout(() => {
        setLoading(false);
        handleClose(true);
        alertSuccess({
          message: `${todo?._id ? "Update" : "Create"} the node successfully`,
        });
      }, 5 * 1000);
    } else setLoading(false);
  };

  const handleClose = (isChange: boolean = false) => {
    setNewTodo(defaultTodo);
    setDescError({ message: "" });
    setNameError({ message: "" });
    onClose(isChange);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (newTodo) setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleChooseColor = (color: string) => {
    setNewTodo((prevState) => ({
      ...(prevState || {}),
      color,
      title: prevState?.title || "",
      desc: prevState?.desc || "",
      dueDate: prevState?.dueDate || undefined,
      status: prevState?.status || "pending",
    }));
  };

  useEffect(() => {
    setNewTodo(todo || defaultTodo);
  }, [todo]);

  const ColorOptions = useMemo(() => {
    return defaultColors.map((color) => (
      <StyledColor
        title="color"
        id="color"
        className="color__input"
        onClick={() => handleChooseColor(color)}
        key={color}
        $color={color}
        $isActive={newTodo?.color !== color}
      />
    ));
  }, [newTodo?.color]);

  return (
    <StyledModal onClose={handleClose} show={show} size="md">
      <StyledModalHeader>
        <ModalTitle>{todo != null ? "Edit Note" : "Create Note"}</ModalTitle>
        <StyledClose onClose={handleClose} disabled={loading}>
          <X size={20} />
        </StyledClose>
      </StyledModalHeader>
      <StyledBody>
        <Input
          type="text"
          name="title"
          id="title"
          className={classNames("name__input", {})}
          placeholder="Title"
          value={newTodo?.title}
          onChange={handleChange}
          showErrorOnly
          disabled={loading}
          feedbackText={nameError.message}
          state={nameError.message !== "" ? "error" : "success"}
          showState={nameError.message !== ""}
        />
        <Textarea
          name="desc"
          id="desc"
          className={classNames("desc__input", {})}
          placeholder="..."
          value={newTodo?.desc}
          onChange={handleChange}
          showErrorOnly
          disabled={loading}
          feedbackText={descError.message}
          state={descError?.message !== "" ? "error" : "success"}
          showState={descError?.message !== ""}
        />
        <StyledWrapColors>{ColorOptions}</StyledWrapColors>
      </StyledBody>
      <StyledFooter className="modal-footer">
        <Button onClick={handleClose} variant="outlined" disabled={loading}>
          Cancel
        </Button>
        <Button
          disabled={
            loading ||
            (todo?.desc === newTodo?.desc &&
              todo?.title === newTodo?.title &&
              todo?.color === newTodo?.color)
          }
          onClick={handleConfirmNote}
          className="btn-confirm"
        >
          {loading ? (
            <span className="loadingIcon">
              <Spinner size="xs" color="white" />
            </span>
          ) : todo != null ? (
            "Confirm"
          ) : (
            "Create"
          )}
        </Button>
      </StyledFooter>
    </StyledModal>
  );
});

export default TodoModal;
