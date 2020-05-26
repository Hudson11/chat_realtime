import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Content } from '../CadastrarPage/style';
import { Alert } from '../../global/globalStyle';
import FirebaseService from '../../service/firebaseService';

function CadastrarPage(){

    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [alert, setAlert] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const history = useHistory();

    function handleChangeUser(event){
        setUsername(event.target.value);
    }
    function handleChangeSenha(event){
        setSenha(event.target.value);
    }

    async function createAccount(event){
        event.preventDefault();

        const date = new Date();
        const format = date.getHours().toString() + ':' + date.getMinutes().toString();

        let body = {
            username: username,
            senha: senha,
            horarioCriado: format,
            atualizado: false,
            horarioAtualizado: null
        }

        FirebaseService.getUserByUsername('/cad', username, (data, err) => {
            if(!err){
                if(username === data.doc.username){
                    setAlert(true);
                    setMensagem('Esse usuário já existe');
                    console.log('igual');
                }      
            }
            else{
                setAlert(false);
                FirebaseService.insertOne('/cad', body, (data, err) => {
                    if(err)
                        console.log('Problema al cadastrar usuário');
                    else
                        history.goBack();
                })
            }     
        });

    }

    return (
        <>
            <Container>
                <div className="top" />
                <div className="bottom" />
            </Container>
            <Content>
                <div className="login">
                    <p>
                        Criar Conta
                    </p>
                    {alert && (
                        <Alert >
                            <strong>{mensagem}</strong>
                        </Alert> 
                    )}
                    <form onSubmit={event => createAccount(event)}>
                        <div className="form-text">
                            <i className="material-icons">person</i>
                            <input type="text" placeholder="Digite seu nome de Usuário" onChange={event => handleChangeUser(event)} required></input>
                        </div>
                        <div className="form-text">
                            <i className="material-icons">lock</i>
                            <input type="password" placeholder="Digite sua senha de acesso" onChange={event => handleChangeSenha(event)} required minLength="8"></input>
                        </div> 
                        <button type="submit">Concluir</button>
                    </form>
                </div>
            </Content>  
        </>
    );
}

export default CadastrarPage;