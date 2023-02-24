function emptyFn(arry){
    let quantity = 0;
    
    arry.forEach(ele => {
        if(ele.trim() === ''){
            return;
        }
        quantity++;
    });
    if(quantity === arry.length){
        return false;
    }
    return true;
}
export default emptyFn;