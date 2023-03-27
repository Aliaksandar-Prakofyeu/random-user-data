import React from 'react'
import randomBytes from 'randombytes/browser'

const NavBar = (props) => {

    const handleOnChange = (setter, float, min = 0, max) => {
        return ({target: {value}}) => {
            if (value === '') {
                setter(undefined)
                return
            }
            let parsedValue = float ? parseFloat(value) : parseInt(value)
            parsedValue = isNaN(parsedValue) ? min : Math.min(Math.max(parsedValue, min), max)
            setter(parsedValue)
        }
    }

    const handleChangeLocation = (e) => {
        props.updateLocation(e.target.value)
    }

    function getRandomSeed() {
        const buff = randomBytes(4)
        return buff.readInt32BE(0)
    }

    const handleRandomSeed = () =>{
        props.updateSeed(getRandomSeed())
    }



    return (
        <div className="box">
            <nav className="navbar is-justify-content-center">
                <div className="control is-flex-direction-column is-align-items-stretch navbar-item">
                    <label className="label">Location</label>
                    <div className="select is-fullwidth">
                        <select onChange={handleChangeLocation} value={props.location}>
                            <option value="de">Germany</option>
                            <option value="en_GB">Great Britain</option>
                            <option value="uk">Ukraine</option>
                        </select>
                    </div>
                </div>
                <div className="control is-flex-direction-column is-align-items-stretch navbar-item">
                    <label className="label">Errors range</label>
                    <input
                        className="input"
                        type="number"
                        step="0.1"
                        max="1000"
                        value={props.errorsRate}
                        onChange={handleOnChange(props.updateErrorsRate, true, 0, 1000)}
                        placeholder="Errors rate"/>
                    <input
                        className="slider is-fullwidth mt-4"
                        type="range"
                        step="0.1"
                        max="10"
                        value={props.errorsRate}
                        onChange={handleOnChange(props.updateErrorsRate, true, 0, 1000)}
                        placeholder="Errors rate"/>
                </div>
                <div className="control is-flex-direction-column is-align-items-stretch navbar-item">
                    <label className="label">Seed</label>
                    <input className="input"
                           type="number"
                           value={props.seed}
                           onChange={handleOnChange(props.updateSeed)}
                           placeholder="Seed"/>
                    <button onClick={handleRandomSeed} className="button is-primary is-fullwidth mt-2">Random Seed</button>
                </div>
            </nav>
        </div>
    )
}

export default NavBar