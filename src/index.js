import React from "react";
import ReactDOM from "react-dom";
import "./style.css";


// The Title Component
const CalculatorTitle = props => {
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

// The Button Component
const Button = (props) => {

    // the props used:
    // className for css coloring
    // value is the actual value used for operations
    // onClick is the click method
    // disabled is used to disable/enable buttons (mainly used for radians and degrees)
    const {className, value, onClick, label, disabled} = props;

    return (
        <button className={className}
                onClick={() => onClick(value)}
                disabled={disabled}>
            {label}
        </button>
    )
}

// the actual App Component
class Calculator extends React.Component {
    constructor(props) {
        super(props);

        // 4 states: one for input, one for output, one for number and one for radians or degrees
        this.state = {
            input: "",       // the input state
            output: "",      // the output state
            number: "",      // the number state for complex calculations
            degree: false    // the state used to calculate trigonometric functions
        };
    }

    // last element of the input
    lastInputElement = () => {
        return this.state.input[this.state.input.length - 1];
    }

    // set the state to true if pressed button is "Radians". this will be also used to disable/enable the buttons
    isDegreeOn = val => {
        this.setState({degree: val === "Degrees"});
    }

    // add value to input
    addNumber = val => {

        // if input ends with ")" do not add number
        if (!this.state.input.endsWith(")")) {
            // append the number to input
            this.setState({
                input: this.state.input + val,
                number: this.state.number + val
            });
        }
    };

    // add zero to input
    addZero = val => {

        // if this.state.input is not empty then add zero
        if (this.state.input !== "") {

            // prevent from adding 0 if last element is not a number
            if (!isNaN(Number(this.lastInputElement()))) {
                this.setState({
                    input: this.state.input + val,
                    number: this.state.number + val
                });
            }
        }
    };

    // add simple operators
    addOperator = val => {

        // add negative "-" for first input number
        if (val === "-" && this.state.input === "") {
            this.setState({input: "-"});
        }

        // prevent adding operator if last element is not a number
        else if (!isNaN(Number(this.lastInputElement()))) {
            switch (val) {
                case "sin(x)":
                    // avoid calling sin multiple times on the same input
                    if (!this.state.input.includes("sin")) {
                        this.setState({input: `sin(${this.state.input})`});
                    }
                    break;

                case "cos(x)":
                    // avoid calling cos multiple times on the same input
                    if (!this.state.input.includes("cos")) {
                        this.setState({input: `cos(${this.state.input})`});
                    }
                    break;

                case "tan(x)":
                    // avoid calling tan multiple times on the same input
                    if (!this.state.input.includes("tan")) {
                        this.setState({input: `tan(${this.state.input})`});
                    }
                    break;

                case "cot(x)":
                    // avoid calling cot multiple times on the same input
                    if (!this.state.input.includes("cot")) {
                        this.setState({input: `cot(${this.state.input})`});
                    }
                    break;

                // for simple operators
                default:
                    if (this.lastInputElement() !== val) {
                        this.setState({
                            input: this.state.input + val,
                            number: this.state.number + val
                        });
                    }
                    break;
            }
        }
    }

    // clear input value and number states
    clear = () => {
        this.setState({
            input: "",
            number: "",
        });
    };

    // clear input, output and number states
    delete = () => {
        this.setState({
            input: "",
            output: "",
            number: ""
        });
    }

    // the function used when clicking "=" sign
    calculate = () => {

        // if input is empty, do nothing
        if (this.state.input.length > 0) {

            // if last element is not a number or does not end with ")" do not calculate
            if (!isNaN(Number(this.lastInputElement())) || this.state.input.endsWith(")")) {

                let result = this.state.input;        // save the input state into result variable
                this.setState({input: ""});     // reset the input state to empty string

                // calculate sine
                if (result.includes("sin")) {
                    const inputNumber = eval(this.state.number);

                    // if degrees is true, calculate sine in degrees
                    this.setState({
                        output: this.state.degree ? Math.sin(inputNumber * Math.PI / 180) : Math.sin(inputNumber),
                        number: ""
                    });
                }

                // calculate cosine
                else if (result.includes("cos")) {
                    const inputNumber = eval(this.state.number);

                    // if degrees is true, calculate cosine in degrees
                    this.setState({
                        output: this.state.degree ? Math.cos(inputNumber * Math.PI / 180) : Math.cos(inputNumber),
                        number: ""
                    });
                }

                // calculate tan
                else if (result.includes("tan")) {
                    const inputNumber = eval(this.state.number);

                    // if degrees is true, calculate tangent in degrees
                    this.setState({
                        output: this.state.degree ? Math.tan(inputNumber * Math.PI / 180) : Math.tan(inputNumber),
                        number: ""
                    });
                }

                // calculate cot
                else if (result.includes("cot")) {
                    const inputNumber = eval(this.state.number);

                    // if degrees is true, calculate cotangent in degrees
                    this.setState({
                        output: this.state.degree ? 1 / Math.tan(inputNumber * Math.PI / 180) : 1 / Math.tan(inputNumber),
                        number: ""
                    });
                }

                // for all common operators such as addition, subtraction, multiplication division and exponential
                else {
                    result = eval(result);

                    // if the number is too large, instead of displaying Infinity, display message
                    if (result === Infinity) {
                        this.setState({output: "Number is too big"});
                    } else {
                        this.setState({output: result})
                    }
                }
            }
        }
    };

    render() {
        return (
            <div>
                <div className={'mainCalc'}>
                    <CalculatorTitle value={'Scientific Calculator'}/>
                    <Input>{this.state.input}</Input>
                    <Output>{this.state.output}</Output>
                    <div className={'button-row'}>
                        <Button
                            type={'button'}
                            className={'special-button'}
                            value={'Radians'}
                            label={'Radians'}
                            onClick={this.isDegreeOn}
                            disabled={!this.state.degree}/>
                        <Button
                            type={'button'}
                            className={'special-button'}
                            value={'Degrees'}
                            label={'Degrees'}
                            onClick={this.isDegreeOn}
                            disabled={this.state.degree}/>
                    </div>
                    <div className={"button-row"}>
                        <Button
                            value={1}
                            label={1}
                            onClick={this.addNumber}/>
                        <Button
                            value={2}
                            label={2}
                            onClick={this.addNumber}/>
                        <Button
                            value={3}
                            label={3}
                            onClick={this.addNumber}/>
                        <Button
                            className={'operator'}
                            value={'*'}
                            label={'*'}
                            onClick={this.addOperator}/>
                    </div>
                    <div className={"button-row"}>
                        <Button
                            value={4}
                            label={4}
                            onClick={this.addNumber}/>
                        <Button
                            value={5}
                            label={5}
                            onClick={this.addNumber}/>
                        <Button
                            value={6}
                            label={6}
                            onClick={this.addNumber}/>
                        <Button
                            className={'operator'}
                            value={'-'}
                            label={'-'}
                            onClick={this.addOperator}/>
                    </div>
                    <div className={"button-row"}>
                        <Button
                            value={7}
                            label={7}
                            onClick={this.addNumber}/>
                        <Button
                            value={8}
                            label={8}
                            onClick={this.addNumber}/>
                        <Button
                            value={9}
                            label={9}
                            onClick={this.addNumber}/>
                        <Button
                            className={'operator'}
                            value={'+'}
                            label={'+'}
                            onClick={this.addOperator}/>
                    </div>
                    <div className={"button-row"}>
                        <Button
                            value={'='}
                            label={'='}
                            onClick={this.calculate}/>
                        <Button
                            value={0}
                            label={0}
                            onClick={this.addZero}/>
                        <Button
                            className={'operator'}
                            value={'**'}
                            label={'x^y'}
                            onClick={this.addOperator}/>
                        <Button
                            className={'operator'}
                            value={'/'}
                            label={'/'}
                            onClick={this.addOperator}/>
                    </div>
                    <div className={"button-row"}>
                        <Button
                            className={'operator'}
                            value={'sin(x)'}
                            label={'sin(x)'}
                            onClick={this.addOperator}/>
                        <Button
                            className={'operator'}
                            value={'cos(x)'}
                            label={'cos(x)'}
                            onClick={this.addOperator}/>
                        <Button
                            className={'operator'}
                            value={'tan(x)'}
                            label={'tan(x)'}
                            onClick={this.addOperator}/>
                        <Button
                            className={'operator'}
                            value={'cot(x)'}
                            label={'cot(x)'}
                            onClick={this.addOperator}/>
                    </div>
                    <div className={'button-row'}>
                        <Button
                            className={'special-button'}
                            value={'Clear'}
                            label={'Clear'}
                            onClick={this.clear}/>
                        <Button
                            className={'special-button'}
                            value={'Delete'}
                            label={'Delete'}
                            onClick={this.delete}/>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Calculator/>, document.getElementById('root'));
