import React, {useEffect, useState} from 'react'
import {faker} from '@faker-js/faker'
import {generateUser} from '../utils/generators'
import {useInView} from 'react-intersection-observer'
import {addErrors} from '../utils/addErrors'
import CsvDownload from 'react-csv-downloader'

const GeneratedUsers = (props) => {
    const [users, setUsers] = useState([])
    const [tableRef, inView] = useInView()

    const PAGE_SIZE = 10
    const INITIAL_PAGE_SIZE = 30

    const addUsers = (clear = false) => {
        const temp = clear ? [] : [...users]
        const length = clear ? {length: INITIAL_PAGE_SIZE} : {length: PAGE_SIZE}
        const newUsers = Array.from(length, () => generateUser())
        newUsers.forEach((user) => {
            addErrors(user, props.errorsRate)
            temp.push(user)
        })
        setUsers(temp)
    }

    useEffect(() => {
        if (inView) {
            addUsers()
        }
    }, [inView])

    const generateUsers = () => {
        faker.locale = props.location
        faker.seed(props.seed)
        addUsers(true)
    }

    useEffect(generateUsers, [props.location, props.seed, props.errorsRate])

    return (
        <div className="container ">
            <div>
                <table className="table is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Tel number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u, i) =>
                        <tr key={u.ID}>
                            <td>{i + 1}</td>
                            <td>{u.ID}</td>
                            <td>{u.fullName}</td>
                            <td>{u.address}</td>
                            <td>{u.phone}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <CsvDownload filename="randomUsers" separator=";" wrapColumnChar="'" datas={users}>
                    <button className="button is-primary is-rounded"
                            style={{position: 'fixed', bottom: '2rem', right: '2rem'}}>
                        Download in CSV
                    </button>
                </CsvDownload>
            </div>
            <div ref={tableRef}></div>
        </div>
    )
}

export default GeneratedUsers