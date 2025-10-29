import "./styles.css";
import { useEffect, useState } from "react";

import api from "../../utils/api";

import BtnPrimary from "../../components/Btn/BtnPrimary";
import TitleClipPages from "../../components/TitleClipPages";
import SelectCustom from "../../components/Select/SelectCustom";
import Erro from "../../components/Message/Erro";
import Download from "../../components/Modal/Download";
import Loading from "../../components/Loading";

import ModalHelp from "../../components/Modal/Help";
import HelpIndicator from "../../components/HelpIndicator";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";

export default function Relatorios() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.step001);

  const [abrirModalDownload, setAbrirModalDownload] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [personalizado, setPersonalizado] = useState({
    categoria: "",
    comunidade: "",
    data: "",
  });

  useEffect(() => {
    const listarCategorias = async () => {
      try {
        setCarregando(true);
        setErros("");
        const resposta = await api.get(
          `/categorias?ordenar_por=nome&ordenar_direcao=asc`
        );
        const dados = resposta.data;
        setCategorias(dados?.dados || []);
      } catch (err) {
        setErros(
          err.response?.data?.message ||
            err.message ||
            "Erro ao buscar categoria."
        );
      } finally {
        setCarregando(false);
      }
    };

    const listarComunidades = async () => {
      try {
        setCarregando(true);
        setErros("");
        const { data } = await api.get(
          `/comunidades?ordenar_por=nome&ordenar_direcao=asc`
        );
        setComunidades(data?.dados || []);
      } catch (err) {
        setErros(
          err.response?.data?.message ||
            err.message ||
            "Erro ao buscar categoria."
        );
      } finally {
        setCarregando(false);
      }
    };

    listarCategorias();
    listarComunidades();
  }, []);

  const lidandoComAlteracoes = (evento) => {
    const { name, value } = evento.target;
    setPersonalizado((personalizadoAnterior) => ({
      ...personalizadoAnterior,
      [name]: value,
    }));
  };

  const trazerRelatorioGeral = async () => {
    try {
      setCarregando(true);
      setErros("");

      const resposta = await api.get(
        `/relatorios/geral?data=${personalizado.data}&categoria=${personalizado.categoria}&comunidade=${personalizado.comunidade}`,
        { responseType: "blob" }
      );

      // Cria URL temporária
      const url = window.URL.createObjectURL(new Blob([resposta.data]));

      // Força download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      if (err.response?.status === 404) {
        setErros("Nenhum dado encontrado para os filtros selecionados.");
      } else {
        setErros(
          err.response?.data?.message ||
            err.message ||
            "Erro ao buscar relatório."
        );
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container-relatorios">
      {erros && <Erro mensagem={"Tivemos um problema, tente novamente ou entre em contato com o suporte."} />}
      {carregando && <Loading />}
      <TitleClipPages title={`Emissão de relatório`} />
      <h2 className="titulo-pagina-relatorios">
        Selecione o tipo de relatório que deseja emitir
      </h2>
      <BtnPrimary
        onClick={() => {
          setAbrirModalDownload(true);
        }}
      >
        <span>Relatório Personalizado</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
        >
          <path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" />
        </svg>
      </BtnPrimary>

      <BtnPrimary
        onClick={() => {
          trazerRelatorioGeral();
        }}
      >
        <span>Relatório Geral</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
        >
          <path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" />
        </svg>
      </BtnPrimary>

      {abrirModalDownload && (
        <Download
          classeAdicional={carregando && "carregando"}
          title="Crie seu relatório personalizado"
          onConfirm={() => {
            trazerRelatorioGeral();
          }}
          onCancel={() => {
            setAbrirModalDownload(false);
          }}
        >
          {carregando && <Loading />}
          {erros && <Erro mensagem={erros} />}
          <div className="container-form-relatorio">
            <SelectCustom
              label="Comunidade"
              name="comunidade"
              value={personalizado.comunidade}
              onChange={(evento) => lidandoComAlteracoes(evento)}
            >
              {comunidades?.map((comunidade) => (
                <option key={comunidade?.id} value={comunidade?.id}>
                  {comunidade?.nome}
                </option>
              ))}
            </SelectCustom>

            <SelectCustom
              label="Categoria"
              name="categoria"
              value={personalizado.categoria}
              onChange={(evento) => lidandoComAlteracoes(evento)}
            >
              {categorias?.map((categoria) => (
                <option key={categoria?.id} value={categoria?.id}>
                  {categoria?.nome}
                </option>
              ))}
            </SelectCustom>

            <SelectCustom
              label="Período"
              name="data"
              value={personalizado.data}
              onChange={(evento) => lidandoComAlteracoes(evento)}
            >
              <option value="ultimo_ano">Último ano</option>
              <option value="ultimo_semestre">Último semestre</option>
              <option value="ultimo_bimestre">Último bimestre</option>
              <option value="ultimo_mes">Último mês</option>
              <option value="duas_semanas">Últimas 2 semanas</option>
              <option value="ultima_semana">Última semana</option>
            </SelectCustom>
          </div>
        </Download>
      )}

      <ModalHelp
        title={helpConfigs.step001.title}
        content={helpConfigs.step001.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />

      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
