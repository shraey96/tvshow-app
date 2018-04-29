import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchShowsCustom} from '../actions/showsAction';
import {changePage} from '../actions/searchAction';
import {UserFollowShow, UserUnFollowShow} from '../actions/userAction';
import {Link} from 'react-router-dom';
import {Animated} from "react-animated-css";
import { Grid, Row, Col } from 'react-flexbox-grid';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreShowsSearch from './MoreShowsSearch';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import Pagination from 'material-ui-pagination';

class SearchShowsResult extends Component {

  constructor(){
    super()
    this.state = {
      loader: false,
      episodes : [],
      open: false,
      msg: ''
    }
  }

componentWillMount(){
  console.log(this.props.search);
  console.log(this.props.match.params);
  // let query;
  //
  // if(this.props.search.genre === '' || this.props.search.rating === '' || this.props.search.status === '' || this.props.search.language === ''){
  //   query = {
  //     genre: this.props.match.params.genre,
  //     rating: this.props.match.params.rating,
  //     language: this.props.match.params.language,
  //     status: this.props.match.params.status,
  //   };
  // }else {
  //   query = {
  //     genre: this.props.search.genre,
  //     rating: this.props.search.rating,
  //     language: this.props.search.language,
  //     status: this.props.search.status
  //   };
  // }
  //
  // console.log(query);
this.setState({loader: true}, ()=>{
  let customShow = this.props.fetchShowsCustom(this.props.search);
  customShow.then((customShow)=>{
    if(customShow.success === true){
      this.setState({loader: false})
    }
  })

})


}

componentDidMount(){

}

componentWillReceiveProps(nextProps){
  // console.log(nextProps.shows.searchShowCustom);
  console.log("RECEIVED NEXT PROPS");
  console.log(nextProps.search);
  if(nextProps.search !== this.props.search){
    console.log("DIFFERENT");
    this.setState({loader: true}, ()=>{
    let customShow = this.props.fetchShowsCustom(nextProps.search);
    customShow.then((customShow)=>{
      if(customShow.success === true){
        this.setState({loader: false})
      }
    })
    })
  }else {
    console.log("SAME");
  }
}

handlePageChange = (pageNumber) =>{
  console.log(pageNumber);
  this.props.changePage(pageNumber);
  // this.props.history.push(`/more-shows/${this.props.search.genre || 1}/${this.props.search.genre || 1}/${this.props.search.rating || 1}/${this.props.search.rating || 1}/${this.props.search.status || 1}/${this.state.optionsValue.status || 1}`);
}

Follow = (tvShowInfo) => {
  console.log(tvShowInfo);
  console.log("clicked follow");
  console.log(this.props.user);
  if(this.props.user.isUserLoggedIn === false){
  this.setState({open: true, msg: `You must login to follow shows!`});
  }else {
  let data = {
    tvid: (tvShowInfo.tvShowId),
    imdb: tvShowInfo.tvShowIMDB,
    tvname: tvShowInfo.tvShowName,
    tvimg:  tvShowInfo.tvShowImageUrl
  }
  let followShow = this.props.UserFollowShow(data);
  followShow.then((show)=>{
    if(show.success === true){
      this.setState({open: true, msg: `Show Followed!`});
  }else {
      this.setState({open: true, msg: `There was some problem.`});
  }
})
}
}

unFollow = (tvShowInfo) => {
  let data = {
    tvid: tvShowInfo.tvShowId
  }
  let userShowUnfollow = this.props.UserUnFollowShow(data)
  userShowUnfollow.then((show)=>{
    if(show.success === true){
      this.setState({open: true, msg: `Show Unollowed!`});
  }else {
      this.setState({open: true, msg: `There was some problem.`});
  }
  })
}

handleRequestClose = () => {
this.setState({
  open: false,
});
};


  render() {
let shows;
let loader;
let pagenationTag;
let userShowInfo = this.props.user.userFollows;

if(this.state.loader === true){
  loader = (<img src="https://s3.amazonaws.com/binged-images/ajax-loading-gif-transparent-background-5.gif" height="50px" width="50px"/>);
}else {
  loader = "";
}
if(this.props.shows.searchShowCustom.length!==0){

  let button;

  shows = this.props.shows.searchShowCustom.map((tvshow)=>{


    if(this.props.user.isUserLoggedIn === true){
    console.log("YES");
      if(userShowInfo.length>0){
          for(var i = 0; i<userShowInfo.length; i++){
              if(tvshow.tvShowId === parseInt(userShowInfo[i].tvShowId)){
                // button = (<button onClick={()=>{this.unFollow(tvshow)}}>UnFollow</button>);
                button = (<RaisedButton label="UnFollow" secondary={true}  onClick={()=>{this.unFollow(tvshow)}}/>);
                break;
              }else {
                // button = (<button onClick={()=>{this.Follow(tvshow)}}>Follow</button>);
                button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(tvshow)}}/>);
              }
          }
        }else {
          button = (<button onClick={()=>{this.Follow(tvshow)}}>Follow</button>);
          button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(tvshow)}}/>);
        }

    }else {
      console.log("NO");
      button = (<button onClick={()=>{this.Follow(tvshow)}}>Follow</button>);
      button = (<RaisedButton label="Follow" primary={true}  onClick={()=>{this.Follow(tvshow)}}/>);
    }

    let image;
    let rating;
    if(tvshow.tvShowImageUrl){
       image = <Link to={`/shows/${tvshow.tvShowName}/${tvshow.tvShowId}`}><img className="show_img" src={tvshow.tvShowImageUrl}/></Link>
  }else {
       image = <Link to={`/shows/${tvshow.tvShowName}/${tvshow.tvShowId}`}><img className="show_img" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/vintage-tv-poster-irina-march.jpg" height="295px" width="210px"/></Link>
  }

  if(tvshow.tvShowRating){
    rating = tvshow.tvShowRating;
  }else {
    rating = 'n/a';
  }
      return (
        <Col xs={12} md={3} sm={4} key={tvshow._id}>

  <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <div className="tvpopular">
          {image}
          <br/>
          <p className="show_name"><Link className="tvpopularLink" to={`/shows/${tvshow.tvShowName}}/${tvshow.tvShowId}`}>{tvshow.tvShowName}</Link> </p>

          <p style={{"color" : "white"}}><img align="middle" src="http://www.iconsplace.com/download/orange-rating-star-512.png" height="25px" width="25px"></img>{rating}</p>
          <p>{button}</p>
          </div>
  </Animated>

        </Col>

    )
  })

  pagenationTag = (<Pagination
           total = {this.props.shows.searchShowCustom.length}
           current = {this.props.search.page}
           display = {10}
           onChange = {this.handlePageChange}
         />)

}





    return (

<MuiThemeProvider>
      <div className="App">
<br/>
{loader}
<Grid fluid>
  <Row>
    {shows}
  </Row>
</Grid>
<br/>
<br/>


{loader}{pagenationTag}

      </div>
      <Snackbar
                open={this.state.open}
                message={this.state.msg}
                autoHideDuration={2000}
                onRequestClose={this.handleRequestClose}
        />

</MuiThemeProvider>
    );
  }
}

const mapStateToProps = function(state){
  return {
    shows: state.shows,
    search: state.search,
    user: state.user
          }
}


// export default connect(mapStateToProps, {fetchShowsCustom, changePage})(SearchShowsResult);
export default withRouter(connect(mapStateToProps, {fetchShowsCustom, changePage, UserFollowShow, UserUnFollowShow})(SearchShowsResult))
