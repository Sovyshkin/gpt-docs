import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'


export const useLegalCompany = defineStore('legalCompany', () => {
    
    const router = useRouter()
    
    const type = ref("");
    const name = ref("");
    const fullName = ref("");
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


    const legalCreate = async () => {
        try {
            console.log('legalCreate')
        } catch (err) {
            console.log(err);
            
        }
    }

    
  return { type, name, fullName, corporateType, registrationNumber, countryCompany, taxCountry, taxPayerId, vatNumber, officeAddress, zipCode, postalOfficeAddress, zipCodePostal, phone, email }
})