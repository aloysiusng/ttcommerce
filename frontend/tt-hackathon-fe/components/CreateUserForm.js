import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleCreateUser } from "../utils/login-service";

const CreateUserForm = ({ userType, handleCreateFormModalClose }) => {
  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  // all users
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  // tiktoker
  const [tiktokUsername, setTiktokUsername] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64img = ev.target.result;
        setImageBase64(base64img);
        console.log(base64img);
      };
      reader.readAsDataURL(file);
    }
  };
  // supplier
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit() {
    if (password != confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    var body;
    if (userType == "tiktoker") {
      body = {
        email: email,
        password: password,
        name: username,
        username: tiktokUsername,
        type: userType,
        image: imageBase64.slice(23),
      };
    } else {
      body = {
        email: email,
        password: password,
        name: username,
        description: description,
        category: category,
        type: userType,
      };
    }
    handleCreateUser(body)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          handleCreateFormModalClose;
          toast.success("Your account has been created successfully, please log in!");
        } else {
          handleCreateFormModalClose;
          toast.error("Error creating user");
        }
      })
      .catch((err) => {
        console.log(err);
        handleCreateFormModalClose;
        toast.error("Error creating user");
      });
  }
  return (
    <Box display="flex">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Sign up as {userType}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <TextField label="Name" variant="outlined" value={username} onChange={() => setUsername(event.target.value)} fullWidth margin="normal" required />
        </Grid>

        {userType == "supplier" ? (
          <>
            <Grid xs={12}>
              <TextField label="Description of supplies" variant="outlined" value={description} onChange={() => setDescription(event.target.value)} multiline maxRows={4} fullWidth margin="normal" required />
            </Grid>
            <Grid xs={12}>
              <TextField label="Category of supplies" variant="outlined" value={category} onChange={() => setCategory(event.target.value)} fullWidth margin="normal" required />
            </Grid>
          </>
        ) : (
          <Grid xs={12}>
            <TextField label="TikTok Username" variant="outlined" value={tiktokUsername} onChange={() => setTiktokUsername(event.target.value)} fullWidth margin="normal" required />
          </Grid>
        )}

        <Grid xs={12}>
          <TextField label="Email" variant="outlined" value={email} onChange={() => setEmail(event.target.value)} fullWidth margin="normal" required />
        </Grid>
        <Grid xs={12}>
          <TextField label="Password" variant="outlined" value={password} onChange={() => setPassword(event.target.value)} type="password" fullWidth margin="normal" required />
        </Grid>
        <Grid xs={12}>
          <TextField label="Confirm password" variant="outlined" value={confirmPassword} onChange={() => setConfirmPassword(event.target.value)} type="password" fullWidth margin="normal" required />
        </Grid>
        {userType == "tiktoker" ? (
          <Grid xs={12}>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
              Upload a profile picture
              <VisuallyHiddenInput type="file" accept="image/*" value={imageBase64} onChange={handleImageUpload} margin="normal" required />
            </Button>
          </Grid>
        ) : (
          ""
        )}

        <Grid xs={12}>
          <Button variant="contained" size="large" sx={{ mx: 4, backgroundColor: "#FE2C55" }} onClick={handleSubmit}>
            Create account
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CreateUserForm;
