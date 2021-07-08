import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import {Card, CardHeader, CardMedia, CardContent,CardActions, Typography, IconButton, Collapse, Grid} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}))
const RecipeCard = ({title, calories, image, ingredients, time}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const classes = useStyles();
    return (
          <Card className={classes.root}>
            <CardHeader title={title} subheader={calories} />
            <CardMedia image={image} className={classes.media} />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Total Time: {time} mins
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Ingredients:</Typography>
                <Typography paragraph>{ingredients}</Typography>
              </CardContent>
            </Collapse>
          </Card>
    );
}

export default RecipeCard
