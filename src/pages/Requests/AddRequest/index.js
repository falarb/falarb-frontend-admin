import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import api from "../../../utils/api";

import Loading from "../../../components/Loading";
import BtnPrimary from "../../../components/Btn/BtnPrimary";
import BtnSecundary from "../../../components/Btn/BtnSecundary";
import Modal from "../../../components/Modal";
import TitleClipPages from "../../../components/TitleClipPages";
import AutoCompleteCustom from "../../../components/AutoCompleteCustom";
import InputText from "../../../components/Input/InputText";

import ModalHelp from "../../../components/Modal/Help";
import HelpIndicator from "../../../components/HelpIndicator";
import { useHelp } from "../../../hooks/useHelp";
import { helpConfigs } from "../../../utils/helpConfigs";

import "./styles.css";

// Corrige o ícone padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function CadastrarSolicitacao() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(
    helpConfigs.editar_solicitacao
  );

  const [solicitacao, setSolicitacao] = useState({
    status: "analise",
    descricao: "",
    latitude: "",
    longitude: "",
    id_cidadao: "",
    id_categoria: "",
    id_comunidade: "",
  });

  const [cidadaos, setCidadaos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [comunidades, setComunidades] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModalEdit, setAbrirModalEdit] = useState(false);
  const [mostrarModalAlterado, setMostrarModalAlterado] = useState(false);
  const [alterado, setAlterado] = useState(false);

  const [marker, setMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState([-25.6196203, -50.6926748]);
  const [localizacaoPermitida, setLocalizacaoPermitida] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleGeolocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setMarker([latitude, longitude]);
          setSolicitacao((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
        },
        setLocalizacaoPermitida(true),
        (error) => {
          alert("Não foi possível obter sua localização.");
          console.error(error);
          setLocalizacaoPermitida(false);
        }
      );
    } else {
      alert("Seu navegador não suporta geolocalização.");
      setLocalizacaoPermitida(false);
    }
  }, [setSolicitacao]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        setMapCenter([lat, lng]);
        setSolicitacao((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));
      },
    });
    return null;
  };

  const MapCenterUpdater = ({ center }) => {
    const map = useMapEvents({});
    useEffect(() => {
      if (center) {
        map.setView(center);
      }
    }, [center, map]);
    return null;
  };

  useEffect(() => {
    if (!localizacaoPermitida) {
      handleGeolocate();
    }
  }, [localizacaoPermitida, handleGeolocate]);

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      setError(null);

      try {
        const resposta = await api.get(`/categorias`);

        if (resposta.status !== 200) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const { data } = resposta;
        setCategorias(data);
      } catch (erro) {
        setError(erro.message || "Erro desconhecido");
        console.error(erro);
      } finally {
        setLoading(false);
      }
    };

    const fetchComunidades = async () => {
      setLoading(true);
      setError(null);

      try {
        const resposta = await api.get(`/comunidades`);

        if (resposta.status !== 200) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const { data } = resposta;
        setComunidades(data);
      } catch (erro) {
        setError(erro.message || "Erro desconhecido");
        console.error(erro);
      } finally {
        setLoading(false);
      }
    };

    const fetchCidadaos = async () => {
      setLoading(true);
      setError(null);

      try {
        const resposta = await api.get(`/cidadaos`);

        if (resposta.status !== 200) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const { data } = resposta;
        setCidadaos(data);
      } catch (erro) {
        setError(erro.message || "Erro desconhecido");
        console.error(erro);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
    fetchComunidades();
    fetchCidadaos();

    console.log(categorias);
    console.log(comunidades);
    console.log(cidadaos);
  }, []);

  const lidandoComAlteracoes = (evento) => {
    setAlterado(true);
    const { name, value } = evento.target;
    setSolicitacao((prevSolicitacao) => ({
      ...prevSolicitacao,
      [name]: value,
    }));
  };

  const cadastrarSolicitacao = async () => {
    if (!solicitacao) return;

    try {
      setLoading(true);
      setError(null);

      await api.post(`/solicitacoes/`, {
        solicitacao,
      });
      navigate("/administracao/solicitacoes");
      setAlterado(false);
    } catch (erro) {
      setError("Erro ao cadastrar a solicitação.");
      console.error(erro);
    } finally {
      setLoading(false);
    }
  };

  // loading
  if (loading) return <Loading />;

  // erro
  if (error) return <div>Erro: {error}</div>;

  // nenhum dado
  if (!solicitacao) return <div>Nenhuma solicitação encontrada.</div>;

  return (
    <div>
      <TitleClipPages title={`Cadastro de Solicitação`} />

      <div className="nav-tools">
        <BtnSecundary
          adicionalClass="btn-svg"
          onClick={() => {
            if (alterado) {
              setMostrarModalAlterado(true);
            } else {
              navigate(-1);
            }
          }}
          title="Voltar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#344054"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />{" "}
          </svg>
        </BtnSecundary>

        {mostrarModalAlterado && (
          <Modal
            type="warning"
            title="Cadastre suas informações"
            description="Você tem informações não salvas. Tem certeza que deseja sair sem salvar?"
            onConfirm={() => navigate(-1)}
            onCancel={() => setMostrarModalAlterado(false)}
          />
        )}

        {mostrarModalEdit && (
          <Modal
            type="warning"
            title="Cadastrar solicitação"
            description="Você confirma o cadastro essa solicitação?"
            onConfirm={() => cadastrarSolicitacao()}
            onCancel={() => setAbrirModalEdit(false)}
          />
        )}
      </div>

      <div className="grid-inputs-cadastro-solicitacao">
        <InputText
          label="Descrição da solicitação"
          name="descricao"
          required
          placeholder={"Descreva a solicitação"}
          value={solicitacao.descricao}
          onChange={(evento) => {
            lidandoComAlteracoes(evento);
          }}
        />

        <div className="auto-complete-cadastro-solicitacoes">
          <AutoCompleteCustom
            name="id_cidadao"
            options={cidadaos?.dados}
            onChange={lidandoComAlteracoes}
            label="Selecione o cidadão que realiza a solicitação "
            required
            title="Seleção da o cidadão"
          />
        </div>

        <div className="auto-complete-cadastro-solicitacoes">
          <AutoCompleteCustom
            name="id_categoria"
            options={categorias?.dados}
            onChange={lidandoComAlteracoes}
            label="Selecione a categoria da solicitação"
            required
            title="Seleção da categoria para a solicitação"
          />
        </div>

        <div className="auto-complete-cadastro-solicitacoes">
          <AutoCompleteCustom
            name="id_comunidade"
            options={comunidades?.dados}
            onChange={lidandoComAlteracoes}
            label="Selecione a comunidade referente a solicitação"
            required
            title="Seleção da comunidade para a solicitação"
          />
        </div>

        <div className="container-map-cadastro-solicitacao">
          <label className="label-map-cadastro-solicitacao">
            Selecione no mapa o local referente a solicitação <span>*</span>
          </label>
          <div
            className="map-wrapper"
            style={{ height: "400px", borderRadius: "30px" }}
          >
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution=""
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapCenterUpdater center={mapCenter} />
              <MapClickHandler />
              {marker && <Marker position={marker} />}
            </MapContainer>
          </div>
        </div>
      </div>
      <BtnPrimary
          title="Clique para cadastrar solicitação"
          onClick={() => {
            setAbrirModalEdit(true);
          }}
        >
          Cadastrar solicitação
        </BtnPrimary>


      <ModalHelp
        title={helpConfigs.editar_solicitacao.title}
        content={helpConfigs.editar_solicitacao.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />
      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
