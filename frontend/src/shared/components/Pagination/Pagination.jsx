import styles from './Pagination.module.css'
import icArrowLeft from '../../../assets/images/ic_arrow_left.svg'
import icArrowRight from '../../../assets/images/ic_arrow_right.svg'

function Pagination({ currentPage = 1, totalPages = 0, onPageChange }) {
  // 최대 5개의 페이지 숫자까지만 보여주기 위함.
  const maxVisiblePages = 5

  // 시작 페이지는 1 페이지 또는 아래 결과값 중 작은 숫자를 고르기 위함.
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      totalPages - maxVisiblePages + 1,
    ),
  )

  // 마지막 페이지는 totalPages값을 초과해서 보여주지 않도록 하기위함.
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  )

  // 좌측 화살표 클릭 시 이전 페이지로 이동
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  // 우측 화살표 클릭 시 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <nav className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <img src={icArrowLeft} alt="이전" />
      </button>

      <div className={styles.pageGroup}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
      >
        <img src={icArrowRight} alt="다음" />
      </button>
    </nav>
  )
}

export default Pagination
