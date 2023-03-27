import 'bulma/css/bulma.min.css'
import 'bulma-slider/dist/css/bulma-slider.min.css'
import NavBar from './components/NavBar'
import GeneratedUsers from './components/GeneratedUsers'
import {useState} from 'react'


function App() {
    const [location, setLocation] = useState('de')
    const [seed, setSeed] = useState(0)
    const [errorsRate, setErrorsRate] = useState(0)

    const handleUpdateLocation = (value) => {
        setLocation(value)
    }

    const handleUpdateSeed = (value) => {
        setSeed(value)
    }
    const handleUpdateErrorsRate = (value) => {
        setErrorsRate(value)
    }

    return (
        <div className="container is-fluid">
            <NavBar seed={seed}
                    location={location}
                    errorsRate={errorsRate}
                    updateSeed={handleUpdateSeed}
                    updateLocation={handleUpdateLocation}
                    updateErrorsRate={handleUpdateErrorsRate}/>
            <GeneratedUsers location={location}
                            seed={seed ?? 0}
                            errorsRate={errorsRate ?? 0}/>
        </div>
    )
}

export default App
