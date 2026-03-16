function Pagination({ setcurrentPage, currentPage, totalpost, postPerpage }) {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalpost / postPerpage); i++) {
    page.push(i);
  }
  const nextPage = () => {
    if (currentPage >= page.length) {
      setcurrentPage(currentPage);
    } else {
      setcurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage < page.length) {
      setcurrentPage(currentPage);
    } else {
      setcurrentPage(currentPage - 1);
    }
  };
  return (
    <div
      className="page-num my-5"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <nav aria-label="Page navigation example">
        <ul class="pagination  pagination-lg  ">
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              onClick={prevPage}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {page.map((pageNumber) => {
            if (pageNumber == currentPage) {
              return (
                <li class="page-item active">
                  <a class="page-link" href="#">
                    {pageNumber}
                  </a>
                </li>
              );
            } else {
              return (
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    onClick={() => setcurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </a>
                </li>
              );
            }
          })}
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" onClick={nextPage}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
