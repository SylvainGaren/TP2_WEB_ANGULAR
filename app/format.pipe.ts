import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phoneFormat' })
export class PhoneFormatPipe implements PipeTransform {
    transform(tel: string, pays: string) {
        if (tel != "") {
            if (tel[0] == '0') {
                tel = tel.substring(1);
            }
            if (tel[0] != '+') {
                if (pays == "France") {
                    return "+33" + tel;
                }
                else if (pays == "Inde") {
                    return "+91" + tel;
                }
                else if (pays == "Etats-Unis") {
                    return "+1" + tel;
                }
                else if (pays == "Brésil") {
                    return "+55" + tel;
                }
            }
        }
    }
}