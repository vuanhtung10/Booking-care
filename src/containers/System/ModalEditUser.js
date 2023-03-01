import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { emitter } from '../../utils/emitter';
import _ from 'lodash'
class ModalEditUser extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            id:'',
            email:'',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }


    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id:user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event,id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check good state',this.state)
        })
        
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email','password','firstName','lastName','address'];
        for ( let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]) {
                isValid = false;
                console.log('tungggg')
                alert('missing parameter:', + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true) {
            // call api edit user
            this.props.editUser(this.state);
        }
    }

    render() {
        console.log('check child props',this.props)
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => {this.toggle()}} close={() => {this.toggle()}}>
                Edit a new user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input 
                                type="text" 
                                onChange={(event) => {this.handleOnchangeInput(event,'email')}}
                                value={this.state.email} 
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input 
                                type="password" 
                                onChange={(event) => {this.handleOnchangeInput(event,'password')}}
                                value={this.state.password} 
                            />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input 
                                type="text" 
                                onChange={(event) => {this.handleOnchangeInput(event,'firstName')}}
                                value={this.state.firstName}  
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input 
                                type="text" 
                                onChange={(event) => {this.handleOnchangeInput(event,'lastName')}}
                                value={this.state.lastName} 
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>address</label>
                            <input 
                                type="text" 
                                onChange={(event) => {this.handleOnchangeInput(event,'address')}}
                                value={this.state.address} 
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" className='px-3' onClick={() => {this.handleSaveUser()}}>
                    save change
                </Button>{' '}
                <Button color="secondary" className='px-3' onClick={() => {this.toggle()}}>
                    close
                </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



