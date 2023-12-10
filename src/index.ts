import {getConfig} from './searchConfig'

getConfig().then(config => {
    console.log(config)
})