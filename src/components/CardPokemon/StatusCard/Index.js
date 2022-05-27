// import style from './Index.module.css'
import {CardStatusItem} from "../Constants"

function StatusCard({ data }) {
    return (
        <>
            <CardStatusItem title='Vida' content1={data.stats[0].base_stat} />
            <CardStatusItem title='Ataque' content1={data.stats[1].base_stat} />
            <CardStatusItem title='Defesa' content1={data.stats[2].base_stat} />
            <CardStatusItem title='Sp. Ataque' content1={data.stats[3].base_stat} />
            <CardStatusItem title='Sp. Defesa' content1={data.stats[4].base_stat} />
            <CardStatusItem title='Velocidade' content1={data.stats[5].base_stat} />
        </>
    )
}


export default StatusCard