// Button link to another page
document.addEventListener('DOMContentLoaded', function(){
    const helpButton = document.getElementById('service-button');

    if(helpButton){
        helpButton.addEventListener('click', function(){
            window.location.href='pricing.html';
        });

    }else{
        console.error("Help Button not found");
    }   
});