export const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

export const generateArray = (size) => {
  const newarray = Array.from({ length: size }, () => Math.floor(Math.random() * (100 - 5) + 5));
  return newarray;
}