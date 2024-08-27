import React from "react";
import Image from "next/image";
import certificado from "../../../public/certificado.png";
import BIM from "../../../public/modelagem bim.jpg";
import Estrutural from "../../../public/projeto estrutural.png";

const Grid = () => {
  return (
        <div style={{marginTop:"100px"}} className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="service flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden p-4">
              <Image
                src={Estrutural}
                alt="Projeto Estrutural"
              />
              <h2 className="text-xl font-semibold mb-2">Projeto Estrutural</h2>
              <p className="text-gray-600 text-center">
                Com uma equipe formada por especialistas, a Aliança Engenharia atua no segmento de projetos estruturais em concreto armado e alvenaria estrutural, oferecendo soluções inovadoras e especiais para sistemas construtivos de todo o Brasil.
              </p>
            </div>
        
            
            <div className="service flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden p-4">
              <Image
                src={certificado}
                alt="Certificado de Qualidade"
 
              />
              <h2 className="text-xl font-semibold mb-2">Certificado de Qualidade</h2>
              <p className="text-gray-600 text-center">
                Nossos engenheiros estão preparados para avaliar seu projeto conforme a NBR 6118 visando certificar que o dimensionamento e detalhamento da estrutura estão corretos.
              </p>
            </div>
            
            <div className="service flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden p-4">
              <Image
                src={BIM}
                alt="Modelagem BIM"

              />
              <h2 className="text-xl font-semibold mb-2">Modelagem BIM</h2>
              <p className="text-gray-600 text-center">
                Os projetos são desenvolvidos em softwares que permitem a exportação do arquivo na extensão IFC, que pode ser utilizado posteriormente em outros softwares para compatibilização com demais disciplinas modeladas em BIM.
              </p>
            </div>
          </div>
          </div>
  );
};

export default Grid;
