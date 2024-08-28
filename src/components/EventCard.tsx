import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { textSeparation } from '../lib/utils';




const EventCard = ({ event }: EventCardProps) => {
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
        </CardActionArea>
        <CardActions >
          <Button size="small" color="primary">
            Details
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default EventCard