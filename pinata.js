const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNjNmNDQ3MC01MmU0LTQ5YzItYTVlZS03NDQ5YWIxYjUxYzQiLCJlbWFpbCI6ImpveXlhbXNpNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDc5NTI3OTAzMWI2YWFlNDU3NzQiLCJzY29wZWRLZXlTZWNyZXQiOiJlYjUyZGY5ODE3NjE0NmEyZTliYjFiOTdjMDE2ODcxZDI1YjgwYTFmMTlmOGVkYTQ3NTBiMzc5ZjY3YmI2MDNmIiwiaWF0IjoxNzA5MTE4ODU2fQ.rMMcy9eP38grnbn7n480szaDQ7aG__oOg1WI7VX1FCw'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "Chaton.jpeg";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'Chaton',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()