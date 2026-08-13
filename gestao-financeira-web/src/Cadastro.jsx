import React, { useState } from 'react';

function Cadastro({ onVoltar, modoNoturno, setModoNoturno, cores }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await fetch('https://gestao-financeira-fullstack.onrender.com/api/usuarios/registrar/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, telefone, password }),
      });

      if (response.ok) {
        alert('Conta criada com sucesso! Você já pode fazer o login.');
        onVoltar();
      } else {
        const errorData = await response.json();
        console.error('Detalhes do erro:', errorData);
        setErro('Erro ao criar conta. Verifique se os dados estão corretos ou se o usuário já existe.');
      }
    } catch (error) {
      setErro('Erro ao conectar com a API.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: cores.fundo, fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif", margin: '-8px', position: 'relative' }}>
      
      <button onClick={() => setModoNoturno(!modoNoturno)} style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px 16px', borderRadius: '20px', border: `1px solid ${cores.borda}`, backgroundColor: cores.cartao, color: cores.textoPrincipal, cursor: 'pointer', fontWeight: '600' }}>
        {modoNoturno ? '☀️ Modo Claro' : '🌙 Modo Noturno'}
      </button>

      <div style={{ padding: '2.5rem', backgroundColor: cores.cartao, borderRadius: '12px', boxShadow: modoNoturno ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: cores.textoPrincipal, margin: '0 0 10px 0', fontSize: '24px', fontWeight: '700' }}>Criar Conta</h2>
          <p style={{ color: cores.textoSecundario, fontSize: '14px', margin: 0 }}>Junte-se a nós e assuma o controle</p>
        </div>
        
        <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: cores.textoPrincipal, fontWeight: '500' }}>Usuário</label>
            <input type="text" placeholder="Nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: cores.inputFundo, color: cores.inputTexto, border: `1px solid ${cores.borda}`, borderRadius: '8px', boxSizing: 'border-box' }} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: cores.textoPrincipal, fontWeight: '500' }}>E-mail</label>
            <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: cores.inputFundo, color: cores.inputTexto, border: `1px solid ${cores.borda}`, borderRadius: '8px', boxSizing: 'border-box' }} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: cores.textoPrincipal, fontWeight: '500' }}>Senha</label>
            <input type="password" placeholder="Crie uma senha forte" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: cores.inputFundo, color: cores.inputTexto, border: `1px solid ${cores.borda}`, borderRadius: '8px', boxSizing: 'border-box' }} required />
          </div>

          <button type="submit" style={{ marginTop: '10px', padding: '14px', backgroundColor: '#198754', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>Cadastrar</button>
        </form>

        <div style={{ marginTop: '25px', textAlign: 'center', borderTop: `1px solid ${cores.borda}`, paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', color: cores.textoSecundario, margin: 0 }}>Já tem uma conta? <button onClick={onVoltar} style={{ background: 'none', border: 'none', color: '#0d6efd', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Fazer Login</button></p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;