![QR-Code](qr.png)

# phoenixqr
Generiert einen QR-Code (z.B. für Webseiten) bzw. einen EPC QR-Code (Überweisungen). Benötigt den uralten [QR-Code Generator](https://github.com/t0k4rt/phpqrcode).


## Technisches / API

Anfragen per **GET** werden vom Server unterstützt.

Standardpfad: `qr.phoenixgymnasium.de`.

### Parameter

**type**

Alle Anfragen **müssen** den Parameter _type_ enthalten. Mögliche Werte sind:
* _text_
  
  Generiert einen regulären QR-Code. Der Parameter _text_ muss gesetzt sein.
* _epc_

  Generiert einen Code für Online-Banking.

**text**

Nötig, um bei einem QR-Code den Inhalt zu übertragen.

**ecc**

Optionaler Parameter -> Ermöglicht, das ECC-Niveau (_L_, _M_, _Q_, _H_) anzugeben. Der Code wird größer.

### Beispiele

`{"type": "text", "text": "https://www.pgwv.de"}`

-> Generiert einen QR-Code mit der URL _https://www.phoenixgymnasium.de_ mit der ECC-Stufe Q (Standard).
