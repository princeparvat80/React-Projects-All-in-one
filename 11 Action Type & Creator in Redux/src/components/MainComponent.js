import React, { Component } from 'react'
import Home from './HomeComponents'
import Header from './HeaderComponent'
import Footer from './FooterComponents'
import DishDetail from './DishDetail'
import Menu from './MenuComponents'
import Contact from './ContactComponent'
import About from './About';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Homepage = () => {
      return (
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
          leader={this.props.leaders.filter(leader => leader.featured)[0]}
        />
      );
    }
    const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}
      />
      );
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route exact path="/contactus" component={Contact} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));