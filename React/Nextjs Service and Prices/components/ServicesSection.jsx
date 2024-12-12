"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Serviços",
    id: "servicos",
    content: (
      <ul className="list-disc pl-4 text-lg">
        <li>Sites Personalizados</li>
        <li>Sites Pré-Moldados</li>
        <li>Testes Automatizados</li>
        <li>Atualização de Sites</li>
      </ul>
    ),
  },
  {
    title: "Educação",
    id: "education",
    content: (
      <ul className="list-disc pl-4 text-lg">
        <li>Adaptação de Sites para Celulares</li>
        <li>Aplicações para Celular</li>
        <li>Instalação de Softwares</li>
      </ul>
    ),
  },
  {
    title: "Certificações",
    id: "certifications",
    content: (
      <ul className="list-disc pl-4 text-lg">
        <li>Softwares para Controle</li>
        <li>Softwares de Backup</li>
      </ul>
    ),
  },
  {
    title: "Automações",
    id: "automations",
    content: (
      <ul className="list-disc pl-4 text-lg">
        <li>Automação de Páginas</li>
        <li>Testes Automatizados</li>
        <li>Automação de Emails</li>
        <li>Automação de Postagens</li>
        <li>Chat Bots</li>
      </ul>
    ),
  },
  {
    title: "Consultorias",
    id: "consultorias",
    content: (
      <ul className="list-disc pl-4 text-lg">
        <li>Consultoria de Hardware</li>
        <li>Consultoria de Software</li>
        <li>Consultoria de Automações</li>
        <li>Consultoria de Infraestrutura</li>
        <li>Consultoria de Servidores</li>
      </ul>
    ),
  },
];

const ServicesSection = () => {
  const [tab, setTab] = useState("servicos");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/logos/programador.png"
          width={500}
          height={500}
          alt="Programador Logo"
          className="w-full h-auto"
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">Serviços Prestados</h2>
          <p className="text-base lg:text-lg mb-6">
            Verifique meus serviços disponíveis abaixo, aqui você pode escolher o que mais lhe atrai e ver os valores de cada serviço e pacotes completos, podendo montar uma ordem mais completa e customizada para seus fins pessoais!
          </p>
          <div className="flex flex-wrap justify-start mt-8">
            {TAB_DATA.map((tabItem) => (
              <TabButton
                key={tabItem.id}
                selectTab={() => handleTabChange(tabItem.id)}
                active={tab === tabItem.id}
                className="m-1"
              >
                {tabItem.title}
              </TabButton>
            ))}
          </div>
          <div className="mt-4">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
