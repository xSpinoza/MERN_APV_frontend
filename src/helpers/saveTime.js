function saveTime(){
    let count = sessionStorage.getItem('count');

    if(!count){
        count = 60;
    }
    if(count < 1){
        sessionStorage.removeItem('count');
        return;
    }
    count--;
    sessionStorage.setItem('count', count);
}
export default saveTime

