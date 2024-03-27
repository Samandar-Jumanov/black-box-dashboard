

import {  Paper, Grid , Typography , Button , Box  }  from "@mui/material"
import { IResponseEmail } from "@/types/responseText";
import DeleteIcon from '@mui/icons-material/Delete';


type IResponseEmailsProps = {
    responseEmails:  IResponseEmail[],
    removeEmail : any 
}

export const UserCreateEmails = ( {responseEmails ,  removeEmail} :  IResponseEmailsProps ) =>{
       return (
         <> 
         
         <Grid container direction="column" spacing={2}>
        {responseEmails.map((email : IResponseEmail  | any , index : string | any  ) => (
          <Grid item key={index} xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main' }}>
                {email.collectionName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {email.responseText}
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                Created by: <Typography variant="body2" component="span" sx={{ fontWeight: 'medium' }}>{email.userEmail}</Typography>
              </Typography>
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                On: {new Date(email.createdAt).toLocaleDateString()}
              </Typography>
              <Box mt={2} display="flex" gap={1}>
                <Button
                  color="error" 
                  size="small"
                  variant="text"
                  onClick={() => removeEmail(email.id)}
                  startIcon={<DeleteIcon />}
                   >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
          </>
       )
}