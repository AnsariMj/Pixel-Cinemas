import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";


const Cards = (props) => {
  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          // maxHeight: 600,
          boxShadow: "0.5px 0.5px 3px #A0AECD",
          backgroundColor: "#0B4141",
        }}
      >
        <CardMedia
          sx={{ height: 400, width: 300 }}
          image={props.image}
          className="hover"
        />

        <CardContent className="" sx={{ color: "#fff", zIndex: "10" }}>
          <Typography className="truncate" gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography className="truncate" variant="body2">
            <strong> Cast : </strong> {props.cast}
          </Typography>
          <Typography className="" variant="body2">
            <strong> Genre : </strong> {props.genre}
          </Typography>
          <Typography className="truncate" variant="body2">
            <strong>Director : </strong> {props.director}
          </Typography>
          {props.release && (
            <Typography variant="body2">
              <strong> Release Date :</strong> {props.release}
            </Typography>
          )}
        </CardContent>

        <CardActions className="flex justify-center  items-center ">
          <Link to={`movie-details/${props.url}`}>
            <Button size="small" className="  button">
              {props.button}
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default Cards;
