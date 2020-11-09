import React, { useState } from "react";
import MomentUtils from '@date-io/moment';
import {
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Container,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

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
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <FormControlLabel
                label="Start Date time "
                style={{
                  color: "#7a8a9c",
                  marginRight: "20px",
                }}
                labelPlacement="start"
                control={<DateTimePicker color="secondary" inputProps={{style:{color:'white',marginLeft:'10px'}}} value={new Date()} onChange={() => null} />}
              />
              <FormControlLabel
                label="End Date time "
                labelPlacement="start"
                style={{ color: "#7a8a9c", marginTop: "10px" }}
                control={<DateTimePicker  color="secondary" inputProps={{style:{color:'white',marginLeft:'10px'}}} value={new Date()} onChange={() => null}/>}
              />
            </MuiPickersUtilsProvider>{" "}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NewQuiz;
