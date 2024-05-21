function changeHeadMenuActive(id){
    let menuClass = document.getElementsByClassName("headMenuSelect");
    for(let i = 0;i<menuClass.length;i++){
        if(menuClass[i].id===id){
            menuClass[i].classList.add("activeMenu");
        }
        else{
            menuClass[i].classList.remove("activeMenu");
        }
    }
}