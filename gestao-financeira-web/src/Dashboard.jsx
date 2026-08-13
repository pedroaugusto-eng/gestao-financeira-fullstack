import React, { useState, useEffect } from 'react';

function Dashboard({ onLogout, modoNoturno, setModoNoturno, cores }) {
  const [resumo, setResumo] = useState({ receitas: 0, despesas: 0, saldo: 0 });
  const [novaTransacao, setNovaTransacao] = useState({ descricao: '', valor: '', tipo: '', data: '' });
  const [transacoes, setTransacoes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  const carregarDados = async () => {
    const token = localStorage.getItem('access_token');
    
    try {
      const resResumo = await fetch('https://gestao-financeira-fullstack.onrender.com/api/financas/dashboard/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resResumo.ok) {
        const dataResumo = await resResumo.json();
        setResumo({ receitas: dataResumo.total_receitas || 0, despesas: dataResumo.total_despesas || 0, saldo: dataResumo.saldo || 0 });
      } else if (resResumo.status === 401) {
        onLogout();
      }

      const resTransacoes = await fetch('https://gestao-financeira-fullstack.onrender.com/api/financas/transacoes/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resTransacoes.ok) {
        const dataTransacoes = await resTransacoes.json();
        setTransacoes(dataTransacoes);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [onLogout]);

  const handleSalvarTransacao = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    
    try {
      const response = await fetch('https://gestao-financeira-fullstack.onrender.com/api/financas/transacoes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novaTransacao),
      });

      if (response.ok) {
        setModalAberto(false);
        setNovaTransacao({ descricao: '', valor: '', tipo: '', data: '' });
        carregarDados();
      } else {
        alert('Erro ao salvar o lançamento.');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Tem certeza que deseja apagar este lançamento?')) return;

    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`https://gestao-financeira-fullstack.onrender.com/api/financas/transacoes/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        carregarDados();
      } else {
        alert('Erro ao excluir.');
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: cores.fundo, color: cores.textoPrincipal, padding: '2rem', fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif", margin: '-8px', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${cores.borda}`, paddingBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>Meu Painel Financeiro</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            
            <button onClick={() => setModoNoturno(!modoNoturno)} style={{ padding: '8px 16px', borderRadius: '20px', border: `1px solid ${cores.borda}`, backgroundColor: cores.cartao, color: cores.textoPrincipal, cursor: 'pointer', fontWeight: '600' }}>
              {modoNoturno ? '☀️' : '🌙'}
            </button>

            <button onClick={() => setModalAberto(true)} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Novo Lançamento</button>
            <button onClick={onLogout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sair</button>
          </div>
        </header>

        <div style={{ display: 'flex', gap: '20px', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: cores.cardReceita, borderRadius: '8px', flex: 1, border: `1px solid ${cores.borda}` }}>
            <h3 style={{ margin: '0 0 10px 0', color: cores.textoPrincipal }}>Receitas</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: cores.textoReceita, margin: 0 }}>R$ {Number(resumo.receitas).toFixed(2)}</p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: cores.cardDespesa, borderRadius: '8px', flex: 1, border: `1px solid ${cores.borda}` }}>
            <h3 style={{ margin: '0 0 10px 0', color: cores.textoPrincipal }}>Despesas</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: cores.textoDespesa, margin: 0 }}>R$ {Number(resumo.despesas).toFixed(2)}</p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: cores.cardSaldo, borderRadius: '8px', flex: 1, border: `1px solid ${cores.borda}` }}>
            <h3 style={{ margin: '0 0 10px 0', color: cores.textoPrincipal }}>Saldo Atual</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: cores.textoSaldo, margin: 0 }}>R$ {Number(resumo.saldo).toFixed(2)}</p>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ color: cores.textoPrincipal }}>Histórico de Lançamentos</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', backgroundColor: cores.cartao, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ backgroundColor: cores.tabelaHeader, textAlign: 'left' }}>
                <th style={{ padding: '15px', borderBottom: `2px solid ${cores.tabelaBorda}`, color: cores.textoPrincipal }}>Data</th>
                <th style={{ padding: '15px', borderBottom: `2px solid ${cores.tabelaBorda}`, color: cores.textoPrincipal }}>Descrição</th>
                <th style={{ padding: '15px', borderBottom: `2px solid ${cores.tabelaBorda}`, color: cores.textoPrincipal }}>Tipo</th>
                <th style={{ padding: '15px', borderBottom: `2px solid ${cores.tabelaBorda}`, color: cores.textoPrincipal }}>Valor</th>
                <th style={{ padding: '15px', borderBottom: `2px solid ${cores.tabelaBorda}`, color: cores.textoPrincipal }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.length === 0 ? (
                <tr><td colSpan="5" style={{ padding: '1.5rem', textAlign: 'center', color: cores.textoSecundario }}>Nenhum lançamento encontrado.</td></tr>
              ) : (
                transacoes.map((t) => (
                  <tr key={t.id} style={{ borderBottom: `1px solid ${cores.tabelaBorda}` }}>
                    <td style={{ padding: '15px', color: cores.textoPrincipal }}>{t.data}</td>
                    <td style={{ padding: '15px', color: cores.textoPrincipal }}>{t.descricao}</td>
                    <td style={{ padding: '15px', color: t.tipo === 'receita' ? cores.textoReceita : cores.textoDespesa, fontWeight: '500' }}>
                      {t.tipo === 'receita' ? 'Receita' : 'Despesa'}
                    </td>
                    <td style={{ padding: '15px', fontWeight: 'bold', color: cores.textoPrincipal }}>R$ {Number(t.valor).toFixed(2)}</td>
                    <td style={{ padding: '15px' }}>
                      <button onClick={() => handleExcluir(t.id)} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Excluir</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {modalAberto && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: cores.cartao, padding: '2.5rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
              <h3 style={{ color: cores.textoPrincipal, marginTop: 0 }}>Registrar Transação</h3>
              <form onSubmit={handleSalvarTransacao} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <input type="text" placeholder="Descrição (ex: Conta de Luz)" value={novaTransacao.descricao} onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })} style={{ padding: '12px', backgroundColor: cores.inputFundo, color: cores.inputTexto, border: `1px solid ${cores.borda}`, borderRadius: '8px' }} required />
                <input type="number" step="0.01" placeholder="Valor (R$)" value={novaTransacao.valor} onChange={(e) => setNovaTransacao({ ...novaTransacao, valor: e.target.value })} style={{ padding: '12px', backgroundColor: cores.inputFundo, color: cores.inputTexto, border: `1px solid ${cores.borda}`, borderRadius: '8px' }} required />
                <input type="date" value={novaTransacao.data} onChange={(e) => setNovaTransacao({ ...novaTransacao, data: e.target.value })} style={{ padding: '12px', backgroundColor: cores.inputFundo, color: cores.inputTexto, border: `1px solid ${cores.borda}`, borderRadius: '8px' }} required />
                <select style={{ padding: '12px', backgroundColor: cores.inputFundo, color: cores.inputTexto, border: `1px solid ${cores.borda}`, borderRadius: '8px' }} value={novaTransacao.tipo} onChange={(e) => setNovaTransacao({ ...novaTransacao, tipo: e.target.value })} required>
                  <option value="">É Receita ou Despesa?</option>
                  <option value="receita">Receita</option>
                  <option value="despesa">Despesa</option>
                </select>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar</button>
                  <button type="button" onClick={() => setModalAberto(false)} style={{ flex: 1, padding: '12px', backgroundColor: cores.borda, color: cores.textoPrincipal, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;