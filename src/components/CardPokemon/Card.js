import style from "./Card.module.css";
import FrontCard from "./FaceCard/Index";
import StatusCard from "./StatusCard/Index";
import AbilitiesCard from "./AbilitiesCard/Index";

function RenderSelectedPage({ pkList }) {
  function handleClickCard(event) {
    const origin = event.target;
    const cardFrontBack = origin.closest(".cube");
    if (cardFrontBack.classList.contains("show-back")) {
      cardFrontBack.classList.remove("show-back");
      cardFrontBack.classList.remove("show-right");
    } else if (cardFrontBack.classList.contains("show-right")) {
      cardFrontBack.classList.add("show-back");
    } else {
      cardFrontBack.classList.add("show-right");
    }
  }

  return (
    <div className={style.cardContent}>
      {pkList ? (
        pkList.map((data, index) => (
          <div key={index} className="scene">
            <div className="cube" onClick={handleClickCard}>
              <div className="cube__face cube__face--front">
                <FrontCard data={data} />
              </div>
              <div className="cube__face cube__face--right">
                <StatusCard data={data} />
              </div>
              <div className="cube__face cube__face--back">
                <AbilitiesCard data={data} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <img src="./imgs/loading2.gif" alt="" />
        </div>
      )}
    </div>
  );
}

export default RenderSelectedPage;
