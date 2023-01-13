import { LightningElement, track, wire } from 'lwc';
import addAddressBook_Apex from '@salesforce/apex/DemoCreateAddressBookList.createAddressBook'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAllStateList from '@salesforce/apex/DemoCreateAddressBookList.getallstateList';

export default class DemoCreateAddressBook extends LightningElement {

    @track addressBookDetails = {};
    showErrorMessage = true;
    @track stateListToDisplay;

    @wire(getAllStateList) getStateList({ data, error }) {
        if (data) {
            this.stateListToDisplay = [{ value: '', label: 'Select' }];
            // for each program
            data.forEach(element => {
                const state = {};
                state.label = element.State_Name__c;
                state.value = element.Id;
                this.stateListToDisplay.push(state);
            });
            console.log('stateListToDisplay---', JSON.stringify(this.stateListToDisplay));
        }
        else if (error) {
            console.log('error---', JSON.stringify(error));
        }
    }

    validateAddressBook() {
        var addressBookDestinationNameInputField = this.template.querySelector('.addressBookDetail');
        var addressBookShipToNameInputField = this.template.querySelector('.addressBookShipToName');
        var ValidateaddressBookPhoneInputField = this.template.querySelector('.addressBookPhone');
        var addressBookShipToCompanyInputField = this.template.querySelector('.addressBookShipToCompany');
        var addressBookStateField = this.template.querySelector('.addressBookState');
        let addressBookStateValue = addressBookStateField.value;
        var ValidateaddressBookAddressInputField = this.template.querySelector('.addressBookAddress');
        var validateaddressBookCityInputField =  this.template.querySelector('.addressBookCity');
        var validateaddressBookZipInputField = this.template.querySelector('.addressBookZip');

        if (addressBookDestinationNameInputField.checkValidity() && addressBookShipToNameInputField.checkValidity() && ValidateaddressBookPhoneInputField.checkValidity() &&
            addressBookShipToCompanyInputField.checkValidity() && (addressBookStateValue != '' && addressBookStateValue != undefined)
            && ValidateaddressBookAddressInputField.checkValidity() && validateaddressBookCityInputField.checkValidity() && validateaddressBookZipInputField.checkValidity())
            this.showErrorMessage = false;
        else
            this.showErrorMessage = true;
    }
    handleDestinationName(event) {
        this.addressBookDetails.Destination_Name__c = event.target.value;
        this.validateAddressBook();
        console.log('this.addressBookDetails.Destination_Name__c---------------', this.addressBookDetails.Destination_Name__c);
    }

    //Email
    handleEmail(event) {
        this.addressBookDetails.Email__c = event.target.value;
        console.log('this.addressBookDetails.Email__c---', this.addressBookDetails.Email__c);
    }

    //Ship To Name
    handleShipToName(event) {
        this.addressBookDetails.Ship_To_Name__c = event.target.value;
        this.validateAddressBook();
        console.log('this.addressBookDetails.Ship_To_Name__c---', this.addressBookDetails.Ship_To_Name__c);
    }

    //Phone
    handlePhone() {
        //to hold the phone number
        let ValidateaddressBookPhoneInputField = this.template.querySelector('.addressBookPhone');
        //to capture the phone number
        let phone = ValidateaddressBookPhoneInputField.value;
        phone = phone.replace(/\s+/g, '');
        phone.startsWith(' ');
        phone = phone.trim();
        //to update the phone number
        this.addressBookDetails.Phone__c = phone;
        var regularExpForSpecialCharacters = /[^0-9+]/ig;
        if (regularExpForSpecialCharacters.test(phone)) {
            ValidateaddressBookPhoneInputField.setCustomValidity('special character not allowed');
        }
        else {
            ValidateaddressBookPhoneInputField.setCustomValidity('');
        }
        //in case to display error message 
        ValidateaddressBookPhoneInputField.reportValidity();
        //To vaildate the address book.
        this.validateAddressBook();
        console.log('this.addressBookDetails.Phone__c--', this.addressBookDetails.Phone__c);
    }

    //To remove special characters in the input field.
    removeSpecialCharactersForPhone_Fax(event) {
        var keycodes = [8, 37, 38, 39, 40];
        var regularExpForSpecialCharacters = /[0-9]/g;
        if (!regularExpForSpecialCharacters.test(event.key) && !keycodes.includes(event.keycode))
            event.preventDefault();
    }

    // Ship To Company
    handleShipToCompany(event) {
        this.addressBookDetails.Ship_to_company__c = event.target.value;
        this.validateAddressBook();
        console.log('this.addressBookDetails.Ship_To_Name__c---', this.addressBookDetails.Ship_to_company__c);
    }


    //State
    handleChangeState(event) {
        this.addressBookDetails.state__c = event.target.value;
        this.validateAddressBook();
        console.log('this.addressBookDetails.Ship_To_Name__c---', JSON.stringify(this.addressBookDetails.state__c));
    }

