
import { colorHexData } from './data/colorHexData'

export function getColorByName(data, language) {
    let result = null

    if (data) {
        let searchName = data
        if (searchName == 'cayene rot') {
            searchName = 'cayenne rot'
        }

        let result = colorHexData[language][searchName]


        if (result == null) {
            searchName =  searchName.replace('-', ' ')
            result = colorHexData[language][searchName]
        }

        // console.log(data, '------', result)
    }

    if(result != null){
        result = '#'+result
    }

    return result
}