import React from "react";
import ReactDOM from "react-dom";
import "./style.css";


// The Title Component
const CalculatorTitle = (props) => {
    return (
        <div className="calculator-title">
            {props.value}
        </div>
    )
};


// The Input Component
class Input extends React.Component {
    render() {
        return (
            <div className={"screen-row"}>
                {this.props.children} {/* this is the value passed from the button*/}
            </div>
        );
    }
}


// The Output Component
class Output extends React.Component {
    render() {
        return (
            <div className={"screen-row"}>
                {this.props.children} {/* this is the value passed from the button*/}
            </div>
        )
    }
}


// The button Component
class Button extends React.Component {
    constructor(props) {
        super(props)
    }

    // if it is a number or a decimal or an equal sign return true, if it is not a number return false,
    // will use this boolean function to color the operator buttons differently than the numbers and equal aign
    isOperator = val => {
        return !isNaN(val) || val === "=";
    };

    render() {
        return (
            <button className={`button ? ${this.isOperator(this.props.children) || "operator"}`}

                // the method which will grab the children (button numbers/operators) upon click
                    onClick={() => this.props.handleClick(this.props.children)}>{this.props.children}
            </button>
        )
    }
}


// the actual App Component
class Calculator extends React.Component {
    constructor(props) {
        super(props);

        // 2 states: one for input, and one for output
        this.state = {
            input: "",  // the input state
            output: "", // the output state
        };
    }

    // last element of the input
    lastInputElement = () => {
        return this.state.input[this.state.input.length - 1];
    }


    // add value to input
    addNumber = val => {

        // append the number to input
        this.setState({
            input: this.state.input + val
        });
    };


    // add simple operators
    addOperator = val => {

        // add negative "-" for first input number
        if (val === "-" && this.state.input === "") {
            this.setState({input: "-"});
        }

        // prevent from adding any operator except "-" if input is empty
        else if (!isNaN(Number(this.lastInputElement()))) {

            // append value to input
            this.setState({
                input: this.state.input + val
            });
        }
    };


    // clear input value and number states
    clear = () => {
        this.setState({
            input: "",
            output: "",
        });
    };


    // the function used when clicking "=" sign
    calculate = () => {

        // if last element is not a number do not calculate
        if (!isNaN(Number(this.lastInputElement()))) {

            // if input is empty, do nothing
            if (this.state.input.length > 0) {

                // save the result of the evaluation in a variable
                const result = eval(this.state.input);

                // if the number is too large, instead of displaying Infinity, display message
                // set the input back to blank for future calculations
                if (result === Infinity) {
                    this.setState({
                        output: "Number is too big",
                        input: ""
                    });
                }

                // if number is not too large, display result and set the input back to blank
                else {
                    this.setState({
                        output: result,
                        input: ""
                    });
                }
            }
        }
    };

    render() {
        return (
            <div>
                <div className={"mainCalc"}>
                    <CalculatorTitle value={"Calculator"}/>
                    <Input>{this.state.input}</Input>
                    <Output>{this.state.output}</Output>
                    <div className={"button-row"}>
                        <Button handleClick={this.addNumber}>1</Button>
                        <Button handleClick={this.addNumber}>2</Button>
                        <Button handleClick={this.addNumber}>3</Button>
                        <Button handleClick={this.addOperator}>*</Button>
                    </div>
                    <div className={"button-row"}>
                        <Button handleClick={this.addNumber}>4</Button>
                        <Button handleClick={this.addNumber}>5</Button>
                        <Button handleClick={this.addNumber}>6</Button>
                        <Button handleClick={this.addOperator}>-</Button>
                    </div>
                    <div className={"button-row"}>
                        <Button handleClick={this.addNumber}>7</Button>
                        <Button handleClick={this.addNumber}>8</Button>
                        <Button handleClick={this.addNumber}>9</Button>
                        <Button handleClick={this.addOperator}>+</Button>
                    </div>
                    <div className={"button-row"}>
                        <Button handleClick={this.clear}>Clear</Button>
                        <Button handleClick={this.calculate}>=</Button>
                        <Button handleClick={this.addOperator}>**</Button>
                        <Button handleClick={this.addOperator}>/</Button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Calculator/>, document.getElementById('root'));
