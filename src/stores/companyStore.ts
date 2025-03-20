import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useMessageStore } from './messageStore.ts'


export const useCompanyStore = defineStore('companyStore', () => {
    
    const router = useRouter()
    const messageStore = useMessageStore()

    const companies = ref([])
    const addedBank = ref(false)
    const addedSign = ref(false)
    const individual_company_id = ref('')
    const isLoading = ref(false)
    
    const fullName = ref("");
    const type = ref("individual");
    const name = ref("");
    const step = ref(4)
    const company_id = ref('')
    const token = localStorage.getItem('token')
    
    // legal entity
    // step 1
    const corporateType = ref("");
    const registrationNumber = ref("");
    const countryCompany = ref("");
    const taxCountry = ref("");
    const taxPayerId = ref("");
    const vatNumber = ref("");
    const officeAddress = ref("");
    const zipCode = ref("");
    const postalOfficeAddress = ref("");
    const zipCodePostal = ref("");
    const phone = ref("");
    const email = ref("");
    // step 2
    const beneficiary_name = ref('') 
    const beneficiary_account_no = ref('')
    const beneficiary_iban = ref('')
    const beneficiary_bank_id = ref('')
    const beneficiary_bank = ref('')
    const beneficiary_bank_country = ref('')
    const beneficiary_bank_address = ref('')
    const beneficiary_tax_id = ref('')
    const beneficiary_bank_swift = ref('')
    const correspondent_bank_name = ref('')
    const correspondent_bank_address = ref('')
    const correspondent_bank_account_no = ref('')
    const correspondent_bank_aba = ref('')
    const correspondent_bank_swift = ref('')
    const beneficiary_bank_account_with_the_correspondent_bank = ref('')



    // individual
    // step 1
    const registerAddress = ref('')
    const dob = ref('')
    const passportNumber = ref('')
    // step 2
    const account_holder_full_name = ref('')
    const bank_account = ref('')
    const name_of_the_bank = ref('')
    const currency = ref('USD')
    const bank_identification_code = ref('')
    const bank_country = ref('Russia')
    const bank_address = ref('')
    const account_holders_address = ref('')
    const account_holders_email = ref('')
    const correspondent_account = ref('')
    const correspondent_bank = ref('')
    // step 3
    const signatory_name_and_surname = ref('')
    const title_of_the_sole_signatory = ref('Director')
    const selectedFile = ref({name: "file", size: 0})

    const nextStep = async () => {
        try {
            isLoading.value = true
            if (step.value == 1 && !company_id.value) {
                await companyCreate()
            } else if (step.value == 3) {
                signatoryCreate()
            }
            if (type.value == 'individual') {
                if (step.value < 4) {
                    if (step.value == 1) {
                        await individualCreate()
                    } else if (step.value == 2 && addedBank.value) {
                        bankIndividualCreate()
                    }
                    step.value++
                }
            } else {
                if (step.value < 5) {
                    if (step.value == 1) {
                        legalCreate()
                    } else if (step.value == 4) {
                        filesCreate()
                    }
                    step.value++
                } else {
                    logoCreate()
                }
            }
        } catch (err) {
            console.log(err);
            
        }
    }

    const backStep = () => {
        try {
            if (step.value != 1) {
               step.value--
           } 
        } catch (err) {
            console.log(err)
        }
    }

     const getCompany = async () => {
        try {
            let response = await axios.get(`/companies/get_company?company_id=${company_id.value}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(response);
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        }
    }

    const getAllCompanies = async () => {
        try {
            isLoading.value = true
            let response = await axios.get(`/companies/get_all_companies`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(response);
            companies.value = response.data.companies
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        } finally {
            isLoading.value = false
        }
    }

    const companyCreate = async () => {
        try {
            let response = await axios.post(`/companies/create_company`, {
                name: name.value,
                company_type: type.value,
                contacts: 'test'
            }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(response);
            if (response.status == 200) {
                company_id.value = response.data.company_id
            }
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        }
    }

    const individualCreate = async () => {
        try {
            let response = await axios.post(`/individual_companies/create?company_id=${company_id.value}`, {
                name: fullName.value,
                passport_number: passportNumber.value,
                registered_address: registerAddress.value,
                date_of_birth: dob.value
            }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(response);
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        }
    }

    const bankIndividualCreate = async () => {
        try {
            isLoading.value = true
            let response = await axios.post(`/individual_companies/create?individual_company_id=1`, {
                account_holder_full_name: account_holder_full_name.value,
                bank_name: name_of_the_bank.value,
                bank_country: bank_country.value,
                account_holder_address: account_holders_address.value,
                correspondent_account: correspondent_account.value,
                bank_account: bank_account.value,
                swift_code: bank_identification_code.value,
                bank_address: bank_address.value,
                account_holder_email: account_holders_email.value,
                correspondent_bank: correspondent_bank.value,
                currency: currency.value
            }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(response);
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        } finally {
            isLoading.value = false
        }
    }

    const legalCreate = async () => {
        try {
            isLoading.value = true
            let response = await axios.post(`/legal_companies/create?company_id=${company_id.value}`, {
                name: name.value,
                full_name: fullName.value,
                registration_number: registrationNumber.value,
                country: countryCompany.value,
                tax_residence_country: taxCountry.value,
                taxpayer_id_code: taxPayerId.value,
                vat_number: vatNumber.value,
                corporate_type: corporateType.value,
                registered_office_address: officeAddress.value,
                registered_office_zip_code: zipCode.value,
                postal_address: postalOfficeAddress.value,
                postal_zip_code: zipCodePostal.value,
                phone_number: phone.value,
                email: email.value
            },  {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(response)
        } catch (err) {
            console.log(err);
        } finally {
            isLoading.value = false
        }
    }

    const getLegalCompanies = async () => {
        try {
            let response = await axios.get(`/legal_companies/get?company_id=${company_id.value}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(response)
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        }
    }

    const getIndividualCompanies = async () => {
        try {
            let response = await axios.get(`/individual_companies/get?company_id=${company_id.value}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(response)
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        }
    }

    const logoCreate = async () => {
        try {
            isLoading.value = true
            const formData = new FormData();
            formData.append("file", selectedFile.value);
            let response = await axios.post(`/company_logos/create?company_id=1`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response)
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        } finally {
            isLoading.value = false
        }
    }

    const filesCreate = async () => {
        try {
            isLoading.value = true
            const formData = new FormData();
            formData.append("file", selectedFile.value);
            let response = await axios.post(`/company_files/create?company_id=1`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response)
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        } finally {
            isLoading.value = false
        }
    }

    const signatoryCreate = async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedFile.value);
            formData.append("company_id", 1);
            formData.append("name", signatory_name_and_surname.value);
            formData.append("title", title_of_the_sole_signatory.value);
            formData.append("email", email.value);
            let response = await axios.post(`/signatories/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response)
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        }
    }

    const deleteCompany = async (id) => {
        try {
            console.log(id);
            isLoading.value = true
            if (id) {
                let response = await axios.post(`/companies/delete_company?company_id=${id}`, {}, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                },
                })
                console.log(response);
                if (response.status == 200) {
                    getAllCompanies()
                    messageStore.message = 'Success'
                    messageStore.status = '200'
                    setTimeout(() => {
                        messageStore.message = ''
                        messageStore.status = ''
                    }, 5000);
                }
            }
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        } finally {
            isLoading.value = false
        }
    }

     // Обработчик выбора файла
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Получаем первый выбранный файл

        if (file) {
            selectedFile.value = file;
        }
    };

        // Очистка выбранного файла
        const clearFile = () => {
        selectedFile.value = {name: "file", size: 0};
    };

    
  return {deleteCompany, isLoading, filesCreate, logoCreate, signatoryCreate, bankIndividualCreate, companies, addedSign, addedBank, getCompany, getAllCompanies, getIndividualCompanies, getLegalCompanies, individualCreate, company_id, companyCreate, beneficiary_bank_address, beneficiary_tax_id, beneficiary_bank_swift, correspondent_bank_name, correspondent_bank_address, correspondent_bank_account_no, correspondent_bank_aba, correspondent_bank_swift, beneficiary_bank_account_with_the_correspondent_bank, beneficiary_name, beneficiary_account_no, beneficiary_iban, beneficiary_bank_id, beneficiary_bank, beneficiary_bank_country, selectedFile, handleFileChange, clearFile, title_of_the_sole_signatory, signatory_name_and_surname, nextStep, backStep, step, account_holder_full_name, bank_account, name_of_the_bank, currency, bank_identification_code, bank_country, bank_address, account_holders_address, account_holders_email, correspondent_account, correspondent_bank, legalCreate, type, name, fullName, corporateType, registrationNumber, countryCompany, taxCountry, taxPayerId, vatNumber, officeAddress, zipCode, postalOfficeAddress, zipCodePostal, phone, email, passportNumber, dob, registerAddress }
})