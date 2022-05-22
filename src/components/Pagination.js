import styles from '../components/Pagination.module.css'

function Pagination({ paginateSize, selectedPage, SelectPage, paginateItems }) {
    var tmp = [], leftRange;
  
    if (selectedPage < Math.ceil(paginateSize / 2)) {
      leftRange = 1;
    } else if (selectedPage >= paginateItems - Math.floor(paginateSize / 2)) {
      leftRange = paginateItems - paginateSize + 1;
    } else {
      leftRange = selectedPage - Math.ceil(paginateSize / 2) + 1;
    }
  
    for (var i = leftRange; i < (leftRange + paginateSize); i++) {
      tmp.push(i);
    }
  
    return (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
        <div className={styles.pg_button} onClick={() => {
          SelectPage(selectedPage - 1);
        }}>🡸
        </div>
  
        {
          tmp.map((item, index) => (
            <div
              className={`${styles.paginationItem} ${(selectedPage === (item)) ? styles.paginationItemActive : ''}`}
              key={index} style={{ cursor: 'pointer' }}
              onClick={() => SelectPage(item)}>
              {item}
            </div>
          ))
        }
  
  
        <div className={styles.pg_button} onClick={() => {
          SelectPage(selectedPage + 1);
        }}>🡺
        </div>
      </div>
    )
  }

  export default Pagination