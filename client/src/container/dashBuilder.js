import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Card from '../component/card/card';
import './dashBuilder.css'
import axios from 'axios'
import CardInput from '../component/cardInput/cardInput';
import Spinner from '../component/UI/Spinners/Spinner';

class DashBuilder extends Component {

    state = {
        loading: true,
        cards: [],
        title: null,
        desc: null,
        deleted: null,
    }
    componentDidMount () {
        
        axios.get('/api/posts')
            .then(res => {
                this.setState({cards: res.data, loading: false})
            })
        console.log("from componentDidMount")
    }
    componentDidUpdate () {
        console.log('component did update')
    }
    addCardHandler = () => {
        const title = this.state.title;
        const desc = this.state.desc;
        const data = {
            name: title,
            desc: desc,
        }
        this.setState({loading: true})
        axios.post('/api/posts', data)
            .then(res => {
                const cards = [
                    ...this.state.cards
                ]
                cards.push(res.data)
                this.setState({cards: cards, loading: false})
            })
    }
    addDescChangeHandler = (e) => {

        const value = e.target.value;
        this.setState({desc: value})
        console.log(this.state.title)
    }
    addTitleChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({title: value})
        console.log(this.state.desc)
    }
    editableHandler = (e, id) => {
        let cards = [
            ...this.state.cards
        ]
        cards.find((card, i) => {
            let temp = '';
            if(card._id === id) {
                temp = card
                temp.editable = true;
                cards[i] = temp;
            }
        })
        this.setState({cards: cards})
    }
    updateCardHandler = (e, id) => {
        
        
        const body = {
            desc: e.target.value
        }
        if(e.key === 'Enter') {
            this.setState({loading: true})
            this.axiosPut(id, body)
            
        }

    }
    completeHandler = (id) => {
        const body = {
            completed: true
        }
        this.setState({loading: true})
        this.axiosPut(id, body)

    }
    axiosPut = (id, body) => {
        axios.put(`/api/posts/${id}`, body)
                .then(res => {
                    const cards = [
                        ...this.state.cards
                    ]
                    cards.map((card, i) => {
                        if(card._id === id) {
                            cards[i] = res.data
                        }
                        
                    })
                    this.setState({cards: cards, loading: false})
                })
    }
    removeCardHandler = (id) => {
        this.setState({loading: true})
        axios.delete(`/api/posts/${id}`)
            .then((res1) => {
                axios.get('/api/posts')
                    .then(res => {
                        this.setState({cards: res.data,deleted: res1.data.message, loading: false})
                    })
            })
    }
    render () {
        let posts = []
        let filterPosts = []
        let completedPosts = []
        let completedFilterPosts = []
        let firstPost = [];
        let FilterPost = []
        if(!this.state.loading) {
            filterPosts = this.state.cards.filter((card, i) => {
                return card.completed !== true
            })
            posts = filterPosts.map(card => {
                return (
                    <Card cardHeading={card.name}
                        desc={card.desc}
                        editable={card.editable}
                        edit={(e) => this.editableHandler(e, card._id)}
                        remove={this.removeCardHandler.bind(this, card._id)}
                        changed={(e) => this.updateCardHandler(e, card._id)}
                        isComplete={card.completed}
                        key={card._id}
                        completeClick={this.completeHandler.bind(this, card._id)}/>
                )
            })
            completedFilterPosts = this.state.cards.filter((card, i) => {
                return card.completed === true
            })
            completedPosts = completedFilterPosts.map(card => {
                return (
                    <Card cardHeading={card.name}
                        desc={card.desc}
                        editable={card.editable}
                        edit={(e) => this.editableHandler(e, card._id)}
                        remove={this.removeCardHandler.bind(this, card._id)}
                        changed={(e) => this.updateCardHandler(e, card._id)}
                        isComplete={!this.state.loading}
                        key={card._id}
                        completeClick={this.completeHandler.bind(this, card._id)}/>
                )
            })
        }
        return (
            <div className="dash-inner">
                {this.state.loading ? <div className="spin"><Spinner /></div> : <Row>
                    <Col md="3">
                        <div className="cards-wrap">
                            <h3>Create Plan</h3>
                        {firstPost}
                        <CardInput titleChanged={this.addTitleChangeHandler}
                            addCard={this.addCardHandler}
                            descChanged={this.addDescChangeHandler}/>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="cards-wrap">
                        <h3>To Do</h3>
                        {posts}
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="cards-wrap">
                        <h3>Progress</h3>
                        {this.state.cards.map(card => {
                            return (
                                <Card cardHeading={card.name}
                                    desc={card.desc}
                                    editable={this.state.loading}
                                    remove={this.removeCardHandler.bind(this, card._id)}
                                    isComplete={this.state.loading}
                                    key={card._id}
                                    completeClick={this.completeHandler.bind(this, card._id)}/>
                            )
                        })}
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="cards-wrap">
                        <h3>Completed</h3>
                        {completedPosts}
                        </div>
                    </Col>
                </Row>}
            </div>
        )
    }
}

export default DashBuilder;