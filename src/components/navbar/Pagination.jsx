import React, { } from 'react';

const Pagination = ({ pageSize, totalItems, pageNumber, setPageNumber }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const maxDisplayPages = 5; 
    
    let startPage = Math.max(1, pageNumber - 2);
    let endPage = Math.min(totalPages, pageNumber + 2);

    if (pageNumber <= 2) {
        endPage = Math.min(totalPages, maxDisplayPages);
    } else if (pageNumber >= totalPages - 1) {
        startPage = Math.max(1, totalPages - (maxDisplayPages - 1));
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const handlePageChange = (newPageNumber) => {
        if (newPageNumber >= 1 && newPageNumber <= totalPages) {
            setPageNumber(newPageNumber);
        }
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${pageNumber <= 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                >
                    Previous
                </button>
            </li>

            {pages.map((page) => (
                <li key={page} className={`page-item ${pageNumber === page ? 'active' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                </li>
            ))}

            <li className={`page-item ${pageNumber >= totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNumber + 1)}
                        disabled={pageNumber >= totalPages}
                    >
                    Next
                </button>
            </li>
            </ul>
        </nav>
    );
};

export default Pagination;