    //Address
    handleChangeAddress() {
        let addressBookAddressInputField = this.template.querySelector('.addressBookAddress');
        let address = addressBookAddressInputField.value;
        if (address.trim() == '')
            address = address.trim();
        this.addressBookDetails.Address__c = address;
        addressBookAddressInputField.reportValidity();
        this.validateAddressBook();
        console.log('this.addressBookDetails.Ship_To_Name__c---', JSON.stringify(this.addressBookDetails.Address__c));
    }

    // fax
    handleChangeFax(){
        var addressBookFaxInputField = this.template.querySelector(".addressBookFax");
                var faxValue = addressBookFaxInputField.value;
                faxValue = faxValue.replace(/\s+/g, '');
                this.addressBookDetails.fax__c = faxValue;
                var regexForSpecialCharacters = /[^0-9]/ig;
                if (regexForSpecialCharacters.test(faxValue)) {
                    addressBookFaxInputField.setCustomValidity('Special characters not allowed');
                } else {
                    addressBookFaxInputField.setCustomValidity('');
                }
                addressBookFaxInputField.reportValidity();
                console.log('this.addressBookDetails.fax__c---',this.addressBookDetails.fax__c);
    }

    //To To remove special characters when the onkey down triggers.
    validateCitySpecialCharactersOnkeydown(event){
        var city = event.target.value;
        var regexForSpecialCharacters = /[a-zA-Z ]/g;
        if (!regexForSpecialCharacters.test(event.key) || (city == '' && event.key == ' '))
            event.preventDefault();
    }

    // To remove special characters when the onkey press triggers.
    validateSpecialCharactersOnkeypress(event){
        var regexForSpecialCharacters = /[a-zA-Z ]/g;
        if (!regexForSpecialCharacters.test(event.key))
            event.preventDefault(); 
    }

    //City
    handleChangeCity(){
        var addressBookCityInputField = this.template.querySelector(".addressBookCity");
        //to hold city details
        var city = addressBookCityInputField.value
        city = city.replace(/\s\s+/g, ' ');
        if (city.startsWith(' '))
            city = city.trim();
        //to hold the city value
        this.addressBookDetails.City__c = city
        var regexForSpecialCharacters = /[^a-zA-Z ]/ig;
        if (regexForSpecialCharacters.test(city)) {
            addressBookCityInputField.setCustomValidity('Special characters not allowed');
        } else {
            addressBookCityInputField.setCustomValidity('');
        }
        //to display errors if any
        addressBookCityInputField.reportValidity();
        this.validateAddressBook()
        console.log('this.addressBookDetails.City__c---',this.addressBookDetails.City__c);
    }


    removeZipCodeSpecialCharacters(event){
        var regexForSpecialCharacters = /[0-9-]/g;
        var keycodes = [8, 37, 38, 39, 40];
        if (!regexForSpecialCharacters.test(event.key) && !keycodes.includes(event.keyCodes))
            event.preventDefault();
        if (event.key == '-' )
            event.preventDefault();
        if (event.key == '-')
            event.preventDefault();
    }

    handleChangeZip(){
        var addressBookZipInputField = this.template.querySelector(".addressBookZip")
        var zip = addressBookZipInputField.value;
        zip = zip.replace(/[^0-9-]/ig, '');
        zip = zip.replace(/--+/g, '-');
        if (zip.startsWith('-'))
            zip = zip.slice(1, zip.length);
        this.addressBookDetails.Zip__c = zip;
        var regexForSpecialCharacters = /[^0-9-]/ig;
        if (regexForSpecialCharacters.test(zip)) {
            addressBookZipInputField.setCustomValidity('Special characters not allowed');
        } else {
            addressBookZipInputField.setCustomValidity('');
        }
        addressBookZipInputField.reportValidity();
        this.validateAddressBook();
        console.log('this.addressBookDetails.Zip__c---',this.addressBookDetails.Zip__c);
    }




    handleChangeActive(event){
        this.addressBookDetails.Active__c = event.target.checked;
        console.log('this.addressBookDetails.Active__c---',this.addressBookDetails.Active__c);
    }


    //To send the data to apex paarameter and return as 'done' to show the toast event with the message.
    SaveAddressBook() {
        console.log('this.addressBookDetails----', JSON.stringify(this.addressBookDetails));
        addAddressBook_Apex({
            AddressBook_Para: JSON.stringify(this.addressBookDetails)
        })
            .then(result => {
                console.log('result', result)
                if (result == 'done') {
                    const Event = new ShowToastEvent({
                        title: 'Success',
                        message: 'The new address book is created',
                        variant: 'Success',
                    })
                    this.dispatchEvent(Event);
                }
            })
    }
}