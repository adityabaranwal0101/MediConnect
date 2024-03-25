let doc=document.getElementById("docList");
let spec=document.getElementById("search-input");
async function addDoc() {
    const token = sessionStorage.getItem('token');
    const spec = document.getElementById("search-input").value;
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    try {
      const response = await fetch('/findDoctor', {
        method: 'POST', // Change the method to POST
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ spec }) // Include spec in the request body
      });

      if (response.ok) {
        const doctors = await response.json();
        console.log(doctors);
        doctors.forEach(doctor => {
           document.getElementById('docName').innerHTML=doctor._id;
        });
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error during user data fetch:', error.message);
    }
}


async function bookAppointment() {
    const token = sessionStorage.getItem('token');
    const doctorId = document.getElementById("docName").innerHTML;
    
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    try {
      const response = await fetch('/bookAppointment', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ doctorId }) 
      });

      if (response.ok) {
        console.log("success");
        document.getElementById('bookAppointment').innerHTML="";
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error during user data fetch:', error.message);
    }
}

