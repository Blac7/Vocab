import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [word, setWord] = useState('')

    const handleChange = e => {
        setWord(e.target.value)
    }

    return (
        <div className="header">
            <Link className="header-logo" to="/">Vocab</Link>
            <div className="header-cont">
                <form action={`/search/${word}`} >
                    <input className="header-search" onChange={(e) => handleChange(e)} type="text" placeholder="Search word" value={word} />
                    <Link className="header-icon" to={`/search/${word}`}>
                        <i className="fas fa-search"></i>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Header
