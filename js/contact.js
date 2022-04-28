document.getElementById("submitBtn").addEventListener("click", () => {
  let name =
    document.getElementById("firstName").value +
    " " +
    document.getElementById("lastName").value;
  let email = document.getElementById("emailId").value;
  let description = document.getElementById("description").value;

fetch('http://localhost:3000/contact', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
            name: name,
            email: email,
            desc: description,
          })
}).then(res => {
    document.getElementById("firstName").value=''
    document.getElementById("lastName").value=''
    document.getElementById("emailId").value=''
    document.getElementById("description").value=''
    alert('Successfully Send!!')

})
.catch(err=>{
    alert('Error Occured')
})

})