import React, {useState} from 'react'
import styles from './Paginator.module.css'

type PaginatorPropsType = {
    totalUsersCount: number
    currentPage: number
    pageSize: number
    onPageChanged: (p: number) => void
    portionSize?: number
}

let Paginator: React.FC<PaginatorPropsType> = ({totalUsersCount,currentPage,pageSize,onPageChanged, portionSize = 30, ...props }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount/ portionSize)
    let [portionNumber,setPortionNumber] = useState(1)

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
            <button onClick={()=> {setPortionNumber(portionNumber-1)}}>Prev </button>}
        {pages.filter(p=>p >= leftPortionPageNumber && p<=rightPortionPageNumber).map(
            p => {
                return <span key={p} className={`${currentPage === p && styles.selectedPage}`}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}>{p}</span>
            }
        )}

            {portionCount > portionNumber &&
                <button onClick={()=> {setPortionNumber(portionNumber+1)}}>Next</button>}

    </div>
}


    export default Paginator;