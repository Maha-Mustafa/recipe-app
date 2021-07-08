import React,{useState, useEffect} from 'react'
import { Container, Typography, TextField, Button, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RecipeCard from './RecipeCard';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "50%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        width: "80%"
      }
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    card:{
     marginTop: theme.spacing(5),
     marginLeft: theme.spacing(3),
     marginRight:theme.spacing(4),
    },
    header:{
      textAlign: 'center',
      textTransform: 'uppercase',
      marginTop: theme.spacing(3)
    }
  }));
const SearchRecipes = () => {
    const classes = useStyles();
    const [search, setSearch] = useState("");
    // state for the recipes we get from api
    const [recipes, setRecipes] = useState([]);
    // state for query
    const [query, setQuery] = useState("");
    const APP_ID = "6f39d32c";
    const APP_KEY = "b318f0bb75e4ab62e293d71d2ebfe5a4";

    const handleChange = (e) =>{
        setSearch(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        setQuery(search);
        setSearch("");
    }

    // only runs when the query is made.Avoids re-rendering
    useEffect(() => {
      getRecipes();
    }, [query]);
    // making api call
    const getRecipes = async() =>{
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      // console.log(data);
      setRecipes(data.hits);
    }
    return (
      <>
        <Typography variant="h5" gutterBottom className={classes.header}>
          Recipe App
        </Typography>
        <Container>
          <div className={classes.paper}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                value={search}
                onChange={handleChange}
                id="search"
                name="search"
                label="Feeling Hungry?"
                variant="outlined"
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
              >
                Search
              </Button>
            </form>
          </div>
          <Grid container spacing={2} justify='space-evenly' className={classes.card}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.recipe.calories} xs={12} sm={6} md={4}>
              <RecipeCard 
               key={recipe.recipe.calories}
               title={recipe.recipe.label}
               calories={recipe.recipe.calories}
               image={recipe.recipe.image}
               ingredients={recipe.recipe.ingredientLines}
               time={recipe.recipe.totalTime}
              />
            </Grid>
          ))}
        </Grid>
        </Container> 
      </>
    );
}

export default SearchRecipes
