const Utils = {
    findIndexOfArrayById(id, arr) {
        let index;
        //console.log(arr);
        for(index = 0; index < arr.length; index++) {
            // console.log(arr[index].id)
            // console.log(id)
            if (arr[index].id === id) {
                return index
            }
        }
        return -1
    }
}

module.exports = Utils