import React, { useState } from 'react';

export default function FormularioTreino({ aoAdicionar }) {
  const [nomeExercicio, setNomeExercicio] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('Peito');
  const [series, setSeries] = useState('');
  const [carga, setCarga] = useState('');

  const dispararEnvio = (evento) => {
    evento.preventDefault();
    if (!nomeExercicio.trim() || !series || !carga) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const novoTreino = {
      id: Date.now(),
      exercicio: nomeExercicio,
      grupo: grupoMuscular,
      series: parseInt(series, 10),
      carga: parseInt(carga, 10),
      concluido: false
    };

    aoAdicionar(novoTreino);
    setNomeExercicio('');
    setSeries('');
    setCarga('');
  };

  return (
    <form onSubmit={dispararEnvio} className="estilo-formulario">
      <h3>Novo Exercício</h3>
      <input 
        type="text" 
        placeholder="Nome do exercício" 
        value={nomeExercicio}
        onChange={(e) => setNomeExercicio(e.target.value)}
      />
      <select value={grupoMuscular} onChange={(e) => setGrupoMuscular(e.target.value)}>
        <option value="Peito">Peito</option>
        <option value="Costas">Costas</option>
        <option value="Pernas">Pernas</option>
        <option value="Braços">Braços</option>
        <option value="Ombros">Ombros</option>
      </select>
      <input 
        type="number" 
        placeholder="Nº de séries" 
        value={series}
        onChange={(e) => setSeries(e.target.value)}
        min="1"
      />
      <input 
        type="number" 
        placeholder="Carga (kg)" 
        value={carga}
        onChange={(e) => setCarga(e.target.value)}
        min="0"
      />
      <button type="submit">Adicionar Treino</button>
    </form>
  );
}
