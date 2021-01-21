import styled from 'styled-components'
export const ModalButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    font-weight:400;
    padding: 5px;
    background-color: ${props=>props.colors?props.colors.primary:"white"};
`
export const Modal = styled.div`
    border-style:solid;
    margin-top:38px;
    position: absolute;
    width: 88%;
    height: auto;
    z-index: 98;
    background: white;
    padding: 10px 20px;
`;

export const IconDiv = styled.div`
    height: 32px;
    margin-left: 10px;
    display:flex;
    justify-content: space-between;
    svg{
        width: 20px;
    }
      


`;