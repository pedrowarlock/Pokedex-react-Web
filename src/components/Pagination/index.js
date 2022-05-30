import style from "./index.module.css";

function Pagination({ paginateSize, selectedPage, SelectPage, paginateItems }) {
  var tmp = [],
    leftRange;

  if (selectedPage < Math.ceil(paginateSize / 2)) {
    leftRange = 1;
  } else if (selectedPage >= paginateItems - Math.floor(paginateSize / 2)) {
    leftRange = paginateItems - paginateSize + 1;
  } else {
    leftRange = selectedPage - Math.ceil(paginateSize / 2) + 1;
  }

  for (var i = leftRange; i < leftRange + paginateSize; i++) {
    tmp.push(i);
  }
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <div onClick={() => SelectPage(selectedPage - 1)}>
        <SvgArrowIcon rotate={true} />
      </div>

      {selectedPage > Math.ceil(paginateSize / 2) && (
        <>
          <div className={style.extraItem} onClick={() => SelectPage(1)}>
            {1}
          </div>
          <div className={style.dotItem}>...</div>
        </>
      )}

      {tmp &&
        tmp.map((item, index) => (
          <div
            className={`${style.paginationItem} ${
              selectedPage === item ? style.paginationItemActive : ""
            }`}
            key={index}
            onClick={() => SelectPage(item)}
          >
            {item}
          </div>
        ))}

      {selectedPage < paginateItems - Math.floor(paginateSize / 2) && (
        <>
          <div className={style.dotItem}>...</div>
          <div
            className={style.extraItem}
            onClick={() => SelectPage(paginateItems)}
          >
            {paginateItems}
          </div>
        </>
      )}

      <div onClick={() => SelectPage(selectedPage + 1)}>
        <SvgArrowIcon />
      </div>
    </div>
  );
}

function SvgArrowIcon({ rotate }) {
  const enableRotate = rotate ? "rotate(-180 17.525 16.978)" : "";
  return (
    <svg viewBox="9 3 15 27" className={style.svgImage}>
      <path
        transform={enableRotate}
        d="M8.5 8.7c0-1.7 1.2-2.4 2.6-1.5l14.4 8.3c1.4.8 1.4 2.2 0 3l-14.4 8.3c-1.4.8-2.6.2-2.6-1.5V8.7z"
      ></path>
    </svg>
  );
}

export default Pagination;
