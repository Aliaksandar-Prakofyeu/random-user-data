import {faker} from '@faker-js/faker'

const userLimits = {
    ID: 10,
    fullName: 40,
    address: 120,
    phone: 16
}
export const alphabetRanges = {
    'de': [
        {from: 48, to: 57},  // 0-9
        {from: 65, to: 90},  // A-Z
        {from: 97, to: 122}, // a-z
        'Ä', 'ä', 'Ö', 'ö', 'Ü', 'ü', 'ẞ', 'ß',
        ' ' ,',', '.'
    ],
    'en_GB': [
        {from: 48, to: 57},  // 0-9
        {from: 65, to: 90},  // A-Z
        {from: 97, to: 122}, // a-z
        ' ',',', '.'
    ],
    'uk': [
        {from: 48, to: 57},     // 0-9
        {from: 1040, to: 1071}, // А-Я
        {from: 1072, to: 1103}, // а-я
        {from: 1028, to: 1031}, // Є-Ї
        {from: 1108, to: 1111}, // є-ї
        ' ',',', '.'
    ]
}

const errorType = [
    (value) => {
        const chosenLetter = faker.datatype.number(value.length - 1)
        return value.slice(0, chosenLetter) + value.slice(chosenLetter + 1)
    },
    (value) => {
        if (value.length < 2) return value
        const chosenLetter = faker.datatype.number({
            min: 0,
            max: value.length - 2,
        })
        const letter = value.at(chosenLetter)
        const nextLetter = value.at(chosenLetter + 1)

        return (
            value.slice(0, chosenLetter) +
            nextLetter +
            letter +
            value.slice(chosenLetter + 2, value.length)
        )
    },
    (value) => {
        const locale = faker.locale
        const alphabet = alphabetRanges[locale]
        let chosenLetter = alphabet[faker.datatype.number(alphabet.length - 1)]
        if (typeof chosenLetter !== 'string') {
            const code = faker.datatype.number({
                min: chosenLetter.from,
                max: chosenLetter.to,
            })
            chosenLetter = String.fromCharCode(code)
        }
        const chosenIndex = faker.datatype.number(value.length)
        return (
            value.slice(0, chosenIndex) +
            chosenLetter +
            value.slice(chosenIndex)
        )
    },
]

function getRandomPersonField() {
    const options = [
        'ID',
        'fullName',
        'address',
        'phone',
    ]
    return options[faker.datatype.number({min: 0, max: options.length - 1})]
}

export function addErrors(user, errors = 0) {
    if (errors === 0) return user
    while (errors > 0) {
        if (errors < 1) {
            if (
                faker.datatype.float({min: 0, max: 1, precision: 0.01}) >
                errors
            ) {
                break
            }
        }
        const field = getRandomPersonField()
        let min = 0
        let max = 2
        if (user[field].length <= 1) min = 1
        if (user[field].length > userLimits[field]) max = 1
        user[field] = errorType[faker.datatype.number({min: min, max: max})](
            user[field]
        )

        errors--
    }

    return user
}
