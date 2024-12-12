"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2 text-white skills-list">
        <li>Desenvolvimento Frontend (React, Next.js, HTML, CSS, JavaScript)</li>
        <li>Desenvolvimento Backend (Node.js, Express, API REST)</li>
        <li>Desenvolvimento Mobile (React Native)</li>
        <li>Banco de Dados (MySQL, MongoDB)</li>
        <li>Automação de Processos</li>
        <li>Infraestrutura Básica e Suporte (Instalações, Configurações)</li>
        <li>Desenvolvimento de Softwares Personalizados</li>
        <li>Unity (Desenvolvimento de Aplicações e Jogos)</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isVisible, setIsVisible] = useState(false); // Controla se a seção está visível na tela
  const [isItemVisible, setIsItemVisible] = useState(false); // Controla a animação dos itens

  // Ao carregar o componente, faz a animação de visibilidade
  useEffect(() => {
    // Ativa a visibilidade da seção assim que o componente for montado
    setIsVisible(true);

    // Ativar a animação dos itens após a seção ficar visível
    setTimeout(() => {
      setIsItemVisible(true); // Ativar a visibilidade dos itens
    }, 500); // Delay para a animação dos itens
  }, []);

  return (
    <section
      id="about"
      className={`text-white transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.jpeg" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">Quem Sou</h2>
          <p className="text-base lg:text-lg text-white">
            Sou um desenvolvedor de software com experiência em frontend, backend, mobile e automação de processos. Ao longo da minha jornada profissional, passei por empresas que me ajudaram a desenvolver minhas habilidades e enfrentar novos desafios.
          </p>
          <br />
          <p className="text-base lg:text-lg text-white">
            Vamos trabalhar juntos para transformar suas ideias em soluções inovadoras, seja para o desenvolvimento de sites, aplicativos, softwares personalizados ou automação de processos.
          </p>
          <div className="mt-8">
            {/* Aqui os itens da lista só ficam visíveis se isItemVisible for verdadeiro */}
            <ul className="list-disc pl-2 text-white">
              {TAB_DATA.find((t) => t.id === tab).content.props.children.map((item, index) => (
                <li
                  key={index}
                  className={`${
                    isItemVisible
                      ? "opacity-100 translate-x-0" // Quando visível, anima de volta à posição normal
                      : "opacity-0 translate-x-10" // Quando não visível, fica fora da tela
                  } transition-all duration-500 ease-out`}
                  style={{ transitionDelay: `${index * 100}ms` }} // Delay para animar um item por vez
                >
                  {item.props.children}
                </li>
              ))}
            </ul>
          </div>
          <h3 className="text-2xl font-bold text-white mt-8">Linha do Tempo</h3>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
