import React, { useState } from 'react';
import './styles.css'
import logoImg from '../../assets/logo.svg'
import {Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from "../../services/api";


export default function NewIncident(){
    const [title,setTitle ] = useState('')
    const [description, setDescription]=useState('')
    const [value, setValue]=useState('')
    const ongId = localStorage.getItem('ongId')
    const history = useHistory()

    async function handleincident(e){ 
        e.preventDefault()

        const data = { 
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, { 
                headers: { 
                    Authorization: ongId
                }
            })
            history.push('/profile')
        } catch (error) {
            
        }
    }
    return (
        <div className="new-incident-container">
           <div className="content">
               <section>
                    <img src={logoImg} alt="Be the Hero"/>

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso</p>
                    <Link to="/profile" className="back-link"> <FiArrowLeft size={16} color="#e02041"/> Voltar para home </Link>

               </section>
               <form onSubmit={handleincident}>
                   <input type="text" 
                    placeholder="Titulo do Caso" value={title}
                    onChange={e => setTitle(e.target.value)}/>
                   <textarea 
                    placeholder="Descrição" value={description}
                    onChange={e => setDescription(e.target.value)}/>
                   <input type="text" 
                    placeholder="Valor em reais" value={value}
                    onChange={e => setValue(e.target.value)}/>

                   <button className="button">Cadastrar</button>
               </form>
           </div>
       </div>
    )
};
