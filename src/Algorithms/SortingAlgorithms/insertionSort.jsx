const InsertionSortAlgorithm = (array, animations = []) => {
    let n = array.length;
    for (let i=1; i<n; i++) {
        let j = i;
        animations.push({
            comparison: [j, j - 1],
            swap: []
        });
        while (j > 0 && array[j] < array[j-1]){
            animations.push({
                comparison: [j, j - 1],
                swap: [j, j - 1],
            });
            let temp = array[j];
            array[j] = array[j-1];
            array[j-1] = temp; 
            j--;
            
            if (j > 0) {
                animations.push({
                    comparison: [j, j - 1],
                    swap: []
                });
            }
        }
    }
    return animations;
}


export const InsertionSortWrapper = (array) => {
    const animations = InsertionSortAlgorithm(array);
    return animations;
}