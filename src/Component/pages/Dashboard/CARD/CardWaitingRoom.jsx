/* eslint-disable no-unused-vars */

import { AnimatePresence, motion } from 'framer-motion'
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Zoom } from '@mui/material';
export default function CardWaitingRoom({ appointments, setAppointments }) {

  
  const moveToRight = (id) => {
  // 
  const isAnyTreatmentActive = appointments.some(a => a.status === "right");

  if (isAnyTreatmentActive) {
    alert("You have to wait your turn...");
    return; // stop function
  }

  // 
  setAppointments(prev =>
    prev.map(a =>
      a.id === id ? { ...a, status: "right" } : a
    )
  );
};
  return (
    <>
             <AnimatePresence>
         {appointments.filter(a => a.status === "center").map(a => (
           <motion.div
             key={a.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.5 }}
             transition={{ duration: 0.3 }}
           >
               <Card key={a.id} sx={{ maxWidth: {xs:"96%" ,sm:"345"},mb:"2rem",  transition: "0.3s","&:hover": {
             transform: "translateY(-5px)", 
             boxShadow: "0 10px 20px rgba(0,0,0,0.2)", 
           }}}>
           
             <CardContent>
               <Box sx={{display:"flex" ,justifyContent:"space-between"}}> 
                 <Typography gutterBottom variant="h6" component="div">
                 {a.name}
               </Typography>
               <Typography sx={{
                  fontSize:"14px",
                  borderRadius:"2.8px",
                  my:"auto",
                  bgcolor: "rgb(249 115 22)",
                  fontWeight:"bold",
                  color:"#fff",
                  width:"100px",
                  textAlign:"center"
               }} gutterBottom  component="div">
                 {a.preBooked}
               </Typography>
               </Box>
                <Box sx={{display:"flex" ,justifyContent:"space-between"}}>
                 <Typography variant="body2" sx={{ color: 'text.secondary',fontSize:"13px",pb:"20px" }}>
                 {a.service}
               </Typography>
               <Typography sx={{borderRadius:"3px",color:"#2221219a",height:"30px",width:"40px",textAlign:"center",alignItems:"center",bgcolor:"#b3b3b383"}}>{a.blood}</Typography>
               </Box>
              
                <Box sx={{display:"flex" ,pt:"10px",pb:"10px", justifyContent:"space-between"}}>
                <Box sx={{display:"flex",gap:"10px" , alignItems:"center"}}>
                 <PhoneIcon></PhoneIcon>
                <Typography variant="body2" sx={{ color: 'text.secondary',fontSize:"13px", }}>
                 {a.phone}
               </Typography>
                </Box>
               <Typography sx={{bgcolor:"#67b1eea9", width:"100px" ,textAlign:"center"}}>{a.date}</Typography>
               </Box>
                <Divider></Divider>
               
             </CardContent>
             <CardActions  sx={{justifyContent:"center", pt:"0"}}>
               <Button size="medium" sx={{width:"90%",bgcolor:"rgb(249 115 22)",color:"#fff"}} onClick={() => moveToRight(a.id)}>START TREMATMENT</Button>
             
             </CardActions>
           </Card>
           </motion.div>
         ))}
       </AnimatePresence>
    </>
  )
}

