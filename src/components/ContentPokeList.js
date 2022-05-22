import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from '../components/ContentPokeList.module.css'

function RenderSelectedPage({ pkList }) {
    return (
        <div className={styles.poketable}>
            {/* <InfoBoard /> */}
            {pkList && pkList.map((data, index) => (
                <div className={styles.item} key={data.id}>
                    <div className={styles.pokeID}>{data.id}</div>
                    <div className={styles.pokeName}>{data.name}</div>
                    <div className={styles.pokeIMG} style={{backgroundImage: `url("./imgs/details_type_bg_${data.types[0].type.name}.png")`}}>
                        <LazyLoadImage
                            alt={data.name}
                            height={140}
                            width={140}
                            effect="blur"
                            src={data.sprites.front_default}  // src={data.sprites.other['official-artwork'].front_default}
                        />
                    </div>
                    <div className={styles.typeList}>
                        <PokeTypes pokeTypes={data} />
                    </div>
                </div>
            ))
            }
        </div>
    )
}

function InfoBoard() {
    return (
        <div className={styles.infTable}>
            <div style={{backgroundColor:"yelllow", width:'100px'}}>
                <img src='AAA' alt='aaa' />
            </div>
        </div>
    )
}

function PokeTypes({ pokeTypes }) {
    return (
        <>
            {pokeTypes.types.map((typeInfo, index) => (
                <span
                    key={index}
                    className={[styles.typeItems, styles[`type_${typeInfo.type.name}`]].join(' ')}>
                    {typeInfo.type.name}
                </span>
            ))}
        </>
    )
}

export default RenderSelectedPage