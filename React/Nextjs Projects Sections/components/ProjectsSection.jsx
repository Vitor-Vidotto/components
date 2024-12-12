"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Aplicativo de listagem de filmes",
    description: "Uma aplicação onde o usuário pode ver os filmes disponíveis e ler a descrição.",
    image: "/images/projects/1.png",
    tag: ["Todos", "Celular"],
    gitUrl: "https://github.com/Vitor-Vidotto/FavMovies",
    previewUrl: "https://github.com/Vitor-Vidotto/FavMovies",
  },
  {
    id: 2,
    title: "App de Controle C#",
    description: " Desenvolvi um projeto em c# onde o mesmo serve para monitorar e enviar arquivos via FTP, fazendo que os mesmos sirvam de backup para a maquina e que sirva também para controle e geração de logs.",
    image: "/images/projects/2.png",
    tag: ["Todos", "Desktop"],
    gitUrl: "https://github.com/Vitor-Vidotto",
    previewUrl: "https://github.com/Vitor-Vidotto",
  },
  {
    id: 3,
    title: "Portifólio Digital",
    description: "Meu primeiro portifólio digital feito em angular para estudo e uso próprio",
    image: "/images/projects/3.png",
    tag: ["Todos", "Web"],
    gitUrl: "https://github.com/Vitor-Vidotto/Portifolio",
    previewUrl: "https://vitor-vidotto.github.io/Portifolio/",
  },
  {
    id: 4,
    title: "Protótipo de site empresarial",
    description: "Uma aplicação desenvolvida para um restaurante, para que os clientes tenham a opção de pedir online",
    image: "/images/projects/4.png",
    tag: ["Todos", "Web"],
    gitUrl: "https://github.com/AutomatizaLabs/AutomatizaLabs",
    previewUrl: "https://github.com/AutomatizaLabs/AutomatizaLabs",
  },
  {
    id: 5,
    title: "Automações em Python",
    description: "Desenvolvi automações para processos de empresas em python",
    image: "/images/projects/6.png",
    tag: ["Todos", "Desktop"],
    gitUrl: "https://github.com/Vitor-Vidotto/python-automations",
    previewUrl: "https://github.com/Vitor-Vidotto/python-automations",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("Todos");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="px-4">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-whiten mt-4 mb-8 md:mb-12">
        Meus Projetos
      </h2>
      <div className="text-white flex flex-wrap justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="Todos"
          isSelected={tag === "Todos"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Celular"
          isSelected={tag === "Celular"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Desktop"
          isSelected={tag === "Desktop"}
        />
      </div>
      <ul
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
      >
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;