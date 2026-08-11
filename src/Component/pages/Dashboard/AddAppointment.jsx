import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import { Box, IconButton, MenuItem, TextField } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { appointmentSchema } from "./validation/appointmentSchema";

export default function AddAppointment({ setAppointments, onClose }) {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      blood: "",
      preBooked: "",
      date: "",
    },
  });

  const addAppointment = (formData) => {
    const newAppointment = {
      id: Date.now(),
      ...formData,
      status: "left",
      service: formData.preBooked,
    };

    setAppointments((prev) => [...prev, newAppointment]);
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(
        (data) => addAppointment(data),
        (errors) => console.log("ERRORS:", errors),
      )}
      className="Add-Info"
    >
      <div className="forme">
        <div className="delete-button">
          <IconButton onClick={onClose}>
            <ClearIcon />
          </IconButton>
        </div>

        <div className="pageForm">
          <h4>New Appointment</h4>

          <div>
            {/* Patient Name */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Patient Name"
                  fullWidth
                  sx={{ mb: "10px" }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {/* Phone + Blood Type */}
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                mb: "10px",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              {/* Phone */}
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    placeholder="0999999999"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      field.onChange(value);
                    }}
                  />
                )}
              />

              {/* Blood Type */}
              <Controller
                name="blood"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    select
                    label="Blood Type"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    SelectProps={{
                      MenuProps: { style: { zIndex: 99999 } },
                    }}
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                  </TextField>
                )}
              />
            </Box>

            {/* Appointment Type */}
            <Controller
              name="preBooked"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Appointment Type"
                  fullWidth
                  sx={{ mb: "10px" }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  SelectProps={{
                    MenuProps: { style: { zIndex: 99999 } },
                  }}
                >
                  <MenuItem value="Pre-booked">Pre-booked</MenuItem>
                  <MenuItem value="Direct Walk-in">Direct Walk-in</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                </TextField>
              )}
            />

            {/* Date */}
            {/* Date */}
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Date"
                  placeholder="DD-MM-YYYY"
                  fullWidth
                  sx={{ mb: "10px" }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={(e) => {
                    let rawDigits = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 8);

                    let day = rawDigits.slice(0, 2);
                    let month = rawDigits.slice(2, 4);
                    let year = rawDigits.slice(4, 8);

                    // تقييد الأيام لـ 31 كحد أقصى
                    if (day.length === 2 && Number(day) > 31) {
                      day = "31";
                    }

                    // تقييد الأشهر لـ 12 كحد أقصى
                    if (month.length === 2 && Number(month) > 12) {
                      month = "12";
                    }

                    // تقييد السنة لـ 2027 كحد أقصى
                    if (year.length === 4 && Number(year) > 2027) {
                      year = "2027";
                    }

                    // إشادة بناء النص مع الفواصل
                    let formattedValue = day;
                    if (month) {
                      formattedValue += `-${month}`;
                    }
                    if (year) {
                      formattedValue += `-${year}`;
                    }

                    field.onChange(formattedValue);
                  }}
                />
              )}
            />

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Button
                type="submit"
                sx={{ bgcolor: "#043797b0", color: "#fff" }}
              >
                Confirm Booking
              </Button>
              <Button
                type="button"
                sx={{ bgcolor: "#043797ab", color: "#fff" }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </form>
  );
}
