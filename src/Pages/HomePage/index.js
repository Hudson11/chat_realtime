import React, { useState } from 'react';
import { Container, Content } from '../HomePage/style';
import { Link, useHistory } from 'react-router-dom';

import { Alert } from '../../global/globalStyle';
import FirebaseService from '../../service/firebaseService';

function HomePage(){

    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [alert, setAlert] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const history = useHistory();
    const child = 'users';

    function check(){
        const token = localStorage.getItem('token');
        if(token !== null && typeof token !== undefined)
           history.push('/chat');
    }

    check();

    function handleChangeUser(event){
        setUsername(event.target.value);
    }
    function handleChangeSenha(event){
        setSenha(event.target.value);
    }

    async function entrar(event){
        event.preventDefault();

        FirebaseService.getUserByUsername('/cad', username, (data, err) => {
            if(err){
                setAlert(true);
                setMensagem('Este usuário ainda não existe');
            }
            else if(data.doc.senha === senha){
                FirebaseService.insertOne(child+'/'+data._id, data, (data, err) => {
                    if(err){
                        setAlert(true);
                        setMensagem('Problemas ao logar');
                    } 
                });
                localStorage.setItem('token', child+'/'*data._id);
                localStorage.setItem('key', data._id);
                localStorage.setItem('username', data.doc.username);
                history.push('/chat');
            }
            else{
                setAlert(true);
                setMensagem('Senha incorreta');
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
                        Entrar
                    </p>
                    {alert && (
                        <Alert><strong>{mensagem}</strong></Alert>
                    )}
                    <form onSubmit={event => entrar(event)}>
                        <div className="form-text">
                            <i className="material-icons">person</i>
                            <input type="text" placeholder="Digite seu nome de Usuário" onChange={event => handleChangeUser(event)}></input>
                        </div>
                        <div className="form-text">
                            <i className="material-icons">lock</i>
                            <input type="password" placeholder="Digite sua senha de acesso" onChange={event => handleChangeSenha(event)}></input>
                        </div> 
                        <div className="content-more">
                            <p>Ainda não tem cadastro ? <Link to={'/cadastrar'}>CRIAR</Link> </p>
                        </div>  
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </Content>  
        </>
    );
}

export default HomePage;