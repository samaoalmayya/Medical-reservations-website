import AddIcon from "@mui/icons-material/Add";

// @ts-ignore
import "./Dashboard.css";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Fab, Tooltip } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import CardNotArrived from "./CARD/CardNotArrived";
import CardWaitingRoom from "./CARD/CardWaitingRoom";
import CrdCurrentlyTreating from "./CARD/CrdCurrentlyTreating ";
import { Person } from "@mui/icons-material";
import FastForwardIcon from "@mui/icons-material/FastForward";
import AddAppointment from "./AddAppointment";
export default function Dashboard() {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");
    return savedAppointments
      ? JSON.parse(savedAppointments)
      : [
          {
            id: 1,
            name: "James Miller",
            service: "Teeth whitening",
            phone: "0994090576",
            date: "15-02-2026",
            blood: "A+",
            status: "left",
            preBooked: "Pre-booked",
          },
          {
            id: 2,
            name: "Emma Wilson",
            service: "Dental checkup",
            phone: "0991234567",
            date: "15-02-2026",
            blood: "O+",
            status: "center",
            preBooked: "Pre-booked",
          },
          {
            id: 3,
            name: "Michael Brown",
            service: "Root canal treatment",
            phone: "0998765432",
            date: "15-02-2026",
            blood: "B+",
            status: "center",
            preBooked: "Direct Walk-in",
          },
          {
            id: 4,
            name: "Sophia Davis",
            service: "Dental cleaning",
            phone: "0997654321",
            date: "15-02-2026",
            blood: "AB+",
            status: "right",
            preBooked: "Pre-booked",
          },
          {
            id: 5,
            name: "Daniel Smith",
            service: "Tooth extraction",
            phone: "0996543210",
            date: "15-02-2026",
            blood: "A-",
            status: "left",
            preBooked: "Emergency",
          },
        ];
  });

  // function for forme
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);
  return (
    <section className="dashboard-wrapper">
      <div className="dashboard-content">
        <div className="left-section">
          <div className="left-sectionTitle flex">
            <EventNoteIcon />
            <div className="Title">Booked / Not Arrived</div>
          </div>

          <CardNotArrived
            appointments={appointments}
            setAppointments={setAppointments}
          />
        </div>

        <div className="center-section">
          <div className="center-sectionTitle flex">
            <Person />
            <div className="Title">Waiting Room</div>
          </div>

          <CardWaitingRoom
            appointments={appointments}
            setAppointments={setAppointments}
          />
        </div>

        <div className="right-section">
          <div className="right-sectionTitle flex">
            <FastForwardIcon />
            <div className="Title">Currently Treating</div>
          </div>

          <CrdCurrentlyTreating
            appointments={appointments}
            setAppointments={setAppointments}
          />
        </div>
      </div>

      {showForm && (
        <AddAppointment
          setAppointments={setAppointments}
          onClose={() => setShowForm(false)}
        />
      )}

      <Tooltip title="Add new appointment" arrow>
        <Fab
          color="primary"
          onClick={() => setShowForm(true)}
          sx={{
            position: "fixed",
            bottom: { xs: 80, sm: 25 },
            right: 25,
            zIndex: 999,
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </section>
  );
}
