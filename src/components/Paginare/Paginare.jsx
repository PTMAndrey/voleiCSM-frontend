import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import styles from './Paginare.module.scss';
import useStateProvider from "../../hooks/useStateProvider";
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const Paginare = props => {

    // const { stiriOrdonate } = useStateProvider();

    const {
        data,
        onPageChange,
        // onLastPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        // lastPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        totalCount,
        pageSize,
        siblingCount,
        currentPage
    });

    // let wrong_currentPage = currentPage;
    // if (currentPage > lastPage) { wrong_currentPage = 1; }

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange?.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };


    let lastPage = 0;
    if ((paginationRange || []).length > 0)
        lastPage = paginationRange[paginationRange.length - 1];
    else
        console.log("[Paginare] Array `paginationRange` empty;");

    console.log("\n----\ncurrentPage ", currentPage);

    console.log('totalC ', totalCount, 'pageS', pageSize, 'sibling', siblingCount, 'currentP', currentPage, '\n-------\n');

    return (
        <ul
            className={classnames(`${styles.paginationContainer}`, { [className]: className })}
        >
            {/* Left navigation arrow */}
            <li
                className={classnames(`${styles.paginationItem}`, {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                {/* <div className={`${styles.arrow} ${styles.left}`}/> */}
                <BiLeftArrow />
            </li>
            {paginationRange?.map((pageNumber, index) => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li className={`${styles.paginationItem} ${styles.dots}`} key={`${index}_dots`}>&#8230;</li>;
                }

                // Render our Page Pills
                return (

                    <li
                        className={classnames(`${styles.paginationItem} ${pageNumber === currentPage ? styles.activePage : null}`, {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                        key={`${data[index]?.id}_${currentPage}`.toString()}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li
                className={classnames(`${styles.paginationItem}`, {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                {/* <div className={`${styles.arrow} ${styles.right}`} /> */}
                <BiRightArrow />
            </li>
        </ul>
    );
};

export default Paginare;