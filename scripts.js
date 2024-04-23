//funktio tarjouspyynnön kiinteistön tiedot lomakkeen näyttämiselle
function showPropertyForm() {
  var name = document.getElementById('inputName').value;
  var phoneNumber = document.getElementById('inputPhoneNumber').value;
  var email = document.getElementById('inputEmail').value;
    // Tarkistetaan, että pakolliset kentät on täytetty
  if (name == '' || phoneNumber == '' || email == '') {
    $('#errorModal').modal('show');
    return;
  }

//Piilotetaan tilaajan tiedot ja näytetään kiinteistön tiedot lomake
  document.getElementById('quoteForm').style.display = 'none'; // Hide the quote form
  document.getElementById('propertyForm').style.display = 'block'; // Show the property form
}


function submitButtonPressed() {
  console.log('Submit button pressed');


  //Tarkistetaan, ettei päivämäärä ole menneisyydessä
  var dateTimeInput = document.getElementById('dateTime');
  var selectedDateTime = new Date(dateTimeInput.value);
  var currentDate = new Date();
  if (selectedDateTime < currentDate) {
    $('#errorDateModal').modal('show');
    return;
  }
 //kutsutaan funktiota, joka lähettää sähköpostin
  SendOfferEmail();
}





  // Sähköpostin lähetysfunktio
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

    // Kootaan emailjs:n kutsufunktion parametrit
    var templateParams = {
      from_name: name,
      to_name: 'antin arkiapu',
      message_html: message
    };

    // Lähetä viesti EmailJS:n avulla
    emailjs.send('service_93uzzt7', 'template_i3hppzs', templateParams)
    // Lähetys onnistui
      .then(function(response) {
        console.log('Sähköposti lähetetty!', response);
        $('#successModal').modal('show');
        showContent('etusivu');
      })
      // Lähetys epäonnistui
      .catch(function(error) {
        console.log('Sähköpostin lähetys epäonnistui:', error);
        $('#errorModal').modal('show');
      });
  }
  //funktio sivun navbaarin toiminnallisuudelle
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
  