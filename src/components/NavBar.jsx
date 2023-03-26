import React from 'react'
import random from '../assets/random-icon.svg'

const NavBar = () => {
    return (
        <div className='container'>
            <nav className='navbar'>
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src={random} alt='random icon' width='100px' height='100px'/>
                    </a>
                </div>
                <div className="control navbar-item">
                    <div className="select">
                        <select>
                            <option value='de'>German</option>
                            <option value='en_US'>en_US English (United States)</option>
                            <option value='uk'>uk	Ukrainian</option>
                        </select>
                    </div>
                </div>
                <div className="control navbar-item">
                    <input
                        className="input"
                        type="number"
                        value={errorsRate}
                        onChange={errorsRateHandler}
                        placeholder="Errors rate"/>
                </div>
                <div className="control navbar-item">
                    <input className="input"
                           type="number"
                           value={seed}
                           placeholder="Seed"/>
                </div>
                <div className='navbar-end'>
                    <div className="control navbar-item">
                        <button className="button is-primary">Generate</button>
                    </div>
                    <div className="control navbar-item">
                        <button className="button is-secondary">Download in CSV</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar