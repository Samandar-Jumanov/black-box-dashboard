
import { TextField, Button, Typography, Container } from '@mui/material';
import { createResponseEmail } from '@/actions/email';

type EmailPropsType = {
    userEmail : string 
}


const EmailForm  =  async ({ userEmail } :EmailPropsType ) => {
 

  const handleCreateEmail = async ( formData :FormData) =>{
           const res = await createResponseEmail(formData , userEmail);
           console.log(res)
  }

  return (
    <Container maxWidth="md" sx={{ marginTop : "40px"}}>
      <form  
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}
        action={handleCreateEmail}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Create Email
        </Typography>
        <TextField
          fullWidth
          required
          margin="normal"
          label="Response Text"
          name="responseText"
        />

        <TextField
          fullWidth
          required
          margin="normal"
          label="Collection Name"
          name="collectionName"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default EmailForm;
