import React from 'react';

export default function ListaTreinos({ colecaoTreinos, aoConcluir, aoExcluir }) {
  if (colecaoTreinos.length === 0) {
    return <p className="aviso-vazio">Nenhum exercício listado para hoje. Bora treinar!</p>;
  }

  return (
    <div className="container-lista">
      <h3>Rotina de Exercícios</h3>
      <ul className="lista-exercicios">
        {colecaoTreinos.map((item) => (
          <li key={item.id} className={`item-treino ${item.concluido ? 'exercicio-finalizado' : ''}`}>
            <div className="dados-treino">
              <strong style={{ textDecoration: item.concluido ? 'line-through' : 'none' }}>
                {item.exercicio}
              </strong>
              <span>{item.grupo} • {item.series} séries • {item.carga} kg</span>
            </div>
            <div className="acoes-treino">
              <button onClick={() => aoConcluir(item.id)} className="btn-concluir" disabled={item.concluido}>
                {item.concluido ? 'Feito ✓' : 'Concluir'}
              </button>
              <button onClick={() => aoExcluir(item.id)} className="btn-excluir">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
