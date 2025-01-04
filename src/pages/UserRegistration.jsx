import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  LinkedIn,
  School
} from '@mui/icons-material';

// Moringa color scheme for consistent branding
const colors = {
  primary: '#0A1F44',    // Navy blue for main elements
  secondary: '#F05A28',  // Orange for accents and calls-to-action
  background: '#FFF5F2', // Light peach for backgrounds
  white: '#FFFFFF',      // White for contrast
  divider: 'rgba(240, 90, 40, 0.12)' // Semi-transparent orange for subtle separators
};

const UserRegistration = () => {
  const navigate = useNavigate();
  
  // State management for form data and UI controls
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    graduationYear: '',
    course: '',
    currentRole: '',
    company: ''
  });
  const [errors, setErrors] = useState({});

  // Available courses at Moringa School
  const courses = [
    'Software Engineering',
    'Data Science',
    'UI/UX Design',
    'Product Design',
    'Cybersecurity'
  ];

  // Generate graduation years (last 5 years)
  const years = Array.from(
    {length: 5}, 
    (_, i) => new Date().getFullYear() - i
  );

  // Handle all form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically make an API call to register the user
      console.log('Form submitted:', formData);
      navigate('/dashboard'); // Redirect to dashboard after successful registration
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: colors.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 3
    }}>
      <Card sx={{ 
        maxWidth: 600,
        width: '100%',
        p: 4,
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <School sx={{ fontSize: 40, color: colors.secondary, mb: 2 }} />
          <Typography variant="h4" sx={{ color: colors.primary, fontWeight: 600 }}>
            Join Moringa Connect
          </Typography>
          <Typography color="text.secondary">
            Connect with fellow alumni and grow together
          </Typography>
        </Box>

        {/* Social Login Options */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button 
            fullWidth 
            variant="outlined"
            startIcon={<Google />}
            sx={{ 
              borderColor: '#EA4335',
              color: '#EA4335',
              '&:hover': { bgcolor: 'rgba(234,67,53,0.04)' }
            }}
          >
            Sign up with Google
          </Button>
          <Button 
            fullWidth 
            variant="outlined"
            startIcon={<LinkedIn />}
            sx={{ 
              borderColor: '#0A66C2',
              color: '#0A66C2',
              '&:hover': { bgcolor: 'rgba(10,102,194,0.04)' }
            }}
          >
            Sign up with LinkedIn
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            or register with email
          </Typography>
        </Divider>

        {/* Registration Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Name Fields */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Box>

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {/* Course & Graduation Year */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                name="course"
                value={formData.course}
                label="Course"
                onChange={handleChange}
              >
                {courses.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Graduation Year</InputLabel>
              <Select
                name="graduationYear"
                value={formData.graduationYear}
                label="Graduation Year"
                onChange={handleChange}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Current Role & Company */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Current Role"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              bgcolor: colors.secondary,
              '&:hover': { bgcolor: colors.primary },
              mt: 2
            }}
          >
            Create Account
          </Button>

          {/* Sign In Link */}
          <Typography 
            variant="body2" 
            align="center"
            sx={{ mt: 2 }}
          >
            Already have an account?{' '}
            <Typography
              component="span"
              onClick={() => navigate('/login')}
              sx={{ 
                color: colors.secondary,
                cursor: 'pointer',
                '&:hover': { color: colors.primary }
              }}
            >
              Sign In
            </Typography>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default UserRegistration;