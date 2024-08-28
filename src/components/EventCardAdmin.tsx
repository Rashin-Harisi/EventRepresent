import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { textSeparation } from '../lib/utils';




const EventCardAdmin = ({ event }: any) => {
    console.log(event.quantity);
  const { title, imageUrl, date } = event
 
  const newTitle = textSeparation(title);


  return (
    <div>
      <Card sx={{ maxWidth: 345, height: 400 }}>
        <CardActionArea className='h-[350px]'>
          <CardContent>
            <Typography gutterBottom component="div" className='flex gap-3 items-center h-[20px]'>
              <img src='calendar.svg' alt='calender' width={20} height={20} />
              {date}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            className='h-[220px]'
            image={imageUrl}
            alt="cover image"

          />
          <CardContent>
            <Typography gutterBottom component="div" variant="h6" className="font-bold">
              {newTitle.length === title.length ? title : `${newTitle} ...`}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography gutterBottom component="div" className="font-bold">
              <p className='bg-[#00cc69] flex justify-around items-center h-[30px] rounded-lg text-white font-semibold'>Participants Number :<span>{!event.quantity ? "0" : event.quantity}</span> </p>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default EventCardAdmin