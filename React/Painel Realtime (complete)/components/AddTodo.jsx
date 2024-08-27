import React, { useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Stack,
  RadioGroup,
  Radio,
  Select,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "../api/todo";

const AddTodo = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a exibição do modal
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Não Lançado");
  const [city, setCity] = useState(""); // Novo campo: Cidade
  const [company, setCompany] = useState(""); // Novo campo: Empresa
  const [displayDate, setDisplayDate] = useState(""); // Novo campo: Data de Exibição
  const [executionDate, setExecutionDate] = useState(""); // Novo campo: Data de Realização
  const [observation, setObservation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("blue");

  const toast = useToast();
  const { isLoggedIn, user } = useAuth();

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a todo",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    const todo = {
      title,
      description,
      status,
      userId: user.uid,
      city,
      company,
      displayDate,
      executionDate,
      observation,
      color,
    };

    try {
      // Chame a função addTodo para adicionar a tarefa ao Firebase
      await addTodo(todo);

      setIsOpen(false); // Fecha o modal após a criação da tarefa
      setTitle("");
      setDescription("");
      setStatus("Não Lançado");
      setCity("");
      setCompany("");
      setDisplayDate("");
      setExecutionDate("");
      setObservation("");
      setColor("blue");

      toast({ title: "Todo created successfully", status: "success" });
    } catch (error) {
      console.error(error);
      toast({ title: "Error creating todo", status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box mt={5}>
      <Button onClick={() => setIsOpen(true)} variantColor="teal" mb={3}
      position={"relative"} top="5%" 
      
      >
        Criar Painel
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Painel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Formulário existente */}
            <Stack direction="column">
              <Input
                placeholder="Titulo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value={"Não Lançado"} style={{ color: "white", fontWeight: "bold" }}>
                  Não Lançado
                </option>
                <option value={"Encerrado"} style={{ color: "white", fontWeight: "bold" }}>
                  Encerrado
                </option><option value={"Suspenso"} style={{ color: "white", fontWeight: "bold" }}>
                  Suspenso
                </option>
                <option value={"Revogado"} style={{ color: "white", fontWeight: "bold" }}>
                 Revogado
                </option>
                <option value={"Homologação"} style={{ color: "white", fontWeight: "bold" }}>
                 Homologação
                </option>

              </Select>

              {/* Novos campos adicionais */}
              <Input
              maxLength={32}
                placeholder="Cidade Exibida"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
              maxLength={12}
                placeholder="Compania Exibida"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <Input
  type="date" // Set the input type to date
  placeholder="Data"
  value={displayDate}
  onChange={(e) => setDisplayDate(e.target.value)}
/>

<Input
  type="text" // Set the input type to date
  placeholder="Data de Realização Exibida"
  value={executionDate}
  onChange={(e) => setExecutionDate(e.target.value)}
/>
                <Input
                placeholder="Observação"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />
              <RadioGroup value={color} onChange={(e) => setColor(e)}>
                <Stack direction="row">
                  <Radio value="blue" colorScheme="blue">
                    Azul
                  </Radio>
                  <Radio value="red" colorScheme="red">
                    Vermelho
                  </Radio>
                  <Radio value="yellow" colorScheme="yellow">
                    Amarelo
                  </Radio>
                  <Radio value="green" colorScheme="green">
                    Verde
                  </Radio>
                  <Radio value="white" colorScheme="white">
                Cinza
              </Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleTodoCreate()}
              disabled={title.length < 1 || description.length < 1 || isLoading}
              variantColor="teal"
              variant="solid"
            >
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddTodo;
