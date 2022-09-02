import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Appointments() {
  return (
    <div>
      <div
        className="Card"
        style={{
          width: "80%",
          marginLeft: "10%",
          height: "30%",
          borderRadius: "80px",
        }}
      >
        <h1 style={{ marginLeft: "50px", marginTop: "20px" }}>
          Welcome To My Bookings
        </h1>
      </div>
      <div style={{ marginLeft: "4%", paddingTop: "40px" }}>
        <input
          placeholder="Enter Post Title"
          style={{ borderRadius: "5px", width: "30%" }}
        />
      </div>
      {/* <a href="/adddoctor">
        <Button size="small">Your</Button>{" "}
      </a> */}
      <Card sx={{ maxWidth: 345 }} style={{ marginLeft: "100px" }}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <a href="/viewappointment">
            <Button size="small">View</Button>{" "}
          </a>
        </CardActions>
      </Card>
    </div>
  );
}
