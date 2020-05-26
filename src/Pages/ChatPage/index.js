import React, { useEffect, useState } from 'react';
import './style';
import { Container, Content, InputCotent
        , ContentPerson, BodyChat, ContainerChat, ContentFriends, ArqContent, PAlert } from './style';
import { useHistory } from 'react-router-dom';
import FirebaseService from '../../service/firebaseService';

function ChatPage(){

    const child = 'mensagens';
    const history = useHistory();

    const key = localStorage.getItem('key');
    
    const [listusers, setListUsers] = useState([ ]);
    const [listMessage, setListMessage] = useState([ ]);
    const [user, setUser] = useState({
        doc:{
            username: '',
        }
    });
    const [mensagem, setMensagem] = useState('');
    const [file, setFile] = useState({});
    const [edit, setEdit] = useState(false);
    const [alertImg, setAlertImg] = useState(false);
    const [messageImg, setMessageImg] = useState('');

    // Carrega todos os usuários.
    useEffect(() => {
        const key = localStorage.getItem('key');
        FirebaseService.getUsersOn('/users', (data) => {
            setListUsers(data.filter(data => data._id !== key));
        });
    },[ ]);

    useEffect(() => {
        const username = localStorage.getItem('username');
        FirebaseService.getUserByUsername('/cad', username, (data, err) => {
            setUser(data);
        });
    }, [ ]);

    function handleChangeMensagem(event){
        setMensagem(event.target.value);
    }

    async function sendMessageFire(event){
        
        if(mensagem.length === 0)
            return
        const token = localStorage.getItem('token');
        if(!token)
            return;

        event.preventDefault();

        const date = new Date();

        const horario = date.getHours() + ':' + date.getMinutes();

        FirebaseService.insertOne(child+'/sends', {
            mensagem: mensagem, user: user, horarioEnvio: horario, edit: false, horarioAtualizada: null
        }, (data, err) => {
            if (err)
                return;
        });

        setMensagem('');
        
    }

    function logout(event){
        localStorage.clear();
        FirebaseService.deleteUser('/users/'+key);
        history.goBack();
    }

    useEffect(()=>{
        FirebaseService.getListMessages(child+'/sends', (data) => {
            setListMessage(data);
        });
    }, [ mensagem ]);

    function handleFile(event){
        setFile(event.target.files[0]);
    }

    function updateUser(){
        const ref = FirebaseService.insertFile(file);
        ref.on('state_changed', (snap) => {
            //var progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        }, (err) => console.log(err), () => {
            ref.snapshot.ref.getDownloadURL().then((url) => {
                const id = user._id;
                const date = new Date();
                const hora = date.getHours() + ':' + date.getMinutes();
                const body = {
                    atualizado: true,
                    horarioAtualizado: hora,
                    imageUrl: url
                }
                FirebaseService.changeUser('/cad/'+id,
                    body
                );
                setEdit(false);
            });
        });
    }

    function submit(event){
        event.preventDefault();
        const types = ['image/jpeg', 'image/jpg', 'image/png'];
        types.forEach((type, index) =>{
            if(file.type === type){
                setAlertImg(false);
                updateUser();
                return;
            }
            else{
                setAlertImg(true);
                setMessageImg('Seu arquivo não possui formato válido.');
            }
        });
        
    }

    return(
        <>  
            <Container>
                <div className="top" />
                <div className="bottom" />
            </Container>
            <Content>
                <div className="content-person">
                    <ContentPerson>
                        <img src={typeof user.doc.imageUrl !== undefined && user.doc.imageUrl ? 
                            user.doc.imageUrl : 'https://f0.pngfuel.com/png/340/946/man-face-illustration-avatar-user-computer-icons-software-developer-avatar-png-clip-art.png'} 
                            width="110" height="90" alt="avatar back person"/>
                        <div className="body">
                            <strong>
                                Bem Vindo (A)
                            </strong>
                        <p>{user.doc.username}</p>
                        </div>
                        <div className="badge-icons">
                            <div className="dropdown">
                                <button className="dropbtn">
                                    <i className="material-icons">more_vert</i>
                                </button>
                                <div className="dropdown-content">
                                    <button onClick={event => setEdit(true)}>Editar</button>
                                    <button onClick={event => logout(event)}>Sair</button>
                                </div>
                            </div>
                        </div>
                    </ContentPerson>
                    <strong id="header-info">Usuários Ativos: {listusers.length}</strong>
                    {listusers.map(data => (
                        <ContentFriends>
                            <img src={typeof data.doc.imageUrl !== undefined && data.doc.imageUrl ? 
                                data.doc.imageUrl : 'https://f0.pngfuel.com/png/340/946/man-face-illustration-avatar-user-computer-icons-software-developer-avatar-png-clip-art.png'} 
                                alt="person" width="100" />
                            <div className="body-info">
                                <p>{data.doc.username}</p>
                                <div id="cont-on" />
                            </div>
                        </ContentFriends>
                    ))}
                </div> 
                <div className="content-chat">
                    {edit ? 

                        <ArqContent>
                            <div className="body-file">
                                <p>Anexar foto de perfil.</p>
                                {alertImg && (
                                    <PAlert>{messageImg}</PAlert>
                                )}
                                <form onSubmit={event => submit(event)}>
                                    <input type="file" onChange={event => handleFile(event)} required />
                                    <button type="submit">Enviar</button>
                                </form>
                                <button onClick={() => setEdit(false)}>Voltar</button>
                            </div>
                        </ArqContent>
                    
                    :
                    
                        <ContainerChat>
                        {listMessage.map((data, index) => (
                            <div className="chat-card-container" key={index} style={{ justifyContent: data.user._id !== key ? 'flex-end' : 'flex-start' }}>
                                <BodyChat background={data.user._id !== key} fontColor={data.user._id !== key}>
                                    <div className="header">
                                        <strong>{data.user.doc.username}</strong>
                                        <p> {data.horarioEnvio} </p>
                                    </div>
                                    <label>{data.mensagem}</label>
                                </BodyChat>
                            </div>
                        ))}
                        </ContainerChat>
                    
                    } 
                    
                   <InputCotent>
                        <a href="https://"><i className="material-icons">insert_emoticon</i></a>
                        <form onSubmit={event => sendMessageFire(event)}>
                            <input type="text" placeholder=" Digite sua mensagem" onChange={event => handleChangeMensagem(event)} value={mensagem} required/>
                            <button type="submit"><i className="material-icons">send</i></button>
                        </form>
                    </InputCotent>
                </div>
            </Content> 
        </>
    );
}

export default ChatPage;

