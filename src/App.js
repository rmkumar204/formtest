import './App.css';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, IconButton, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment'
import { PhoneAndroid } from '@mui/icons-material';
import { Email } from '@mui/icons-material';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
function App() {

  const [field, setField] = useState(1);
  const [formData, setFormData] = useState({ phoneNumber: '', Email: '', Password: '' })
  const [error, setError] = useState({ isNumbererror: false, isEmailerror: false, isPassworderror: false })

  useEffect(() => {
    console.log(field, formData)
  }, [field, formData])
  const previous = () => {
    setField(prev => prev - 1);
  }
  const next = () => {

    if ((field === 1 && formData.phoneNumber.length !== 10)) {
      setError(prev => ({
        ...prev,
        isNumbererror: true
      }))
    }
    else if ((field === 2 && !validateEmail(formData.Email))) {
      setError(prev => ({
        ...prev,
        isEmailerror: true
      }))
    }
    else if ((field === 3 && !validatePassword(formData.Password))) {
      setError(prev => ({
        ...prev,
        isPassworderror: true
      }))
    }
    else {
      setField(prev => prev + 1)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData(prev => ({ ...prev, phoneNumber: '', Email: '', Password: '' }))
    setField(prev => prev - 3);
  }
  const handleChange = (e) => {
    setError(prev => ({
      ...prev,
      isNumbererror: false,
      isEmailerror: false,
      isPassworderror: false
    }))
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const numbersonly = (e) => {
    var regex = new RegExp("^[0-9]+$");
    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!regex.test(key)) {
      e.preventDefault();
      return false;
    }
  }
  const validateEmail = (email) => {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  const validatePassword = (password) => {
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!\s)[A-Za-z\d@$!%*?&]{8,}$/;
    if (pattern.test(password)) {
      return true;
    } else {
      return false;
    }
  }

 

  const showFormFields = () => {
    switch (field) {
      case 1:
        return (
          <div className='fieldsection'>
            <div className='setwidth'>
              <TextField className='setfieldwidth'
                required
                error={error.isNumbererror}
                id='outlined-required-error-helper-text '
                helperText={error.isNumbererror ? 'Please enter 10 digit number' : ''}
                label='Phone Number'
                type='text'
                name='phoneNumber'
                InputProps={
                  {
                    
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneAndroid />
                      </InputAdornment>
                    ),
                   inputProps:{
                    minLength: 10,
                    maxLength: 10,
                   }
                  }
                }
                color="secondary"
                onChange={handleChange}
                onKeyPress={(e) => numbersonly(e)}
                value={formData.phoneNumber}
                placeholder='Enter phone number'

              />
             
            </div>
            <div style={{ width: '80%', textAlign: "right" }}>
              <Button style={{ width: '100px', backgroundColor: 'red' }} className='buttons' variant='contained' onClick={next}>Next</Button>
            </div>

          </div>
        );
      case 2:
        return (
          <div className='fieldsection'>
            <div className='setwidth'>
              <TextField className='setfieldwidth'

                required
                error={error.isEmailerror}
                id='outlined-required-error-helper-text'
                helperText={error.isEmailerror ? 'invalid email' : ""}
                label='Email'
                type='email'
                name='Email'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                placeholder='abc123@gmail.com'
                onChange={handleChange}
                color="secondary"
                value={formData.Email}
              />
            </div>
            <div className='buttonsection'>

              <Button className='buttons' variant='contained' onClick={previous}>Previous</Button>
              <Button className='buttons' style={{ backgroundColor: 'red' }} variant='contained' onClick={next}>Next</Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className='fieldsection'>
            <div className='setwidth'>
              <TextField className='setfieldwidth'
                required
                error={error.isPassworderror}
                id='outlined-required-error-helper-text'
                helperText={error.isPassworderror ? 'uppercase, lowercase,alphanumeric and minimum 8 characters required' : ''}
                label='Password'
                type='password'
                placeholder='Tt2@asfds'
                name='Password'
                onChange={handleChange}
                color="secondary"
                value={formData.Password}
              />
            </div>
            <div className='buttonsection'>
              <Button className='buttons' variant='contained' onClick={previous}>Previous</Button>
              <Button className='buttons' style={{ backgroundColor: 'red' }} variant='contained' onClick={next}>Next</Button>

            </div>
          </div>
        );
      case 4:
        return (
          <div className='fieldsection' style={{ color: 'blue', backgroundColor: 'transparent', borderRadius: '15px' }}>
            <div className='setwidth' >
              <p >Please Submit the form</p>
              <Button className='buttons' variant='contained' type='submit' >Submit</Button>

            </div>
          </div>
        )
      default:
        // code block
        return null;
    }
  }

  return (
    <div className="App">
      <Box>
        <form onSubmit={handleSubmit} className='formsection' autoComplete='on'>
          {showFormFields()}
        </form>
      </Box>
    </div>
  );
}

export default App;
