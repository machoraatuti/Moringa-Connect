import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  TextField,
  Button,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Tabs,
  Tab,
  Input,
} from "@mui/material";
import {
  Close,
  Edit,
  CameraAlt,
  PhotoLibrary,
  Delete,
} from "@mui/icons-material";

const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF",
};

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState(0); // 0 for Login, 1 for Sign-Up
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [editingPicture, setEditingPicture] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150",
    description: "Passionate about technology and education.",
    location: "Nairobi, Kenya",
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAuthenticated");
    if (isLoggedIn) {
      setIsAuthenticated(true);
      setUser(mockUser);
      setDescription(mockUser.description);
      setLocation(mockUser.location);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    setUser(mockUser);
    setAuthModalOpen(false);
  };

  const handleSignUp = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    setUser(mockUser);
    setAuthModalOpen(false);
  };

  const handleSave = () => {
    setEditing(false);
    if (user) {
      setUser((prevUser) => ({
        ...prevUser,
        description: description || prevUser.description,
        location: location || prevUser.location,
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setUser(null);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (oldPassword !== "mockPassword") {
      alert("Old password is incorrect!");
      return;
    }
    alert("Password successfully changed!");
    setChangingPassword(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleDeleteAccount = () => {
    alert("Account successfully deleted!");
    setDeletingAccount(false);
    handleLogout();
  };

  const handleProfilePictureChange = () => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: newProfilePicture || prevUser.avatar,
    }));
    setEditingPicture(false);
    setNewProfilePicture("");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewProfilePicture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = () => {
    alert(
      "Camera functionality is not yet implemented. Placeholder for integration."
    );
  };

  const handleDeletePhoto = () => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: "https://via.placeholder.com/150",
    }));
    setEditingPicture(false);
  };

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: moringaColors.background,
          p: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: moringaColors.primary, mb: 3, textAlign: "center" }}
        >
          Welcome!
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: moringaColors.primary, mb: 2, textAlign: "center" }}
        >
          Please log in or sign up to access your profile.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: moringaColors.primary,
            "&:hover": { bgcolor: moringaColors.secondary },
          }}
          onClick={() => setAuthModalOpen(true)}
        >
          Log In / Sign Up
        </Button>

        {/* Authentication Modal */}
        <Modal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={authModalOpen}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: moringaColors.white,
                boxShadow: 24,
                p: 4,
                borderRadius: "8px",
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={() => setAuthModalOpen(false)}
              >
                <Close />
              </IconButton>

              <Tabs
                value={authTab}
                onChange={(e, newValue) => setAuthTab(newValue)}
                textColor="primary"
                indicatorColor="primary"
                variant="fullWidth"
                sx={{ mb: 2 }}
              >
                <Tab label="Login" />
                <Tab label="Sign-Up" />
              </Tabs>

              {authTab === 0 ? (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Login
                  </Typography>
                  <TextField fullWidth label="Email" sx={{ mb: 2 }} />
                  <TextField fullWidth label="Password" sx={{ mb: 2 }} />
                  <Button onClick={handleLogin} variant="contained">
                    Login
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Sign-Up
                  </Typography>
                  <TextField fullWidth label="Name" sx={{ mb: 2 }} />
                  <TextField fullWidth label="Email" sx={{ mb: 2 }} />
                  <TextField fullWidth label="Password" sx={{ mb: 2 }} />
                  <Button onClick={handleSignUp} variant="contained">
                    Sign-Up
                  </Button>
                </Box>
              )}
            </Box>
          </Fade>
        </Modal>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: moringaColors.background,
        minHeight: "100vh",
        p: 4,
        maxWidth: "800px",
        margin: "0 auto",
        bgcolor: moringaColors.white,
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 120, height: 120, margin: "0 auto", mb: 2 }}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: moringaColors.primary,
              color: moringaColors.white,
            }}
            onClick={() => setEditingPicture(true)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="h5" sx={{ color: moringaColors.primary }}>
          {user.name}
        </Typography>
        <Typography sx={{ color: moringaColors.primary }}>
          {user.email}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" sx={{ color: moringaColors.primary }}>
          About Me
        </Typography>
        {editing ? (
          <>
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </>
        ) : (
          <>
            <Typography sx={{ color: moringaColors.primary, mb: 1 }}>
              {description || "No description added yet."}
            </Typography>
            <Typography sx={{ color: moringaColors.primary }}>
              Location: {location || "No location added yet."}
            </Typography>
          </>
        )}
        <Button
          variant="contained"
          onClick={editing ? handleSave : () => setEditing(true)}
          sx={{ mt: 2 }}
        >
          {editing ? "Save" : "Edit"}
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Button
        variant="contained"
        sx={{ bgcolor: moringaColors.primary, mb: 2 }}
        onClick={() => setChangingPassword(true)}
        fullWidth
      >
        Change Password
      </Button>

      <Button
        variant="contained"
        color="error"
        sx={{ mb: 2 }}
        onClick={() => setDeletingAccount(true)}
        fullWidth
      >
        Delete Account
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        fullWidth
      >
        Logout
      </Button>

      <Modal
        open={editingPicture}
        onClose={() => setEditingPicture(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={editingPicture}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: moringaColors.white,
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, color: moringaColors.primary }}
            >
              Update Profile Picture
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<CameraAlt />}
                onClick={handleTakePhoto}
                sx={{
                  color: moringaColors.primary,
                  borderColor: moringaColors.primary,
                  "&:hover": {
                    borderColor: moringaColors.secondary,
                    color: moringaColors.secondary,
                  },
                }}
              >
                Take Photo
              </Button>
              <Button
                variant="outlined"
                startIcon={<PhotoLibrary />}
                component="label"
                sx={{
                  color: moringaColors.primary,
                  borderColor: moringaColors.primary,
                  "&:hover": {
                    borderColor: moringaColors.secondary,
                    color: moringaColors.secondary,
                  },
                }}
              >
                Choose from Device
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  sx={{ display: "none" }}
                />
              </Button>
              <Button
                variant="outlined"
                startIcon={<Delete />}
                onClick={handleDeletePhoto}
                color="error"
              >
                Delete Current Photo
              </Button>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: moringaColors.secondary,
                "&:hover": { bgcolor: moringaColors.primary },
              }}
              onClick={handleProfilePictureChange}
            >
              Save Changes
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Profile;
