import React, { Component } from "react";
import {
  Typography,
  CardContent,
  Grid,
  Card,
  Container,
  IconButton,
  CardMedia,
  Chip, TextField,

  CssBaseline, CardActionArea
} from "@material-ui/core";
// import _ from "lodash";
// import clsx from "clsx";
import firebase from "../../config/Firebase";
// import Slider from "react-slick";
import Carousel from 'react-material-ui-carousel'
// import Rating from '@material-ui/lab/Rating';
import { Flipper, Flipped } from 'react-flip-toolkit';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import classnames from "classnames";
import { red } from "@material-ui/core/colors";
import SearchIcon from '@material-ui/icons/Search';
import WebIcon from '@material-ui/icons/Web';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StarsIcon from '@material-ui/icons/Stars';
// import landingPageData from "../landingPageData";
import { Link } from "react-router-dom";
import LandingWall from "../../assets/wp3732378-hamburgers-wallpapers.jpg";
import asdasd from "../../assets/ecopetit.cat-bape-wallpaper-113882.png";
import arrw from "../../assets/mt-0448-home-arrow.png";
// import indigo from "@material-ui/core/colors/indigo";
import purple from "@material-ui/core/colors/purple";
import './Home.css'
import Navbar from "../../config/navbar";

// const breakColor = indigo;
// const focusColor = teal;
const stoppedColor = purple;

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textDecoration: "None",
    color: "Black"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  card: {
    background: "none",
    transition: theme.transitions.create(["border-color", "color", "opacity"], {
      duration: theme.transitions.duration.complex
    }),
    "&:hover": {
      background: "#f1f1f1",
      borderColor: stoppedColor[600],
      color: 'rgba(249, 0, 11, 0.85)',
      opacity: 1
    }
  },
  footerDiv: {
    background: "#f1f1f1"
    // marginBottom: '0';
  },
  footerP: {
    marginLeft: 30,
    cursor: "pointer",
    display: "inline-Flex",
    align: "center"
    //
    // padding: '30',
  },
  chip: {
    marginRight: theme.spacing(2),
    display: "inline-Flex",
    align: "left"
  },
  imgs: {
    width: '100%',
    height: '100vh'
  },
  famousHeading: {

    [theme.breakpoints.up("xs")]: {
      // display: "none",
      fontSize: "3rem"
    },
    [theme.breakpoints.up("sm")]: {
      // display: "none",
      fontSize: "6rem",
    },
    textAlign: "center",
    color: 'rgba(0, 0, 0, 0.54)',
    fontFamily: 'MyFont',
    // fontSize: 50
  }
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      shadow: 1,
      left: false,
      auth: false,
      anchorEl: null,
      displayEmail: "",
      value: 2,
      list: [],
      arrOfObj: [{
        iconA: <SearchIcon style={{ fontSize: 50, marginBottom: 5, }} />,
        name: 'Search',
        description: 'You search for whatever you want to eat and we’ll find you the best delivery and takeout restaurants near you'

      }, {
        iconA: <WebIcon style={{ fontSize: 50, marginBottom: 5, }} />,
        name: 'Browse',
        description: ' You can also make it easy for yourself and pick the place with the coolest name or the best coupons.'

      }, {
        iconA: <AssignmentIcon style={{ fontSize: 50, marginBottom: 5, }} />,
        name: 'Select',
        description: 'Take a good look at the menu, click whatever you want to eat and drink, and head to the checkout.'

      }, {
        iconA: <StarsIcon style={{ fontSize: 50, marginBottom: 5, }} />,
        name: 'Enjoy',
        description: 'This is the part where you get to eat your food while basking in the warm glow of time not spent cooking.'

      },],
      field: 'value',




    };
    //creates a reference for your element to use
    this.myDivToFocus = React.createRef()
  }

  handleOnClick = (event) => {
    //.current is verification that your element has rendered
    if (this.myDivToFocus.current) {
      this.myDivToFocus.current.scrollIntoView({
        behavior: "smooth",
        // block: "nearest"
      })
    }
  }



  search = (e) => {
    const { list } = this.state;
    const textSearch = e.target.value;
    console.log(textSearch)
    const result = list.filter(elem => {
      // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
      return elem.resturantName.toLowerCase().indexOf(textSearch) >= 0;


    });
    this.setState({
      result,
      textSearch
    });
    console.log(result)
  }
  chinese = (e) => {
    const { list } = this.state;
    const textSearch = 'chinese';
    console.log(textSearch)
    const result = list.filter(elem => {
      // return elem.chinese.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
      return elem.chinese
    });
    this.setState({
      result,
      textSearch
    });
  }
  burgers = (e) => {
    const { list } = this.state;
    const textSearch = 'burgers';
    console.log(textSearch)
    const result = list.filter(elem => {
      // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
      // return elem.resturantName.toLowerCase().indexOf(textSearch) >= 0;
      return elem.burgers


    });
    this.setState({
      result,
      textSearch
    });
    console.log(result)
  }


  /*================================================================= */
  updateValue(event) {
    console.log('event', event.target.value)
    // this.setState({ value: event.target.value });
  }
  /*================================================================= */

  pizza(e) {
    const { list } = this.state;
    const textSearch = "pizza";
    // console.log(list)
    const result = list.filter(elem => {
      // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
      // return elem.resturantName.toLowerCase().indexOf(textSearch) >= 0;
      return elem.pizza
    });
    this.setState({
      result,
      textSearch
    });
  }
  /*================================================================= */
  bbq(e) {
    const { list } = this.state;
    const textSearch = "bbq";
    // console.log(list)
    const result = list.filter(elem => {
      // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
      // return elem.resturantName.toLowerCase().indexOf(textSearch) >= 0;
      return elem.bbq
    });
    this.setState({
      result,
      textSearch
    });
  }
  /*================================================================= */

  all(e) {
    const { list } = this.state;

    const textSearch = "";
    console.log(list)
    const result = list.filter(elem => {
      // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
      return elem.resturantName.toLowerCase().indexOf(textSearch) >= 0;
    });
    this.setState({
      result,
      textSearch
    });
  }
  /*================================================================= */
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  /*================================================================= */

  componentDidMount() {
    this.getDataResturantOwner()
  }

  getDataResturantOwner = () => {
    this.firebaseRef = firebase.database().ref("Resturant_Owner");
    this.firebaseRef.on("value", snapshot => {
      let message = snapshot.val();
      // console.log(message);
      var newArr = [];
      for (let word in message) {
        // console.log(message[word]);
        newArr.push({
          fullname: message[word].fullname,
          region: message[word].region,
          country: message[word].country,
          downloadURL: message[word].downloadURL,
          email: message[word].email,
          resturantName: message[word].resturantName,
          userId: message[word].userId,
          createAt: message[word].createAt,
          chinese: message[word].chinese,
          bbq: message[word].bbq,
          pizza: message[word].pizza,
          burgers: message[word].burgers,
          subTitle: message[word].subTitle,
        });
      }

      this.setState({ list: newArr });
    });
  }
  /*================================================================= */

  render() {
    const { classes } = this.props;
    // const MAX_LENGTH = 75;
    const { result, list, textSearch, } = this.state
    const asd = textSearch ? result : list;

    return (
      <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <Navbar handleClick={this.handleOnClick} />
        <CssBaseline />
        <div>
          <Carousel indicators={false} interval={3000}>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={LandingWall} alt="Logo" className={classes.imgs} />
              <div class='box-1' style={{ position: 'absolute ', }}>

                <Typography
                  variant="h1"
                  component="span"
                  style={{ textAlign: "center", color: 'rgba(0, 0, 0, 0.54)', fontFamily: 'MyFont', }}
                >
                  818's the Foodist <span style={{ fontSize: 28, color: 'white' }}> Hungry?
        Order Now!</span>
                </Typography>
              </div>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={asdasd} alt="Logo" className={classes.imgs} />
              <div class='box-1' style={{ position: 'absolute ', }}>

                <Typography
                  // variant="h1"
                  component="p"
                  className={classes.famousHeading}
                >
                  818's the Foodist <span style={{ fontSize: 28, color: '#dd0910', fontWeight: 'bolder' }}> Hungry?
        Order Now!</span>
                </Typography>
              </div>
            </div>

          </Carousel>
        </div>

        <Container maxWidth="lg" >
          <div>
            <br />
            <Typography variant="h3" style={{ fontWeight: 'bold', marginTop: 30, fontFamily: 'MyFont', color: 'rgba(249, 0, 11, 0.85)' }}>
              Food delivery is easy as 1, 2, 3, 4...
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: 30, fontFamily: 'MyFont', }}>
              Enjoy your food prepared by professional cooks specially for you.
            </Typography>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {this.state.arrOfObj.map((elem, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                >

                  <Card className={classes.card} style={{
                    marginBottom: 30, backgroundColor: 'white', display: 'block', fontFamily: 'MyFont',

                    transitionDuration: '0.3s',
                    // height: '20vw',
                    padding: 8
                  }}  >


                    <CardContent >
                      {elem.iconA}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'MyFont', }}>
                        <Typography style={{ fontFamily: 'MyFont', }} variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                          {elem.name}
                        </Typography>
                        <img src={arrw} alt="arrw" />
                      </div>
                      <Typography style={{ fontFamily: 'MyFont', }} variant="subtitle1" component="p">
                        {elem.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

          </div>
          <div ref={this.myDivToFocus} style={{ marginBottom: 30 }}>
            <br />
            <br />
            <br />
            {/* <p style={{ fontSize: "60px", textAlign: 'center', fontFamily: 'MyFont', }}>Famous Resturant</p> */}
            <Typography
              // variant="h1"
              component="p"
              className={classes.famousHeading}
            >
              Famous Resturant
            </Typography>
            <span style={{ fontFamily: 'MyFont', }}>
              <TextField
                id="standard-full-width"
                label="Search Here"

                style={{ marginRight: 7, fontFamily: 'MyFont', }}
                placeholder="Example i-e Kaybees, Kababjee,  BBQ Tonight etc..."
                helperText=""
                onChange={this.search.bind(this)}
                fullWidth
                margin="normal"
              />
            </span>

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>

              <Chip
                color="primary"
                variant="outlined"
                size="small"
                label="All"
                className={classes.chip}
                onClick={this.all.bind(this)}
              />
              <Chip
                color="primary"
                variant="outlined"
                size="small"
                label="Chinese"
                className={classes.chip}
                onClick={this.chinese.bind(this)}
              />
              <Chip
                color="primary"
                variant="outlined"
                size="small"
                label="B.B.Q's"
                className={classes.chip}
                onClick={this.bbq.bind(this)}
              />
              <Chip
                color="primary"
                variant="outlined"
                size="small"
                label="pizza"
                onClick={this.pizza.bind(this)}
                className={classes.chip}
              />
              <Chip
                color="primary"
                variant="outlined"
                size="small"
                label="Burgers"
                className={classes.chip}
                onClick={this.burgers.bind(this)}
              />
            </div>

            <br /> <br />
            <Flipper flipKey={textSearch}>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {asd.map((elem, i) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={elem.userId}
                  >

                    <Link style={{ textDecoration: 'none' }} to={`/User/DetailPage/${elem.userId}`} >
                      <Flipped key={elem.resturantName} flipId={elem.resturantName} id={elem.resturantName}>
                        {/* <Card className={classes.card} style={{
                          backgroundColor: 'white',
                        }} > */}
                        <Card class='card' >
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={elem.downloadURL}
                              title="Contemplative Reptile"
                            />
                            <CardContent >
                              <Typography gutterBottom variant="h6" component="h6" style={{ fontFamily: 'MyFont', }}>
                                {`${elem.resturantName.substring(0, 20)}`}
                              </Typography>
                              <Typography gutterBottom variant="subtitle2" component="h2" style={{ fontFamily: 'MyFont', }}>
                                {elem.subTitle ? `${elem.subTitle.substring(0, 20)}` : ''}
                              </Typography>
                              {/* <div>
                                {text.length > MAX_LENGTH ?
                                  (
                                    <div>
                                      <Typography variant="body2" color="" component="p"> {`${elem.subTitle.substring(0, MAX_LENGTH)}...`}</Typography>
                                    </div>
                                  ) :
                                  <Typography variant="h5" component="h2">{text} </Typography>
                                }
                              </div> */}
                              {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div >
                                  <Chip size="small" label="B.B.Q" /> <Chip size="small" label="Pizza" />
                                </div>
                                <div style={{ justifyContent: 'flex-end' }}>
                                  <Rating
                                    className="rating"
                                    // iconClassName="WTF"
                                    // onRate={() => console.log("onRate")}
                                    value={this.state.value}
                                    max={5}
                                    onChange={this.updateValue}
                                    readOnly
                                  />
                                </div>
                              </div> */}
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Flipped>
                    </Link>


                  </Grid>
                ))}
              </Grid>
            </Flipper>
          </div>

        </Container>
        <div style={{ padding: 30, backgroundColor: 'rgba(249, 0, 11, 0.85)' }} >
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}

            >

              <Card style={{
                marginBottom: 30, display: 'block',
                transitionDuration: '0.3s',
                // height: '20vw',
                padding: 8,
                margin: 20, backgroundColor: "hsla(0, 0%, 100%, 0.1)"
              }} >
                <CardContent>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                    <div >

                      <Typography style={{ textAlign: 'center', color: 'white', fontFamily: 'MyFont' }} variant="h3" className={classes.title} color="textSecondary" >
                        818' The Foodist
             </Typography>
                      <Typography style={{ textAlign: 'center', color: 'white', fontFamily: 'MyFont' }} variant="subtitle1" className={classes.title} color="textSecondary" gutterBottom>
                        Hungry?
            Order Now!
             </Typography>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                        <IconButton
                          color="inherit" onClick={() => window.open("https://www.facebook.com/millions818", "_blank")}

                        >

                          <FacebookIcon fontSize="default" style={{ color: 'white', }} />
                        </IconButton>

                        <IconButton
                          color="inherit" onClick={() => window.open("https://twitter.com/adnanahmed_818/", "_blank")}
                        >
                          <TwitterIcon fontSize="default" style={{ color: 'white', }} />
                        </IconButton>
                        <IconButton
                          color="inherit" onClick={() => window.open("https://github.com/fidato818", "_blank")}

                        >
                          <GitHubIcon fontSize="default" style={{ color: 'white', }} />
                        </IconButton>
                        <IconButton
                          color="inherit" onClick={() => window.open("https://www.instagram.com/adnan_ahmed818/", "_blank")}

                        >
                          <InstagramIcon fontSize="default" style={{ color: 'white', }} />

                        </IconButton>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={9}

            >
              <Card className={classes.card} style={{
                marginBottom: 30, backgroundColor: "hsla(0, 0%, 100%, 0.1)", display: 'block',
                transitionDuration: '0.3s',
                // height: '20vw',
                padding: 20, paddingBottom: 50,
                margin: 20,
              }} >
                <CardContent>
                  <div style={{ padding: 30 }}>
                    <Typography style={{ color: 'white', fontFamily: 'MyFont' }} variant="h6" className={classes.title} color="textSecondary" gutterBottom>
                      Now you can make food happen pretty much wherever you are thanks to the free easy-to-use, Enjoy your food.
             </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'rgba(249, 0, 11, 0.85)' }} >

          <div style={{ marginRight: 20, }}>
            <Typography style={{ color: 'white', fontFamily: 'MyFont', display: 'flex', justifyContent: 'center' }} variant="subtitle2" className={classes.title} color="textSecondary" gutterBottom>
              2020 Made with  <FavoriteIcon fontSize="small" style={{ color: 'white', marginLeft: 2, marginRight: 2 }} />   <a href="http://adnan-ahmed.web.app" tartget='_blank' style={{ paddingleft: 2, textDecoration: 'none', color: 'white' }}> Adnan Ahmed</a>
            </Typography>
          </div>
        </div>
      </div >
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
