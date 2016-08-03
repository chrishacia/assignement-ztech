const React = require('react');
const _ = require('underscore');
const moment = require('moment');
const validator = require("email-validator");

const UserDetailsForm = React.createClass({
    getInitialState() { return this._resetStateObject() },
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.account);
        this.setState(nextProps.account);
    },
    render() {
        return(
            <form autoComplete="off">
                <div className="alert alert-info" role="alert">All fields required, unless otherwise indicated.</div>

                <FormGroup
                    hasError={this.state.firstNameHasError}
                    hasSuccess={this.state.firstNameHasSuccess}
                    value={this.state.firstName}
                    onChangeHandler={(e) => {
                        this.setState({
                            firstName: e.target.value,
                            firstNameHasError: false,
                            firstNameHasSuccess: false
                        })
                    }}
                    onBlurHandler={(e)=>{
                        this.setState({
                            firstNameHasError: !e.target.value,
                            firstNameHasSuccess: !!e.target.value
                        })
                    }}
                    type="text"
                    nameId="firstName"
                    label="First name"
                    placeholder="John"
                    hasErrorMessage="First name can not be blank."
                />

                <FormGroup
                    hasError={this.state.lastNameHasError}
                    hasSuccess={this.state.lastNameHasSuccess}
                    value={this.state.lastName}
                    onChangeHandler={(e) => {
                        this.setState({
                            lastName: e.target.value,
                            lastNameHasError: false,
                            lastNameHasSuccess: false
                        })
                    }}
                    onBlurHandler={(e)=>{
                        this.setState({
                            lastNameHasError: !e.target.value,
                            lastNameHasSuccess: !!e.target.value
                        })
                    }}
                    type="text"
                    nameId="lastName"
                    label="Last name"
                    placeholder="Smith"
                    hasErrorMessage="Last name can not be blank."
                />

                <FormGroup
                    hasError={this.state.emailHasError}
                    hasSuccess={this.state.emailHasSuccess}
                    value={this.state.email}
                    onChangeHandler={(e) => {
                        this.setState({
                            email: e.target.value,
                            emailHasError: false,
                            emailHasSuccess: false
                        })
                    }}
                    onBlurHandler={(e)=>{
                        this.setState({
                            emailHasError: !validator.validate(e.target.value),
                            emailHasSuccess: !!validator.validate(e.target.value)
                        })
                    }}
                    type="text"
                    nameId="email"
                    label="Email"
                    placeholder="jsmith@example.com"
                    hasErrorMessage="Email can not be blank and must be formatted like name@example.com"
                />

                <FormGroup
                    hasError={this.state.passwordHasError}
                    hasSuccess={this.state.passwordHasSuccess}
                    value={this.state.password}
                    onChangeHandler={(e) => {
                        this.setState({
                            password: e.target.value,
                            passwordHasError: false,
                            passwordHasSuccess: false
                        })
                    }}
                    onBlurHandler={(e)=>{
                        let strongPW = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*).{8,}$/.test(e.target.value);
                        this.setState({
                            passwordHasError: (!e.target.value || !strongPW),
                            passwordHasSuccess: (!!e.target.value && !!strongPW)
                        })
                    }}
                    type="password"
                    nameId="password"
                    label="Password"
                    placeholder="password"
                    defaultMessage="Password rules: Cannot be blank, must be 12 characters minimally, and must contain at least one uppercase letter, one lowercase letter and one special character"
                    hasErrorMessage="Password can not be blank, and be a strong password."
                />

                <FormGroup
                    hasError={this.state.passwordConfirmHasError}
                    hasSuccess={this.state.passwordConfirmHasSuccess}
                    value={this.state.passwordConfirm}
                    onChangeHandler={(e) => {
                        this.setState({
                            passwordConfirm: e.target.value,
                            passwordConfirmHasError: false,
                            passwordConfirmHasSuccess: false
                        });
                    }}
                    onBlurHandler={(e)=>{
                        // if they don't match theres no point in continuing is there..
                        if(e.target.value !== this.state.password) {
                            this.setState({
                                passwordConfirmHasError: true,
                                passwordConfirmHasSuccess: false,
                            });
                            return;
                        }

                        let strongPW = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*).{8,}$/.test(e.target.value);
                        this.setState({
                            passwordConfirmHasError: (!e.target.value || !strongPW),
                            passwordConfirmHasSuccess: (!!e.target.value && !!strongPW)
                        });
                    }}
                    type="password"
                    nameId="password"
                    label="Confirm Password"
                    placeholder="password"
                    hasErrorMessage="Confirm password can not be blank and must be a strong password. Or password and confirm password fields do not match"
                />

                <FormGroup
                    hasError={this.state.dobHasError}
                    hasSuccess={this.state.dobHasSuccess}
                    value={moment(this.state.dob).format('YYYY-MM-DD')}
                    onChangeHandler={(e) => {
                        console.log(moment(e.target.value + ' 00:00:00').unix())
                        this.setState({
                            dob: moment(e.target.value + ' 00:00:00').unix(),
                            dobHasError: false,
                            dobHasSuccess: false
                        });
                    }}
                    onBlurHandler={(e)=>{
                        let dateStr = e.target.value;

                        console.log(dateStr);
                        // matching for mm/dd/yyyy or mm-dd-yyyy for legacy support, and matching yyyy/mm/dd or yyyy-mm-dd
                        let validDateFormat = /^((0[1-9]|1[0-2])[\/|-](0[1-9]|1\d|2\d|3[01])[\/|-](18|19|20)\d{2})|((18|19|20)\d{2}[\/|-](0[1-9]|1[0-2])[\/|-](0[1-9]|1\d|2\d|3[01]))$/.test(dateStr);
                        let years = moment().diff(dateStr, 'years');

                        // date is proper mm/dd/yyyy format?
                        // are we within the 18+ to 150 crowd?
                        console.log(years, !validDateFormat, (years > 18 && years < 150))
                        if((!validDateFormat)||(years < 18 || years > 150)) {
                            this.setState({
                                dobHasError: true,
                                dobHasSuccess: false
                            });
                            return;
                        }

                        this.setState({
                            dobHasError: false,
                            dobHasSuccess: true
                        });

                    }}
                    type="date"
                    nameId="dob"
                    label="Date of birth"
                    placeholder="mm/dd/yyyy"
                    defaultMessage="Must be 18 or older to continue. Format: mm/dd/yyyy"
                    hasErrorMessage="Invald format accepted: mm/dd/yyyy, or age determined to be younger than 18 or older than 150"
                />

                <div className="form-group text-right">
                    <button
                        className="btn btn-primary"
                        disabled={ this._disableSubmit() || this.state.processing }
                        onClick={(e)=>{
                            e.preventDefault();
                            this.setState(this._resetStateObject);
                        }}
                    >
                        {!this.props.isAccount ? 'Create' : 'Update'}
                    </button>
                    &nbsp;
                    <button
                        className="btn btn-primary"
                        disabled={this.state.processing}
                        onClick={(e)=>{
                            e.preventDefault();
                            this.setState(this._resetStateObject);
                        }}
                    >
                        Reset
                    </button>
                </div>
            </form>
        );
    },
    _resetStateObject: () => ({
        processing: false,
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        password: '',
        passwordConfirm: '',
        passwordConfirmHasError: false,
        firstNameHasError:  false,
        lastNameHasError:  false,
        emailHasError:  false,
        dobHasError:  false,
        passwordHasError:  false,
        passwordConfirmHasError:  false,
        passwordConfirmHasSuccess: false,
        firstNameHasSuccess:  false,
        lastNameHasSuccess:  false,
        emailHasSuccess:  false,
        dobHasSuccess:  false,
        passwordHasSuccess:  false,
        passwordConfirmHasSuccess:  false
    }),
    _disableSubmit() {
        let disable = true;

        if(
            !!this.state.firstName &&
            !!this.state.lastName &&
            !!this.state.email &&
            !!this.state.dob
        ) {
            disable = false;
        }

        if(!this.props.isAccount) {
            // password check
        }

        return disable;
    }
})

const FormGroup = React.createClass({
    render() {
        return (
            <div
                className={
                    'form-group ' + (
                        !this.props.hasError ?
                            !this.props.hasSuccess ? '' : 'has-success'
                        :
                        'has-error'
                    )
                }
            >
                <label htmlFor={this.props.nameId} className="control-label"> {this.props.label} </label>
                <input
                    className="form-control"
                    type={this.props.type}
                    name={this.props.nameId}
                    id={this.props.nameId}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={(e) => {
                        this.props.onChangeHandler(e);
                    }}
                    onBlur={(e)=>{
                        this.props.onBlurHandler(e);
                    }}
                />
            {
                this.props.defaultMessage && !this.props.hasError &&
                <span className="help-block">{this.props.defaultMessage}</span>
            }
            {
                this.props.hasError &&
                <span className="help-block">{this.props.hasErrorMessage}</span>
            }
            </div>
        )
    }
})


module.exports = UserDetailsForm;
