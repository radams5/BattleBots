import React, { Component } from 'react';
import {connect} from 'react-redux'
import Pokeball from '../../images/pokeball_PNG8.png'
import axios from 'axios'



class Create extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      hp: 1,
      atk: 1,
      def: 1,
      speed: 1,
      special: '',
      ulti: '',
      money: 30
    }
  }

  componentDidMount(){
    // let res = axios.get('/mongoDbTest')
    // console.log(res)
  }
 
  CreateBot = async() => {
    if (this.state.special && this.state.money === 0 && this.state.name){
      let body = this.state
    await axios.put('/api/createBot', body)
      this.props.history.push('/Collection')
    
    } 
    else{alert('please select a special move and spend your money (or maybe name your bot)')
    }
  }
  updateState(value, key){
    this.setState({
      [key]: value,
      money: this.state.money - value
    })
  }

  ClearState(){
    this.setState({
      name: '',
      hp: 1,
      atk: 1,
      def: 1,
      speed: 1,
      special: '',
      ulti: '',
      money: 30
    })
  }
  updateName(value){
    this.setState({
      name: value
    })
  }
  IncreaseHP(stat){
    if(this.state.money>0){
      this.setState({
        [stat]: ++this.state[stat],
        money: --this.state.money
      })
    }
  }
  DecreaseHP(stat){
    if(this.state[stat]>0){
      this.setState({
        [stat]: --this.state[stat],
        money: ++this.state.money
      })
    }
  }
  IncreaseStat(stat){
    if(this.state.money>0 && this.state.money-2>=0){
      this.setState({
        [stat]: this.state[stat]+1,
        money: this.state.money-2
      })
    }
  }
  DecreaseStat(stat){
    if(this.state[stat]>0){
      this.setState({
        [stat]: this.state[stat]-1,
        money: this.state.money+2
      })
    }
  }
  IncreaseSpeed(stat){
    if(this.state.money>0 && this.state.money-5>=0){
      this.setState({
        [stat]: this.state[stat]+1,
        money: this.state.money-5
      })
    }
  }
  DecreaseSpeed(stat){
    if(this.state[stat]>0){
      this.setState({
        [stat]: this.state[stat]-1,
        money: this.state.money+5
      })
    }
  }
  ChooseSpecial(choice){ 
    if(choice === 'atk'){   
      this.setState({
        special: 'Deal 3 damage when charge is full',    
        ulti: 'deal'   
      })}    
    if(choice === 'heal'){   
      this.setState({
        special: 'heal 4 damage when charge is full',  
        ulti: 'heal'     
      })}    
  }
  
  render() {
    
    return (
      <div className="Create">
      <div className='RulesDiv'>
        <ol><h1>Rules</h1>
          <h4>1. If neither bot is dead after 15 rounds it is a tie</h4>
          <h4>2.  Both bots will attack each other each round (can result in a tie)</h4>
          <h4>3.  Attack will be multiplied by a random number (0, 1, or 2) and then subtracted from enemies defense, result is subtracted from enemies hp ( minimum of 1)</h4>
          <h4>4. Your special move charges at the rate of your speed each round</h4>
          <h4>5. Once your special charge is >= 5 you will lose 5 special charge and perform your special in addition to your normal attack</h4>
        </ol>

      </div>
        <div className='CreateBotBoxDiv'>
          <h1>Create Your Nodem<span ><img id='Pokeball' src={Pokeball} alt="Pokeball"/></span>n</h1>
            <div className='InputDivBox'>
            <div>
              Name:
              <input type="text" className='InputDiv' onChange={e => this.updateName(e.target.value)}/>
              {this.state.name}
            </div>
            <br/>
            <div>
              HP:     
              <button className='AddButton' onClick={() => this.IncreaseHP('hp')}>+ HP</button>
              <button className='MinusButton' onClick={() => this.DecreaseHP('hp')}>- HP</button>
              <b>{this.state.hp}</b>  (Costs 1)
            </div>
            <br/>
          <div>
            Attack
                 <button className='AddButton' onClick={() => this.IncreaseStat('atk')}>+ atk</button>
            <button className='MinusButton' onClick={() => this.DecreaseStat('atk')}>- atk</button>
            <b>{this.state.atk}</b>  (Costs 2)
          </div>
          <br/>
          <div>
            Defense:
            <button className='AddButton' onClick={() => this.IncreaseStat('def')}>+ Def</button>
            <button className='MinusButton' onClick={() => this.DecreaseStat('def')}>- Def</button>
            <b>{this.state.def}</b> (Costs 2)            
          </div>
          <br/>
            Speed:
            <button className='AddButton' onClick={() => this.IncreaseSpeed('speed')}>+ Speed</button>
            <button className='MinusButton' onClick={() => this.DecreaseSpeed('speed')}>- Speed</button>
            <b>{this.state.speed}</b> (Costs 5)
            
          </div>
          <br/>
          <div>
            Special:              
            <button className='SpecialButton' onClick={() => this.ChooseSpecial('atk')}>Atk</button>
            <button className='SpecialButton' onClick={() => this.ChooseSpecial('heal')}>Heal</button>
            <br/>
            <br/>
            <b>{this.state.special} </b>
          </div>
          
          <br/>
        
          <h3>Money:{this.state.money}</h3>
          <div><button onClick= {() => this.CreateBot()}>Create</button></div>
          <div><button onClick={() => this.ClearState()}>Clear</button></div>
        </div>
     
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
   dummyArr: reduxState.dummyArr
  }
}

const mapDispatchToProps = {
}

export default connect (mapStateToProps, mapDispatchToProps)(Create)


