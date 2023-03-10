import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

export default function PlaygroundReview({playgroundData}) {

  const [open, setOpen] = React.useState(false);
  // const [data, setData] = React.useState(null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      author: '',
      rating: '',
      description: '',
      
    }})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = reviewData => {
      const postReview = async() => {
        const url = `http://localhost:8000/playground_api/`
         const headers = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const data = {...reviewData, ...playgroundData}
        console.log(data)
        try {
          const response = await axios.post(url,data,headers)
          handleClose()
        } catch (error) {
         console.error(error) 
        }
        // const response = await axios.post(url,data,headers)
        // console.log('hello',response.data)
        // handleClose()
        // setData(response.data.result.results)
      } 
    postReview()
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add a Review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Review for {playgroundData.park_name}</DialogTitle>
        <DialogContent>
       
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <Controller
        name="author"
        control={control}
        render={({ field }) => <TextField label="Author" {...field} />}

      />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <Controller
        name="rating"
        control={control}
        render={({ field }) => <TextField label="Rating" type="number" min="1" max="5" {...field} />}
      />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <Controller
        name="description"
        control={control}
        render={({ field }) => <TextField label="Description" {...field} />}
      />
      </FormControl>
      
      
      <TextField type="submit" variant="outlined" sx={{ textAlign: 'center' }} />
    </form>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}