import { utils } from '@/utils/index'

export default class BaseComponent {
    name = {

    }
    constructor() {
        utils.title(this.name)
    }
}