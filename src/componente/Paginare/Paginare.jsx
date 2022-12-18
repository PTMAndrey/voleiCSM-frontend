import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import styles from './Paginare.module.scss';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const Paginare = props => {
    const {
        data,
        onPageChange,
        totalCount,
        siblingCount = 1,
        paginaCurenta,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        totalCount,
        pageSize,
        siblingCount,
        paginaCurenta
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (paginaCurenta === 0 || paginationRange?.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(paginaCurenta + 1);
    };

    const onPrevious = () => {
        onPageChange(paginaCurenta - 1);
    };

    let lastPage = 0;
    if ((paginationRange || []).length > 0)
        lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul
            className={classnames(`${styles.paginationContainer}`, { [className]: className })}
        >
            {/* Left navigation arrow */}
            <li
                className={classnames(` ${styles.paginationItem}`, {
                    disabled: paginaCurenta === 1
                })}
                onClick={onPrevious}
            >
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
                        className={classnames(`${styles.paginationItem} ${pageNumber === paginaCurenta ? styles.activePage : null}`, {
                            selected: pageNumber === paginaCurenta
                        })}
                        onClick={() => onPageChange(pageNumber)}
                        key={`${data[index]?.id}_${paginaCurenta}`.toString()}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li
                className={classnames(`${styles.paginationItem}`, {
                    disabled: paginaCurenta === lastPage
                })}
                onClick={onNext}
            >
                <BiRightArrow />
            </li>
        </ul>
    );
};

export default Paginare;