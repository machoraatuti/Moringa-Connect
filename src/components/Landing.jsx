import React, { useState } from 'react';
import { 
  Box, Container, Typography, Button, Card, CardContent, 
  Grid, Avatar, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, IconButton, 
  InputAdornment, Tab, Tabs
} from '@mui/material';
import { 
  School, Email, Lock, Person, 
  Visibility, VisibilityOff, Google, LinkedIn 
} from '@mui/icons-material';

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const AuthDialog = ({ open, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          width: '400px',
          p: 2
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', color: colors.primary }}>
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={isSignUp ? 1 : 0}
            onChange={(e, newValue) => setIsSignUp(newValue === 1)}
            centered
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* OAuth Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<Google />}
              sx={{ 
                borderColor: '#EA4335',
                color: '#EA4335',
                '&:hover': { borderColor: '#EA4335', bgcolor: 'rgba(234, 67, 53, 0.04)' }
              }}
            >
              Google
            </Button>
            <Button 
              fullWidth 
              variant="outlined"
              startIcon={<LinkedIn />}
              sx={{ 
                borderColor: '#0A66C2',
                color: '#0A66C2',
                '&:hover': { borderColor: '#0A66C2', bgcolor: 'rgba(10, 102, 194, 0.04)' }
              }}
            >
              LinkedIn
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flex: 1, height: '1px', bgcolor: colors.divider }} />
            <Typography variant="body2" color="text.secondary">or</Typography>
            <Box sx={{ flex: 1, height: '1px', bgcolor: colors.divider }} />
          </Box>

          {isSignUp && (
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: colors.primary }} />
                  </InputAdornment>
                )
              }}
            />
          )}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: colors.primary }} />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {!isSignUp && (
            <Typography 
              variant="body2" 
              color={colors.secondary}
              sx={{ cursor: 'pointer', textAlign: 'right' }}
            >
              Forgot Password?
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ 
              bgcolor: colors.secondary,
              '&:hover': { bgcolor: colors.primary },
              mt: 2
            }}
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const PlatformLanding = () => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <Box sx={{ bgcolor: colors.background, minHeight: '100vh' }}>
      {/* Navigation */}
      <Box 
        sx={{ 
          py: 2, 
          px: 4, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          width: '100%',
          bgcolor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          zIndex: 1000
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <School sx={{ color: colors.secondary, mr: 1 }} />
          <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600 }}>
            Moringa Connect
          </Typography>
        </Box>

        <Button 
          variant="contained"
          onClick={() => setAuthOpen(true)}
          sx={{ 
            bgcolor: colors.secondary,
            '&:hover': { bgcolor: colors.primary }
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 15 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700, 
                color: colors.primary,
                mb: 2,
                lineHeight: 1.2
              }}
            >
              Connect with Moringa Alumni Community
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                lineHeight: 1.5
              }}
            >
              Network, share opportunities, and grow together with fellow tech professionals
            </Typography>
            <Button 
              variant="contained"
              size="large"
              onClick={() => setAuthOpen(true)}
              sx={{ 
                bgcolor: colors.secondary,
                '&:hover': { bgcolor: colors.primary },
                px: 4,
                py: 1.5
              }}
            >
              Join Now
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Add your hero image here */}
          </Grid>
        </Grid>
      </Container>

      {/* Auth Dialog */}
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </Box>
  );
};

export default PlatformLanding;