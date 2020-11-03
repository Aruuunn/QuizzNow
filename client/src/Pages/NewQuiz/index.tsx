import React, { useState } from "react";
import {
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Container,
} from "@material-ui/core";

import { NavBar } from "../../components";

interface State {
  title: string;
}

const NewQuiz = () => {
  const [state, setState] = useState<State>({ title: "" });
  return (
    <div>
      <NavBar />
      <Container>
        {" "}
        <Grid
          container
          alignItems="flex-start"
          justify="space-around"
          direction="column"
          style={{ marginTop: "30px" }}
        >
          {" "}
          <TextField
            placeholder="Title"
            required
            inputProps={{
              style: { color: "white", padding: "20px", fontSize: "26px" },
            }}
            color="secondary"
            style={{ marginBottom: "20px" }}
            variant="filled"
          />
          <FormControlLabel
            labelPlacement="start"
            label="Active now"
            style={{ color: "#7a8a9c", display: "block", marginBottom: "20px" }}
            control={<Switch />}
          />
          <Grid container alignItems="center">
            {" "}
            <FormControlLabel
              label="Start Date time "
              style={{
                color: "#7a8a9c",
                marginRight: "20px",
              }}
              labelPlacement="start"
              control={
                <TextField
                  type="datetime-local"
                  inputProps={{
                    style: {
                      color: "white",

                      marginLeft: "20px",
                    },
                  }}
                />
              }
            />
            <FormControlLabel
              label="End Date time "
              labelPlacement="start"
              style={{ color: "#7a8a9c", marginTop: "10px" }}
              control={
                <TextField
                  onChange={(e) => console.log(e.target.value)}
                  type="datetime-local"
                  inputProps={{
                    style: {
                      color: "white",

                      marginLeft: "20px",
                    },
                  }}
                />
              }
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NewQuiz;
