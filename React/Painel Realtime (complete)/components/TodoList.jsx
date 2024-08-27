import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";
import useAuth from "../hooks/useAuth";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useAuth();
  const toast = useToast();

  const refreshData = () => {
    const q = query(collection(db, "todo"));
    onSnapshot(q, (querySnapshot) => {
      let todoArray = [];
      querySnapshot.docs.forEach((doc) => {
        todoArray.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todoArray);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const NrColuna = 4;
  const NrLinha = 3;

  const limit = NrColuna * NrLinha;

  useEffect(() => {
    const id = setInterval(() => {
      setTodos((prevTodos) => {
        const newTodos = [...prevTodos];
        const removedItems = newTodos.splice(0, NrColuna);
        newTodos.push(...removedItems);
        return newTodos;
      });
    }, 30000); // tempo para atualizar

    return () => {
      clearInterval(id);
    };
  }, []);

  const startIndex = currentPage * limit;
  const endIndex = startIndex + limit;

  // Data atual
  const currentDate = new Date();

  // Filtrar os todos com datas de até 15 dias no futuro
  const filteredTodos = todos.filter((todo) => {
    const displayDate = new Date(todo.displayDate);
    const timeDifference = displayDate - currentDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference >= -15 && daysDifference <= 15;
  });

  const visibleTodos = filteredTodos.slice(startIndex, endIndex);

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

  const getColorForTodo = (color) => {
    switch (color) {
      case "blue":
        return "#0191C8";
      case "red":
        return "#F4837D";
      case "yellow":
        return "#F2C02B";
      case "purple":
        return "#9F7AEA";
      case "green":
        return "#26A137";
      case "white":
        return "#C0C0C0";
      default:
        return "#CBD5E0";
    }
  };
  
  const getDarkerColorForTodo = (color) => {
    switch (color) {
      case "blue":
        return "#005B9A";
      case "red":
        return "#EB4960";
      case "yellow":
        return "#F39D36";
      case "purple":
        return "#7A5CC7";
      case "green":
        return "#12511A";
      case "white":
        return "#A0A0A0";
      default:
        return "#9CAAC4";
    }
  };

  return (
    <Box mt={5} display="flex" flexDirection="column" position="relative">
      <SimpleGrid columns={{ base: 1, md: NrColuna }} rows={NrLinha} spacing={8}>
        {visibleTodos.map((todo) => (
          <Box
          width="100%"
          background={getDarkerColorForTodo(todo.color)}
           filter='auto' brightness='90%'
           height="=40%"
            _hover={{ boxShadow: "sm" }}
            shadow="dark-lg"
            transition="0.2s"
            display="flex"
            flexDirection="column"
          >
          <Box
          p={2}
            boxShadow="2xl"
            background={getColorForTodo(todo.color)}
            shadow="lg"
            key={todo.id}
            display="flex"
            position="relative"
          >
            <Heading
           textOverflow="ellipsis"
           display="flex"
           flexDirection="column"
           alignItems="start"
           width="full"
           fontSize={"1.5em"} // Você pode ajustar este valor para o tamanho máximo desejado
           maxW="100%" // Define a largura máxima como 100% do contêiner
          >
           {todo.city}{" "}
            <Text width="full" display="flex" padding={1} fontSize={16}>{todo.company}</Text>
              <Badge
                color="red.500"
                bg="inherit"
                transition="0.2s"
                _hover={{
                  bg: "inherit",
                  transform: "scale(1.2)",
                }}
                float="right"
                size="xs"
                onClick={() => user && handleTodoDelete(todo.id)}
              >
                {user && <FaTrash />}
              </Badge>
              <Badge
                color={todo.status === "pending" ? "gray.500" : "green.500"}
                bg="inherit"
                transition="0.2s"
                _hover={{
                  bg: "inherit",
                  transform: "scale(1.2)",
                }}
                float="right"
                size="xs"
                onClick={() => user && handleToggle(todo.id, todo.status)}
              >
                {user && (todo.status === "pending" ? <FaToggleOff /> : <FaToggleOn />)}
              </Badge>
            </Heading>
            {/* Novos campos */}
          </Box>
          <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          padding={2}
          >
          <Text p={1}><strong> {todo.executionDate} - {todo.status}</strong></Text>
          <Text><strong></strong> {todo.observation}</Text>
          </Box>
            </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TodoList;
