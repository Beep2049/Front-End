// Button link to another page
document.addEventListener("DOMContentLoaded", function(){
    const helpButton = document.querySelectorAll('.learn-more');
    if(helpButton){
        helpButton.forEach(button =>{
            button.addEventListener('click', function(){
                window.location.href = 'contact.php';
            });
        });
    }else{
        console.error("Help Button not found");
    }
})