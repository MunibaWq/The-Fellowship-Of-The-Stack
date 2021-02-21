import React from "react";
import styled from "styled-components";

const Loading = () => {
    return (
        <Circle>
            <p>Loading</p>
        </Circle>
    );
};

export default Loading;

const Circle = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 99px;
  height: 99px;
  place-self: center;
  border-radius: 50%;
  background: #FBFCFF;  
  background: linear-gradient(123.35deg, rgba(235, 243, 208, 0.6) 0%, rgba(235, 243, 208, 0) 18.4%), radial-gradient(29.9% 70.94% at 44.25% 86.96%, rgba(220, 141, 220, 0.6) 0%, rgba(220, 141, 220, 0) 100%), radial-gradient(42.66% 49.72% at 45.56% 44.65%, rgba(203, 173, 235, 0.6) 0%, rgba(194, 166, 241, 0) 100%), radial-gradient(44.37% 103.98% at 75.16% 33.54%, rgba(255, 253, 177, 0.6) 0%, rgba(254, 228, 191, 0.6) 46.6%, rgba(240, 189, 208, 0.6) 69.5%, rgba(255, 129, 38, 0) 100%), linear-gradient(86.83deg, rgba(205, 249, 232, 0.6) 26.09%, rgba(205, 249, 232, 0) 42.6%);;
	background-size: 400%;
	animation: gradient 10s ease infinite;
    p{
        text-transform: uppercase;
        font-weight: 700;
        font-size: 0.6em;
        letter-spacing: 0.05em;
        animation: float 3s ease infinite;
    }

    @keyframes float{
        0%{
            transform: translateY(0%);
        }
        50%{
            transform: translateY(33%);
        }
        0%{
            transform: translateY(0%);
        }
        
    }

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}

`;
