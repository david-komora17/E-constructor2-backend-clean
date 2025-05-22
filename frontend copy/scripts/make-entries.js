document.getElementById('propertyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    const res = await fetch('http://localhost:5000/api/property/register', {
      method: 'POST',
      body: formData
    });
  
    const data = await res.json();
    alert(data.message || data.error);
  });
  