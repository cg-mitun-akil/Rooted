import React from "react";
import { useState } from "react";
import "./addevent.scss";
import { Grid, TextField } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import joinus_img from "../../images/join_us.jpeg";
import logo from "../../images/logo.png"
import { Link } from "react-router-dom";

const Addevent = () => {
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [nativeLocation, setNativeLocation] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactCountryCode, setContactCountryCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle form submission
  };

  return (
  <div className="addevent">
    <Grid container spacing={2} >
      <Grid item xs = {6} >
      <form onSubmit={handleSubmit}>
      <div className="addimg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Event Type" value={eventType} onChange={(e) => setEventType(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Event Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Native Location" value={nativeLocation} onChange={(e) => setNativeLocation(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Native Language" value={nativeLanguage} onChange={(e) => setNativeLanguage(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline />
        </Grid>
        {/* <Grid item xs={4}>
          <TextField label="Contact Country Code" value={contactCountryCode} onChange={(e) => setContactCountryCode(e.target.value)} />
        </Grid> */}
        <Grid item xs={4}>
            <FormControl variant="outlined">
                <InputLabel id="country-code-label">Country Code</InputLabel>
                <Select
                    labelId="country-code-label"
                    id="country-code"
                    
                    onChange={ (e) => setContactCountryCode(e.target.value) }
                    label="Country Code"
                >
                    <MenuItem value="+1">+1 (United States)</MenuItem>
                    <MenuItem value="+44">+44 (United Kingdom)</MenuItem>
                    <MenuItem value="+81">+81 (Japan)</MenuItem>
                    <MenuItem value="+91">+91 (India)</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField fullWidth label="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" />
        </Grid>
        <Grid item xs={12}>
            <button type="submit">Create Event</button>
        </Grid>
      </Grid>
      </div>
      <br />
      </form>
      </Grid>
      <Grid item xs={2} >
      <Link to="../" className="Link">
        <img
            className="logo2"
            src={logo}
            alt=""
        />
     </Link>
        <h2 className="smily">
            Your next big move
        </h2>
      </Grid>
      </Grid>
    
    </div>
  );
};

export default Addevent;
