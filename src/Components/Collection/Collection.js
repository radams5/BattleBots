import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateDummyArr } from '../../ducks/reducer'
import axios from 'axios'


class Collection extends Component {
  constructor() {
    super()
    this.state = {
      dummyArr:[],
      bot1: {},
      bot2: {},
      hp1: 0,
      hp2: 0,
      dmgbot1: 0,
      dmgbot2: 0,
      originalhp1: 0,
      originalhp2: 0,
      bot1Charge: 0,
      bot2Charge: 0
    }
  }


  componentDidMount() {
    this.getBotsFromDb()
  }
  getBotsFromDb = async () => {
    let res = await axios.get('/api/getbotsfromdb')
    this.setState({
      dummyArr: res.data
    })
  }
  DeleteBot = async (bot) => {
    let res = await axios.put('/api/deletebot', bot)  
    this.getBotsFromDb()    
  }
  AddToArena(bot) {
    if (!this.state.bot1.name) {
      this.setState({
        bot1: bot,
        hp1: bot.hp,
        bot1Charge: 0,
        oldhp1: bot.hp,
        originalhp1: bot.hp,
      })
    } else {
      this.setState({
        bot2: bot,
        hp2: bot.hp,
        bot2charge: 0,
        oldhp2: bot.hp,
        originalhp2: bot.hp,
      })
    }
  }
  ClearArena() {
    this.state.bot1.hp = this.state.originalhp1
    this.state.bot2.hp = this.state.originalhp2
    this.setState({
      bot1: {},
      bot2: {},
      hp1: 0,
      hp2: 0,
      dmgbot1: 0,
      dmgbot2: 0,
      originalhp1: 0,
      originalhp2: 0,
      bot1Charge: 0,
      bot2Charge: 0
    })
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async randomAtk(bot1, bot2) {
    let num = this.getRandomInt(3)
    if (num === 0) {
      alert(`${bot1.name}'s attack wasn't very effective...  1 damage`)
    } else if (num === 2) { alert(`${bot1.name} scored a critical hit!! ${bot1.atk * 2 - bot2.def > 0 ? bot1.atk * 2 - bot2.def : 1} damage`) }
    else { alert(` ${bot1.name} attacks.....${bot1.atk1 - bot2.def > 0 ? bot1.atk1 - bot2.def > 0 : 1} damage`) }
    return num
  }

  Special(power, attackingbot, defbot) {
    if (power === 'atk') {
      defbot.hp = defbot.hp - 3
      alert(`${attackingbot.name} specialed all over ${defbot.name} for 3 extra damage`)
    }
    if (power === 'heal') {
      attackingbot.hp = attackingbot.hp + 4
      alert(`${attackingbot.name} healed hisself for 4`)
    }

  }
  // //////////////FightFunction ///////////////////
  async Fight() {
    let { bot1, bot2 } = this.state
    if (!bot1.name || !bot2.name) { alert('please choose more bots') }
    else {
      //////////////Check HP and Round to see if you go on
      if (bot1.hp <= 0 && bot2.hp <= 0) {
        alert(`It's a tie!`)
        this.ClearArena()
      }
      else if (this.state.round > 15) {
        alert(`It's a tie!`)
        this.ClearArena()
      }
      else if (bot2.hp <= 0) {
        alert(`${bot1.name} wins!`)
        this.ClearArena()
      }
      else if (bot1.hp <= 0) {
        alert(`${bot2.name} wins!`)
        this.ClearArena()
      }
      ////////////// start fighting///////////////      
      else {
        let bot1multiplier = await this.randomAtk(bot1, bot2)
        let bot2multiplier = await this.randomAtk(bot2, bot1)
        console.log(bot1.hp, bot2.hp)
        let oldhp2 = bot2.hp
        let bot1atkdmg = ((bot1.atk * bot1multiplier) - bot2.def >0) ? ((bot1.atk * bot1multiplier) - bot2.def) : 1
        console.log(bot1atkdmg)
        bot2.hp = bot2.hp - bot1atkdmg
        if (this.state.bot1Charge >= 5) {
          this.Special(bot1.ulti, bot1, bot2)
          this.setState({
            bot1Charge: this.state.bot1Charge - 5
          })
        }
        let oldhp1 = bot1.hp
        let bot2atkdmg = (bot2.atk * bot2multiplier - bot1.def >0) ? (bot2.atk * bot2multiplier - bot1.def >0) : 1
        bot1.hp = bot1.hp -bot2atkdmg
        if (this.state.bot2Charge >= 5) {
          this.Special(bot2.ulti, bot2, bot1)
          this.setState({
            bot2Charge: this.state.bot2Charge - 5
          })
        }
        console.log(bot1.hp, bot2.hp)

        //////////////Increment Special Charges and Round and calculate damage
        this.setState({
          bot1Charge: this.state.bot1Charge + this.state.bot1.speed,
          bot2Charge: this.state.bot2Charge + this.state.bot2.speed,
          round: this.state.round + 1,
          dmgbot1: oldhp1 - bot1.hp,
          dmgbot2: oldhp2 - bot2.hp
        })
      }
    }
  }


  render() {
    const collectionDiv = this.state.dummyArr ? this.state.dummyArr.map(bot => {
      return <div className='SingleBot'>
        <div className="TopHalfDivCollectionBots">
          <h3 className='PicNameDiv'><img src={bot.img} alt={bot.name} className='BotPic' />{bot.name}</h3>

        </div>
        <div className='BotHalfDiv'>
          <div>HP: {bot.hp}</div>
          <div>Atk: {bot.atk}</div>
          <div>Def: {bot.def}</div>
          <div>Speed: {bot.speed}</div>
          <div className='BotButtonDiv'>
            <button onClick={() => this.AddToArena(bot)}>Add to Arena</button>
            <button onClick={() => this.DeleteBot(bot)}>Delete</button>
          </div>

        </div>
      </div>
    }) : null
    return (
      <div className="Collection">
        <div className='BattleDiv'>

          <div className='FightingBot'>
            <div className="TopHalfBattleDiv">
              <p><b>Bot #1: {this.state.bot1.name}</b> </p>
              <h3>HP: {this.state.bot1.hp}</h3>
              <p>Dmg taken last Round: {this.state.dmgbot1} </p>
              <p>Attack: {this.state.bot1.atk}</p>
            </div>
            <p>Defense: {this.state.bot1.def}</p>
            <p>Speed: {this.state.bot1.speed}</p>
            <p>Charge: {this.state.bot1Charge}</p>
          </div>
          <img src={this.state.bot1.img} alt="" className={this.state.bot1Attacking ? 'BattlingImgWiggle' : 'BattlingImg'} />
          <button onClick={() => this.Fight()}>fight</button>
          <button onClick={() => this.ClearArena()}>clear</button>
          <img src={this.state.bot2.img} alt="" className={this.state.bot2Attacking ? 'BattlingImgWiggle2' : 'BattlingImg'} />
          <div className='FightingBot'>
            <div className="TopHalfBattleDiv">
              <p><b>Bot #2: {this.state.bot2.name}</b></p>
              <h3>HP: {this.state.bot2.hp}</h3>
              <p>Dmg taken Last Round: {this.state.dmgbot2} </p>
              <p>Attack: {this.state.bot2.atk}</p>
            </div>
            <div >
              <p>Defense: {this.state.bot2.def}</p>
              <p>Speed: {this.state.bot2.speed}</p>
              <p>Charge: {this.state.bot2Charge}</p>
            </div>
          </div>
        </div>
        <div className='CollectionDiv'>{collectionDiv}</div>
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
  updateDummyArr
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection)

