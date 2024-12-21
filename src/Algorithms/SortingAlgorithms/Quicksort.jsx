const QuickSortAlgorithm = (array, start = 0, end = array.length - 1, animations = []) => {
    if (start < end) {
        let pivotIndex = partition(array, start, end, animations);
        QuickSortAlgorithm(array, start, pivotIndex - 1, animations);
        QuickSortAlgorithm(array, pivotIndex + 1, end, animations);
    }
    return animations;
};

const partition = (array, start, end, animations) => {
    let pivot = array[start]; 
    let low = start + 1;
    let high = end;

    animations.push({ pivot: start });

    while (low <= high) {
        while (low <= high && array[low] <= pivot) {
            animations.push({ comparison: [low, start] });
            low++;
        }
        while (low <= high && array[high] >= pivot) {
            animations.push({ comparison: [high, start] });
            high--;
        }
        if (low < high) {
            animations.push({ swap: [low, high] });
            [array[low], array[high]] = [array[high], array[low]];
        }
    }

    animations.push({ swap: [start, high] });
    [array[start], array[high]] = [array[high], array[start]];

    return high;
};

export const QuickSortWrapper = (array) => {
    let animations = QuickSortAlgorithm(array);
    return animations;
};
