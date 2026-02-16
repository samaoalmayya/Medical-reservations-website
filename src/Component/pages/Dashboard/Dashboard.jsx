import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import "./Dashboard.css"
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Avatar, Box, Divider, Fab, IconButton, TextField, Tooltip } from '@mui/material';
import  { useState } from 'react'
import {  useEffect } from 'react';
import CardNotArrived from './CARD/CardNotArrived';
import CardWaitingRoom from './CARD/CardWaitingRoom';
import CrdCurrentlyTreating from './CARD/CrdCurrentlyTreating ';
import { Person } from '@mui/icons-material';
import FastForwardIcon from '@mui/icons-material/FastForward';
export default function Dashboard() {
    
  const [appointments, setAppointments] = useState(() => {
  const savedAppointments = localStorage.getItem("appointments");
  return savedAppointments ? JSON.parse(savedAppointments) :[
  {
    id: 1,
    name: "James Miller",
    service: "Teeth whitening after root canal treatment",
    phone: "+963 994090576",
    date: "15/02/2026",
    blood:"A+",
    status: "left",
    preBooked:"preBooked",
  }
]; 
});


// function for forme
const [showForm, setShowForm] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  phone: "",
  blood: "",
  preBooked: "",
  date: ""
});

const addAppointment = () => {
  const newAppointment = {
    id: Date.now(),
    ...formData,
    status: "left",
   service: formData.preBooked,
  };

  setAppointments(prev => [...prev, newAppointment]);

  // تفريغ الفورم
  setFormData({
    name: "",
    phone: "",
    blood: "",
    preBooked: "",
    date: ""
  });

  setShowForm(false);
};
useEffect(() => {
  localStorage.setItem("appointments", JSON.stringify(appointments));
}, [appointments]);
  return (
    <section  className=' flex' >
     <div className='left-section'>
      <div className='left-sectionTitle flex' >
         <EventNoteIcon></EventNoteIcon>
         <div className='Title'>
            Booked / Not Arrived
         </div>
       
      </div>
    {/* start card left */}

    <CardNotArrived appointments={appointments} setAppointments={setAppointments}></CardNotArrived>
 
    {/* end card left */}



     </div>
     <div className='center-section'>
      <div className='center-sectionTitle flex' >
         <Person></Person>
         <div className='Title'>
            Waiting Room 
         </div>
      </div>



{/* start card waiting */}
   <CardWaitingRoom appointments={appointments} setAppointments={setAppointments}></CardWaitingRoom>
     </div>
     <div className='right-section'>
      <div className='right-sectionTitle flex' >
         <FastForwardIcon></FastForwardIcon>
         <div className='Title'>
            Currently Treating 
         </div>
      </div>
   {/* end card waiting */}

 {/* start card Currently Treating  */}
 
<CrdCurrentlyTreating appointments={appointments} setAppointments={setAppointments}></CrdCurrentlyTreating>

 {/* end card Currently Treating  */}

     </div>
     {/* start forme */}
      
      {showForm && (
               <form onSubmit={(e) => {
    e.preventDefault(); // لمنع تحديث الصفحة
    addAppointment();
}} className='Add-Info border'>
     <div className='forme'>
       <div className='delete-button'>
       <IconButton onClick={() => setShowForm(false)}>
  <ClearIcon />
</IconButton>
        </div>
       <div className='pageForm'>
      
        <h4>New Appointment</h4>
       
       <div>
        <TextField    
         onChange={(e) =>
          setFormData({...formData, name: e.target.value})
           }           
         required sx={{mb:"10px" ,width:"100%"}}
           id="outlined-basic" 
           label="Patient Name"
           type="text"
           value={formData.name || ''}
           fullWidth
            variant="outlined" />
         <Box sx={{display:"flex" ,gap:"10px", mb:"10px",flexDirection: { xs: "column", sm: "row" }}}>
        <TextField
          required 
          id="outlined-basic"
          placeholder="0999999999 " 
           label="Phone"
           type="number"
           value={formData.phone || ''}
            variant="outlined" 
              onChange={(e) =>
             setFormData({...formData, phone: e.target.value})
             }
             />
        <TextField  
          onChange={(e) =>
          setFormData({...formData, blood: e.target.value})
         }  
        required id="outlined-basic"
        value={formData.blood || ''}
        type="text"
         label="Blood Type"
         placeholder="EX: A+ or O+ " 
         variant="outlined" />
        </Box >
        <TextField 
          onChange={(e) =>
         setFormData({...formData, preBooked: e.target.value})
         }
        
        sx={{mb:"10px",width:"100%" }}
        value={formData.preBooked || ''}
          id="outlined-basic" label="Pre-booked" variant="outlined" />
        <TextField
         onChange={(e) =>
        setFormData({...formData, date: e.target.value})
        }
        sx={{mb:"10px",width:"100%"}}  
        id="outlined-basic" label="date" variant="outlined"
        placeholder="DD-MM-YYYY" 
        helperText="Format: Day-Month-Year (e.g. 12-02-2026)"/>
        <Box sx={{display:"flex" ,gap:"20px"}}>
        <Button type="submit"
        sx={{bgcolor:"#043797b0" ,color:"#fff"}} >
        Confirm Booking
        </Button>
        <Button
         sx={{bgcolor:"#043797ab" ,color:"#fff"}}
        onClick={() => setShowForm(false)}>
         Cancel
        </Button>          
        </Box>
       </div>
       </div>
     </div>
    </form>
)}

 
     {/* end forme */}

<Tooltip title="Add new appointment" arrow>
  <Fab
    color="primary"
    onClick={() => setShowForm(true)}
    sx={{
      position: "fixed",
      bottom: { xs: 80, sm: 25 },
      right: 25,
      zIndex: 999
    }}
  >
    <AddIcon />
  </Fab>
</Tooltip>
    </section>
  )
}
