import React, { Component } from 'react';
import { Row } from 'reactstrap';
import Card from '../component/card/card';
import './dashBuilder.css'
import axios from 'axios'
import NewTodos from './NewTodo';

class DashBuilder extends Component {
    state = {
        cards: [{ name: "hello", desc: "a djncjdnc djncjd", completed: false, date: new Date(), editable: false, }, { name: "hi", desc: "a djncjdnc djncjd", completed: true, date: new Date(), editable: false, },],
        title: null,
        desc: null,
        input: {
            name: {
                validation: {
                    required: true,
                    minLength: 3,
                },
                valid: false,
                touched: false,
            },
            desc: {
                validation: {
                    required: true,
                    minLength: 5,
                },
                valid: false,
                touched: false,
            }
        },
        valid: false
    }
    componentWillMount() {
        this.axiosHandler(true)
    }
    checkValidity = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid
    }
    addCardHandler = () => {
        const postData = { name: this.state.title, desc: this.state.desc }
        this.axiosHandler(null, postData)
    }
    axiosHandler = (getData, postData, putData, id) => {
        if (getData) {
            axios.get('/api/posts')
                .then(res => {
                    this.setState({ cards: res.data })
                })
        }
        if (postData) {
            axios.post('/api/posts', postData)
                .then(res => {
                    const cards = [...this.state.cards]
                    cards.push(res.data)
                    this.setState({ cards: cards })
                })

        }
        if (putData) {
            axios.put(`/api/posts/${id}`, putData)
        }
    }
    addDescChangeHandler = e => {
        const input = {...this.state.input},content = input.desc
        content.valid = this.checkValidity(e.target.value, content.validation)
        content.touched = true
        this.setState({ desc: e.target.value, input: input })
    }
    addTitleChangeHandler = e => {
        const input = {...this.state.input},content = input.name
        content.valid = this.checkValidity(e.target.value, content.validation)
        content.touched = true
        this.setState({ title: e.target.value, input: input })
    }
    editableHandler = (e, id) => {
        let cards = [...this.state.cards]
        cards.forEach((card, i) => {
            if (card._id === id) {
                cards[i].editable = true;
            }
        })
        this.setState({ cards: cards })
    }

    updateCardHandler = (e, id) => {
        const putData = { desc: e.target.value }
        const cards = [...this.state.cards]
        if (e.key === 'Enter') {
            cards.forEach((card, i) => {
                if (card._id === id) {
                    cards[i].editable = false
                    cards[i].desc = putData.desc
                }
            })
            this.setState({ cards: cards })
            this.axiosHandler(null, null, putData, id)
        }
    }

    completeHandler = (id) => {
        const putData = { completed: true }
        const cards = [...this.state.cards]
        cards.forEach((card, i) => {
            if (card._id === id) {
                cards[i].completed = true
            }
        })
        this.setState({ cards: cards })
        this.axiosHandler(null, null, putData, id)
    }
    removeCardHandler = (id) => {
        const cards = [...this.state.cards]
        let newCards = cards.filter(card => card._id !== id)
        this.setState({ cards: newCards })
        axios.delete(`/api/posts/${id}`)
    }

    render() {
        let posts = [], completedPosts = []
        const mapcards = (card, editable, completed) => {
            return (
                <Card cardHeading={card.name} desc={card.desc} editable={editable}
                    edit={(e) => this.editableHandler(e, card._id)}
                    remove={this.removeCardHandler.bind(this, card._id)}
                    changed={(e) => this.updateCardHandler(e, card._id)}
                    isComplete={completed} key={card._id}
                    completeClick={() => this.completeHandler(card._id)} date={card.date} />
            )
        }
        posts = this.state.cards.filter((card, i) => {
            return card.completed !== true
        }).map(card => mapcards(card, card.editable, card.completed))

        completedPosts = this.state.cards.filter((card, i) => {
            return card.completed === true
        }).map(card => mapcards(card, false, card.completed))
        return (
            <div className="dash-inner">
                <Row>
                    <NewTodos input={this.state.input}titleChanged={this.addTitleChangeHandler} addCard={this.addCardHandler} descChanged={this.addDescChangeHandler} heading="Create Plan" iValue={this.state.title} tValue={this.state.desc}/>
                    <NewTodos cards={posts} heading="New Todos" />
                    <NewTodos cards={this.state.cards.map(card => mapcards(card, card.editable, false))} heading="Progress" />
                    <NewTodos cards={completedPosts} heading="Completed Todos" />
                </Row>
            </div>
        )
    }
}
export default DashBuilder;