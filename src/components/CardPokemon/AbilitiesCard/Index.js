// import style from './Index.module.css'
import {CardStatusItem, CardAbilities} from "../Constants"

const GetLb = (data) => ((data / 10)* 2.20462).toFixed(2) + ' lbs';
const GetMetric = (data) => (data / 10) + ' m ';

function StatusCard({ data }) {
    return (
        <>
            <CardAbilities abilities={data.abilities}/>
            <CardStatusItem title='Peso' content1={data.stats[0].base_stat} />
            <CardStatusItem title='Altura' 
                content1={GetMetric(data.height)}
                content2={GetLb(data.height)} 
                />
           
        </>
    )
}


export default StatusCard