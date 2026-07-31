import { useSearchParams } from "react-router-dom"
import "./navigationLowerBar.modules.css"

interface NavigationLowerBarProps{
    totalTasks: number,
    rowsNumber: number,
    updateTaskList: () => void,
};

interface NavigationButtonProps{
    page: number,
    updateTaskList: () => void
};

interface NavigationArrowProps{
    totalPages: number,
    updateTaskList: () => void
};


export function NavigationLowerBar({totalTasks, rowsNumber, updateTaskList}: NavigationLowerBarProps ) {
    let buttons: number[] = [];

    console.log(totalTasks);

    let totalPages = Math.ceil(rowsNumber / 10);

    for (let i = 1; i <= totalPages; i++ ) {
        buttons = ([...buttons, i])
    };

    return(
        <div className="navigationLowerBar" data-testid="navigationLowerBar">
            {totalPages > 1 && <NavigationArrowLeft totalPages={totalPages} updateTaskList={updateTaskList}/>}
            {buttons.map(n => <NavigationButton key={n} page={n} updateTaskList={updateTaskList}/>)}
            {totalPages > 1 && <NavigationArrowRight totalPages={totalPages} updateTaskList={updateTaskList}/>}
        </div>
    )
}

function NavigationButton({page, updateTaskList}: NavigationButtonProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams,);

    function navigatePage() {
        setSearchParams((params) => {
            params.set("page",String(page - 1));
            return params
        });
        updateTaskList()
    };

    return(
        <button className="navigationButton" data-testid="navigationButton"
                onClick={navigatePage}>
            {page}
        </button>
    )
};



export function NavigationArrowLeft({totalPages, updateTaskList}: NavigationArrowProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams,totalPages);

    function navigateToLeft() {
        let url = new URLSearchParams(location.search);
        let currentPage = Number(url.get("page"));
        let nextPage = String(currentPage - 1);

        if (currentPage > 0) {
            setSearchParams((params) => {
                params.set("page",nextPage);
                return params
            });

            updateTaskList()
        }

    };

    return(
        <button className="navigationArrowLeft" data-testid="navigationArrowLeft"
            onClick={(navigateToLeft)}>
            {"<"}
        </button>
    )
};

export function NavigationArrowRight({totalPages, updateTaskList}: NavigationArrowProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams);

    function navigateToRight() {
        let url = new URLSearchParams(location.search);
        let currentPage = Number(url.get("page"));
        let nextPage = String(currentPage);

        if (currentPage < totalPages) {

            setSearchParams((params) => {
                params.set("page",nextPage);
                return params
            });

            updateTaskList()
        }

    }

    return(
        <button className="navigationArrowRight" data-testid="navigationArrowRight"
            onClick={navigateToRight}>
            {">"}
        </button>
    )
}