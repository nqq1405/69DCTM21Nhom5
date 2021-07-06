const Pagination = ({ totalPage, currentPage, changePage }) => {

  const pageArr = Array.from(new Array(totalPage))

  return (
    <nav aria-label="Page navigation example">
      {
        totalPage > 1 &&
        <ul className="pagination">
          {
            currentPage > 1 &&
            <li className="page-item" onClick={() => changePage(currentPage - 1)}>
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
          }
          {
            pageArr.map((item, index) => {
              if (index >= currentPage - 3 && index < currentPage + 2) {
                return (
                  <li key={index} onClick={() => changePage(index + 1)} className={index + 1 === currentPage && "page-item current" || "page-item"} > <a className="page-link">{index + 1}</a></li>
                )
              } else {
                return null
              }
            }
            )
          }
          {
            currentPage < totalPage &&
            <li onClick={() => changePage(currentPage + 1)} className="page-item">
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          }
        </ul>
      }
    </nav >
  )
}

export default Pagination