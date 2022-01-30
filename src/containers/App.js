import React, { Component } from 'react';
import SearchBox from '../components/searchbox';
import Cardlist from '../components/cardlist'
import Scroll from '../components/Scroll';
import '../containers/App.css'
import ErrorBoundry from '../components/errorboundry';



class App extends Component {
    constructor(){
        super()
        this.state = {
            cats: [],
            searchfield: ''
        }
        console.log('constructor');
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
          return  response.json();
        })
        .then(users=>{
            this.setState({cats: users})
        })
        
        console.log('componentdidmount')
    }

    onSearchChange = (event) =>{
        this.setState({searchfield: event.target.value});
 
    }
    render(){
        const {cats, searchfield} = this.state;
        const filterResult = cats.filter(cat =>{
            return cat.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        console.log('render');
        return !cats.length?
         <h1>Loading</h1> :
            (
                <div className='tc'>
                <h1 className='f1'>Cats</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                <ErrorBoundry>
                    <Cardlist cats={filterResult}/>
                </ErrorBoundry>
                </Scroll>
                </div>
            );    
    }
    
}

export default App;