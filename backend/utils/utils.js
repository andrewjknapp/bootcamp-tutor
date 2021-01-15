const Utils = {
    findIndexOfArrayById(id, arr) {
        let index;
        for(index = 0; index < arr.length; index++) {
            if (arr[index].id === id) {
                return index
            }
        }
        return -1
    }
}

module.exports = Utils