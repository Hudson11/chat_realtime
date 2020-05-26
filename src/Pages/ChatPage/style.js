import styled from 'styled-components';


export const Container  = styled.div`

    width: 100%;
    height: 100%;
    position: absolute;

    .top{
        width: 100%;
        height: 40%;
        background: #45a4b8;
    }

    .bottom{
        width: 100%;
        height: 60%;
        background: #ddd;
    }

`;

export const Content = styled.div`

    width: 80%;
    padding: 5px;
    height: 90%;
    display:flex;
    justify-content: left;
    margin: 0 auto 0;
    background: white;
    position: relative;
    top: 30px;

    .content-person{
        width: 30%;
        height: 100%;
        border-right: 1px solid #ddd;

        #header-info{
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 15px;
        }
    }
    
    .content-chat{
        width: 70%;
        height: 100%;
    }

    @media screen and (max-width: 1500px){
        width: 100%;
        strong{
            font-size: 12px;
        }
        p{
            font-size: 12px
        }
    }

`;

export const InputCotent = styled.div`
    
    padding: 0 20px 0;
    width: 100%;
    height: 7%;
    display: flex;
    align-items: center;

    i{
        font-size: 35px;
        color: black;
    }

    a{
        :hover{
            i{
                color: #45a4b8 
            }
        }
    }

    form{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input{
        background: none;
        margin-left: 60px;
        width: 100%;
        height: 100%;
        border: none;
        font-size: 16px;
    }

    button{
        border: none;
        cursor: pointer;
        background: none;
        transition: 0.3s ease;
        
        :hover{
            i{
                color: #45a4b8
            }
        }
    }

    @media screen and (max-width: 1500px){
        input{
            margin-left: 5px;
        }
        i{
            font-size: 28px;
        }
    }
`;

export const ContentPerson = styled.div`

    width: 100%;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 5px;

    img{
        border-radius: 50%;
    }

    p{
        font-size: 20px;
    }

    .body{
        margin-left: 10px;
    }

    .badge-icons{
        width: 40%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end
    }

    .dropdown {
        float: left;
        overflow: hidden;
    }

    .dropdown .dropbtn {
        font-size: 16px;  
        border: none;
        outline: none;
        color: black;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-content button {
        float: none;
        color: black;
        border: none;
        background: none;
        width: 100%;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
    }

    .dropdown-content button:hover {
        background-color: #ddd;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    @media screen and (max-width: 1200px) {
        flex-direction: column;
    }

    @media screen and (max-width: 1500px) {
        p{
            font-size: 12px;
        }
        strong{
            font-size: 10px;
        }
    }

    @media screen and (max-width: 900px){
        img{
            width: 80;
            height: 80;
        }
    }

    @media screen and (max-width: 1190px){
        .badge-icons{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

`;

export const ContentFriends = styled.div`

    width: 100%;
    padding: 15px;
    margin: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    
    img{
        border-radius: 50%;
    }

    .body-info{
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 10px;

        #cont-on{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: green;
        }
    }

    p{
        font-weight: bold;
    }

    @media screen and (max-width: 761px){
        flex-direction: column;
    }
`;

export const ContainerChat = styled.div`

    width: 100%;
    height: 93%;
    background: #ddd;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;

    .chat-card-container{
        width: 100%;
        display: flex;
    }

`;

export const BodyChat = styled.div`

    padding: 10px;
    max-width: 60%;
    margin: 0 5px 5px;
    background: ${ props => props.background ? 'white' : '#45a4b8' };
    border-radius: 8px; 

    .header{
        display: flex;
        justify-content: space-between;
        width: 100%;

        p{
            margin-left: 10px;
        }
    }

    label{
        color: ${ props => props.fontColor ? '#45a4b8':'white' };
        font-weight: bold;
        width: 200px;
    } 

`;

export const ArqContent = styled.div`

    width: 100%;
    height: 93%;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;

    .body-file{
        padding: 10px;
        margin: 0 5px 0;
        border-radius: 8px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: center;

        button{
            margin-left: 10px;
            border: none;
            background: none;
            font-weight: bold;
            font-size: 16px;
            color: #45a4b8;
            cursor: pointer;
        }

        input{
            margin-bottom: 20px;
        }

        p{
            font-weight: bold;
            margin-bottom: 20px;
        }
    }

`;

export const PAlert = styled.p`

    margin: 5px 0 5px;
    color: red;
    font-weight: bold;

`;