import React from "react";
import _ from "underscore";
import axios from "axios";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";

const API_URL = "http://localhost:3001/words";
const delete_button = {
    paddingTop: '0px',
    paddingBottom: '0px',
    marginLeft: '10px'
};

class WordList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            words: [],
            inputWord: ""
        };

        this.handleAddInputWord = this.handleAddInputWord.bind(this);
        this.handleUpdateInputWord = this.handleUpdateInputWord.bind(this);
        this.handleDeleteWord = this.handleDeleteWord.bind(this);
        this._getWordList = this._getWordList.bind(this);
    }

    componentDidMount() {
        this._getWordList();
    }

    _getWordList() {
        // get data
        axios.get(API_URL)
            .then(response => response.data)
            .then((data) => {
                this.setState({words: data.result_data});
                // console.log(typeof this.state.words, this.state.words);
            })
            .catch(error => {
                // console.log(error);
            });
    }

    // update the input value
    handleUpdateInputWord(event) {
        this.setState({inputWord: event.target.value});
    }

    // add the word to data file
    handleAddInputWord() {
        let params = {
            word: this.state.inputWord
        };

        this.setState({inputWord: ''});

        axios.post(API_URL, params).then(function(response) {
            // console.log("response: ", response);

            if (response.status === 200) {
                this._getWordList();
            }
        }.bind(this));
    }

    // remove the word from date file
    handleDeleteWord(event) {
        event.preventDefault();
        event.stopPropagation();

        let targetId = event.target.value;

        axios.delete(API_URL + '/' + targetId).then(function(response) {
            // console.log("response: ", response);

            if (response.status === 200) {
                this._getWordList();
            }
        }.bind(this));
    }

    render() {
        let words = this.state.words;

        return (
            <>
            <InputGroup>
                <Input type="text" name="inputWord" placeholder="Input the word" value={this.state.inputWord} onChange={this.handleUpdateInputWord} />
                <InputGroupAddon addonType="append" onClick={this.handleAddInputWord}>
                    <Button color="success">Add The Word</Button>
                </InputGroupAddon>
            </InputGroup>
            <ListGroup flush>
                {_.map(words, (word) => {
                    return (
                        <ListGroupItem tag="a" href="#" key={word.index}>
                            {word.word} <button className="btn btn-outline-danger btn-sm"  style={delete_button} value={word.id} onClick={this.handleDeleteWord}>delete</button>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
            </>
        )
    }
}

export default WordList;