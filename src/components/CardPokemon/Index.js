import style from "./Index.module.css";
import FrontCard from "./FaceCard/Index";
import StatusCard from "./StatusCard/Index";
import AbilitiesCard from "./AbilitiesCard/Index";

function CreateCardList({ pkList, search }) {
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

  var renderSearchError = false;
  var renderContentError = false;

  if (search && pkList) {
    renderSearchError = true;
  }
  if (!search && pkList) {
    renderContentError = true;
  }

  return (
    <div className={style.cardContent}>
      {renderSearchError && (
        <div key={1} className="scene">
          <div className="cube" onClick={handleClickCard}>
            <div className="cube__face cube__face--front">
              <FrontCard data={pkList} />
            </div>
            <div className="cube__face cube__face--right">
              <StatusCard data={pkList} />
            </div>
            <div className="cube__face cube__face--back">
              <AbilitiesCard data={pkList} />
            </div>
          </div>
        </div>
      )}

      {renderContentError &&
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
        ))}

      {!pkList &&
        <div>
          <img src="./imgs/loading2.gif" alt="" />
        </div>
      }
    </div>
  );
}

export default CreateCardList;
