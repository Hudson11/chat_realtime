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

    width: 100%;
    height: 100%;
    position: relative;
    top: 0px;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;

    .login{
        max-width: 700px;
        width: 700px;
        margin: 0 5px 0;
        padding: 0 20px 0;
        background: white;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        p{
            font-size: 30px;
            font-weight: bold;
            margin-top: 20px;
        }

        form{
            margin: 20px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

        }

        button{
            border: 2px solid #45a4b8;
            border-radius: 20px;
            width: 70%;
            height: 50px;
            cursor: pointer;
            color: #45a4b8;
            font-weight: bold;
            font-size: 18px;
            background: none;
            transition: 0.4s;

            :hover{
                background: #45a4b8;
                color: white;
            }
        }

        .content-more{
            margin: 0 0 20px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            
            p{
                margin: 0;
                font-size: 14px;
            }

            a{
                border: none;
                background: none;
                cursor: pointer;
                color: #45a4b8;
            }

        }

        .form-text{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #808080;
            border-radius: 8px;
            margin-bottom: 20px;

            i{
                font-size: 40px;
            }

            input{
                margin-left: 10px;
                width: 90%;
                border: none;
                font-size: 16px;
            }

        }

    }
    
`;

