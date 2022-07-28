import { FormControl, ValidationErrors } from "@angular/forms";

export class VcmsValidators {

    // whitespace validator
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
        // check if string wnhitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {
            return { notOnlyWhiteSpace: true };
        }
        else {
            return null;
        }


    }


    //tableNumber < 100 validator
    static tableNumberValidator(control: FormControl): ValidationErrors | null {
        if(control.value > 100 || control.value < 0 ){
            return { tableNumberValidator: true }
        }else{
            return null;
        }


    }
}