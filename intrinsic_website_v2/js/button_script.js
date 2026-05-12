document.addEventListener('DOMContentLoaded', function(){
    function setUpButton(buttonID, destination){
        const button = document.getElementById(buttonID);

        if (button) {
            button.addEventListener('click', function(e){
                window.location.href = destination;
            });
            console.log(`Button configured : ID-${buttonID} | Destination-${destination}`);
            
        } else {
            console.warn(`Button ${buttonID} not found on this page`);
        }
    }

    setUpButton('help-button', 'contact.php'); 
    setUpButton('service-button', 'pricing.html');
});