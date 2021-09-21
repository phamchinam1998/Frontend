import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Validate } from "../../../validateStr/validate";
import "./search.scss";

export default function SearchBar(props) {
    const [searchHint, setSearchHint] = useState([]);
    const [data, setData] = useState([]);
    const [hintmodal, setHintModal] = useState(false);
    const [currentFocus, setCurrentFocus] = useState(-1);
    const [sourceStr, setSrcStr] = useState('');
    let CreateRegex;
    let time = 200;

    useEffect(() => {
        axios.get(`http://localhost:8080/products/getname?shop_id=${props.shop_id}`).then(resolve => setData(Object.values(resolve.data)))
        return () => {
            setData([]);
        }
    }, [props])

    const OpenHintModal = (e) => {
        document.getElementById("hint-container").style.height = "auto";
    }
    const CloseHintModal = () => {
        if (!hintmodal) document.getElementById("hint-container").style.height = "0px";
    }

    const Focus = (e) => {
        if (e.keyCode === 13) {
            props.edit(e.target.value);
            CloseHintModal();
        }
        if (e.keyCode === 39) {
            if (CreateRegex) clearTimeout(CreateRegex);
            InputValue(e.target.value);
            setCurrentFocus(-1);
        }
        if (e.keyCode === 40) {
            if (currentFocus === -1) {
                setSrcStr(e.target.value);
            }
            if (currentFocus < searchHint.length - 1) {
                const index = currentFocus + 1
                const element = document.getElementById("hint-container").children[index];
                setCurrentFocus(index);
                element.classList.add("active");
                e.target.value = element.innerHTML;
                if (currentFocus > -1) {
                    document.getElementById("hint-container").children[currentFocus].classList.remove("active");
                }
            }
        }
        if (e.keyCode === 38) {
            if (currentFocus > 0) {
                const index = currentFocus - 1;
                const element = document.getElementById("hint-container").children[index];
                setCurrentFocus(index);
                element.classList.add("active");
                document.getElementById("hint-container").children[index + 1].classList.remove("active");
                e.target.value = element.innerHTML;
            }
            if (currentFocus === 0) {
                document.getElementById("hint-container").children[0].classList.remove("active");
                e.target.value = sourceStr;
                setCurrentFocus(-1);
            }
        }
    }

    const SearchHintRender = (name) => {
        return (
            <div className="hint-item" onClick={(e) => {
                const name = e.target.innerHTML;
                props.edit(name);
                CloseHintModal();
            }}>
                {name}
            </div>
        )
    }

    const InputValue = (value) => {
        CreateRegex = setTimeout(() => {
            const pattern = Validate(value);
            const re = new RegExp(pattern, "im");
            const arr = [];
            setSearchHint([]);
            data.forEach(str => {
                if (re.test(Validate(str))) {
                    arr.push(str);
                }
            })
            arr.length = 6;
            setSearchHint(arr);
        }, time);
    }

    const SearchModal = (e) => {
        const value = e.target.value;
        if (CreateRegex) clearTimeout(CreateRegex);
        InputValue(value);
    }

    return (
        <>
            <div id="search-container">
                <input type="text" onBlur={() => { CloseHintModal() }} onFocus={e => { return OpenHintModal(e) }} onChange={(e) => { SearchModal(e) }} onKeyDown={(e) => Focus(e)} />
                <i className="fa fa-search" aria-hidden="true" onClick={() => console.log("search thoii")}></i>
            </div>
            <div id="search-hint" onMouseEnter={() => setHintModal(true)} onMouseLeave={() => setHintModal(false)}>
                <div id="hint-container">
                    {searchHint.map(e => { return SearchHintRender(e) })}
                </div>
            </div>
        </>
    )
}