function showPropertyForm() {
  var name = document.getElementById('inputName').value;
  var phoneNumber = document.getElementById('inputPhoneNumber').value;
  var email = document.getElementById('inputEmail').value;
   
  if (name == '' || phoneNumber == '' || email == '') {
    $('#errorModal').modal('show');
    return;
  }


  document.getElementById('quoteForm').style.display = 'none'; // Hide the quote form
  document.getElementById('propertyForm').style.display = 'block'; // Show the property form
}


function submitButtonPressed() {
  console.log('Submit button pressed');

  SendOfferEmail();
}

  // Alusta EmailJS




  // Function to send the email
  function SendOfferEmail() {
    // Kerää lomakkeen tiedot
    var name = document.getElementById('inputName').value;
    var phoneNumber = document.getElementById('inputPhoneNumber').value;
    var email = document.getElementById('inputEmail').value;
    var propertyAddress = document.getElementById('propertyAddress').value;
    var propertyPostCode = document.getElementById('propertyPostCode').value;
    var jobDescription = document.getElementById('jobDescription').value;
    var additionalInfo = document.getElementById('additionalInfo').value;
    var dateTime = document.getElementById('dateTime').value;



    if (!name || !phoneNumber || !email || !propertyAddress || !propertyPostCode || !jobDescription || !dateTime) {
      $('#errorModal').modal('show');
      return; // Lopeta funktio, jos pakollisia kenttiä ei ole täytetty
  }


    // Muodosta viestin sisältö
    var message = `
      Nimi: ${name}
      Puhelinnumero: ${phoneNumber}
      Sähköpostiosoite: ${email}
      Kiinteistön osoite: ${propertyAddress}
      Postinumero: ${propertyPostCode}
      Työnkuva: ${jobDescription}
      Lisätiedot: ${additionalInfo}
      Toive työn ajankohdasta: ${dateTime}
    `;

    console.log(message);

    // Lähetä viesti EmailJS:n avulla
    var templateParams = {
      from_name: name,
      to_name: 'antin arkiapu',
      message_html: message
    };

    // Lähetä viesti EmailJS:n avulla
    emailjs.send('service_7qcchke', 'template_puwe9vi', templateParams)
      .then(function(response) {
        console.log('Sähköposti lähetetty!', response);
        $('#successModal').modal('show');
        showContent('etusivu');
        // Voit lisätä tähän koodia onnistuneen lähetyksen käsittelyä varten, esim. näyttää kiitosviestin käyttäjälle
      })
      .catch(function(error) {
        console.log('Sähköpostin lähetys epäonnistui:', error);
        $('#errorModal').modal('show');
      });
  }
  function showContent(id) {
    // Piilotetaan kaikki sisältölohkot
    var contentSections = document.querySelectorAll('.container');
    contentSections.forEach(function(section) {
        section.style.display = 'none';
    });
    
    // Näytetään haluttu sisältölohko
    console.log('Showing content: ' + id);
    var contentSectionToShow = document.getElementById(id);
    contentSectionToShow.style.display = 'block';
}
  