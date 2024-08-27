import { Container, Flex, Box } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import TodoListedit from "../components/TodolistEditor";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

import styles from "./index.module.css"; // Importe o arquivo CSS que você deseja usar

export default function Home() {
  const { user } = useAuth();
  const [isAuthVisible, setIsAuthVisible] = useState(!user);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!user && event.key === "k") {
        setIsAuthVisible((prev) => !prev);
        setIsZoomed((prev) => !prev);

        // Adicione ou remova a classe 'zoomed' do corpo da página
        if (!document.body.classList.contains('zoomed')) {
          document.body.classList.add('zoomed');
        } else {
          document.body.classList.remove('zoomed');
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user]);

  useEffect(() => {
    // Adicione estilos diretamente ao elemento html para ocultar a barra de rolagem
    if (isZoomed) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isZoomed]);

  return (
    <Flex
      justify="center"
      align="center"
      display="flex"
      flexDirection="column"
      minH="100vh"
      justifyContent="start"
      maxWidth="100%"
      className={isZoomed ? styles.zoomed : ""}
    >
      <Container maxW="7xl" display="flex"
      flexDirection="column">
        {isAuthVisible && <Auth />}
        {user && <AddTodo />}
        {user && <TodoListedit />}
        {!user && (
           <Box 
           display="flex"
           maxW="7xl"
           flexDirection="column"
           minH="100vh"
           justifyContent="center" textAlign="center">
                 <TodoList/>
               </Box>
        )}
      </Container>
    </Flex>
  );
}
