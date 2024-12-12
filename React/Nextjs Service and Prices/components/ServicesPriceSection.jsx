"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const servicesData = [

  {
    id: 1,
    title: "Sites Personalizados",
    description: "Desenvolvimento de sites exclusivos, adaptados às necessidades específicas de cada cliente.",
    image: "/images/servicos/site.customizado.png",
    tag: ["Todos", "Web"],
    whatsappUrl: "https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20um%20Site%20Personalizado.",
  },

  {
    id: 2,
    title: "Sites Pre-Moldados",
    description: "Sites criados com modelos pré-definidos para uma solução rápida e acessível.",
    image: "/images/servicos/site.premoldado.png",
    tag: ["Todos", "Web"],
    whatsappUrl: "https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20um%20Site%20Pre-Moldado.",
  },

  {
    id: 3,
    title: "Automação",
    description: "Automação de testes ou serviços.",
    image: "/images/servicos/automacao.png",
    tag: ["Todos", "Software", "Automações"],
    whatsappUrl: "https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20Testes%20ou%20Serviços%20Automatizados.",
  },

  {
    id: 4,
    title: "Atualização de Sites",
    description: "Manutenção e atualização de sites para garantir a relevância e desempenho contínuo.",
    image: "/images/servicos/web.update.png",
    tag: ["Todos", "Web"],
    whatsappUrl: "https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20Atualiza%C3%A7%C3%A3o%20de%20Sites.",
  },

  {
    id: 5,
    title: "Adaptação de Sites para Celulares",
    description: "Otimização de sites para uma navegação perfeita em dispositivos móveis.",
    image: "/images/servicos/conversao.png",
    tag: ["Todos", "Celular"],
    whatsappUrl: "https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20Adapta%C3%A7%C3%A3o%20de%20Sites%20para%20Celulares.",
  },

  {
    id: 6,
    title: "Aplicações para Celular",
    description: "Desenvolvimento de aplicativos para dispositivos móveis, com foco em usabilidade e performance.",
    image: "/images/servicos/celular.png",
    tag: ["Todos", "Celular"],
    whatsappUrl: "https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20Aplica%C3%A7%C3%B5es%20para%20Celular.",
  },

  {
    id: 7,
    title: "Sistemas de Backup",
    description: "Soluções de backup seguras e confiáveis para proteger dados críticos.",
    image: "/images/servicos/backup.png",
    tag: ["Todos", "Software"],
    whatsappUrl: "https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20Solu%C3%A7%C3%B5es%20de%20Backup.",
  },

  {
    id: 8,
    title: "Automação de Emails",
    description: "Configuração de automações para envios de emails de forma eficiente e programada.",
    image: "/images/servicos/automacao.email.png",
    tag: ["Todos", "Automações"],
    whatsappUrl: "https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20Automatizar%20Emails.",
  },

  {
    id: 9,
    title: "Automação de Postagens",
    description: "Automação de postagens em redes sociais, facilitando o gerenciamento de conteúdo.",
    image: "/images/servicos/Automacao.redes.png",
    tag: ["Todos", "Automações"],
    whatsappUrl: "https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20Automatizar%20Postagens.",
  },

  {
    id: 10,
    title: "Consultoria de Software / Hardware",
    description: "Consultoria especializada para soluções de software personalizadas e eficazes.",
    image: "/images/servicos/consultoria.png",
    tag: ["Todos", "Consultoria", "Software"],
    whatsappUrl: "https://wa.me/5515992609453?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20Consultoria%20de%20TI.",
  },

];


const ServicesPriceSection = () => {
  const [tag, setTag] = useState("Todos");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = servicesData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        Serviços
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
          name="Software"
          isSelected={tag === "Software"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Automações"
          isSelected={tag === "Automações"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
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
              isContact={true}
              imgUrl={project.image}
              whatsappUrl={project.whatsappUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesPriceSection;
