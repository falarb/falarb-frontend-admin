import Solicitacoes from "../pages/Requests";

export const helpConfigs = {
  dashboard: {
    title: "Dashboard",
    content: (
      <div>
        <p>
          <strong>Bem-vindo ao Painel de Solicitações!</strong>
        </p>
        <p>
          Esta é a tela principal de acompanhamento do sistema, onde você pode
          visualizar um resumo completo das solicitações realizadas.
        </p>
        <ul>
          <li>
            <strong>Ver o total de solicitações:</strong> Mostra quantas
            demandas foram registradas no sistema.
          </li>
          <li>
            <strong>Acompanhar o andamento:</strong> Exibe a quantidade e o
            percentual de solicitações <em>concluídas</em>, <em>agendadas</em>,{" "}
            <em>em análise</em> e <em>indeferidas</em>.
          </li>
          <li>
            <strong>Filtrar por período:</strong> Permite selecionar o intervalo
            de tempo para análise dos dados.
          </li>
          <li>
            <strong>Visualizar gráficos:</strong>
            <ul>
              <li>
                O <strong>gráfico de pizza</strong> mostra a distribuição das
                solicitações por <em>status</em>.
              </li>
              <li>
                O <strong>gráfico de barras</strong> apresenta a quantidade de
                solicitações por <em>categoria</em> (ex: pedidos de manutenção,
                cascalhamento etc.).
              </li>
            </ul>
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Utilize o filtro de <strong>período</strong> para ajustar a
            visualização dos dados conforme o intervalo desejado.
          </li>
          <li>
            Analise os <strong>indicadores superiores</strong> para ter uma
            visão geral do progresso das solicitações.
          </li>
          <li>
            Explore os <strong>gráficos</strong> para entender melhor a
            distribuição e os tipos de pedidos realizados.
          </li>
        </ul>
      </div>
    ),
  },

  solicitacoes: {
    title: "Listagem de solicitações",
    content: (
      <div>
        <p>
          <strong>Listagem de Solicitações</strong>
        </p>
        <p>
          Esta tela exibe todas as solicitações registradas no sistema,
          permitindo que você visualize, filtre e acompanhe o andamento de cada
          uma.
        </p>
        <ul>
          <li>
            <strong>Filtros de busca:</strong> Permitem refinar a visualização
            das solicitações por <em>Status</em>, <em>Tipo de pedido</em>,{" "}
            <em>Comunidade</em> ou pesquisa direta por nome do cidadão ou tipo
            de solicitação.
          </li>
          <li>
            <strong>Tabela de solicitações:</strong> Apresenta as informações
            principais de cada pedido, incluindo:
            <ul>
              <li>
                <strong>Data de criação</strong> — Quando a solicitação foi
                registrada.
              </li>
              <li>
                <strong>Cidadão</strong> — Nome de quem realizou o pedido.
              </li>
              <li>
                <strong>Tipo de pedido</strong> — Categoria da solicitação (ex:
                manutenção de estrada, cascalhamento etc.).
              </li>
              <li>
                <strong>Comunidade</strong> — Localidade relacionada à
                solicitação.
              </li>
              <li>
                <strong>Status</strong> — Situação atual da solicitação (ex:{" "}
                <em>Em análise</em>, <em>Agendada</em>, <em>Concluída</em>).
              </li>
            </ul>
          </li>
          <li>
            <strong>Ações disponíveis:</strong> Ícones à direita permitem{" "}
            <em>visualizar detalhes</em> da solicitação ou{" "}
            <em>editar informações</em> (quando permitido).
          </li>
          <li>
            <strong>Paginação:</strong> Exibe o número da página atual e permite
            navegar entre as páginas de resultados, quando houver muitas
            solicitações.
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Utilize os <strong>filtros superiores</strong> para localizar
            rapidamente solicitações específicas.
          </li>
          <li>
            Clique no ícone de <strong>olho</strong> para visualizar detalhes
            completos da solicitação.
          </li>
          <li>
            Use o ícone de <strong>lápis</strong> para editar informações, se
            tiver permissão.
          </li>
          <li>
            Verifique o <strong>status</strong> para acompanhar o andamento de
            cada pedido.
          </li>
        </ul>
      </div>
    ),
  },

  step001: {
    title: "Listagem de solicitações",
    content: <div></div>,
  },

  detalhes_solicitacao: {
    title: "Detalhes da solicitação",
    content: (
      <div>
        <p>
          <strong>Detalhes da Solicitação</strong>
        </p>
        <p>
          Esta tela exibe todas as informações completas de uma solicitação
          específica, permitindo acompanhar seu status, visualizar dados do
          solicitante e acessar ações relacionadas.
        </p>
        <ul>
          <li>
            <strong>Código da solicitação:</strong> Identificador único (ex:{" "}
            <em>RYC511</em>) utilizado para acompanhamento.
          </li>
          <li>
            <strong>Status atual:</strong> Indica em qual etapa a solicitação se
            encontra (ex: <em>Em análise</em>, <em>Agendada</em>,{" "}
            <em>Concluída</em>).
          </li>
          <li>
            <strong>Data de criação:</strong> Mostra o dia e hora em que a
            solicitação foi registrada.
          </li>
          <li>
            <strong>Dados do solicitante:</strong> Exibe informações como:
            <ul>
              <li>
                <strong>Nome:</strong> Cidadão responsável pela solicitação.
              </li>
              <li>
                <strong>CPF:</strong> Documento cadastrado no sistema.
              </li>
              <li>
                <strong>Email:</strong> Endereço eletrônico do solicitante.
              </li>
              <li>
                <strong>Celular:</strong> Contato telefônico para comunicação.
              </li>
            </ul>
          </li>
          <li>
            <strong>Comunidade:</strong> Local ou bairro relacionado à
            solicitação.
          </li>
          <li>
            <strong>Descrição da solicitação:</strong> Campo onde o cidadão
            detalha o pedido realizado.
          </li>
          <li>
            <strong>Ações disponíveis:</strong> Botões superiores permitem:
            <ul>
              <li>
                <strong>Voltar</strong> — Retorna à listagem de solicitações.
              </li>
              <li>
                <strong>Baixar</strong> — Gera um documento com os detalhes da
                solicitação.
              </li>
              <li>
                <strong>Visualizar no mapa</strong> — Exibe a localização
                associada (quando disponível).
              </li>
              <li>
                <strong>Editar</strong> — Permite alterar informações da
                solicitação, caso tenha permissão.
              </li>
            </ul>
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Consulte o <strong>status atual</strong> para verificar o andamento
            da sua solicitação.
          </li>
          <li>
            Utilize o botão <strong>Baixar</strong> para gerar um registro da
            solicitação.
          </li>
          <li>
            Use o botão <strong>Mapa</strong> para visualizar a localização do
            pedido.
          </li>
          <li>
            Caso precise corrigir ou complementar informações, clique em{" "}
            <strong>Editar</strong>.
          </li>
        </ul>
      </div>
    ),
  },

  editar_solicitacao: {
    title: "Editar Solicitação",
    content: (
      <div>
        <p>
          <strong>Editar Solicitação</strong>
        </p>
        <p>
          Esta tela permite visualizar e atualizar as informações de uma
          solicitação existente, incluindo o status e os dados do cidadão
          solicitante.
        </p>
        <ul>
          <li>
            <strong>Código da solicitação:</strong> Identificador único (ex:{" "}
            <em>RYC511</em>) usado para controle e acompanhamento.
          </li>
          <li>
            <strong>Status da solicitação:</strong> Campo que permite alterar o
            estágio atual do pedido (ex: <em>Em análise</em>, <em>Agendada</em>,{" "}
            <em>Concluída</em>, <em>Indeferida</em>).
          </li>
          <li>
            <strong>Data da solicitação:</strong> Mostra quando o pedido foi
            criado.
          </li>
          <li>
            <strong>Tipo de solicitação:</strong> Indica o tipo de pedido
            registrado (ex: <em>Pedido de cascalhamento</em>).
          </li>
          <li>
            <strong>Informações do solicitante:</strong>
            <ul>
              <li>
                <strong>Nome:</strong> Nome do cidadão responsável pelo pedido.
              </li>
              <li>
                <strong>CPF:</strong> Documento informado durante o registro.
              </li>
              <li>
                <strong>Email:</strong> Endereço de e-mail para contato.
              </li>
              <li>
                <strong>Celular:</strong> Telefone do solicitante.
              </li>
            </ul>
          </li>
          <li>
            <strong>Comunidade:</strong> Localidade associada à solicitação.
          </li>
          <li>
            <strong>Descrição da solicitação:</strong> Texto que descreve o
            pedido ou problema relatado.
          </li>
          <li>
            <strong>Ações disponíveis:</strong>
            <ul>
              <li>
                <strong>Voltar:</strong> Retorna à listagem de solicitações.
              </li>
              <li>
                <strong>Salvar:</strong> Grava as alterações feitas nos dados ou
                no status da solicitação.
              </li>
            </ul>
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Revise as informações exibidas para garantir que estão corretas.
          </li>
          <li>
            Selecione o novo <strong>status</strong> no menu suspenso, se
            desejar atualizar o andamento.
          </li>
          <li>
            Caso o status selecionado seja <strong>agendado</strong> deve ser
            inserida uma data no campo novo que constará na tela.
          </li>
          <li>
            Caso o status selecionado seja <strong>concluído</strong> deve ser
            inserida uma data de conclusão no campo novo que constará na tela.
          </li>
          <li>
            Caso o status selecionado seja <strong>indeferido</strong> deve ser
            inserida um motivo no campo novo que constará na tela.
          </li>
          <li>
            Clique no botão <strong>Salvar</strong> para confirmar as alterações
            realizadas.
          </li>
          <li>
            Use o botão <strong>Voltar</strong> para retornar sem modificar os
            dados.
          </li>
        </ul>
      </div>
    ),
  },

  cidadaos: {
    title: "Listagem de cidadãos",
    content: (
      <div>
        <p>
          <strong>Listagem de Cidadãos</strong>
        </p>
        <p>
          Esta tela exibe todos os cidadãos registradas no sistema, permitindo
          que você visualize, pesquise, edite e inative.
        </p>
        <ul>
          <li>
            <strong>Filtros de busca:</strong> Permitem refinar a visualização
            dos cidadãos por <em>campo de pesquisa</em>.
          </li>
          <li>
            <strong>Tabela de cidadãos:</strong> Apresenta as informações
            principais de cada usuário, incluindo:
            <ul>
              <li>
                <strong>Nome, CPF, email</strong>
              </li>
              <li>
                <strong>Último código</strong> — Código único da ultima
                solicitação feita pelo cidadão.
              </li>
            </ul>
          </li>
          <li>
            <strong>Ações disponíveis:</strong> Ícones à direita permitem{" "}
            <em>visualizar detalhes</em> do cidadão ou{" "}
            <em>editar informações</em> (quando permitido) ou{" "}
            <em>inativar o cidadão</em> (quando permitido).
          </li>
          <li>
            <strong>Paginação:</strong> Exibe o número da página atual e permite
            navegar entre as páginas de resultados, quando houver muitos
            registros.
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Utilize a <strong>busca superior</strong> para localizar rapidamente
            cidadões específicos.
          </li>
          <li>
            Clique no ícone de <strong>olho</strong> para visualizar detalhes
            completos.
          </li>
          <li>
            Use o ícone de <strong>lápis</strong> para editar informações, se
            tiver permissão.
          </li>
          <li>
            Use o ícone de <strong>lixeira</strong> para inativar o cidadão.
          </li>
        </ul>
      </div>
    ),
  },

  detalhes_cidadao: {
    title: "Detalhes do cidadão",
    content: (
      <div>
        <p>
          <strong>Detalhes do cidadão</strong>
        </p>
        <p>
          Esta tela exibe todas as informações completas de um cidadão
          específico, permitindo acessar ações relacionadas.
        </p>

        <h4>Como usar:</h4>
        <ul>
          <li>
            Utilize o botão com <strong>seta para esquerda</strong> para voltar
            a página anterior.
          </li>
          <li>
            Utilize o botão com uma <strong>Lista</strong> para verificar as
            solicitações feitas por esse cidadão.
          </li>
          <li>
            Use o botão amarelo de <strong>Editar</strong> para editar as
            informações.
          </li>
          <li>
            Caso precise inativar o usuário para não ser permitido de fazer
            novas solicitações, clique em <strong>Excluir</strong>.
          </li>
        </ul>
      </div>
    ),
  },

  editar_cidadao: {
    title: "Editar Cidadão",
    content: (
      <div>
        <p>
          <strong>Editar Dados do Usuário</strong>
        </p>
        <p>
          Esta tela permite visualizar e atualizar as informações pessoais do
          cidadão cadastrado no sistema.
        </p>
        <ul>
          <li>
            <strong>Identificação do usuário:</strong> Exibe o CPF do cidadão
            para referência e controle do cadastro.
          </li>
          <li>
            <strong>Campos de informações:</strong> Permitem editar os
            principais dados pessoais:
            <ul>
              <li>
                <strong>Nome:</strong> Nome completo do usuário.
              </li>
              <li>
                <strong>CPF:</strong> Documento de identificação, exibido de
                forma formatada.
              </li>
              <li>
                <strong>Email:</strong> Endereço eletrônico de contato do
                cidadão.
              </li>
              <li>
                <strong>Celular:</strong> Número de telefone com DDD para
                comunicação.
              </li>
            </ul>
          </li>
          <li>
            <strong>Ações disponíveis:</strong>
            <ul>
              <li>
                <strong>Voltar:</strong> Retorna à tela anterior sem salvar
                alterações.
              </li>
              <li>
                <strong>Salvar:</strong> Confirma e grava as atualizações feitas
                nas informações do usuário.
              </li>
            </ul>
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Verifique se o <strong>CPF</strong> exibido no topo corresponde ao
            usuário desejado.
          </li>
          <li>Atualize os campos necessários, como nome, e-mail ou celular.</li>
          <li>
            Clique no botão <strong>Salvar</strong> para confirmar as
            alterações.
          </li>
          <li>
            Se desejar cancelar, use o botão <strong>Voltar</strong> para
            retornar sem modificar os dados.
          </li>
        </ul>
      </div>
    ),
  },

  cadastrar_cidadao: {
    title: "Cadastrar cidadão",
    content: (
      <div>
        <p>
          <strong>Cadastrar novo cidadão</strong>
        </p>
        <p>
          Esta tela permite cadastrar um novo cidadão no sistema. Esses são os
          dados obrigatórios necessários para a criação:
        </p>
        <ul>
          <li>
            <strong>Nome</strong>
          </li>
          <li>
            <strong>CPF</strong>
          </li>
          <li>
            <strong>Email</strong>
          </li>
          <li>
            <strong>Celular</strong>
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Verifique se <strong>todos os campos</strong> foram digitados
            corretamente, assim que estiver certificado disso pode cadastrar
            clicando no botão "cadastrar" em azul.
          </li>
        </ul>
      </div>
    ),
  },

  comunidades: {
    title: "Listagem de comunidades",
    content: (
      <div>
        <p>
          <strong>Listagem de comunidades</strong>
        </p>
        <p>
          Esta tela exibe todos as comunidades registradas no sistema,
          permitindo que você visualize, pesquise, edite e inative.
        </p>
        <ul>
          <li>
            <strong>Filtros de busca:</strong> Permitem refinar a visualização
            por <em>campo de pesquisa</em>.
          </li>
          <li>
            <strong>Tabela de comunidades:</strong> Apresenta as informações
            principais de cada comunidade, incluindo:
            <ul>
              <li>
                <strong>Nº total de solicitações</strong>
              </li>
              <li>
                <strong>Nº de solicitações por status</strong>
              </li>
            </ul>
          </li>
          <li>
            <strong>Ações disponíveis:</strong> Ícones à direita permitem{" "}
            <em>visualizar detalhes</em> da comunidade ou{" "}
            <em>editar informações</em> (quando permitido) ou{" "}
            <em>inativar a comunidade</em> (quando permitido).
          </li>
          <li>
            <strong>Paginação:</strong> Exibe o número da página atual e permite
            navegar entre as páginas de resultados, quando houver muitos
            registros.
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Utilize a <strong>busca superior</strong> para localizar rapidamente
            comunidades específicos.
          </li>
          <li>
            Clique no ícone de <strong>olho</strong> para visualizar detalhes
            completos.
          </li>
          <li>
            Use o ícone de <strong>lápis</strong> para editar informações, se
            tiver permissão.
          </li>
          <li>
            Use o ícone de <strong>lixeira</strong> para inativar a comunidade.
          </li>
        </ul>
      </div>
    ),
  },

  detalhes_comunidade: {
    title: "Detalhes da comunidade",
    content: (
      <div>
        <p>
          <strong>Detalhes da comunidade</strong>
        </p>
        <p>
          Esta tela exibe todas as informações completas de uma comunidade
          específica, permitindo acessar ações relacionadas.
        </p>

        <h4>Como usar:</h4>
        <ul>
          <li>
            Utilize o botão com <strong>seta para esquerda</strong> para voltar
            a página anterior.
          </li>
          <li>
            Use o botão amarelo de <strong>Editar</strong> para editar as
            informações.
          </li>
          <li>
            Caso precise inativar o usuário para não ser permitido de fazer
            novas solicitações, clique em <strong>Excluir</strong>.
          </li>
        </ul>
      </div>
    ),
  },

  editar_comunidade: {
    title: "Editar comunidade",
    content: (
      <div>
        <p>
          <strong>Editar Dados da Comunidade</strong>
        </p>
        <p>
          Esta tela permite editar as informações da comunidade cadastrada no
          sistema.
        </p>
        <ul>
          <li>
            <strong>Nome</strong>
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Verifique se o <strong>nome</strong> foi digitado corretamente.
          </li>
        </ul>
      </div>
    ),
  },

  cadastrar_comunidade: {
    title: "Cadastrar comunidade",
    content: (
      <div>
        <p>
          <strong>Cadastrar nova comunidade</strong>
        </p>
        <p>
          Esta tela permite cadastrar uma nova comunidade no sistema. Esses são
          os dados obrigatórios necessários para a criação:
        </p>
        <ul>
          <li>
            <strong>Nome</strong>
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Verifique se <strong>todos os campos</strong> foram digitados
            corretamente, assim que estiver certificado disso pode cadastrar
            clicando no botão "cadastrar" em azul.
          </li>
        </ul>
      </div>
    ),
  },

  relatorios: {
    title: "Emissão de relatórios",
    content: (
      <div>
        <p>
          <strong>Emissão de relatórios</strong>
        </p>
        <p>
          Esta tela permite emitir relatórios personalizados das informações das
          solicitações cadastradas no sistema.
        </p>

        <h4>Como usar:</h4>
        <ul>
          <li>
            Ao clicar em <strong>Relatório Personalizado</strong> selecione
            Comunidade, Categoria e Período do qual deseja que sejam as
            solicitações e clique em salvar para realizar o download do
            relatório em pdf.
          </li>
          <li>
            Ao clicar em <strong>Relatório Geral</strong> você irá realizar o
            download de um relatório com todas as informações das solicitações
            do último ano.
          </li>
        </ul>
      </div>
    ),
  },

  administradores: {
    title: "Listagem de administradores",
    content: (
      <div>
        <p>
          <strong>Listagem de administradores</strong>
        </p>
        <p>
          Esta tela exibe todos os administradores registradas no sistema,
          permitindo que você visualize, pesquise, edite e inative.
        </p>
        <ul>
          <li>
            <strong>Filtros de busca:</strong> Permitem refinar a visualização
            por <em>campo de pesquisa</em>.
          </li>
          <li>
            <strong>Tabela de administradores:</strong> Apresenta as informações
            principais de cada administrador, incluindo:
            <ul>
              <li>
                <strong>Nome</strong>
              </li>
              <li>
                <strong>Email</strong>
              </li>
              <li>
                <strong>Telefone</strong>
              </li>
              <li>
                <strong>Status</strong>
              </li>
            </ul>
          </li>
          <li>
            <strong>Ações disponíveis:</strong> Ícones à direita permitem{" "}
            <em>visualizar detalhes</em> da comunidade ou{" "}
            <em>editar informações</em> (quando permitido) ou{" "}
            <em>inativar a comunidade</em> (quando permitido).
          </li>
          <li>
            <strong>Paginação:</strong> Exibe o número da página atual e permite
            navegar entre as páginas de resultados, quando houver muitos
            registros.
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Utilize a <strong>busca superior</strong> para localizar rapidamente
            administradores específicos.
          </li>
          <li>
            Clique no ícone de <strong>olho</strong> para visualizar detalhes
            completos.
          </li>
          <li>
            Use o ícone de <strong>lápis</strong> para editar informações, se
            tiver permissão.
          </li>
          <li>
            Use o ícone de <strong>lixeira</strong> para inativar o
            administrador.
          </li>
        </ul>
      </div>
    ),
  },

  detalhes_administrador: {
    title: "Detalhes do administrador",
    content: (
      <div>
        <p>
          <strong>Detalhes do administrador</strong>
        </p>
        <p>
          Esta tela exibe todas as informações completas de um administrador
          específico, permitindo acessar ações relacionadas.
        </p>

        <h4>Como usar:</h4>
        <ul>
          <li>
            Utilize o botão com <strong>seta para esquerda</strong> para voltar
            a página anterior.
          </li>
          <li>
            Use o botão amarelo de <strong>Editar</strong> para editar as
            informações.
          </li>
        </ul>
      </div>
    ),
  },

  editar_administrador: {
    title: "Editar administrador",
    content: (
      <div>
        <p>
          <strong>Editar Dados do Administrador</strong>
        </p>
        <p>
          Esta tela permite editar as informações do administrador cadastrado no
          sistema.
        </p>
        <ul>
          <li>
            <strong>Nome</strong>
          </li>
          <li>
            <strong>Email</strong>
          </li>
          <li>
            <strong>Celular</strong>
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Verifique se <strong>todos os campos</strong> foram digitados
            corretamente, assim que estiver certificado disso pode salvar
            clicando no botão com icone de "salvar" em verde.
          </li>
        </ul>
      </div>
    ),
  },

  cadastrar_administrador: {
    title: "Cadastrar administrador",
    content: (
      <div>
        <p>
          <strong>Cadastrar novo Administrador</strong>
        </p>
        <p>
          Esta tela permite cadastrar um novo administrador no sistema. Esses
          são os dados obrigatórios necessários para a criação:
        </p>
        <ul>
          <li>
            <strong>Nome</strong>
          </li>
          <li>
            <strong>Email</strong>
          </li>
          <li>
            <strong>Celular</strong>
          </li>
          <li>
            <strong>Senha</strong>
          </li>
        </ul>
        <h4>Como usar:</h4>
        <ul>
          <li>
            Verifique se <strong>todos os campos</strong> foram digitados
            corretamente, assim que estiver certificado disso pode cadastrar
            clicando no botão "cadastrar" em azul.
          </li>
        </ul>
      </div>
    ),
  },

  page404: {
    title: "Página Não Encontrada",
    content: (
      <div>
        <p>
          <strong>Página não encontrada - Erro 404</strong>
        </p>
        <p>A página que você está tentando acessar não existe ou foi movida.</p>
        <h4>O que fazer:</h4>
        <ul>
          <li>
            <strong>Verificar o endereço:</strong> Confira se a URL está correta
          </li>
          <li>
            <strong>Voltar ao início:</strong> Use o botão para retornar à
            página inicial
          </li>
          <li>
            <strong>Usar a navegação:</strong> Use o menu principal para
            encontrar o que procura
          </li>
        </ul>
        <h4>Possíveis causas:</h4>
        <ul>
          <li>Link quebrado ou desatualizado</li>
          <li>Página foi removida ou renomeada</li>
          <li>Erro de digitação na URL</li>
        </ul>
      </div>
    ),
  },
};
