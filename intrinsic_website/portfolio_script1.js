//Modal script using data attributes
document.querySelectorAll('.portfolio-tile').forEach(tile =>{
    tile.addEventListener('click', e =>{
        const modalID = tile.getAttribute('data-modal');
        const modal = document.getElementById(modalID);

        if(modal){
            //Add click animation
            tile.classList.add('clicked');

            //Show modal and overlay
            setTimeout(() =>{
                tile.classList.remove('clicked');
                modal.classList.remove('modal-hidden');

            //Get overlay
                let overlay = document.getElementById('modal-overlay');
                overlay.classList.remove('modal-hidden');

                document.body.style.overflow = 'hidden';
            }, 100);
        }
    });       
}); 

//Close all modal functions
function closeAllModals(){
    document.querySelectorAll('.modal').forEach(modal =>{
        modal.classList.add('modal-hidden');
    });
    const overlay = document.getElementById("modal-overlay");
    if(overlay){
        overlay.classList.add('modal-hidden');
    }
    document.body.style.overflow = '';
}

//Close button feature
document.querySelectorAll('.close-btn').forEach(button =>{
    button.addEventListener('click', e =>{
        e.stopPropagation();
        closeAllModals();
    });
});

//Close if click outside the modal
document.addEventListener('click', e =>{
    if(e.target.id === 'modal-overlay'){
        closeAllModals()
    }
});

//Close if escape key is pressed
document.addEventListener('keydown', e =>{
    if(e.key === 'Escape');
    closeAllModals();
});


//Drag Feature
function makeDraggable(modal){
    const header = modal.querySelector('.modal-header');
    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        document.body.classList.add('dragging');
        offsetX = e.clientX - modal.offsetLeft;
        offsetY = e.clientY - modal.offsetTop;
        e.stopPropagation();
    });

    document.addEventListener('mouseup', () =>{
        isDragging = false;
        document.body.classList.remove('dragging');
    });

    document.addEventListener('mousemove', (e) => {
        if(isDragging){
            modal.style.left = (e.clientX - offsetX) + 'px';
            modal.style.top = (e.clientY - offsetY) + 'px';
        }
    })
}

document.querySelectorAll('.modal').forEach(makeDraggable);