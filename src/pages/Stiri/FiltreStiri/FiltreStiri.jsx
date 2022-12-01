import React, { useState } from 'react';
import styles from './FiltreStiri.module.scss';
import { getStiriByFilter } from '../../../api/API';
import useStateProvider from '../../../hooks/useStateProvider';


const FiltreStiri = (props) => {

    const { filtruStiri,setFiltruStiri } = useStateProvider();

    const handleFilter = async () => {
        try{
            let response = await getStiriByFilter(filtruStiri)
        }catch(e){
            console.log(e);
        }
    }

    const formSubmit = () => {
    }


    return (
        <div className={styles.containerFiltre}>
            <h5 className={styles.titlu}>Filtre</h5>
            <div className={styles.tipDeStiri}>
                <h5>Tip de știri</h5>
                <form onSubmit={formSubmit}>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value='IMAGINE'
                                checked={filtruStiri.tipStire === 'IMAGINE'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, tipStire:'IMAGINE'}) }}
                            />
                            Cu poze
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="VIDEO"
                                checked={filtruStiri.tipStire === 'VIDEO'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, tipStire:'VIDEO'}) }}
                            />
                            Cu video
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="TEXT"
                                checked={filtruStiri.tipStire === 'TEXT'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, tipStire:'TEXT'}) }}
                            />
                            Doar text
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="TOATE"
                                checked={filtruStiri.tipStire === 'TOATE'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, tipStire:'TOATE'}) }}
                            />
                            Toate
                        </label>
                    </div>
                </form>
            </div>

            <div className={styles.calendarStiri}>

            </div>
        </div>
    )
}

export default FiltreStiri