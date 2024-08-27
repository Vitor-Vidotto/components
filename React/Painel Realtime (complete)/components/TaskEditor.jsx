import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Radio,
  RadioGroup,
  Textarea,
  Input,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { toggleTodoStatus, updateTodo } from "../api/todo"; // Importe a função de atualização

const TaskEditor = ({ isOpen, onClose, task, onUpdateTask }) => {
  const toast = useToast();
  const [editedTask, setEditedTask] = useState({ ...task });
  const [color, setColor] = useState(task.color || "blue"); // Defina a cor inicial a partir dos dados da tarefa ou 'blue' como padrão

  const handleStatusToggle = async () => {
    const newStatus = editedTask.status === "completed" ? "pending" : "completed";
    try {
      await toggleTodoStatus({ docId: task.id, status: newStatus });
      toast({
        title: `Task marked ${newStatus}`,
        status: newStatus === "completed" ? "success" : "warning",
      });
      setEditedTask({ ...editedTask, status: newStatus });
      onUpdateTask({ ...editedTask, status: newStatus });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Adicione a atualização da cor ao objeto editedTask
      const updatedTask = { ...editedTask, color };

      // Use a função de atualização para atualizar os dados no Firebase
      await updateTodo(task.id, updatedTask);
      toast({
        title: "Task updated successfully",
        status: "success",
      });
      onUpdateTask(updatedTask); // Atualiza a tarefa no estado local
      onClose(); // Fecha o modal após salvar as alterações
    } catch (error) {
      console.error(error);
      toast({
        title: "Error updating task",
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
        <Stack direction="column">
          <Input
            placeholder="Titulo"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <Textarea
            placeholder="Descrição"
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <Select
            value={editedTask.status}
            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
          >
            <option value="Não Lançado">Não Lançado</option>
            <option value="Encerrado">Encerrado</option>
            <option value="Suspenso">Suspenso </option>
            <option value="Revogado">Revogado </option>
            <option value="Homologação">Homologação </option>
          </Select>
          <Input
            placeholder="Cidade Exibida"
            value={editedTask.city}
            onChange={(e) => setEditedTask({ ...editedTask, city: e.target.value })}
          />
          <Input
            placeholder="Compania Exibida"
            value={editedTask.company}
            onChange={(e) => setEditedTask({ ...editedTask, company: e.target.value })}
          />
         <Input
  type="date" // Set the input type to date
  placeholder="Data"
  value={editedTask.displayDate}
  onChange={(e) => setEditedTask({ ...editedTask, displayDate: e.target.value })}
/>

<Input
  type="text" // Set the input type to date
  placeholder="Data de Realização Exibida"
  value={editedTask.executionDate}
  onChange={(e) => setEditedTask({ ...editedTask, executionDate: e.target.value })}
/>
           <Input
            placeholder="Observação"
            value={editedTask.observation}
            onChange={(e) => setEditedTask({ ...editedTask, observation: e.target.value })}
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
          <Button variant="ghost" onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="teal" onClick={handleSaveChanges}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskEditor;
