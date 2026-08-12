import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Cadastro from './Cadastro';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [isLogado, setIsLogado] = useState(false);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);                                                                                                                                                                    
  const [modoNoturno, setModoNoturno] = useState(false);
  const cores = {
    fundo: modoNoturno ? '#121212' : '#f4f7f6',
    cartao: modoNoturno ? '#1e1e1e' : 'white',
    textoPrincipal: modoNoturno ? '#f8f9fa' : '#1a1a1a',
    textoSecundario: modoNoturno ? '#adb5bd' : '#6c757d',
    borda: modoNoturno ? '#333333' : '#ced4da',
    inputFundo: modoNoturno ? '#2b2b2b' : 'white',
    inputTexto: modoNoturno ? '#ffffff' : '#000000',
    cardReceita: modoNoturno ? '#1e3a23' : '#e2f0d9',
    cardDespesa: modoNoturno ? '#3f1d1d' : '#fce4e4',
    cardSaldo: modoNoturno ? '#1a2c42' : '#e3f2fd',
    textoReceita: modoNoturno ? '#4caf50' : '#2e7d32',
    textoDespesa: modoNoturno ? '#ef5350' : '#c62828',
    textoSaldo: modoNoturno ? '#64b5f6' : '#1565c0',
    tabelaHeader: modoNoturno ? '#2b2b2b' : '#f8f9fa',
    tabelaBorda: modoNoturno ? '#333333' : '#dee2e6'
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLogado(true);
    }
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/usuarios/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        setIsLogado(true);
      } else {
        setErro('Usuário ou senha incorretos.');
      }
    } catch (error) {
      setErro('Erro ao conectar com a API.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLogado(false);
  };

  if (isLogado) {
    return <Dashboard onLogout={handleLogout} modoNoturno={modoNoturno} setModoNoturno={setModoNoturno} cores={cores} />;
  }

  if (mostrarCadastro) {
    return <Cadastro onVoltar={() => setMostrarCadastro(false)} modoNoturno={modoNoturno} setModoNoturno={setModoNoturno} cores={cores} />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: cores.fundo, fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif", margin: '-8px', position: 'relative' }}>
      
      <button onClick={() => setModoNoturno(!modoNoturno)} style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px 16px', borderRadius: '20px', border: `1px solid ${cores.borda}`, backgroundColor: cores.cartao, color: cores.textoPrincipal, cursor: 'pointer', fontWeight: '600', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {modoNoturno ? '☀️ Modo Claro' : '🌙 Modo Noturno'}
      </button>

      <div style={{ padding: '2.5rem', backgroundColor: cores.cartao, borderRadius: '12px', boxShadow: modoNoturno ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.08)', width: '100%', maxWidth: '360px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: cores.textoPrincipal, margin: '0 0 10px 0', fontSize: '24px', fontWeight: '700' }}>Bem-vindo de volta</h2>
          <p style={{ color: cores.textoSecundario, fontSize: '14px', margin: 0 }}>Acesse seu painel financeiro</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: cores.textoPrincipal, fontWeight: '500' }}>Usuário</label>
            <input type="text" placeholder="Digite seu usuário" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: cores.inputFundo, color: cores.inputTexto, border: `1px solid ${cores.borda}`, borderRadius: '8px', boxSizing: 'border-box', fontSize: '15px' }} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: cores.textoPrincipal, fontWeight: '500' }}>Senha</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: cores.inputFundo, color: cores.inputTexto, border: `1px solid ${cores.borda}`, borderRadius: '8px', boxSizing: 'border-box', fontSize: '15px' }} required />
          </div>
          <button type="submit" style={{ marginTop: '10px', padding: '14px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>Entrar no Sistema</button>
        </form>

        {erro && <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '6px', border: '1px solid #f5c2c7' }}><p style={{ color: '#842029', margin: 0, fontSize: '14px', textAlign: 'center' }}>{erro}</p></div>}

        <div style={{ marginTop: '25px', textAlign: 'center', borderTop: `1px solid ${cores.borda}`, paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', color: cores.textoSecundario, margin: 0 }}>Ainda não tem conta? <button onClick={() => setMostrarCadastro(true)} style={{ background: 'none', border: 'none', color: '#0d6efd', cursor: 'pointer', fontWeight: '600', padding: 0, fontSize: '14px' }}>Cadastre-se</button></p>
        </div>
      </div>
    </div>
  );
}

export default App;