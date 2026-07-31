import { useEffect } from "react";
import "./searchbar.modules.css"
import { useSearchParams } from "react-router-dom"
import { type UpdateTaskListProps } from "../../types/types";

export function SearchBar({updateTasks}: UpdateTaskListProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
    },[searchParams])

    function onChange(pattern: string) {
        setSearchParams((params) => {
            params.set("pattern",pattern);
            return params
        });
        updateTasks()
    };

    return(
        <input type="search" onChange={(e) => onChange(e.target.value)} className="searchbar" 
        data-testid="searchbar" placeholder="Search something"/>
    )
};