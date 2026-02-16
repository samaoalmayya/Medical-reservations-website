/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion'
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography, Zoom } from '@mui/material';

export default function CrdCurrentlyTreating ({ appointments, setAppointments }) {
    // function for delete
    const deleteAppointment = (id) => {
      setAppointments(prev =>
        prev.filter(a => a.id !== id)
      );
    };
  return (
    <>
         <AnimatePresence>
         {appointments.filter(a => a.status === "right").map(a => (
           <motion.div
             key={a.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.5 }}
             transition={{ duration: 0.3 }}
           >
        <Card key={a.id} sx={{ maxWidth: {xs:"96%" ,sm:"345"},height:"250px" ,borderRadius:"50px" ,bgcolor:"#0f172a",
             transition: "0.3s","&:hover": {
             transform: "translateY(-5px)", 
             boxShadow: "0 10px 20px rgba(0,0,0,0.2)", 
           }}}>
           
             <CardContent>
               <Box sx={{textAlign:"center"}}> 
                   <Avatar className="active-patient-avatar"
                    sx={{mx:"auto", border:"2px solid #0ef321e3"}} alt={a.name} src="/static/images/avatar/1.jpg" />
                 <Typography sx={{color:"#fff" ,fontSize:"25px"}} gutterBottom variant="h6" component="div">
                 {a.name}
               </Typography>
             
               </Box>
       
                 <Typography sx={{fontSize:"17px",color:"blue", textAlign:"center",bgcolor:"#fff", width:"70%",m:"auto" , borderRadius:"20px"}} gutterBottom  component="div">
                 {a.preBooked}
               </Typography>
             </CardContent>
             <CardActions  sx={{justifyContent:"center", pt:"0"}}>
               <Button size="medium" onClick={() => deleteAppointment(a.id)}   sx={{width:"90%",bgcolor:"rgb(34 197 94)",color:"#000000"}} >FINISH SESSION </Button>
            
             </CardActions>
           </Card>
           </motion.div>
         ))}
       </AnimatePresence>
       
    </>
  )
}
