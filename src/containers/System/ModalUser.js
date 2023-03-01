import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listeToEmitter()
    }

    listeToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA',data => {
            console.log('listen emitter from parent',data)
            this.setState({
                email:'',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount() {
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

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true) {
            // call api create modal
            this.props.createNewUser(this.state,'abc');
        }
    }

    render() {
        console.log('check child props',this.props)
        console.log('check child open modal',this.props.isOpen)
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => {this.toggle()}} close={() => {this.toggle()}}>
                Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input 
                                type="text" 
                                onChange={(event) => {this.handleOnchangeInput(event,'email')}}
                                value={this.state.email} 
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
                <Button color="primary" className='px-3' onClick={() => {this.handleAddNewUser()}}>
                    Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



