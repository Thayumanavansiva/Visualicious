const SelectionSortAlgorithm = (array, animations = []) => {
    for (let i=0; i<array.length-1; i++){
        let minIndex = i;
        for (let j = i+1; j<array.length; j++){
            let animation = {
                comparison: [minIndex, j],
                swap: []
            }
            if (array[j] < array[minIndex]){
                minIndex = j;
            }
            animations.push(animation);
        }
        let temp = array[minIndex];
        array[minIndex] = array[i];
        array[i] = temp;
        animations.push({
            swap: [i, minIndex],
            comparison: []
        })
        animations.push({
            sortedArray: array
        })
    }
    return animations;
}

export const SelectionSortWrapper = (array) => {
    let animations = SelectionSortAlgorithm(array);
    return animations;
}