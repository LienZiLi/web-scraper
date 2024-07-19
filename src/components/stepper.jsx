"use client";

// ---------- imports ----------
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// ---------- steps ----------
const steps = ["爬蟲網址設定", "爬蟲資料設定", "進行爬蟲", "儲存資料"];

// ---------- Stepper function ----------
export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [isDisabled, setIsDisabled] = React.useState(true);

  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    setIsDisabled(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && <StepOne setIsDisabled={setIsDisabled} />}
      {activeStep === 1 && <StepTwo setIsDisabled={setIsDisabled} />}
      {activeStep === 2 && <StepThree setIsDisabled={setIsDisabled} />}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext} disabled={isDisabled}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

// ---------- other functions ----------
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

// ---------- Step One ----------
const StepOne = (prop) => {
  const { setIsDisabled } = prop;
  const [value, setValue] = React.useState("0");
  const [name, setName] = React.useState("");
  const [selector, setSelector] = React.useState("");
  const [file, setFile] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  React.useEffect(() => {
    if (value === "1") {
      setIsDisabled(name === "");
    } else if (value === "2") {
      setIsDisabled(name === "" || selector === "");
    } else if (value === "3") {
      setIsDisabled(file === "");
    }
  }, [value, name, selector, file, setIsDisabled]);

  return (
    <Box sx={{ flexDirection: "column", display: "grid", gap: 2 }}>
      <Box>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            網址形式
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="單一網址且同一頁"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="單一網址但有多頁"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="每筆資料不同網址"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {(value === "1" || value === "2") && (
        <Box>
          <TextField
            required
            id="outlined-controlled-1"
            label="網址"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Box>
      )}
      {value === "2" && (
        <Box>
          <TextField
            required
            id="outlined-controlled-2"
            label="下一頁 選取器"
            value={selector}
            onChange={(event) => setSelector(event.target.value)}
          />
        </Box>
      )}
      {value === "3" && (
        <Box>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => {
                setFile(event.target.value);
                console.log(event.target.value);
              }}
            />
          </Button>
        </Box>
      )}
    </Box>
  );
};

// ---------- Step Two ----------
const StepTwo = (prop) => {
  const { setIsDisabled } = prop;
  const [value, setValue] = React.useState("0");
  const [number, setNumber] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [selector, setSelector] = React.useState("");
  const [nextID, setNextID] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleButtonClick = () => {
    if (selector !== "") {
      setData([...data, { id: nextID, selector: selector }]);
      setSelector("");
      setNextID(nextID + 1);
    }
  };
  React.useEffect(() => {
    if (value === "1") {
      setIsDisabled(data.length === 0);
    }
  }, [data, setIsDisabled]);

  return (
    <Box sx={{ flexDirection: "column", display: "grid", gap: 2 }}>
      <Box>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            資料形式
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="一維" />
            <FormControlLabel value="2" control={<Radio />} label="二維" />
          </RadioGroup>
        </FormControl>
      </Box>
      {value === "1" && (
        <Box>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              資料選取器
            </Typography>
            <Demo>
              <List>
                {data.map((e) => (
                  <ListItem
                    key={e.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          setData(data.filter((a) => a.id !== e.id))
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={e.selector} />
                  </ListItem>
                ))}
              </List>
            </Demo>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <TextField
                required
                size="small"
                id="outlined-controlled-3"
                label="新增選取器"
                value={selector}
                onChange={(event) => setSelector(event.target.value)}
              />
            </Box>
            <Box sx={{ mx: 2 }}>
              <Button variant="outlined" onClick={handleButtonClick}>
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

function createData(selector, data) {
  return { selector, data };
}

// ---------- Step Three ----------
const StepThree = (prop) => {
  const { setIsDisabled } = prop;
  const rows = [createData("a", "123"), createData("b", "456")];
  return (
    <>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        爬第一筆資料進行預覽：
      </Typography>
      <Button variant="outlined">開始爬蟲</Button>
      <TableContainer component={Paper} sx={{ m: 5, width: "auto" }}>
        <Table sx={{ width: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>選取器</TableCell>
              <TableCell align="right">資料</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.selector}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.selector}
                </TableCell>
                <TableCell align="right">{row.data}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
