import React, { useState, useEffect } from 'react';
import FormularioTreino from './FormularioTreino';
import ListaTreinos from './ListaTreinos';
import './App.css';

export default function App() {
  const [listaDeTreinos, setListaDeTreinos] = useState(() => {
    const dadosSalvos = localStorage.getItem('academia_treinos_v1');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  useEffect(() => {
    localStorage.setItem('academia_treinos_v1', JSON.stringify(listaDeTreinos));
  }, [listaDeTreinos]);

  const adicionarNovoTreino = (objetoTreino) => {
    setListaDeTreinos([...listaDeTreinos, objetoTreino]);
  };

  const alternarConclusaoTreino = (idTreino) => {
    setListaDeTreinos(listaDeTreinos.map((t) => t.id === idTreino ? { ...t, concluido: true } : t));
  };

  const deletarTreino = (idTreino) => {
    setListaDeTreinos(listaDeTreinos.filter((t) => t.id !== idTreino));
  };

  const volumeTotalLevantado = listaDeTreinos
    .filter(t => t.concluido)
    .reduce((acc, t) => acc + (t.series * t.carga), 0);

  const totalExercicios = listaDeTreinos.length;
  const concluidos = listaDeTreinos.filter(t => t.concluido).length;
  
  let mensagemFoco = "Monte sua rotina de hoje e foco nos objetivos!";
  if (totalExercicios > 0) {
    if (concluidos === totalExercicios) {
      mensagemFoco = "🏆 Excelente! Treino pago e meta batida!";
    } else if (concluidos > 0) {
      mensagemFoco = "💪 No caminho certo! Continue executando.";
    }
  }

  return (
    <div className="app-academia-container">
      <header>
        <h1>Painel de Treinos FitLife</h1>
        <p className="painel-mensagem">{mensagemFoco}</p>
      </header>
      <main className="conteudo-principal">
        <FormularioTreino aoAdicionar={adicionarNovoTreino} />
        <ListaTreinos colecaoTreinos={listaDeTreinos} aoConcluir={alternarConclusaoTreino} aoExcluir={deletarTreino} />
      </main>
      <footer className="painel-estatisticas">
        <div className="card-metrica">
          <h4>Volume de Carga Concluído hoje:</h4>
          <p className="destaque-metrica">{volumeTotalLevantado} kg levantados</p>
        </div>
      </footer>
    </div>
  );
}
