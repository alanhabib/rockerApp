import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Text,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import {addUser} from '../Redux/actions/index';
import {connect} from 'react-redux';
import Validator from '../components/Validator';
import CountryPicker from '../components/Picker';

const URL = 'https://restcountries.eu/rest/v2/all';

const errorMessage = {
  ssn:
    'Your social security number must contain 12 digits and it needs to be valid Swedish social security number',
  phoneNumber: 'Your phone number must comply with the SIS standard',
  email: 'You must type correct email',
  no_countries: 'Sorry there seems to be missing countries here...',
  loading: 'Page is loading... wait for it... wait for it...',
};

const initialState = {
  country: '',
  ssn: '',
  phoneNumber: '',
  email: '',
  ssnError: '',
  phoneNumberError: '',
  emailError: '',
};

class User extends Component {
  state = {
    country: '',
    ssn: '',
    phoneNumber: '',
    email: '',
    ssnError: '',
    phoneNumberError: '',
    emailError: '',
    countries: [],
    loading: true,
  };

  async componentDidMount() {
    this.persistData('ssn');
    this.persistData('phoneNumber');
    this.persistData('email');
    this.persistData('country');
    const response = await fetch(URL);
    const data = await response.json();
    this.setState({
      countries: data,
      loading: false,
    });
  }

  validate = () => {
    let ssnError = '';
    let emailError = '';
    let phoneNumberError = '';
    if (!Validator.ssn(this.state.ssn)) {
      ssnError = errorMessage.ssn;
    }
    if (!Validator.phoneNumber(this.state.phoneNumber)) {
      phoneNumberError = errorMessage.phoneNumber;
    }
    if (!this.state.email.includes('@')) {
      emailError = errorMessage.email;
    }
    if (emailError || phoneNumberError || ssnError) {
      this.setState({
        emailError,
        phoneNumberError,
        ssnError,
      });
      return false;
    }
    return true;
  };

  setUserStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  readUserStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  addData = async () => {
    let userDetails = {
      country: this.state.country,
      ssn: this.state.ssn,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
    };

    let state = JSON.stringify({
      country: this.state.country,
      ssn: this.state.ssn,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
    });
    const isValid = this.validate();
    if (isValid) {
      console.log('Success');
      this.setState(initialState);
      this.props.addUserInput(userDetails);
      this.setUserStorage('user', state);
      this.removeDataFromStorage();
    }
  };

  persistData = (key) => {
    this.readUserStorage(key).then((result) => {
      if (result && key === 'ssn') {
        this.setState({
          ssn: result,
        });
      } else if (result && key === 'phoneNumber') {
        this.setState({
          phoneNumber: result,
        });
      } else if (result && key === 'email') {
        this.setState({
          email: result,
        });
      } else if (result && key === 'country') {
        this.setState({
          country: result,
        });
      }
    });
  };

  removeDataFromStorage = async () => {
    try {
      this.setState(initialState);
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  addCountryHandler = (country) => {
    this.setState({
      country,
    });
  };

  render() {
    let noCountries = !this.state.countries.length ? (
      <Text>{errorMessage.no_countries}</Text>
    ) : null;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Text style={styles.formLabel}>Submit your details!</Text>
          <TextInput
            keyboardtype={'numeric'}
            value={this.state.ssn}
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            placeholderTextColor="#535353"
            placeholder="Enter social security number"
            onChangeText={(ssn) => {
              this.setUserStorage('ssn', ssn);
              this.setState({
                ssn,
              });
            }}
          />
          <Text style={styles.errorText}>{this.state.ssnError}</Text>
          <TextInput
            keyboardtype={'numeric'}
            value={this.state.phoneNumber}
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            placeholderTextColor="#535353"
            placeholder="Enter phone number"
            onChangeText={(phoneNumber) => {
              this.setUserStorage('phoneNumber', phoneNumber);
              this.setState({
                phoneNumber,
              });
            }}
          />
          <Text style={styles.errorText}>{this.state.phoneNumberError}</Text>
          <TextInput
            value={this.state.email}
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            placeholderTextColor="#535353"
            placeholder="Enter email"
            onChangeText={(email) => {
              this.setUserStorage('email', email);
              this.setState({
                email,
              });
            }}
          />
          <Text style={styles.errorText}>{this.state.emailError}</Text>
          <CountryPicker
            setUserStorage={this.setUserStorage}
            addCountryHandler={this.addCountryHandler}
            loading={this.state.loading}
            loadingText={errorMessage.loading}
            noCountries={noCountries}
            countries={this.state.countries}
            country={this.state.country}
          />
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.buttonStyle}
            onPress={() => this.addData()}>
            <Text style={styles.buttonTextStyle}>Submit</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 50,
    backgroundColor: '#E6E6FA',
  },
  formLabel: {
    fontSize: 20,
    color: '#535353',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    paddingTop: 10,
  },
  mainView: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  textInputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  textStyle: {
    width: '100%',
    height: 20,
    textAlign: 'left',
    marginTop: 10,
    fontSize: 15,
  },
  mainTextStyle: {
    width: '100%',
    height: 40,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  buttonStyle: {
    width: '100%',
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 40,
  },
  buttonTextStyle: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    color: '#535353',
    borderRadius: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUserInput: (userDetails) => {
      dispatch(addUser(userDetails));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
