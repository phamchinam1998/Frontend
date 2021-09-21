import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Validate } from '../../validateStr/validate';
import { Redirect } from "react-router-dom";
import "./search.scss";

export default function MainSearchBar(props) {
    const [searchHint, setSearchHint] = useState([]);
    const [data, setData] = useState([]);
    const [currentFocus, setCurrentFocus] = useState(-1);
    const [sourceStr, setSrcStr] = useState('');
    const [redirect, setRedirect] = useState(false);
    let hintmodal = false;
    let CreateRegex;
    let time = 200;

    useEffect(() => {
        axios.get(`https://demo-ecomerce-backend.herokuapp.com/products/getname`).then(res => {
            const tag = Object.values(res.data.tag_list);
            tag.splice(0, 1);
            setData(tag.flat());
        })
    }, [props])

    const SearchSubmit = (str) => {
        setSearchHint([]);
        hintmodal = true;
        setCurrentFocus(-1);
        CloseHintModal();
        str = `/products/1/${str}`;
        setRedirect(str);
    }

    const OpenHintModal = (e) => {
        document.getElementById("hint-container").style.height = "auto";
    }
    const CloseHintModal = () => {
        if (!hintmodal) document.getElementById("hint-container").style.height = "0px";
    }

    const Focus = (e) => {
        if (e.keyCode === 13) {
            SearchSubmit(e.target.value);
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

    const SearchHintRender = (name, index) => {
        return (
            <div key={index} className="hint-item" onClick={(e) => {
                const name = e.target.innerHTML;
                document.getElementById("search-input").value = name;
                SearchSubmit(name);
                hintmodal = false;
                CloseHintModal();
            }}>
                {name}
            </div>
        )
    }

    const InputValue = (value) => {
        CreateRegex = setTimeout(() => {
            const pattern = Validate(value);
            const arr = [];
            setSearchHint([]);
            data.forEach(str => {
                if (Validate(str).indexOf(pattern) > -1) {
                    arr.push(str);
                }
                arr.sort((a, b) => {
                    var strA = Validate(a).indexOf(pattern);
                    var strB = Validate(b).indexOf(pattern);
                    if (strA < strB) {
                        return -1;
                    }
                    if (strA > strB) {
                        return 1;
                    }
                    return 0;
                })
            }
            )
            arr.length = 10;
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
                <input id="search-input" type="text" onBlur={() => { CloseHintModal() }} onFocus={e => { return OpenHintModal(e) }} onChange={(e) => { SearchModal(e) }} onKeyDown={(e) => Focus(e)} />
                <i className="fa fa-search" aria-hidden="true" onClick={() => SearchSubmit(document.getElementById("search-input").value)}></i>
            </div>
            <div id="search-hint" onMouseEnter={() => hintmodal = true} onMouseLeave={() => hintmodal = false}>
                <div id="hint-container">
                    {searchHint.map((e, index) => { return SearchHintRender(e, index) })}
                </div>
            </div>
            {redirect ? <Redirect to={redirect} /> : <></>}
        </>
    )
}