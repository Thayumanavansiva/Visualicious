const BubbleSortAlgorithm = (array, animations=[]) => {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            let animation = {
                comparison: [j, j + 1],
                swap: []
            };
            
            if (array[j] > array[j + 1]) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                animation.swap = [j, j + 1];
            }
            
            animations.push(animation);
        }
    }
    animations.push({ sortedArray: array });
    return animations;
}


export const BubbleSortWrapper = (array) => {
    let animations = BubbleSortAlgorithm(array);
    return animations;
}