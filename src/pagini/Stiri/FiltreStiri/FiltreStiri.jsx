import React from 'react';
import styles from './FiltreStiri.module.scss';
import { getStiriByFilter } from '../../../api/API';
import useStateProvider from '../../../hooks/useStateProvider';

import Calendar from 'react-calendar';

const FiltreStiri = (props) => {

    const { filtruStiri,setFiltruStiri } = useStateProvider();

    const handleFilter = async () => {
        try{
            // eslint-disable-next-line no-unused-vars
            let response = await getStiriByFilter(filtruStiri)
        }catch(e){
            console.log(e);
        }
    }


    return (
        <div className={styles.containerFiltre}>
            <h3 className={styles.titlu}>Filtre</h3>
            <div className={styles.filtruStiri}>
                <h5>Tip de știri</h5>
                <div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value='IMAGINE'
                                checked={filtruStiri.tipStire === 'IMAGINE'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, tipStire:'IMAGINE'}) }}
                            />
                            {" "} Cu poze
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="VIDEO"
                                checked={filtruStiri.tipStire === 'VIDEO'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, tipStire:'VIDEO'}) }}
                            />
                           {" "}Cu video
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="TEXT"
                                checked={filtruStiri.tipStire === 'TEXT'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, tipStire:'TEXT'}) }}
                            />
                            {" "}Doar text
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="TOATE"
                                checked={filtruStiri.tipStire === 'TOATE'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, tipStire:'TOATE'}) }}
                            />
                            {" "}Toate
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.filtruStiri}>
                <h5>Știri</h5>
                <div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value='1'
                                checked={filtruStiri.numarZile === '1'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, numarZile:'1', perioadaSpecifica:{firstDay:'',lastDay:''}, dataSpecifica:''}) }}
                            />
                            {" "}Ieri
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value='7'
                                checked={filtruStiri.numarZile === '7'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, numarZile:'7', perioadaSpecifica:{firstDay:'',lastDay:''}, dataSpecifica:''}) }}
                            />
                            {" "}Ultimele 7 zile
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value='28'
                                checked={filtruStiri.numarZile === '28'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri,numarZile:'28', perioadaSpecifica:{firstDay:'',lastDay:''}, dataSpecifica:''}) }}
                            />
                            {" "}Ultimele 28 zile
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value='30'
                                checked={filtruStiri.numarZile === '30'}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri,numarZile:'30', perioadaSpecifica:{firstDay:'',lastDay:''}, dataSpecifica:''}) }}
                            />
                            {" "}Ultimele 30 zile
                        </label>
                    </div>


                    <div>
                        <label>
                            <input
                                type='radio'
                                checked={filtruStiri.perioadaSpecifica.firstDay === getDateFilter('lm-firstDay') && filtruStiri.perioadaSpecifica.lastDay === getDateFilter('lm-lastDay')}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri,numarZile:'', perioadaSpecifica:{firstDay:getDateFilter('lm-firstDay'),lastDay:getDateFilter('lm-lastDay')}, dataSpecifica:''}) }}
                            />
                            {" "}Luna trecuta
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                checked={filtruStiri.perioadaSpecifica.firstDay === getDateFilter('ly-firstDay') && filtruStiri.perioadaSpecifica.lastDay === getDateFilter('ly-lastDay')}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri,numarZile:'', perioadaSpecifica:{firstDay:getDateFilter('ly-firstDay'),lastDay:getDateFilter('ly-lastDay')}, dataSpecifica:''}) }}
                            />
                            {" "}Anul trecut
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value=''
                                checked={filtruStiri.numarZile === '' && filtruStiri.perioadaSpecifica.firstDay==='' && filtruStiri.perioadaSpecifica.lastDay ==='' && filtruStiri.dataSpecifica===''}
                                onChange={(e) => { handleFilter(); setFiltruStiri({...filtruStiri, numarZile:'', perioadaSpecifica:{firstDay:'',lastDay:''}, dataSpecifica:''}) }}
                            />
                            {" "}Toate
                        </label>
                    </div>

                    <div>
                        <br/><h5>Alege zi</h5>
                        <Calendar onChange={(e)=>{
                        handleFilter(); 
                        setFiltruStiri({...filtruStiri, numarZile:'', perioadaSpecifica:{firstDay:'',lastDay:''}, dataSpecifica:( e.getDate() < 10 ? ('0'+String(e.getDate()) ) : e.getDate())+'-'+( (e.getMonth()+1) < 10 ? ('0'+String(e.getMonth()+1)) : (e.getMonth()+1) )+'-'+e.getFullYear()})
                        }} minDate={new Date(2010, 1, 1)}/></div>
                </div>
            </div>
        </div>
    )
}

export default FiltreStiri


    /** Legend:
    * ? lm-firstDay --> Last Month First Day (01-month-year)
    * ? lm-lastDay  --> Last Month Last Day (28/30/31-month-year)
    * ? ly-firstDay --> Last Year First Day (01-01-(year-1) )
    * ? ly-lastDay  --> Last Year Last Day (31-12-(year-1) )
    */
    function getDateFilter(whichDay) {
        const date = new Date();
        const prevMonth = date.getMonth();
        const firstDay = 1;
        const lastDay = new Date(date.getFullYear(),prevMonth,0).getDate();
        
        if( whichDay === 'lm-firstDay')
        return String(firstDay+'-'+prevMonth+'-'+date.getFullYear());
        else
        if( whichDay === 'lm-lastDay')
        return String(lastDay+'-'+prevMonth+'-'+date.getFullYear());
        else
        if( whichDay === 'ly-firstDay')
        return String('1-1-'+ (date.getFullYear()-1));
        else
        if( whichDay === 'ly-lastDay')
        return String('31-12-'+ (date.getFullYear()-1));

      }
      