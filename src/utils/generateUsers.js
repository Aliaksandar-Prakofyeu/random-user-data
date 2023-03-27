import {faker} from '@faker-js/faker'

const STATE = faker.address.state
const CITY = faker.address.city
const STREET = faker.address.streetAddress
const SECONDARY = faker.address.secondaryAddress
const ZIPCODE = faker.address.zipCode

const templates = [
    [STREET, CITY, STATE, ZIPCODE],
    [STATE, CITY, STREET, ZIPCODE],
    [CITY, STREET, ZIPCODE],
    [STREET, SECONDARY, CITY, STATE, ZIPCODE],
    [STREET, CITY, STATE, ZIPCODE],
    [CITY, STATE, ZIPCODE],
    [SECONDARY, STREET, CITY, STATE, ZIPCODE],
    [STREET, CITY, ZIPCODE],
    [SECONDARY, CITY, STATE, ZIPCODE],
    [CITY, STATE, STREET],
]


export function generateAddress() {
    const chosenTemplate = templates[faker.datatype.number({min: 0, max: templates.length - 1})]
    let result = ''
    let length = chosenTemplate.length
    for (const entry of chosenTemplate) {
        result += entry()
        if (--length) result += ' '
    }
    return result
}





