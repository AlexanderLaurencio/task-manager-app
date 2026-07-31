import { SearchBar } from "../searchbar/searchbar";
import Button from "../button/button";
import "./header.modules.css"
import menuIcon from "../../assets/icons/three-stripes.svg"
import Filter from "../taskFilter/taskFilter";
import Sorter from "../sorter/sorter";
import Stats from "../stats/stats";
import plusIcon from "../../assets/icons/plus.svg"
import { useState } from "react";

export interface HeaderProps {
    onAddTask?: React.MouseEventHandler,
    stats: {
        completed: number,
        inProgress: number,
        pending: number,
        totalTasks: number,
    },
    StatsDataTestId?: string,
};

export interface HeaderPropsExtended extends HeaderProps{
    updateTasks: () => void
}

export default function Header({ onAddTask, stats, StatsDataTestId, updateTasks}: HeaderPropsExtended) {
    const [showStats, setShowStast] = useState<boolean>(false);

    function onShowStats() {
        setShowStast(!showStats)
    };

    return(
        <header className="header" data-testid="header">
            <SearchBar updateTasks={updateTasks}/>

            <Button className="button_openStats" dataTestId="buttonOpenStats"
                onClick={onShowStats} onBlur={onShowStats}>
                <img src={menuIcon} alt="menu" />
                {showStats && <Stats stats={stats} StatsDataTestId={StatsDataTestId}/>}
            </Button>

            <div className="header_subContainer">
                <Filter updateTasks={updateTasks}/>  
                <Sorter updateTasks={updateTasks}/> 
                <Button onClick={onAddTask} className="button_addTask" dataTestId="buttonAddTask">
                    <img src={plusIcon} alt="plus" />
                </Button>
            </div>
        </header>
    )
};