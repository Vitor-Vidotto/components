import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useToast,
  Input,
  TableContainer,
} from "@chakra-ui/react";
import styles from "./TodolistEditor.module.css"
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash, FaEdit } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";
import TaskEditor from "./TaskEditor";
import ReactPaginate from "react-paginate";

const TodoListedit = () => {
  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useAuth();
  const toast = useToast();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const todosPerPage = 12;

  const [filteredTodos, setFilteredTodos] = useState([]);

  const refreshData = () => {
    const q = query(collection(db, "todo"));
    onSnapshot(q, (querySnapshot) => {
      let ar = [];
      querySnapshot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
      setFilteredTodos(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filtered = todos.filter((todo) => {
      return (
        todo.title.toLowerCase().includes(searchText) ||
        todo.displayDate.includes(searchText) ||
        todo.executionDate.includes(searchText)
      );
    });

    setFilteredTodos(filtered);
    setSearchText(event.target.value);
  };

  const pageCount = Math.ceil(filteredTodos.length / todosPerPage);

  const getPaginatedData = () => {
    const offset = pageNumber * todosPerPage;
    return filteredTodos.slice(offset, offset + todosPerPage);
  };

  const handleTodoDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar?")) {
      deleteTodo(id);
      toast({ title: "Deletado com Sucesso!", status: "success" });
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
    toast({
      title: `Todo marked ${newStatus}`,
      status: newStatus === "completed" ? "success" : "warning",
    });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCloseEditor = () => {
    setEditingTask(null);
  };

  const handleUpdateTask = (updatedTask) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === updatedTask.id) {
          return updatedTask;
        }
        return todo;
      });
    });
  };

  const getColorForTodo = (color) => {
    switch (color) {
      case "blue":
        return "#4299E1";
      case "red":
        return "#FC8181";
      case "yellow":
        return "#F2C02B";
      case "purple":
        return "#9F7AEA";
      case "green":
        return "#68D391";
      case "white":
        return "#C0C0C0";
      default:
        return "#CBD5E0";
    }
  };

  const getDarkerColorForTodo = (color) => {
    switch (color) {
      case "blue":
        return "#256FAC";
      case "red":
        return "#D14D4D";
      case "yellow":
        return "#F39D36";
      case "purple":
        return "#7A5CC7";
      case "green":
        return "#4BAA7D";
      case "white":
        return "#A0A0A0";
      default:
        return "#9CAAC4";
    }
  };

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };

  return (
    <Box  display="flex" flexDirection="column" width="100%">
      <Input
      width="50%"
        placeholder="Buscar"
        value={searchText}
        onChange={handleSearch}
        mb={4}
        position={"relative"} 
        justifyContent="start"
        display="flex"
      />
    <Box
    mt={5} display="relative" flexDirection="column"
    justifyContent="start" maxWidth="100%"
    >
      <TableContainer display="flex"
  flexDirection="column"
  alignContent="center"
  width="100%"
  overflowX="auto" >
      <Table  variant="simple">
        <Thead >
          <Tr>
            <Th>Tarefa</Th>
            <Th>Descrição</Th>
            <Th>Cidade</Th>
            <Th>Empresa</Th>
            <Th>Data de Exibição</Th>
            <Th>Data de Realização</Th>
            <Th>Status</Th>
            <Th>Observação</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody
        >
          {getPaginatedData().map((todo) => (
            <Tr bg={getColorForTodo(todo.color)} key={todo.id}>
              <Td>{todo.title}</Td>
              <Td>{todo.description}</Td>
              <Td>{todo.city}</Td>
              <Td>{todo.company}</Td>
              <Td>{todo.displayDate}</Td>
              <Td>{todo.executionDate}</Td>
              <Td>{todo.status}</Td>
              <Td>{todo.observation}</Td>
              <Td alignItems="center">
                <Box display="flex">

                <Badge
                  color="red.900"
                  transition="0.2s"
                  _hover={{
                    bg: "red",
                    transform: "scale(1.2)",
                  }}
                  cursor="pointer"
                  onClick={() => user && handleTodoDelete(todo.id)}
                >
                  {user && <FaTrash />}
                </Badge>
                <Badge
                  float="right"
                  opacity="0.8"
                  bg={"green"}
                  ml={2}
                  transition="0.2s"
                  _hover={{
                    transform: "scale(1.2)",
                  }}
                  cursor="pointer"
                  onClick={() => handleEditTask(todo)}
                >
                  <FaEdit />
                </Badge>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </TableContainer>
      </Box>
      {editingTask && (
        <TaskEditor
        isOpen={!!editingTask}
          onClose={handleCloseEditor}
          task={editingTask}
          onUpdateTask={handleUpdateTask}
          />
      )}
      {pageCount > 1 && (
        <ReactPaginate
  pageCount={pageCount}
  pageRangeDisplayed={5}
  marginPagesDisplayed={6}
  previousLabel={"Anterior"}
  nextLabel={"Próxima"}
  breakLabel={"..."}
  onPageChange={handlePageClick}
  containerClassName={styles.pagination}
  activeClassName={styles.active}
  previousClassName={styles.pagination_previous}
  nextClassName={styles.pagination_next}
  breakClassName={styles.pagination_break}
  pageClassName={styles.pagination_page}
  pageLinkClassName={styles.pagination_link}
/>

      )}
    </Box>
  );
};

export default TodoListedit;
