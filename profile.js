// const boxesArray = Array.from(document.querySelectorAll('#main_box > div'));
// console.log(boxesArray);

const listArray = Array.from(document.querySelectorAll('.sidebar-links > li'));
console.log(listArray);





async function settingBox(value1, value2) {
    const boxesArray = [...document.querySelectorAll('#main_box > div')];
    const listArray = Array.from(document.querySelectorAll('.sidebar-links > li'));
    
    listArray.forEach(list => {
        if(list.classList.contains(value2)) {
            list.classList.add('background');
        } else {
            list.classList.remove('background');
        }
    })

    boxesArray.forEach(box => {
        if (box.classList.contains(value1)) {
            box.style.display = 'block';
            console.log(box);
        } else {
            box.style.display = 'none';
        }
    });
}


// async function setbox(value) {
    
//     switch(value) {

//     }
// }