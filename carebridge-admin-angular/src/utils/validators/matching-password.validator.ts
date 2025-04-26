import { FormGroup } from "@angular/forms";

export class MatchingPasswordValidator {
    static validate(formGroup: FormGroup) {
        const { password, confirmPassword } = formGroup.value;
        if (password === confirmPassword) {
            return null;
        }
        return { passwordMismatch: true };
    }
}