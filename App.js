import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import apiCep from './API/apiCep/api'

export default function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cep, setCep] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const [bairro, setBairro] = useState('')
  const [rua, setRua] = useState('')

  const [buscaCep, setBuscaCep] = useState('')

  async function handleCep() {
    if (cep.length < 8 || cep.length > 8) {
      alert('CEP incorreto')
      return
    } else {
      const response = await apiCep.get(`${cep}/json`)
      if (response.data.err === true) {
        alert('CEP inexistente')
        return
      } else {
        setBuscaCep(response.data)
      }
    }
  }

  useEffect(() => {
    function addBuscaCep(){
      setEstado(buscaCep.uf || estado)
      setCidade(buscaCep.localidade || cidade)
      setBairro(buscaCep.bairro || bairro)
      setRua(buscaCep.logradouro || rua)
    }
    addBuscaCep()
  }, [handleCep])

  function handleLogin(e) {
    e.preventDefault()
    if (!email || !password || !cep || !estado ||
       !cidade || !bairro || !rua) {
      alert('um ou mais campos em branco')
      return
    } else {
      alert(` E-mail: ${email} \nSenha: ${password} \nCep: ${cep} \nEstado: ${estado} \nCidade: ${cidade} \nBairro: ${bairro} \nRua: ${rua} `)
    }
    
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={styles.form}>Formulário</Text>

      <Text style={styles.campos}>E-mail:</Text>
      <TextInput style={styles.bordaForm}
       placeholder='Digite seu email'
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.campos}>Senha:</Text>
      <TextInput style={styles.bordaForm}
      placeholder='Digite sua senha'
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Text style={styles.campos}>CEP:</Text>
      <TextInput style={styles.bordaForm}
      placeholder='Digite sua senha'
        value={cep}
        onBlur={handleCep}
        onChangeText={setCep}
      />
      <Text style={styles.campos}>Estado:</Text>
      <TextInput style={styles.bordaForm}
      placeholder='Digite sua senha'
        value={estado}
        onChangeText={setEstado}
      />
      <Text style={styles.campos}>Cidade:</Text>
      <TextInput style={styles.bordaForm}
      placeholder='Digite sua senha'
        value={cidade}
        onChangeText={setCidade}
      />
      <Text style={styles.campos}>Bairro:</Text>
      <TextInput style={styles.bordaForm}
      placeholder='Digite sua senha'
        value={bairro}
        onChangeText={setBairro}
      />
      <Text style={styles.campos}>Rua:</Text>
      <TextInput style={styles.bordaForm}
      placeholder='Digite sua senha'
        value={rua}
        onChangeText={setRua}
      />

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.botao}>Enviar</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bordaForm: {
    borderWidth: 1,
      borderColor: 'black',
      borderRadius: 15,
      padding: 15,
      width: 300,
  },
  campos: {
    fontWeight: 'bold',
    fontSize: 15
  },
  botao: {
    fontWeight: 'bold',
    fontSize: 17,
    borderColor: 'black',
    borderRadius: 8,
    padding: 15,
    width: 200,
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center'
  },
  form: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'black',
    width: 300,
    textAlign: 'center'
  }
})
