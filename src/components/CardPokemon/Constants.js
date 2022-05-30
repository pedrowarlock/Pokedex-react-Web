import style from "./Constants.module.css";
import { useState } from "react";

export function CardStatusItem({ title, content1, content2 }) {
  return (
    <>
      <div className={style.smallStatusCard}>
        <div className={style.carStatusTitle}>{title}</div>
        {!content2 ? (
          <>
            <div className={style.cardStatusContent}>{content1}</div>
          </>
        ) : (
          <>
            <div className={style.separateCards}>
              <div className={style.cardStatusContentSeparate}>{content1}</div>
              <div className={style.cardStatusContentSeparate}>{content2}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function CardAbilities({ abilities }) {
  const formatAbilityName = (value) =>
    (value.charAt(0).toUpperCase() + value.slice(1)).replace("-", " ");
  const [abilityInfo, setAbilityInfo] = useState(null);

  async function GetAbilityInfo(url) {
    const response = await fetch(url);
    const data = await response.json();
    for (let i = 0; i < data.effect_entries.length; i++) {
      if (data.effect_entries[i].language.name === "en") {
        setTimeout(() => {
          setAbilityInfo(data.effect_entries[i].effect);
        }, 300);
        break;
      }
    }
  }

  return (
    <div className={style.abilityCard} onClick={(e) => e.stopPropagation()}>
      <div className={style.abilityTitle}>Habilidades</div>
      {abilities &&
        abilities.map((item, index) => (
          <div            
            className={style.ability}
            key={index}
            onMouseEnter={() => GetAbilityInfo(item.ability.url)}
            onMouseLeave={() => setAbilityInfo(null)}
          >
            <div className={style.tooltiptext}>
              {abilityInfo ? (
                <div>
                  <p>
                    Efeitos: {item.is_hidden && <div> (Hidden Ability)</div>}
                  </p>
                  {abilityInfo}
                </div>
              ) : (
                <img src="./imgs/loading.gif" alt="" />
              )}
            </div>
            {formatAbilityName(item.ability.name)}
          </div>
        ))}
    </div>
  );
}
