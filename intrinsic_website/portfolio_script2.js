document.addEventListener('DOMContentLoaded', function(){
    const helpButton = document.getElementById('learn-more');

    if(helpButton){
        helpButton.addEventListener('click', function(){
            window.location.href='contact.html';
        });

    }else{
        console.error("Help Button not found");
    }   
});