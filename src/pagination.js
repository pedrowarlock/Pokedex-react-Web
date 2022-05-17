import { useState } from "react";

function Pagination() {
    const total = 100;
    const items = [1,2,3,4,5];



    return (
        <div style={{display:'flex', justifyContent:'space-around', width:'30%'}}>
            {
                items.map((item, index) => (
                        <a href="https://pokeapi.co/api/v2/pokemon/" key={index}> {item} </a>
                ))
            }

        </div>)
}

export default Pagination