// Button link to another page
document.addEventListener('DOMContentLoaded', function(){
    const helpButton = document.getElementById('help-button');

    if(helpButton){
        helpButton.addEventListener('click', function(){
            window.location.href='contact.php';
        });
    }else{
        console.error("Help Button not found");
    }   
});