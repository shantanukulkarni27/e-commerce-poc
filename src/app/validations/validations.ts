export const Validations = {
   validate(values){
    const errors = {};
  
    if ('username' in values) {
      if (!values.username) {
        errors.username = "Username is required";
      }
    }
  
    if ('email' in values) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!emailPattern.test(values.email)) {
        errors.email = "Email is invalid";
      }
    }
  
    if ('password' in values) {
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    }
  
    if ('confirmPassword' in values) {
      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
      } else if (values.password && values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }
  
    return errors;
   },
   isValidUsername(username) {
    return typeof username === 'string' && username.trim().length >= 3;
  },

  isValidPassword(password) {
    return typeof password === 'string' && password.length >= 6;
  }
    
  };
  